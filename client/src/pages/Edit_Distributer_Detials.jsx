import React from 'react';
import '../assets/style/App.css';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { API_URL, SECRET_KEY } from '../config'
import axios from 'axios';

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
import { following } from 'react-icons-kit/ikons/following'
import { followers } from 'react-icons-kit/ikons/followers'
import { pen_3 } from 'react-icons-kit/ikons/pen_3'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { CancelBtnComp, SaveBtnComp } from '../components/AddUserBtn';
import { Box, Button, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Snackbar } from '@mui/material';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import { SaveBtn } from '../assets/style/cssInlineConfig';
import MuiAlert from '@mui/material/Alert';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import CryptoJS from 'crypto-js';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Edit_Distributer_Detials = ({ Positionid_val }) => {
    let useridEnc = useParams();
    let userid;
    useEffect(() => {
        const decryptUserId = async () => {
            try {
                // console.log("userid : ", useridEnc.useridEnc);
                const secretKey = `${SECRET_KEY}`;
                const decodedEncryptId = decodeURIComponent(useridEnc.useridEnc);
                const bytes = CryptoJS.AES.decrypt(decodedEncryptId, secretKey);
                const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
                // console.log('Decrypted:', decryptedText);
                userid = decryptedText;
            } catch (error) {
                console.error('Error during decryption:', error);
            }
        };

        decryptUserId();
    }, [useridEnc.useridEnc]);

    const userInfoString = sessionStorage.getItem("UserInfo");
    const userInfo = JSON.parse(userInfoString);
    // console.log(userid);
    const [admin_value, setadmin] = useState([]);
    const [loc_name, setlocationName] = useState([]);
    const [editable_data, setEditable_data] = useState([]);
    const [selectedOption_site, setSelectedOption_site] = useState('0');
    const [selectedOption_user, setSelectedOption_user] = useState('0');
    const [selectedOption_device, setSelectedOption_device] = useState('0');
    const [selectedOption_dashboard, setSelectedOption_dashboard] = useState('0');

    const handleOptionChange_site = (event) => {
        setSelectedOption_site(event.target.value);
    };
    const handleOptionChange_user = (event) => {
        setSelectedOption_user(event.target.value);
    };
    const handleOptionChange_device = (event) => {
        setSelectedOption_device(event.target.value);
    };
    const handleOptionChange_dashboard = (event) => {
        setSelectedOption_dashboard(event.target.value);
    };

    useEffect(() => {
        const device_user_data = async () => {
            // console.log(userid);
            try {
                const response = await fetch(`${API_URL}get/user/${userid}`);
                const data = await response.json();
                // console.log(data);
                all_data_fun(data)
            } catch (error) {
                console.error(error);
            }
        };
        device_user_data();
    }, [userid]);

    const all_data_fun = (data) => {
        if (data) {
            // console.log(data);
            const item = data.data;
            const AccessItem = data.getuserAccessControl;
            setInputValues((prevValues) => ({
                ...prevValues,
                userid: item.userid,
                OrganizationName: item.organizationname,
                bussinessType: item.bussinesstype,
                gstNumber: item.gstnno,
                panNumber: item.pan,
                aadharNo: item.aadhar,
                fName: item.fname,
                lName: item.lname,
                email: item.email,
                mobileNo: item.phno,
                upiPaymentNo: item.upiid,
                accName: item.bankname,
                accNo: item.bankaccno,
                passbookImg: item.passbookimg,
                // pAddress: "",
                streetAddress: item.pstreetname,
                City: item.pdistrictid,
                State: item.pstateid,
                pCode: item.ppostalcode,
                // CommunicationAddress: "",
                StreetAddress2: item.cstreetname,
                City2: item.cdistrictid,
                State2: item.cstateid,
                PostalCode2: item.cpostalcode
            }));
            // For staff
            // console.log(AccessItem.distributer);
            if (AccessItem.staff == 0) {
                AccessItem.staff = 'No access'
            }
            else if (AccessItem.staff == 1) {
                AccessItem.staff = 'View'
            }
            else if (AccessItem.staff == 2) {
                AccessItem.staff = 'Edit'
            }
            else if (AccessItem.staff == 3) {
                AccessItem.staff = 'All'
            }
            // For Distributor
            if (AccessItem.distributer == 0) {
                AccessItem.distributer = 'No access'
            }
            else if (AccessItem.distributer == 1) {
                AccessItem.distributer = 'View'
            }
            else if (AccessItem.distributer == 2) {
                AccessItem.distributer = 'Edit'
            }
            else if (AccessItem.distributer == 3) {
                AccessItem.distributer = 'All'
            }
            // For D_Distributor
            if (AccessItem.d_staff == 0) {
                AccessItem.d_staff = 'No access'
            }
            else if (AccessItem.d_staff == 1) {
                AccessItem.d_staff = 'View'
            }
            else if (AccessItem.d_staff == 2) {
                AccessItem.d_staff = 'Edit'
            }
            else if (AccessItem.d_staff == 3) {
                AccessItem.d_staff = 'All'
            }
            // For Customer
            if (AccessItem.customer == 0) {
                AccessItem.customer = 'No access'
            }
            else if (AccessItem.customer == 1) {
                AccessItem.customer = 'View'
            }
            else if (AccessItem.customer == 2) {
                AccessItem.customer = 'Edit'
            }
            else if (AccessItem.customer == 3) {
                AccessItem.customer = 'All'
            }
            // For Products
            if (AccessItem.product == 0) {
                AccessItem.product = 'No access'
            }
            else if (AccessItem.product == 1) {
                AccessItem.product = 'View'
            }
            else if (AccessItem.product == 2) {
                AccessItem.product = 'Edit'
            }
            else if (AccessItem.product == 3) {
                AccessItem.product = 'All'
            }

            // For Invoice Generator
            if (AccessItem.invoicegenerator == 0) {
                AccessItem['Invoice Generator'] = 'No access'
            }
            else if (AccessItem.invoicegenerator == 1) {
                AccessItem['Invoice Generator'] = 'View'
            }
            else if (AccessItem.invoicegenerator == 2) {
                AccessItem['Invoice Generator'] = 'Edit'
            }
            else if (AccessItem.invoicegenerator == 3) {
                AccessItem['Invoice Generator'] = 'All'
            }
            // For Invoice payslip
            if (AccessItem.invoicepayslip == 0) {
                AccessItem['Invoice PaySlip'] = 'No access'
            }
            else if (AccessItem.invoicepayslip == 1) {
                AccessItem['Invoice PaySlip'] = 'View'
            }
            else if (AccessItem.invoicepayslip == 2) {
                AccessItem['Invoice PaySlip'] = 'Edit'
            }
            else if (AccessItem.invoicepayslip == 3) {
                AccessItem['Invoice PaySlip'] = 'All'
            }
            // console.log("test :" ,AccessItem['Invoice PaySlip']);
            setAccessValues((prevValues) => ({
                ...prevValues,
                Staff: AccessItem.staff, // Default values
                Distributor: AccessItem.distributer,
                D_Staff: AccessItem.d_staff,
                Customer: AccessItem.customer,
                Products: AccessItem.product,
                'Invoice Generator': AccessItem['Invoice Generator'],
                'Invoice PaySlip': AccessItem['Invoice PaySlip']
            }));
            // setlast_name(item.last_name);
            // setsiteid(item.site_id);
            // setroleid(item.role_id);
            // setcontact(item.contact);
            // setDesignation(item.designation);
            // setemail(item.email);
            setSelectedOption_site(item.site_management);
            setSelectedOption_user(item.user_management);
            setSelectedOption_device(item.device_management);
            setSelectedOption_dashboard(item.dashboard);
        }
        // console.log("hai : " , first_name);
    };
    const [inputValues, setInputValues] = useState({
        userid: "",
        OrganizationName: "",
        bussinessType: "",
        gstNumber: "",
        panNumber: "",
        aadharNo: "",
        fName: "",
        lName: "",
        email: "",
        mobileNo: "",
        upiPaymentNo: "",
        accName: "",
        accNo: "",
        passbookImg: "",
        // pAddress: "",
        streetAddress: "",
        City: "",
        State: "",
        pCode: "",
        // CommunicationAddress: "",
        StreetAddress2: "",
        City2: "",
        State2: "",
        PostalCode2: ""
        // Add more fields as needed
    });

    // cancel script
    function handleCancel() {
        navigate(-1);
    }


    //redirect to device content page
    const navigate = useNavigate();
    const [resAlert, setresAlert] = useState(null);
    // validation
    const handle_save = async (e) => {
        e.preventDefault();
        // top level
        const userId = inputValues.userid.trim();
        const isValiduserid = userId !== '' &&  /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(userId);
        // const isValiduserid = inputValues.userid.trim() !== '';
        const isValidaadharNo = /^\d{12}$/.test(inputValues.aadharNo)
        const isValidfName = /^[A-Za-z\s'-]+$/.test(inputValues.fName)
        const isValidlName = /^[A-Za-z\s'-]+$/.test(inputValues.lName) && (typeof inputValues.lName === 'string' && inputValues.lName.trim() !== '')
        // const isValidemail = /^[A-Za-z0-9._%+-]+@gmail\.com$/.test(inputValues.email)
        const isValidemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValues.email)
        const isValidMobileNo = /^\d{10}$/.test(inputValues.mobileNo)
        // console.log(inputValues, isValidlName);
        if (isValiduserid & isValidaadharNo & isValidfName & isValidlName & isValidemail & isValidMobileNo) {
            if (!(Positionid_val === 4 || Positionid_val === 5)) {
                const isValidbussinessType = (inputValues.bussinessType === 'Organization' || inputValues.bussinessType === 'Individual');
                const isValidOrgName = typeof inputValues.OrganizationName === 'string' && inputValues.OrganizationName.trim() !== '';
                const isValidgstNumber = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(inputValues.gstNumber)
                const isValidpanNumber = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(inputValues.panNumber)
                // Upi Bank Detials
                // const isValidupiPaymentNo = inputValues.upiPaymentNo.trim() !== '';
                // const isValidaccName = inputValues.accName.trim() !== '';
                // const isValidaccNo = (/^\d*$/.test(inputValues.accNo) & inputValues.accNo.trim() !== '');
                // alert(isValidaccNo)
                // const isValidpAddress = inputValues.pAddress.trim() !== '';
                // const isValidstreetAddress = inputValues.streetAddress.trim() !== '';
                // const isValidCity = inputValues.City.trim() !== '';
                // const isValidState = inputValues.State.trim() !== '';
                // const isValidpCode = inputValues.pCode.trim() !== '';
                // const isValidCommunicationAddress = inputValues.CommunicationAddress.trim() !== '';
                const isValidStreetAddress2 = typeof inputValues.StreetAddress2 === 'string' && inputValues.StreetAddress2.trim() !== '';
                const isValidCity2 = typeof inputValues.City2 === 'string' && inputValues.City2.trim() !== '';
                const isValidState2 = typeof inputValues.State2 === 'string' && inputValues.State2.trim() !== '';
                const isValidPostalCode2 = typeof inputValues.PostalCode2 === 'string' && inputValues.PostalCode2.trim() !== '';
                // console.log(inputValues);
                if (isValidbussinessType & isValidOrgName & isValidgstNumber & isValidpanNumber
                    // & isValidupiPaymentNo & isValidaccName & isValidaccNo
                    // & isValidpAddress & isValidstreetAddress & isValidCity & isValidState & isValidpCode & isValidCommunicationAddress
                    & isValidStreetAddress2 & isValidCity2 & isValidState2 & isValidPostalCode2
                ) {
                    console.log(accessValues);
                    try {
                        const response = await axios.put(`${API_URL}update/user`, { inputValues, AccessOptions: accessValues });
                        // alert(response.data.status);
                        console.log(response.data);
                        if (response.data.status) {
                            setresAlert(response.data.message)
                            setSubmittedSucess(true);
                            setTimeout(() => {
                                navigate(-1);
                            }, 1000);
                        }
                    } catch (error) {
                        setresAlert("Error updating data! Contact Developer")
                        setSubmitted(true);
                        console.error('Error updating data:', error);
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
                    // else if (!isValidstreetAddress) {
                    //     setresAlert("Enter Valid Street Adress");
                    //     setSubmitted(true);
                    // }
                    // else if (!isValidCity) {
                    //     setresAlert("Enter Valid City Name");
                    //     setSubmitted(true);
                    // }
                    // else if (!isValidState) {
                    //     setresAlert("Enter Valid State Name");
                    //     setSubmitted(true);
                    // }
                    // else if (!isValidpCode) {
                    //     setresAlert("Enter Valid Postal code");
                    //     setSubmitted(true);
                    // }
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
            }
            else {
                try {
                    const response = await axios.put(`${API_URL}update/user`, { inputValues, AccessOptions: accessValues });
                    // alert(response.data.status);
                    console.log(response.data);
                    if (response.data.status) {
                        setresAlert(response.data.message)
                        setSubmittedSucess(true);
                        setTimeout(() => {
                            navigate(-1);
                        }, 1000);
                    }
                } catch (error) {
                    setresAlert("Error updating data! Contact Developer")
                    setSubmitted(true);
                    console.error('Error updating data:', error);
                }
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
    }


    const [isOpen1, setIsOpen1] = useState(false);
    const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
    const dropdownRef1 = useRef(null);
    const handle_site_location = () => {
        setIsOpen1(!isOpen1);
        // setIsDropdownOpen2(!isDropdownOpen4)
    };

    const [isOpen2, setIsOpen2] = useState(false);
    const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
    const dropdownRef2 = useRef(null);
    const dropdown2 = () => {
        setIsOpen2(!isOpen2);
        // setIsDropdownOpen2(!isDropdownOpen4)
    };

    const [isOpen3, setIsOpen3] = useState(false);
    const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);
    const dropdownRef3 = useRef(null);
    const dropdown3 = () => {
        setIsOpen3(!isOpen3);
        // setIsDropdownOpen3(!isDropdownOpen3)
    };


    const [isOpen4, setIsOpen4] = useState(false);
    const [isDropdownOpen4, setIsDropdownOpen4] = useState(false);
    const dropdownRef4 = useRef(null);
    const handle_site_admin = () => {
        setIsOpen4(!isOpen4);
        // setIsDropdownOpen4(!isDropdownOpen4)
    };
    const site_admin_target = useRef(null);
    const empty_site_admin_target = (event) => {
        if (!site_admin_target.current.contains(event.target)) {
            setIsOpen4(false);
        }
    }

    useEffect(() => {
        document.addEventListener('click', empty_site_admin_target);
        return () => document.removeEventListener("click", empty_site_admin_target);
    })
    const site_location_target = useRef(null);
    const empty_site_location_target = (event) => {
        if (!site_location_target.current.contains(event.target)) {
            setIsOpen1(false);
        }
    }

    const [site_id, setSite_id] = useState("")
    const [roles_value, setrolesName] = useState([]);
    const [selected_value, setSelected_value] = useState("Site User");
    const set_value = (value) => {
        setSelected_value(value);
    }

    const inputFields1 = [
        { label: "User ID", name: "userid", value: inputValues.userid, icon: ic_home_work, disabled: true },
        { label: "Aadhar Number", name: "aadharNo", value: inputValues.aadharNo, icon: pen_3 },
        { label: "First Name", name: "fName", value: inputValues.fName, icon: pen_3 },
        { label: "Last Name", name: "lName", value: inputValues.lName, icon: pen_3 },
        { label: "Email", name: "email", value: inputValues.email, icon: pen_3, disabled: true },
        { label: "Mobile Number", name: "mobileNo", value: inputValues.mobileNo, icon: pen_3 },
        { label: "Bussiness Type", name: "bussinessType", value: inputValues.bussinessType, icon: person },
        { label: "Organization Name", name: "OrganizationName", value: inputValues.OrganizationName, icon: person },
        { label: "GST Number", name: "gstNumber", value: inputValues.gstNumber, icon: pen_3 },
        { label: "PAN Number", name: "panNumber", value: inputValues.panNumber, icon: ic_wysiwyg },
        // Add more input field objects as needed
        // { label: "Position", name: "Position", value: inputValues.Position, icon: pen_3 },
        // row 3
        // 2. UPI Payment Details:
        { label: "UPI ID", name: "upiPaymentNo", value: inputValues.upiPaymentNo, icon: pen_3 },
        { label: "Bank Name", name: "accName", value: inputValues.accName, icon: pen_3 },
        { label: "Bank Account Number", name: "accNo", value: inputValues.accNo, icon: pen_3 },
        { label: "Pass Book image", name: "passbookImg", value: inputValues.passbookImg, icon: pen_3, inputType: "file" },
        // 3. Address Details:
        { label: "Permanent Address", name: "pAddress", value: inputValues.pAddress, icon: pen_3 },
        { label: "Street Address", name: "streetAddress", value: inputValues.streetAddress, icon: pen_3 },
        { label: "City", name: "City", value: inputValues.City, icon: pen_3 },
        { label: "State", name: "State", value: inputValues.State, icon: pen_3 },
        { label: "Postal Code", name: "pCode", value: inputValues.pCode, icon: pen_3 },

        { label: "Communication Address", name: "CommunicationAddress", value: inputValues.CommunicationAddress, icon: pen_3 },
        { label: "Street Address", name: "StreetAddress2", value: inputValues.StreetAddress2, icon: pen_3 },
        { label: "City", name: "City2", value: inputValues.City2, icon: pen_3 },
        { label: "State", name: "State2", value: inputValues.State2, icon: pen_3 },
        { label: "Postal Code", name: "PostalCode2", value: inputValues.PostalCode2, icon: pen_3 },
    ];

    const inputFields = [
        { label: "User ID", name: "userid", value: inputValues.userid, icon: ic_home_work, disabled: true },
        { label: "Aadhar Number", name: "aadharNo", value: inputValues.aadharNo, icon: pen_3 },
        { label: "First Name", name: "fName", value: inputValues.fName, icon: pen_3 },
        { label: "Last Name", name: "lName", value: inputValues.lName, icon: pen_3 },
        { label: "Email", name: "email", value: inputValues.email, icon: pen_3, disabled: true },
        { label: "Mobile Number", name: "mobileNo", value: inputValues.mobileNo, icon: pen_3 },
        { label: "Bussiness Type", name: "bussinessType", value: inputValues.bussinessType, icon: person, isStaff: (Positionid_val === 4 || Positionid_val === 5) },
        { label: "Organization Name", name: "OrganizationName", value: inputValues.OrganizationName, isStaff: (Positionid_val === 4 || Positionid_val === 5) },
        { label: "GST Number", name: "gstNumber", value: inputValues.gstNumber, icon: pen_3, isStaff: (Positionid_val === 4 || Positionid_val === 5) },
        { label: "PAN Number", name: "panNumber", value: inputValues.panNumber, icon: ic_wysiwyg, isStaff: (Positionid_val === 4 || Positionid_val === 5) },
        // Add more input field objects as needed
        // { label: "Position", name: "Position", value: inputValues.Position, icon: pen_3 },
        // row 3
        // 2. UPI Payment Details:
        { label: "UPI ID", name: "upiPaymentNo", value: inputValues.upiPaymentNo, icon: pen_3, isStaff: (Positionid_val === 4 || Positionid_val === 5) },
        { label: "Bank Name", name: "accName", value: inputValues.accName, icon: pen_3, isStaff: (Positionid_val === 4 || Positionid_val === 5) },
        { label: "Bank Account Number", name: "accNo", value: inputValues.accNo, icon: pen_3, isStaff: (Positionid_val === 4 || Positionid_val === 5) },
        // { label: "Pass Book image", name: "passbookImg", value: inputValues.passbookImg, icon: pen_3, inputType: "file", isStaff: (Positionid_val === 4 || Positionid_val === 5) },
        // 3. Address Details:
        { label: "Permanent Address", name: "pAddress", value: inputValues.pAddress, icon: pen_3, isStaff: (Positionid_val === 4 || Positionid_val === 5) },
        { label: "Street Address", name: "streetAddress", value: inputValues.streetAddress, icon: pen_3, isStaff: (Positionid_val === 4 || Positionid_val === 5) },
        { label: "City", name: "City", value: inputValues.City, icon: pen_3, isStaff: (Positionid_val === 4 || Positionid_val === 5) },
        { label: "State", name: "State", value: inputValues.State, icon: pen_3, isStaff: (Positionid_val === 4 || Positionid_val === 5) },
        { label: "Postal Code", name: "pCode", value: inputValues.pCode, icon: pen_3, isStaff: (Positionid_val === 4 || Positionid_val === 5) },

        // { label: "Communication Address", name: "CommunicationAddress", value: inputValues.CommunicationAddress, icon: pen_3, isStaff: (Positionid_val === 4 || Positionid_val === 5) },
        { label: "Street Address", name: "StreetAddress2", value: inputValues.StreetAddress2, icon: pen_3, isStaff: (Positionid_val === 4 || Positionid_val === 5) },
        { label: "City", name: "City2", value: inputValues.City2, icon: pen_3, isStaff: (Positionid_val === 4 || Positionid_val === 5) },
        { label: "State", name: "State2", value: inputValues.State2, icon: pen_3, isStaff: (Positionid_val === 4 || Positionid_val === 5) },
        { label: "Postal Code", name: "PostalCode2", value: inputValues.PostalCode2, icon: pen_3, isStaff: (Positionid_val === 4 || Positionid_val === 5) },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues({
            ...inputValues,
            [name]: value,
        });
    };



    // Access control
    const [accessValues, setAccessValues] = useState({
        Staff: 'No access', // Default values
        Distributor: 'No access',
        D_Staff: 'No access',
        Customer: 'No access',
        Products: 'No access',
        'Invoice Generator': 'No access',
        'Invoice PaySlip': 'No access'
    });

    const handleRadioChange = (row, value) => {
        setAccessValues((prevValues) => ({
            ...prevValues,
            [row]: value,
        }));
    };

    const [submitted, setSubmitted] = useState(false);
    const [submittedSucess, setSubmittedSucess] = useState(false);
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
    let updatedAccessHead = [...accessHead];
    if (userInfo.position === 'Manufacturer') {
        // const labelsToUpdate = ['Staff', 'D_Staff', 'Customer'];
        let labelsToUpdate
        if (Positionid_val === 4) {
            labelsToUpdate = ['Staff', 'D_Staff', 'Customer'];
        }
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
        const labelsToUpdate = ['Staff', 'Distributor', 'D_Staff', 'Products', 'Invoice Generator'];
        labelsToUpdate.forEach((label) => {
            const indexToUpdate = updatedAccessHead.findIndex((item) => item.label === label);
            if (indexToUpdate !== -1) {
                updatedAccessHead = [...updatedAccessHead];
                updatedAccessHead[indexToUpdate] = { ...updatedAccessHead[indexToUpdate], disableHead: true };
            }
        });
    }
    if (userInfo.position === 'staff') {
        const labelsToUpdate = ['Staff', 'D_Staff', 'Customer'];
        labelsToUpdate.forEach((label) => {
            const indexToUpdate = updatedAccessHead.findIndex((item) => item.label === label);
            if (indexToUpdate !== -1) {
                updatedAccessHead = [...updatedAccessHead];
                updatedAccessHead[indexToUpdate] = { ...updatedAccessHead[indexToUpdate], disableHead: true };
            }
        });

    }
    if (userInfo.position === 'd_staff') {
        const labelsToUpdate = ['Staff', 'Distributor', 'D_Staff', 'Customer'];
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
                Customer: 'No access',
                D_Staff: 'No access'
            }));
        }
        else if (userInfo.position === 'd_staff') {
            setAccessValues((prevValues) => ({
                ...prevValues,
                Staff: 'No access',
                Distributor: 'No access',
                Customer: 'No access',
                Products: 'No access',
                'Invoice Generator': 'No access',
            }));
        }
        else if (userInfo.position === 'distributor') {
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
        else if (userInfo.position === 'Manufacturer') {
            setAccessValues((prevValues) => ({
                ...prevValues,
                Staff: 'No access',
                Customer: 'No access',
                D_Staff: 'No access'
            }));
        }
    }, []);
    // if (userInfo.position === 'Manufacturer') {
    //     updatedAccessHead = [...accessHead];
    // }
    // if (userInfo.position === 'staff') {
    //     const labelsToUpdate = ['Staff', 'Customer'];
    //     labelsToUpdate.forEach((label) => {
    //         const indexToUpdate = updatedAccessHead.findIndex((item) => item.label === label);
    //         if (indexToUpdate !== -1) {
    //             updatedAccessHead = [...updatedAccessHead];
    //             updatedAccessHead[indexToUpdate] = { ...updatedAccessHead[indexToUpdate], disableHead: true };
    //         }
    //     });

    // }
    // if (userInfo.position === 'distributor') {
    //     const labelsToUpdate = ['Staff', 'Distributor', 'Customer', 'Products', 'Invoice Generator'];
    //     labelsToUpdate.forEach((label) => {
    //         const indexToUpdate = updatedAccessHead.findIndex((item) => item.label === label);
    //         if (indexToUpdate !== -1) {
    //             updatedAccessHead = [...updatedAccessHead];
    //             updatedAccessHead[indexToUpdate] = { ...updatedAccessHead[indexToUpdate], disableHead: true };
    //         }
    //     });
    // }

    const accessOptions = [
        { label: 'No access', disabled: true },
        { label: 'View', disabled: true },
        { label: 'Edit', disabled: true },
        { label: 'All', disabled: true }
    ];
    // const updatedAccessOptions = accessOptions.map((option, index) => ({
    //     ...option,
    //     disabled: index < limit ? false : true
    // }));

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


    if (userid === null) {
        // Render loading or placeholder while decryption is in progress
        return <div>Loading...</div>;
    }
    return (
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
            <Snackbar open={submittedSucess} autoHideDuration={5000} onClose={handleSnackbarClose} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}>
                <MuiAlert onClose={handleSnackbarClose} severity="warning" sx={{ width: '100%' }}>
                    {resAlert}
                </MuiAlert>
            </Snackbar>
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
            {/* Access controll start */}
            <div class="modal fade boot-modals accessmodal" id="accessControll" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{overflow:'hidden'}}>
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Access Controll</h5>
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
                                                // <FormControlLabel key={radioIndex} value={`row${row}-radio${radio}`} control={<Radio />} label={`${radio}`} />
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
                            {/* <button type="button" class="btn btn-primary">Save</button> */}
                            <Button variant="outlined" type="button" data-bs-dismiss="modal" style={SaveBtn}>ACCESS</Button>
                        </div>
                    </div>
                </div>
            </div>
            {/* access controll end */}
            <div className="row_with_count_status">
                <span className='module_tittle'>User Details</span>
            </div>
            <div className="add_device_container1">
                <div className="new_device_content scroll_div">
                    <div className="row_one display-flex">
                        <div className="adding_new_device uppercase bold">Edit 
                            {(Positionid_val === 2) && " Distributor "}
                            {(Positionid_val === 3) && " Customer "}
                            {(Positionid_val === 4) && " Staff "}
                            {(Positionid_val === 5) && " D_Staff "}
                            Details
                        </div>
                    </div>
                    <div className="row_two display-flex padding-loc">
                        <div className="device_info uppercase light-grey mb-loc-5">
                            User info
                        </div>
                        <div className="input-boxes">
                            <div className="dsa_row_3 display-flex">
                                {inputFields.slice(0, 4).map((field, index) => (
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
                                                    InputLabelProps={{
                                                        className: 'required-label',
                                                        required: true
                                                    }}
                                                    type="text"
                                                    className="form-control-loc"
                                                    value={field.value}
                                                    // onChange={(e) => handleInputChange(e, field.name)}
                                                    // onChange={handleInputChange}
                                                    // onChange={(e) => handleInputChange(index, e.target.value)}
                                                    onChange={handleInputChange}
                                                    name={field.name}
                                                    id={`input${index + 1}`}
                                                    select={field.name === 'bussinessType' && true}
                                                    disabled={field.disabled}
                                                    labelClassName="required"
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
                                                    // onChange={handleInputChange}
                                                    // onChange={(e) => handleInputChange(index, e.target.value)}
                                                    onChange={handleInputChange}
                                                    name={field.name}
                                                    id={`input${index + 1}`}
                                                    select={field.name === 'bussinessType' && true}
                                                    disabled={field.disabled}
                                                    labelClassName="required"
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
                                                    // onChange={handleInputChange}
                                                    // onChange={(e) => handleInputChange(index, e.target.value)}
                                                    onChange={handleInputChange}
                                                    name={field.name}
                                                    id={`input${index + 1}`}
                                                    select={field.name === 'bussinessType' && true}
                                                    disabled={field.disabled}
                                                    labelClassName="required"
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
                                                {field.error ? 'Error' : ''}

                                                {/* Add error handling if needed */}
                                            </Box>
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
                                                // onChange={handleInputChange}
                                                // onChange={(e) => handleInputChange(index, e.target.value)}
                                                onChange={handleInputChange}
                                                name={field.name}
                                                id={`input${index + 1}`}
                                                select={field.name === 'bussinessType' && true}
                                                disabled={field.disabled}
                                                labelClassName="required"
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

                        {!(Positionid_val === 4 || Positionid_val === 5) && (
                            <div className="device_info uppercase light-grey mb-loc-5">
                                Address Details
                            </div>
                        )}

                        <div className="dsa_row_3 display-flex">
                            {inputFields.slice(18, 23).map((field, index) => (
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
                                                // onChange={handleInputChange}
                                                // onChange={(e) => handleInputChange(index, e.target.value)}
                                                onChange={handleInputChange}
                                                name={field.name}
                                                id={`input${index + 1}`}
                                                select={field.name === 'bussinessType' && true}
                                                disabled={field.disabled}
                                                labelClassName="required"
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
                                            {field.error ? 'Error' : ''}

                                            {/* Add error handling if needed */}
                                        </Box>
                                    </div>
                                )
                            ))}
                        </div>

                        <div className="dsa_row_3 display-flex">
                            {inputFields.slice(23, 24).map((field, index) => (
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
                                                    <span>{`${field.label} *`}</span>
                                                }
                                                type="text"
                                                className="form-control-loc"
                                                value={field.value}
                                                // onChange={(e) => handleInputChange(e, field.name)}
                                                // onChange={handleInputChange}
                                                // onChange={(e) => handleInputChange(index, e.target.value)}
                                                onChange={handleInputChange}
                                                name={field.name}
                                                id={`input${index + 1}`}
                                                select={field.name === 'bussinessType' && true}
                                                disabled={field.disabled}
                                                labelClassName="required"
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

                        <Button variant="outlined " style={{
                            color: 'red', borderColor: 'red', width: '71px',
                            height: '71px',
                            borderRadius: '50px'
                        }} data-bs-toggle="modal" data-bs-target="#accessControll">
                            {/* <LockClosedIcon /> */}
                            {/* <ErrorOutlineIcon /> */}
                            <LockPersonOutlinedIcon/>
                        </Button>

                    </div>

                </div>
                <div className="operating_buttons display-flex padding-loc">
                    <div className="save_cancel_btn display-flex site_button gap-4">
                        <CancelBtnComp CancelBtnFun={handleCancel} />
                        <SaveBtnComp SaveBtnFun={(e) => handle_save(e)} />
                        {/* <button className="btn-loc active-loc btn btn-outline-success" onClick={() => handle_save()}>Save</button>
                            <button className="btn-loc inactive-loc btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">cancel</button> */}
                    </div>
                </div>
            </div>
        </div >

    );
};
export default Edit_Distributer_Detials;