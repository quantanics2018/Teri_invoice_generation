import React from 'react';
import '../assets/style/App.css';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config'
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
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Snackbar } from '@mui/material';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import { SaveBtn } from '../assets/style/cssInlineConfig';
import MuiAlert from '@mui/material/Alert';


const Edit_Distributer_Detials = () => {
    const { userid } = useParams();
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
            console.log(userid);
            try {
                const response = await fetch(`${API_URL}get/user/${userid}`);
                const data = await response.json();
                console.log(data);
                all_data_fun(data)
            } catch (error) {
                console.error(error);
            }
        };
        device_user_data();
    }, [userid]);

    const all_data_fun = (data) => {
        if (data) {
            console.log(data);
            const item = data.data;
            const AccessItem = data.getuserAccessControl;
            setInputValues((prevValues) => ({
                ...prevValues,
                userid: item.userid,
                OrganizationName: "Quantanics",
                bussinessType: "",
                gstNumber: "",
                panNumber: item.pan,
                aadharNo: item.aadhar,
                fName: item.name,
                lName: "",
                email: item.email,
                mobileNo: item.phno,
                upiPaymentNo: "",
                accName: "",
                accNo: "",
                passbookImg: "",
                pAddress: "",
                streetAddress: item.pstreetname,
                City: item.pdistrictid,
                State: "",
                pCode: item.ppostalcode,
                CommunicationAddress: "",
                StreetAddress2: item.cstreetname,
                City2: item.cdistrictid,
                State2: item.cstateid,
                PostalCode2: item.cpostalcode
            }));
            // For staff
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
        pAddress: "",
        streetAddress: "",
        City: "",
        State: "",
        pCode: "",
        CommunicationAddress: "",
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
        const isValidOrgName = inputValues.OrganizationName.trim() !== '';
        const isValidbussinessType = inputValues.bussinessType.trim() !== '';
        // alert(isValidOrgName);
        const isValidgstNumber = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(inputValues.gstNumber)
        const isValidpanNumber = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(inputValues.panNumber)
        const isValidaadharNo = /^\d{12}$/.test(inputValues.aadharNo)
        const isValidfName = /^[A-Za-z\s'-]+$/.test(inputValues.fName)
        const isValidemail = /^[A-Za-z0-9._%+-]+@gmail\.com$/.test(inputValues.email)
        const isValidMobileNo = /^\d{10}$/.test(inputValues.mobileNo)
        const isValidupiPaymentNo = /^\d{10}$/.test(inputValues.upiPaymentNo)
        const isValidaccName = /^[A-Za-z\s'-]+$/.test(inputValues.accName)
        const isValidaccNo = /^\d*$/.test(inputValues.accNo)
        // const isValidemail = /^[A-Za-z0-9._%+-]+@gmail\.com$/.test(inputValues.email)
        if (isValidOrgName & isValidbussinessType & isValidgstNumber & isValidpanNumber & isValidaadharNo
            & isValidfName & isValidemail & isValidMobileNo & isValidupiPaymentNo & isValidaccName & isValidaccNo) {
            // console.log("success", inputValues);
            try {
                const response = await axios.put(`${API_URL}update/user`, { inputValues, AccessOptions: accessValues });
                // alert(response.data.status);
                console.log(response.data);
                if (response.data.status) {
                    setresAlert(response.data.message)
                    setSubmittedSucess(true);
                    setTimeout(() => {
                        navigate(-1);
                    }, 2000);
                }
            } catch (error) {
                setresAlert("Error updating data! Contact Developer")
                setSubmitted(true);
                console.error('Error updating data:', error);
            }
        }
        else {
            if (!isValidOrgName) {
                setresAlert("Organization Name Can't be Empty")
                setSubmitted(true);
                // alert("Organization Name Can't be Empty");
            }
            // else if (!isValidpostid) {
            //     alert("Enter User Type");
            // }
            else if (!isValidbussinessType) {
                setresAlert("Select Proper Bussiness type")
                setSubmitted(true);
                // alert("Select proper bussiness type");
            }
            else if (!isValidgstNumber) {
                setresAlert("Enter valid GST Number");
                setSubmitted(true);
                // alert("enter valid GST Number");
            }
            else if (!isValidpanNumber) {
                setresAlert("Enter Valid PAN Number");
                setSubmitted(true);
                // alert("enter valid PAN Number");
            }
            else if (!isValidaadharNo) {
                setresAlert("Enter Valid Aadhar Number");
                setSubmitted(true);
                // alert("enter valid Aadhar Number");
            }
            else if (!isValidfName) {
                setresAlert("Enter Valid First Name");
                setSubmitted(true);
                // alert("enter valid First Name");
            }
            else if (!isValidemail) {
                setresAlert("Enter Valid Email");
                setSubmitted(true);
                // alert("enter valid Email");
            }
            else if (!isValidMobileNo) {
                setresAlert("Enter Valid Mobile Number");
                setSubmitted(true);
                // alert("enter valid UPI payment Number");
            }
            else if (!isValidupiPaymentNo) {
                setresAlert("Enter Valid UPI Payment Number");
                setSubmitted(true);
                // alert("enter valid UPI payment Number");
            }
            else if (!isValidaccName) {
                setresAlert("Enter Valid Account Name");
                setSubmitted(true);
                // alert("enter valid Account Name");
            }
            else if (!isValidaccNo) {
                setresAlert("Enter Valid Account Number");
                setSubmitted(true);
                // alert("enter valid Account Number");
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
    const inputFields = [
        { label: "User ID", name: "userid", value: inputValues.userid, icon: ic_home_work, readOnly: true },
        { label: "Organization Name", name: "OrganizationName", value: inputValues.OrganizationName, icon: person },
        { label: "Bussiness Type", name: "bussinessType", value: inputValues.bussinessType, icon: person },
        { label: "GST Number", name: "gstNumber", value: inputValues.gstNumber, icon: pen_3 },
        { label: "PAN Number", name: "panNumber", value: inputValues.panNumber, icon: ic_wysiwyg },
        // Add more input field objects as needed
        { label: "Aadhar Number", name: "aadharNo", value: inputValues.aadharNo, icon: pen_3 },
        { label: "First Name", name: "fName", value: inputValues.fName, icon: pen_3 },
        { label: "Last Name", name: "lName", value: inputValues.lName, icon: pen_3 },
        // { label: "Position", name: "Position", value: inputValues, icon: pen_3 },
        // row 3
        { label: "Email", name: "email", value: inputValues.email, icon: pen_3, readOnly: true },
        { label: "Mobile Number", name: "mobileNo", value: inputValues.mobileNo, icon: pen_3 },
        // 2. UPI Payment Details:
        { label: "UPI Payment Mobile No", name: "upiPaymentNo", value: inputValues.upiPaymentNo, icon: pen_3 },
        { label: "UPI - Bank Account Name", name: "accName", value: inputValues.accName, icon: pen_3 },
        { label: "UPI - Bank Account Number", name: "accNo", value: inputValues.accNo, icon: pen_3 },
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
    const handleInputChange = (index, value) => {
        // Update the inputValues state based on the index
        setInputValues((prevValues) => {
            const updatedValues = { ...prevValues, [inputFields[index].name]: value };
            return updatedValues;
        });
        // Add your custom logic here based on the input field
    };
    const handleInputChange2 = (index, value) => {
        // Update the inputValues state based on the index
        index = index + 4
        setInputValues((prevValues) => {
            const updatedValues = { ...prevValues, [inputFields[index].name]: value };
            return updatedValues;
        });
    };
    const handleInputChange3 = (index, value) => {
        // Update the inputValues state based on the index
        index = index + 8
        setInputValues((prevValues) => {
            const updatedValues = { ...prevValues, [inputFields[index].name]: value };
            return updatedValues;
        });
    };
    const handleInputChange4 = (index, value) => {
        // Update the inputValues state based on the index
        index = index + 12
        setInputValues((prevValues) => {
            const updatedValues = { ...prevValues, [inputFields[index].name]: value };
            return updatedValues;
        });
    };
    const handleInputChange5 = (index, value) => {
        // Update the inputValues state based on the index
        index = index + 16
        setInputValues((prevValues) => {
            const updatedValues = { ...prevValues, [inputFields[index].name]: value };
            return updatedValues;
        });
    };



    // Access control
    const [accessValues, setAccessValues] = useState({
        Staff: 'No access', // Default values
        Distributor: 'No access',
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
            <div class="modal fade boot-modals accessmodal" id="accessControll" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Access Control</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <FormControl component="fieldset">
                                {/* <FormLabel component="legend">Rows</FormLabel> */}
                                {['Staff', 'Distributor', 'Customer', 'Products', 'Invoice Generator', 'Invoice PaySlip'].map((row, rowIndex) => (
                                    <div key={rowIndex} className='accessControlHeadwithVal'>
                                        <FormLabel component="legend" className='acc_head'>{`${row}`}</FormLabel>
                                        <RadioGroup row
                                            className='acc_val'
                                            value={accessValues[row]}
                                            onChange={(e) => handleRadioChange(row, e.target.value)}
                                        >
                                            {['No access', 'View', 'Edit', 'All'].map((radio, radioIndex) => (
                                                // <FormControlLabel key={radioIndex} value={`row${row}-radio${radio}`} control={<Radio />} label={`${radio}`} />
                                                <FormControlLabel key={radioIndex} value={radio} control={<Radio />} label={`${radio}`} />
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
                            <Button variant="outlined" type="button" data-bs-dismiss="modal" style={SaveBtn}>Save</Button>
                        </div>
                    </div>
                </div>
            </div>
            {/* access controll end */}
            <div className="row_with_count_status">
                <span className='module_tittle'>User Detials</span>
            </div>
            <div className="add_device_container1">
                <div className="new_device_content scroll_div">
                    <div className="row_one display-flex">
                        <div className="adding_new_device uppercase bold">Edit User Detials </div>
                    </div>
                    <div className="row_two display-flex padding-loc">
                        <div className="device_info uppercase light-grey mb-loc-5">
                            User info
                        </div>
                        <div className="input-boxes">
                            <div className="cmpny_and_site_name display-flex">
                                {inputFields.slice(0, 4).map((field, index) => (
                                    <div className="inputbox display-flex input" key={index}>
                                        <div className="dsa_1st_input">
                                            {/* <label htmlFor={`input${index + 1}`}>{field.label}</label> */}
                                            <div className="inputs-group display-flex">
                                                <span className="input-group-loc">
                                                    <Icon icon={field.icon} size={20} style={{ color: "lightgray" }} />
                                                </span>
                                                <TextField
                                                    label={field.label}
                                                    type="text"
                                                    className="form-control-loc"
                                                    id={`input${index + 1}`}
                                                    value={field.value}
                                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                                    inputProps={{ readOnly: field.readOnly || false }}
                                                />
                                                <div className="error-message">
                                                    {/* Add error display logic here */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="cmpny_and_site_name display-flex">
                                {inputFields.slice(4, 8).map((field, index) => (
                                    <div className="inputbox display-flex input" key={index}>
                                        <div className="dsa_1st_input">
                                            <div className="inputs-group display-flex">
                                                <span className="input-group-loc">
                                                    <Icon icon={field.icon} size={20} style={{ color: "lightgray" }} />
                                                </span>
                                                <TextField
                                                    label={field.label}
                                                    type="text"
                                                    className="form-control-loc"
                                                    id={`input${index + 1}`}
                                                    value={field.value}
                                                    onChange={(e) => handleInputChange2(index, e.target.value)}
                                                    inputProps={{ readOnly: field.readOnly || false }}
                                                // Add value and onChange as needed
                                                />
                                                <div className="error-message">
                                                    {/* Add error display logic here */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="cmpny_and_site_name display-flex">
                                {inputFields.slice(8, 12).map((field, index) => (
                                    <div className="inputbox display-flex input" key={index}>
                                        <div className="dsa_1st_input">
                                            <div className="inputs-group display-flex">
                                                <span className="input-group-loc">
                                                    <Icon icon={field.icon} size={20} style={{ color: "lightgray" }} />
                                                </span>
                                                <TextField
                                                    label={field.label}
                                                    type="text"
                                                    className="form-control-loc"
                                                    id={`input${index + 1}`}
                                                    value={field.value}
                                                    onChange={(e) => handleInputChange3(index, e.target.value)}
                                                    inputProps={{ readOnly: field.readOnly || false }}
                                                // Add value and onChange as needed
                                                />
                                                <div className="error-message">
                                                    {/* Add error display logic here */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="cmpny_and_site_name display-flex">
                                {inputFields.slice(12, 16).map((field, index) => (
                                    <div className="inputbox display-flex input" key={index}>
                                        <div className="dsa_1st_input">
                                            <div className="inputs-group display-flex">
                                                <span className="input-group-loc">
                                                    <Icon icon={field.icon} size={20} style={{ color: "lightgray" }} />
                                                </span>
                                                <TextField
                                                    label={field.label}
                                                    type="text"
                                                    className="form-control-loc"
                                                    id={`input${index + 1}`}
                                                    value={field.value}
                                                    onChange={(e) => handleInputChange4(index, e.target.value)}
                                                    inputProps={{ readOnly: field.readOnly || false }}
                                                // Add value and onChange as needed
                                                />
                                                <div className="error-message">
                                                    {/* Add error display logic here */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="cmpny_and_site_name display-flex">
                                {inputFields.slice(16, 20).map((field, index) => (
                                    <div className="inputbox display-flex input" key={index}>
                                        <div className="dsa_1st_input">
                                            <div className="inputs-group display-flex">
                                                <span className="input-group-loc">
                                                    <Icon icon={field.icon} size={20} style={{ color: "lightgray" }} />
                                                </span>
                                                <TextField
                                                    label={field.label}
                                                    type="text"
                                                    className="form-control-loc"
                                                    id={`input${index + 1}`}
                                                    value={field.value}
                                                    onChange={(e) => handleInputChange5(index, e.target.value)}
                                                    inputProps={{ readOnly: field.readOnly || false }}
                                                // Add value and onChange as needed
                                                />
                                                <div className="error-message">
                                                    {/* Add error display logic here */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <Button variant="outlined " style={{ color: 'red', borderColor: 'red' }} data-bs-toggle="modal" data-bs-target="#accessControll">
                                    <LockClosedIcon />
                                </Button>
                            </div>
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
            </div>
        </div >

    );
};
export default Edit_Distributer_Detials;