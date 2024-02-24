import React from 'react';
import axios from 'axios';
import '../assets/style/App.css';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

//import icons from fontawesome and react icon kit
import { Icon } from 'react-icons-kit';
import { person } from 'react-icons-kit/iconic/person';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { phone } from 'react-icons-kit/icomoon/phone'
import { location2 } from 'react-icons-kit/icomoon/location2'
import { ic_wysiwyg } from 'react-icons-kit/md/ic_wysiwyg'
import { location } from 'react-icons-kit/entypo/location'
import { ic_room } from 'react-icons-kit/md/ic_room';
import { map } from 'react-icons-kit/fa/map';
import { ic_mail } from 'react-icons-kit/md/ic_mail';
import { ic_home_work } from 'react-icons-kit/md/ic_home_work';
import { ic_domain } from 'react-icons-kit/md/ic_domain';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { following } from 'react-icons-kit/ikons/following';
import { followers } from 'react-icons-kit/ikons/followers';
import { pen_3 } from 'react-icons-kit/ikons/pen_3';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { API_URL } from '../config';
import TextField from '@mui/material/TextField';
import { Box, Button, Checkbox, FormControl, InputAdornment, InputLabel, MenuItem, Select, Snackbar } from '@mui/material';
import { CancelBtn, SaveBtn, UserActionBtn } from '../assets/style/cssInlineConfig';
import { AddUserBtn, SaveBtnComp } from '../components/AddUserBtn';
import { CancelBtnComp } from '../components/AddUserBtn'
import { FaTh, FaBars, FaUserAlt, FaRegChartBar, FaCommentAlt, FaShoppingBag } from "react-icons/fa";
import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import MuiAlert from '@mui/material/Alert';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import SelectTextFields from '../components/SelectTextFields';
import InputFileUpload from '../components/SelectTextFields';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageUpload from '../components/ImageUpload';
import Loader from '../components/Loader';


const Add_User_Detials = ({ Positionid_val }) => {
    const userInfoString = sessionStorage.getItem("UserInfo");
    const userInfo = JSON.parse(userInfoString);
    // for invoice
    // console.log(selectedUser);
    const [postData, setPostData] = useState({
        userid: '',
        OrganizationName: '',
        bussinessType: '',
        gstNumber: '',
        panNumber: '',
        aadharNo: '',
        fName: '',
        lName: '',
        Positionid: Positionid_val,
        adminid: userInfo.userid,
        email: '',
        mobileNo: '',
        upiPaymentNo: '',
        accName: '',
        accNo: '',
        passbookImg: '',

        pAddress: '',
        streetAddress: '',
        City: '',
        State: '',

        pCode: '',
        // CommunicationAddress: '',
        StreetAddress2: '',
        City2: '',
        State2: '',
        PostalCode2: '',
    });
    const handleClear = () => {
        setPostData({
            userid: '',
            OrganizationName: '',
            bussinessType: '',
            gstNumber: '',
            panNumber: '',
            aadharNo: '',
            fName: '',
            lName: '',
            Positionid: Positionid_val,
            adminid: userInfo.userid,
            email: '',
            mobileNo: '',
            upiPaymentNo: '',
            accName: '',
            accNo: '',
            passbookImg: '',

            // pAddress: '',
            streetAddress: '',
            City: '',
            State: '',
            pCode: '',

            // CommunicationAddress: '',
            StreetAddress2: '',
            City2: '',
            State2: '',
            PostalCode2: '',
        });
    }

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;

        // Check if the input is a file input
        if (type === 'file') {
            setPostData({
                ...postData,
                [name]: e.target.files[0], // Use the file from the input
            });
        } else {
            setPostData({
                ...postData,
                [name]: value,
            });
        }
        console.log(postData);
    };

    // const [file, setFile] = useState(null);
    // const handleFileChange = (e) => {
    //     setFile(e.target.files[0]);
    // };

    // const formData = new FormData();
    // formData.append('image', postData.passbookImg);
    // for (const entry of formData.entries()) {
    //     console.log(entry);
    // }
    const [loading, setLoading] = useState(false);
    const [resAlert, setresAlert] = useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault();
        // top level
        // const isValiduserid = postData.userid.trim() !== '';
        const isValiduserid = /^.{1,20}$/.test(postData.userid.trim());
        const isValidaadharNo = /^\d{12}$/.test(postData.aadharNo)
        const isValidfName = /^[A-Za-z\s'-]+$/.test(postData.fName)
        const isValidlName = /^[A-Za-z\s'-]+$/.test(postData.lName)
        const isValidemail = /^[A-Za-z0-9._%+-]+@gmail\.com$/.test(postData.email)
        const isValidMobileNo = /^\d{10}$/.test(postData.mobileNo)
        if (isValiduserid & isValidaadharNo & isValidfName & isValidlName & isValidemail & isValidMobileNo) {
            if (!(Positionid_val === 4 || Positionid_val === 5)) {
                // Inner Level
                const isValidbussinessType = (postData.bussinessType === 'Organization' || postData.bussinessType === 'Individual');
                const isValidOrgName = postData.OrganizationName.trim() !== '';
                const isValidgstNumber = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(postData.gstNumber)
                const isValidpanNumber = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(postData.panNumber)
                // Upi Bank Detials
                // const isValidupiPaymentNo = postData.upiPaymentNo.trim() !== '';
                // const isValidaccName = postData.accName.trim() !== '';
                // const isValidaccNo = (/^\d*$/.test(postData.accNo) & postData.accNo.trim() !== '');
                // alert(isValidaccNo)
                // const isValidpAddress = postData.pAddress.trim() !== '';
                const isValidstreetAddress = postData.streetAddress.trim() !== '';
                const isValidCity = postData.City.trim() !== '';
                const isValidState = postData.State.trim() !== '';
                const isValidpCode = postData.pCode.trim() !== '';
                // const isValidCommunicationAddress = postData.CommunicationAddress.trim() !== '';
                const isValidStreetAddress2 = postData.StreetAddress2.trim() !== '';
                const isValidCity2 = postData.City2.trim() !== '';
                const isValidState2 = postData.State2.trim() !== '';
                const isValidPostalCode2 = postData.PostalCode2.trim() !== '';
                // alert("hai da")
                if (isValidbussinessType & isValidOrgName & isValidgstNumber & isValidpanNumber
                    // & isValidupiPaymentNo & isValidaccName & isValidaccNo & isValidpAddress 
                    & isValidstreetAddress & isValidCity & isValidState & isValidpCode
                    // & isValidCommunicationAddress 
                    & isValidStreetAddress2 & isValidCity2 & isValidState2 & isValidPostalCode2
                ) {
                    try {
                        setLoading(true);
                        const response = await axios.post(`${API_URL}add/user`, { userDetials: postData, AccessControls: accessValues });
                        // alert(response.data.message);
                        setresAlert(response.data.message)
                        setSubmitted(true);
                        if (response.data.status) {
                            handleClear();
                            navigate(-1);
                            // setTimeout(() => {
                            // }, 1000);
                        }
                        setLoading(false);
                    } catch (error) {
                        console.error('Error sending data:', error);
                    }
                }
                else {
                    if (!isValidbussinessType) {
                        setresAlert("Select Business Type");
                        setSubmitted(true);
                    }
                    else if (!isValidOrgName) {
                        setresAlert("Enter Valid Organization Name");
                        setSubmitted(true);
                    }
                    else if (!isValidgstNumber) {
                        setresAlert("Enter Valid GST Number");
                        setSubmitted(true);
                    }
                    else if (!isValidpanNumber) {
                        setresAlert("Enter Valid PAN Number");
                        setSubmitted(true);
                    }
                    // else if (!isValidupiPaymentNo) {
                    //     setresAlert("Enter Valid UPI Payment ID");
                    //     setSubmitted(true);
                    // }
                    // else if (!isValidaccName) {
                    //     setresAlert("Enter Valid Account Name");
                    //     setSubmitted(true);
                    // }
                    // else if (!isValidaccNo) {
                    //     setresAlert("Enter Valid Account Number");
                    //     setSubmitted(true);
                    // }
                    // else if (!isValidpAddress) {
                    //     setresAlert("Enter Valid Permenant Address");
                    //     setSubmitted(true);
                    // }
                    else if (!isValidstreetAddress) {
                        setresAlert("Enter Valid Street Adress");
                        setSubmitted(true);
                    }
                    else if (!isValidCity) {
                        setresAlert("Enter Valid City Name");
                        setSubmitted(true);
                    }
                    else if (!isValidState) {
                        setresAlert("Enter Valid State Name");
                        setSubmitted(true);
                    }
                    else if (!isValidpCode) {
                        setresAlert("Enter Valid Postal code");
                        setSubmitted(true);
                    }
                    // else if (!isValidCommunicationAddress) {
                    //     setresAlert("Enter Valid Communication Address");
                    //     setSubmitted(true);
                    // }
                    else if (!isValidStreetAddress2) {
                        setresAlert("Enter Valid Communication - Street Address");
                        setSubmitted(true);
                    }
                    else if (!isValidCity2) {
                        setresAlert("Enter Valid Communication - City Name");
                        setSubmitted(true);
                    }
                    else if (!isValidState2) {
                        setresAlert("Enter Valid Communication - State Name");
                        setSubmitted(true);
                    }
                    else if (!isValidPostalCode2) {
                        setresAlert("Enter Valid Communication - Postal Code");
                        setSubmitted(true);
                    }
                }
            } else {
                try {
                    setLoading(true);
                    const response = await axios.post(`${API_URL}add/user`, { userDetials: postData, AccessControls: accessValues });
                    // alert(response.data.message);
                    setresAlert(response.data.message)
                    setSubmitted(true);
                    if (response.data.status) {
                        setTimeout(() => {
                            handleClear();
                            navigate(-1);
                        }, 1000);
                    }
                } catch (error) {
                    console.error('Error sending data:', error);
                }
                setLoading(false);
            }
        }
        else {
            if (!isValiduserid) {
                setresAlert("Enter Valid User ID");
                setSubmitted(true);
            }
            else if (!isValidaadharNo) {
                setresAlert("Enter Valid Aadhar Number");
                setSubmitted(true);
            }
            else if (!isValidfName) {
                setresAlert("Enter Valid First Name");
                setSubmitted(true);
            }
            else if (!isValidlName) {
                setresAlert("Enter Valid Last Name");
                setSubmitted(true);
            }
            else if (!isValidemail) {
                setresAlert("Enter Valid Email");
                setSubmitted(true);
            }
            else if (!isValidMobileNo) {
                setresAlert("Enter Valid Mobile Number");
                setSubmitted(true);
            }
        }
    };

    const inputFields = [
        { label: "User ID", name: "userid", value: postData.userid, icon: ic_home_work },
        { label: "Aadhar Number", name: "aadharNo", value: postData.aadharNo, icon: pen_3 },
        { label: "First Name", name: "fName", value: postData.fName, icon: pen_3 },
        { label: "Last Name", name: "lName", value: postData.lName, icon: pen_3 },
        { label: "Email", name: "email", value: postData.email, icon: pen_3 },
        { label: "Mobile Number", name: "mobileNo", value: postData.mobileNo, icon: pen_3 },
        { label: "Bussiness Type", name: "bussinessType", value: postData.bussinessType, icon: person, isStaff: (Positionid_val === 4 || Positionid_val === 5) },
        { label: "Organization Name", name: "OrganizationName", value: postData.OrganizationName, isStaff: (Positionid_val === 4 || Positionid_val === 5) },
        { label: "GST Number", name: "gstNumber", value: postData.gstNumber, icon: pen_3, isStaff: (Positionid_val === 4 || Positionid_val === 5) },
        { label: "PAN Number", name: "panNumber", value: postData.panNumber, icon: ic_wysiwyg, isStaff: (Positionid_val === 4 || Positionid_val === 5) },
        // Add more input field objects as needed
        // { label: "Position", name: "Position", value: postData.Position, icon: pen_3 },
        // row 3
        // 2. UPI Payment Details:
        { label: "UPI ID", name: "upiPaymentNo", value: postData.upiPaymentNo, icon: pen_3, isStaff: (Positionid_val === 4 || Positionid_val === 5) },
        { label: "Bank Name", name: "accName", value: postData.accName, icon: pen_3, isStaff: (Positionid_val === 4 || Positionid_val === 5) },
        { label: "Bank Account Number", name: "accNo", value: postData.accNo, icon: pen_3, isStaff: (Positionid_val === 4 || Positionid_val === 5) },
        // { label: "Pass Book image vvv", name: "passbookImg", value: postData.passbookImg, icon: pen_3, inputType: "file", isStaff: (Positionid_val === 4 || Positionid_val === 5) },
        // 3. Address Details:
        { label: "Permanent Address", name: "pAddress", value: postData.pAddress, icon: pen_3, isStaff: (Positionid_val === 4 || Positionid_val === 5) },
        { label: "Permanent Street Address", name: "streetAddress", value: postData.streetAddress, icon: pen_3, isStaff: (Positionid_val === 4 || Positionid_val === 5) },
        { label: "City", name: "City", value: postData.City, icon: pen_3, isStaff: (Positionid_val === 4 || Positionid_val === 5) },
        { label: "State", name: "State", value: postData.State, icon: pen_3, isStaff: (Positionid_val === 4 || Positionid_val === 5) },
        { label: "Postal Code", name: "pCode", value: postData.pCode, icon: pen_3, isStaff: (Positionid_val === 4 || Positionid_val === 5) },

        // { label: "Communication Address", name: "CommunicationAddress", value: postData.CommunicationAddress, icon: pen_3, isStaff: (Positionid_val === 4 || Positionid_val === 5) },
        { label: "Communication Street Address", name: "StreetAddress2", value: postData.StreetAddress2, icon: pen_3, isStaff: (Positionid_val === 4 || Positionid_val === 5) },
        { label: "City", name: "City2", value: postData.City2, icon: pen_3, isStaff: (Positionid_val === 4 || Positionid_val === 5) },
        { label: "State", name: "State2", value: postData.State2, icon: pen_3, isStaff: (Positionid_val === 4 || Positionid_val === 5) },
        { label: "Postal Code", name: "PostalCode2", value: postData.PostalCode2, icon: pen_3, isStaff: (Positionid_val === 4 || Positionid_val === 5) },
    ];

    // set var
    const [first_name, setfirst_name] = useState("");
    const [last_name, setlast_name] = useState("");
    const [siteid, setsiteid] = useState("");
    const [roleid, setroleid] = useState("");
    const [contact, setcontact] = useState("");
    const [Designation, setDesignation] = useState("");
    const [email, setemail] = useState("")



    // cancel script
    function handleCancel() {
        setfirst_name("");
        setlast_name("");
        setsiteid("");
        setroleid("");
        setcontact("");
        setDesignation("");
        setemail("");
        navigate(-1);
    }



    //redirect to device content page
    const navigate = useNavigate();
    const cancel_btn = {
        "color": "gray",
        "border": "1px solid gray",
    }

    const [selectedUser, setSelectedUser] = useState(null);
    // var Positionid_val;
    console.log(Positionid_val);
    // const handleUserChange = async (event) => {
    //     setSelectedUser(event.target.value);
    //     if (event.target.value == "select user") {
    //         Positionid_val = null
    //     }
    //     else if (event.target.value === 'Staff') {
    //         Positionid_val = 4;
    //     } else if (event.target.value === 'Distributor') {
    //         Positionid_val = 2;
    //     }
    //     else if (event.target.value === 'Customer') {
    //         Positionid_val = 3;
    //     }
    //     // console.log("hello : ",Positionid_val);
    //     setPostData(prevData => ({
    //         ...prevData,
    //         Positionid: Positionid_val,
    //     }));
    // };


    // useEffect(() => {
    //     console.log("hai : ", postData.Positionid);
    // }, [postData.Positionid]);
    // console.log("haiiii", userInfo.position);

    // Access control
    const [accessValues, setAccessValues] = useState({
        Staff: 'View', // Default values
        Distributor: 'View',
        D_Staff: 'View',
        Customer: 'View',
        Products: 'View',
        'Invoice Generator': 'View',
        'Invoice PaySlip': 'View'
    });

    const handleRadioChange = (row, value) => {
        setAccessValues((prevValues) => ({
            ...prevValues,
            [row]: value,
        }));
        // console.log(row,value);
    };
    const [submitted, setSubmitted] = useState(false);
    const [submittedWarnning, setsubmittedWarnning] = useState(false);
    const handleSnackbarClose = () => {
        setSubmitted(false);
    };

    const accessHead = [
        { label: 'Staff', disableHead: false },
        { label: 'Distributor', disableHead: false },
        { label: 'D_Staff', disableHead: false },
        { label: 'Customer', disableHead: false },
        { label: 'Products', disableHead: false },
        { label: 'Invoice Generator', disableHead: false },
        { label: 'Invoice PaySlip', disableHead: false },
    ]
    console.log(Positionid_val);
    let updatedAccessHead = [...accessHead];
    console.log(userInfo.position === 'manifacture');
    if (userInfo.position === 'manifacture') {
        let labelsToUpdate
        if (Positionid_val === 4) {
            labelsToUpdate = ['Staff', 'D_Staff', 'Customer'];
        }
        // else if (Positionid_val === 5) {
        //     labelsToUpdate = ['Customer'];
        // }
        else if (Positionid_val === 2) {
            labelsToUpdate = ['Staff', 'Distributor'];
        }
        else {
            labelsToUpdate = ['D_Staff', 'Customer'];
        }
        labelsToUpdate.forEach((label) => {
            const indexToUpdate = updatedAccessHead.findIndex((item) => item.label === label);
            if (indexToUpdate !== -1) {
                updatedAccessHead = [...updatedAccessHead];
                updatedAccessHead[indexToUpdate] = { ...updatedAccessHead[indexToUpdate], disableHead: true };
            }
        });
    }
    if (userInfo.position === 'distributor') {
        let labelsToUpdate
        if (Positionid_val === 5) {
            labelsToUpdate = ['Staff', 'Distributor', 'D_Staff'];
        }
        else if (Positionid_val === 3) {
            labelsToUpdate = ['Staff', 'Distributor', 'D_Staff', 'Customer', 'Products', 'Invoice Generator'];
        }
        else {
            labelsToUpdate = ['D_Staff', 'Customer'];
        }
        const labelsToUpdate1 = ['Staff', 'Distributor', 'D_Staff'];
        labelsToUpdate.forEach((label) => {
            const indexToUpdate = updatedAccessHead.findIndex((item) => item.label === label);
            if (indexToUpdate !== -1) {
                updatedAccessHead = [...updatedAccessHead];
                updatedAccessHead[indexToUpdate] = { ...updatedAccessHead[indexToUpdate], disableHead: true };
            }
        });
    }
    if (userInfo.position === 'staff') {
        const labelsToUpdate = ['Staff', 'Distributor'];
        labelsToUpdate.forEach((label) => {
            const indexToUpdate = updatedAccessHead.findIndex((item) => item.label === label);
            if (indexToUpdate !== -1) {
                updatedAccessHead = [...updatedAccessHead];
                updatedAccessHead[indexToUpdate] = { ...updatedAccessHead[indexToUpdate], disableHead: true };
            }
        });

    }
    if (userInfo.position === 'd_staff') {
        const labelsToUpdate = ['Staff', 'Distributor', 'D_Staff', 'Customer', 'Products', 'Invoice Generator'];
        labelsToUpdate.forEach((label) => {
            const indexToUpdate = updatedAccessHead.findIndex((item) => item.label === label);
            if (indexToUpdate !== -1) {
                updatedAccessHead = [...updatedAccessHead];
                updatedAccessHead[indexToUpdate] = { ...updatedAccessHead[indexToUpdate], disableHead: true };
            }
        });
    }

    useEffect(() => {
        if (userInfo.position === 'staff') {
            setAccessValues((prevValues) => ({
                ...prevValues,
                Staff: 'No access',
                Distributor: 'No access',
                // Customer: 'No access',
                // D_Staff: 'No access'
            }));
        }
        else if (userInfo.position === 'd_staff') {
            setAccessValues((prevValues) => ({
                ...prevValues,
                Staff: 'No access',
                Distributor: 'No access',
                D_Staff: 'No access',
                Customer: 'No access',
                Products: 'No access',
                'Invoice Generator': 'No access',
            }));
        }
        else if (userInfo.position === 'distributor') {
            // setAccessValues((prevValues) => ({
            //     ...prevValues,
            //     Staff: 'No access',
            //     Distributor: 'No access',
            //     D_Staff: 'No access',
            // }));
            if (Positionid_val === 5) {
                setAccessValues((prevValues) => ({
                    ...prevValues,
                    Staff: 'No access',
                    Distributor: 'No access',
                    D_Staff: 'No access',
                    // Customer: 'No access',
                    // Products: 'No access',
                }));
            }
            if (Positionid_val === 3) {
                setAccessValues((prevValues) => ({
                    ...prevValues,
                    Staff: 'No access',
                    Distributor: 'No access',
                    Customer: 'No access',
                    D_Staff: 'No access',
                    Products: 'No access',
                    'Invoice Generator': 'No access',

                }));
            }
        }
        else if (userInfo.position === 'manifacture') {
            if (Positionid_val === 4) {
                setAccessValues((prevValues) => ({
                    ...prevValues,
                    Staff: 'No access',
                    Customer: 'No access',
                    D_Staff: 'No access'
                }));
            }
            if (Positionid_val === 2) {
                setAccessValues((prevValues) => ({
                    ...prevValues,
                    Staff: 'No access',
                    Distributor: 'No access'
                }));
            }
        }
    }, []);

    const limit = 1;
    const accessOptions = [
        { label: 'No access', disabled: true },
        { label: 'View', disabled: true },
        { label: 'Edit', disabled: true },
        { label: 'All', disabled: true }
    ];
    const updatedAccessOptions = accessOptions.map((option, index) => ({
        ...option,
        disabled: index < limit ? false : true
    }));

    const currencies = [
        {
            value: 'Organization',
            label: 'Organization',
        },
        {
            value: 'Individual',
            label: 'Individual',
        }
    ];

    // File name set
    const [fileName, setFileName] = useState('');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFileName(selectedFile.name);
            // console.log("entering", selectedFile.name);
            var imageName = selectedFile.name
            setPostData({
                ...postData,
                passbookImg: imageName
            });
        } else {
            setFileName('');
        }
    };

    // for Same Address
    const [sameAddress, setSameAddress] = useState(false);

    const handleCheckboxChange = () => {
        setSameAddress(!sameAddress);
    };
    useEffect(() => {
        if (sameAddress) {
            // console.log(postData);
            setPostData({
                ...postData,
                // CommunicationAddress: postData.pAddress,
                StreetAddress2: postData.streetAddress,
                City2: postData.City,
                State2: postData.State,
                PostalCode2: postData.pCode,
            });
        } else {
            setPostData({
                ...postData,
                // CommunicationAddress: '',
                StreetAddress2: '',
                City2: '',
                State2: '',
                PostalCode2: '',
            });
        }
    }, [sameAddress])
    // const handleInputChange = (e, name) => {
    //     // Your input change logic here
    // };

    return (
        <>
            {loading && <Loader />}
            <div className='Add_device1 '>
                {/* Snack bar */}
                <Snackbar open={submitted} autoHideDuration={5000} onClose={handleSnackbarClose} anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}>
                    <MuiAlert onClose={handleSnackbarClose} severity="warning" sx={{ width: '100%' }}>
                        {resAlert}
                    </MuiAlert>
                </Snackbar>
                {/* <Snackbar open={submittedWarnning} autoHideDuration={1000} onClose={handleSnackbarClose} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}>
                <MuiAlert onClose={handleSnackbarClose} severity="warning" sx={{ width: '100%' }}>
                    {resAlert}
                </MuiAlert>
            </Snackbar> */}
                {/* Exit Conformation */}
                <div className="modal fade boot-modals" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content width_of_model height_of_modal_content">
                            <div className="modal-header-confirm">
                                <h5 className="modal-title" id="exampleModalLabel">CONFIRMATION</h5>
                            </div>
                            <div className="modal-main-confirm">
                                <h5 className="modal-title ">Are you sure you want Exit ?
                                </h5>
                            </div>
                            <div className="modal-footer-confirm">
                                <button type="button" className="btn-loc active-loc" data-bs-dismiss="modal" onClick={handleCancel} >YES</button>
                                <button type="button" className="btn-loc inactive-loc" data-bs-dismiss="modal">NO</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* User access model */}
                {/* Access controll start */}
                <div class="modal fade boot-modals accessmodal" id="accessControll" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content" style={{ padding: '1rem' }}>
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Access Control</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <FormControl component="fieldset">
                                    {/* <FormLabel component="legend">Rows</FormLabel> */}
                                    {updatedAccessHead.map((row, rowIndex) => (
                                        <div key={rowIndex} className='accessControlHeadwithVal'>
                                            <FormLabel component="legend" className='acc_head'>{`${row.label}`}</FormLabel>
                                            <RadioGroup row
                                                className='acc_val'
                                                value={accessValues[row.label]}
                                                onChange={(e) => handleRadioChange(row.label, e.target.value)}
                                            >
                                                {accessOptions.map((radio, radioIndex) => (
                                                    <FormControlLabel key={radioIndex} value={radio.label} control={<Radio disabled={row.disableHead} />} label={`${radio.label}`} />
                                                ))}
                                            </RadioGroup>
                                        </div>
                                    ))}
                                    {/* Access values state: {JSON.stringify(accessValues)} */}
                                </FormControl>
                            </div>
                            <div class="modal-footer">
                                {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                                <Button variant="outlined" type="button" data-bs-dismiss="modal" style={SaveBtn}>Access</Button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* access controll end */}

                <div className="row_with_count_status">
                    <span className='module_tittle'>User Detials</span>
                </div>
                {/* <ImageUpload /> */}
                <div className="add_device_container1">
                    <div className="new_device_content scroll_div">
                        <div className="row_one display-flex">
                            <div className="adding_new_device uppercase bold">
                                Add
                                {(Positionid_val === 2) && " Distributor "}
                                {(Positionid_val === 3) && " Customer "}
                                {(Positionid_val === 4) && " Staff "}
                                {(Positionid_val === 5) && " D_Staff "}
                                Details </div>
                            {/* <select value={selectedUser} onChange={handleUserChange}>
                            <option value={"select user"}>Select User</option>
                            {userInfo.position === 'manifacture' && (
                                <>
                                    <option value="Staff">Staff</option>
                                    <option value="Distributor">Distributor</option>
                                </>
                            )}
                            {userInfo.position === 'staff' && (
                                <>
                                    <option value="Distributor">Distributor</option>
                                </>
                            )}
                            {userInfo.position === 'distributor' && (
                                <option value="Customer" >Customer</option>
                            )}
                        </select> */}
                        </div>
                        {/* <FormControl style={{ width: '150px' }}>
                        <InputLabel id="demo-simple-select-label">Select user</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedUser}
                            label="Select user"
                            onChange={handleUserChange}
                        >
                            {userInfo.position === 'manifacture' && (
                                <>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value="Staff">Staff</MenuItem>
                                    <MenuItem value="Distributor">Distributor</MenuItem>
                                </>
                            )}
                            {userInfo.position === 'staff' && (
                                <>
                                    <MenuItem value="Distributor">Distributor</MenuItem>
                                </>
                            )}
                            {userInfo.position === 'distributor' && (
                                <MenuItem value="Customer" >Customer</MenuItem>
                            )}
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl> */}

                        <div className="row_two display-flex padding-loc">
                            <div className="device_info uppercase light-grey mb-loc-5">
                                User info
                            </div>

                            <div className="input-boxes">
                                <div className="cmpny_and_site_name display-flex">
                                    {inputFields.slice(0, 4).map((field, index) => (
                                        !(field.isStaff) &&
                                        <div key={index} className="inputbox display-flex input">
                                            {!field.isStaff && (
                                                <Box className="dsa_1st_input"
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column', // Change the direction for small screens
                                                        '& .MuiTextField-root': {
                                                            m: 1,
                                                            width: field.name === 'bussinessType' ? '27ch' : '100%',
                                                        },
                                                    }}
                                                >
                                                    {/* <label htmlFor={`input${index + 1}`}>{field.label}<span className='required'>*</span></label> */}

                                                    {/* <span className="input-group-loc"><Icon icon={field.icon} size={20} style={{ color: "lightgray" }} /></span> */}
                                                    <TextField
                                                        label={
                                                            <span>{`${field.label}`}</span>
                                                        }
                                                        // helperText="Please enter your name"
                                                        type="text"
                                                        className="form-control-loc"
                                                        value={field.value}
                                                        onChange={handleInputChange}
                                                        name={field.name}
                                                        id={`input${index + 1}`}
                                                        select={field.name === 'bussinessType' && true}
                                                        disabled={field.disabled}
                                                        InputLabelProps={{
                                                            className: 'required-label',
                                                            required: true
                                                        }}
                                                    >
                                                        {currencies.map((option) => (
                                                            <MenuItem key={option.value} value={option.value}>
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>

                                                </Box>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="dsa_row_3 display-flex">
                                    {inputFields.slice(4, 8).map((field, index) => (
                                        !(field.isStaff) && (
                                            <div key={index} className="inputbox display-flex input">
                                                <Box className="dsa_1st_input"
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column', // Change the direction for small screens
                                                        '& .MuiTextField-root': {
                                                            m: 1,
                                                            width: field.name === 'bussinessType' ? '28ch' : '100%',
                                                        },
                                                    }}
                                                >
                                                    {/* <span className="input-group-loc"><Icon icon={field.icon} size={20} style={{ color: "lightgray" }} /></span> */}
                                                    <TextField
                                                        label={
                                                            <span>{`${field.label}`}</span>
                                                        }
                                                        type="text"
                                                        className="form-control-loc"
                                                        value={field.value}
                                                        // onChange={(e) => handleInputChange(e, field.name)}
                                                        onChange={handleInputChange}
                                                        name={field.name}
                                                        id={`input${index + 1}`}
                                                        select={field.name === 'bussinessType' && true}
                                                        labelClassName="required"
                                                        InputLabelProps={{
                                                            className: 'required-label',
                                                            required: true
                                                        }}
                                                        InputProps={{
                                                            startAdornment: field.name === 'mobileNo' ? <InputAdornment position="start">+91</InputAdornment> : null
                                                        }}
                                                    >
                                                        {currencies.map((option) => (
                                                            <MenuItem key={option.value} value={option.value}>
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                    {field.error ? 'Error' : ''}

                                                    {/* Add error handling if needed */}
                                                </Box>
                                            </div>
                                        )
                                    ))}
                                </div>

                                <div className="dsa_row_3 display-flex">
                                    {inputFields.slice(8, 10).map((field, index) => (
                                        !(field.isStaff) && (
                                            <div key={index} className="inputbox display-flex input">
                                                <div className="dsa_1st_input">
                                                    <Box className="inputs-group display-flex"
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection: 'column', // Change the direction for small screens
                                                            '& .MuiTextField-root': {
                                                                m: 1,
                                                                width: field.name === 'bussinessType' ? '27ch' : '100%',
                                                            },
                                                        }}
                                                    >
                                                        {/* <span className="input-group-loc"><Icon icon={field.icon} size={20} style={{ color: "lightgray" }} /></span> */}
                                                        <TextField
                                                            label={`${field.label}`}
                                                            className="form-control-loc"
                                                            value={field.value}
                                                            onChange={(e) => handleInputChange(e, field.name)}
                                                            name={field.name}
                                                            id={`input${index + 1}`}
                                                            InputLabelProps={{
                                                                className: 'required-label',
                                                                required: true
                                                            }}
                                                        />
                                                        {/* Add error handling if needed */}
                                                    </Box>
                                                </div>
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>

                            {!(Positionid_val === 4 || Positionid_val === 5) && (
                                <div className="device_info uppercase light-grey mb-loc-5">
                                    UPI Payment Details
                                </div>
                            )}

                            <div className="dsa_row_3 display-flex">
                                {inputFields.slice(10, 13).map((field, index) => (
                                    <div key={index} className="inputbox display-flex input">
                                        <div className="dsa_1st_input">
                                            {!(field.isStaff) && (
                                                <Box className="inputs-group display-flex"
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column', // Change the direction for small screens
                                                        '& .MuiTextField-root': {
                                                            m: 1,
                                                            width: field.name === 'bussinessType' ? '30ch' : '100%',
                                                        },
                                                    }}
                                                >
                                                    {/* <span className="input-group-loc"><Icon icon={field.icon} size={20} style={{ color: "lightgray" }} /></span> */}
                                                    <TextField
                                                        label={`${field.label}`}
                                                        type={field.inputType || "text"}
                                                        className="form-control-loc"
                                                        value={field.value}
                                                        onChange={(e) => handleInputChange(e, field.name, field.inputType)}
                                                        name={field.name}
                                                        id={`input${index + 1}`}
                                                    />
                                                    {/* Add error handling if needed */}
                                                </Box>
                                            )}

                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* <div className="dsa_row_3 display-flex">
                            {inputFields.slice(13, 14).map((field, index) => (
                                <div key={index} className="inputbox display-flex input">
                                    <div className="dsa_1st_input">
                                        {!(field.isStaff) && (
                                            <Box className="inputs-group display-flex"
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    '& .MuiTextField-root': {
                                                        m: 1,
                                                        width: field.name === 'bussinessType' ? '30ch' : '100%',
                                                    },
                                                }}
                                                style={{ marginLeft: '10px', flexDirection: 'row' }}
                                            >
                                                <Button component="label" variant="outlined" startIcon={<CloudUploadIcon />}>
                                                    Passbook Image
                                                    <input
                                                        type="file"
                                                        style={{ display: 'none' }}
                                                        onChange={handleFileChange}
                                                    />
                                                </Button>
                                                <span style={{ marginLeft: '10px' }}>{fileName && `${fileName}`}</span>
                                            </Box>
                                        )}

                                    </div>
                                </div>
                            ))}
                        </div> */}

                            {!(Positionid_val === 4 || Positionid_val === 5) && (
                                <div className="device_info uppercase light-grey mb-loc-5">
                                    Address Details
                                </div>
                            )}

                            <div className="dsa_row_3 display-flex">
                                {inputFields.slice(14, 18).map((field, index) => (
                                    <div key={index} className="inputbox display-flex input">
                                        <div className="dsa_1st_input">
                                            {!(field.isStaff) && (
                                                <Box className="inputs-group display-flex"
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column', // Change the direction for small screens
                                                        '& .MuiTextField-root': {
                                                            m: 1,
                                                            width: field.name === 'bussinessType' ? '30ch' : '100%',
                                                        },
                                                    }}
                                                >
                                                    {/* <span className="input-group-loc"><Icon icon={field.icon} size={20} style={{ color: "lightgray" }} /></span> */}
                                                    <TextField
                                                        label={`${field.label}`}
                                                        type="text"
                                                        className="form-control-loc"
                                                        value={field.value}
                                                        onChange={(e) => handleInputChange(e, field.name)}
                                                        name={field.name}
                                                        id={`input${index + 1}`}
                                                        InputLabelProps={{
                                                            className: 'required-label',
                                                            required: true
                                                        }}
                                                    />
                                                    {/* Add error handling if needed */}
                                                </Box>
                                            )}

                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* <div className="dsa_row_3 display-flex">
                            {inputFields.slice(18, 18).map((field, index) => (
                                <div key={index} className="inputbox display-flex input">
                                    <div className="dsa_1st_input">
                                        {!(field.isStaff) && (
                                            <Box className="inputs-group display-flex"
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column', // Change the direction for small screens
                                                    '& .MuiTextField-root': {
                                                        m: 1,
                                                        width: field.name === 'bussinessType' ? '30ch' : '100%',
                                                    },
                                                }}
                                            >
                                                <TextField
                                                    label={`${field.label} *`}
                                                    type="text"
                                                    className="form-control-loc"
                                                    value={field.value}
                                                    onChange={(e) => handleInputChange(e, field.name)}
                                                    name={field.name}
                                                    id={`input${index + 1}`}
                                                />
                                            </Box>
                                        )}

                                    </div>
                                </div>
                            ))}
                        </div> */}
                            {!(Positionid_val === 4 || Positionid_val === 5) && (
                                <FormControlLabel style={{ userSelect: 'none' }} control={<Checkbox checked={sameAddress} onChange={handleCheckboxChange} />} label="Same - Permenent Address" />
                            )}
                            <div className="dsa_row_3 display-flex">
                                {inputFields.slice(18, 22).map((field, index) => (
                                    <div key={index} className="inputbox display-flex input">
                                        <div className="dsa_1st_input">
                                            {!(field.isStaff) && (
                                                <Box className="inputs-group display-flex"
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column', // Change the direction for small screens
                                                        '& .MuiTextField-root': {
                                                            m: 1,
                                                            width: '100%',
                                                        },
                                                    }}
                                                >
                                                    {/* <span className="input-group-loc"><Icon icon={field.icon} size={20} style={{ color: "lightgray" }} /></span> */}
                                                    <TextField
                                                        label={`${field.label}`}
                                                        type="text"
                                                        className="form-control-loc"
                                                        value={field.value}
                                                        onChange={(e) => handleInputChange(e, field.name)}
                                                        name={field.name}
                                                        id={`input${index + 1}`}
                                                        disabled={sameAddress}
                                                        InputLabelProps={{
                                                            className: 'required-label',
                                                            required: true
                                                        }}
                                                    />
                                                    {/* Add error handling if needed */}
                                                </Box>
                                            )}

                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="dsa_row_3 display-flex">
                                {inputFields.slice(23, 24).map((field, index) => (
                                    <div key={index} className="inputbox display-flex input">
                                        <div className="dsa_1st_input">
                                            {!(field.isStaff) && (
                                                <Box className="inputs-group display-flex"
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column', // Change the direction for small screens
                                                        '& .MuiTextField-root': {
                                                            m: 1,
                                                            width: field.name === 'bussinessType' ? '30ch' : '100%',
                                                        },
                                                    }}
                                                >
                                                    {/* <span className="input-group-loc"><Icon icon={field.icon} size={20} style={{ color: "lightgray" }} /></span> */}
                                                    <TextField
                                                        label={`${field.label}`}
                                                        type="text"
                                                        className="form-control-loc"
                                                        value={field.value}
                                                        onChange={(e) => handleInputChange(e, field.name)}
                                                        name={field.name}
                                                        id={`input${index + 1}`}
                                                        disabled={sameAddress}
                                                        InputLabelProps={{
                                                            className: 'required-label',
                                                            required: true
                                                        }}
                                                    />
                                                    {/* Add error handling if needed */}
                                                </Box>
                                            )}

                                        </div>
                                    </div>
                                ))}
                                <Button variant="outlined " style={{
                                    color: 'red', borderColor: 'red', width: '71px',
                                    height: '71px',
                                    borderRadius: '50px'
                                }} data-bs-toggle="modal" data-bs-target="#accessControll">
                                    {/* <LockClosedIcon /> */}
                                    <ErrorOutlineIcon />
                                </Button>
                            </div>

                        </div>

                    </div>
                    <div className="operating_buttons display-flex padding-loc">
                        <div className="save_cancel_btn display-flex site_button gap-4">
                            <CancelBtnComp CancelBtnFun={handleCancel} />
                            <SaveBtnComp SaveBtnFun={(e) => handleSubmit(e)} />
                            {/* <button className="btn-loc active-loc btn btn-outline-success" onClick={(e) => handleSubmit(e)}>Save</button>
                            <button type="button" class="btn-loc inactive-loc btn btn-outline-danger" data-bs-dismiss="modal">Close</button>
                            <button className="btn-loc inactive-loc btn " style={cancel_btn} data-bs-toggle="modal" data-bs-target="#exampleModal">cancel</button> */}
                        </div>
                    </div>
                </div>
            </div >
        </>

    );
};
export default Add_User_Detials;