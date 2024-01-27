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
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Snackbar } from '@mui/material';
import { CancelBtn, SaveBtn, UserActionBtn } from '../assets/style/cssInlineConfig';
import { AddUserBtn, SaveBtnComp } from '../components/AddUserBtn';
import { CancelBtnComp } from '../components/AddUserBtn'
import { FaTh, FaBars, FaUserAlt, FaRegChartBar, FaCommentAlt, FaShoppingBag } from "react-icons/fa";
import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import MuiAlert from '@mui/material/Alert';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

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
        CommunicationAddress: '',
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

            pAddress: '',
            streetAddress: '',
            City: '',
            State: '',

            pCode: '',
            CommunicationAddress: '',
            StreetAddress2: '',
            City2: '',
            State2: '',
            PostalCode2: '',
        });
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // alert(`hai ${value}`);
        // setfirst_name(value);
        setPostData({
            ...postData,
            [name]: value,
        });
    };

    const [resAlert, setresAlert] = useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValidOrgName = postData.OrganizationName.trim() !== '';
        const isValidbussinessType = postData.bussinessType.trim() !== '';
        // alert(isValidOrgName);
        const isValidgstNumber = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(postData.gstNumber)
        const isValidpanNumber = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(postData.panNumber)
        const isValidaadharNo = /^\d{12}$/.test(postData.aadharNo)
        const isValidfName = /^[A-Za-z\s'-]+$/.test(postData.fName)
        const isValidemail = /^[A-Za-z0-9._%+-]+@gmail\.com$/.test(postData.email)
        const isValidMobileNo = /^\d{10}$/.test(postData.mobileNo)
        const isValidupiPaymentNo = /^\d{10}$/.test(postData.upiPaymentNo)
        const isValidaccName = /^[A-Za-z\s'-]+$/.test(postData.accName)
        const isValidaccNo = /^\d*$/.test(postData.accNo)
        // const isValidpostid = postData.Positionid !== undefined && postData.Positionid !== null;

        // console.log(postData.Positionid==undefined);
        if (isValidOrgName & isValidbussinessType & isValidgstNumber & isValidpanNumber & isValidaadharNo
            & isValidfName & isValidemail & isValidMobileNo & isValidupiPaymentNo & isValidaccName & isValidaccNo
        ) {
            // console.log("Properly inserted", postData);
            // console.log("Properly inserted", accessValues);
            try {
                const response = await axios.post(`${API_URL}add/user`, { userDetials: postData, AccessControls: accessValues });
                // alert(response.data.message);
                setresAlert(response.data.message)
                setSubmitted(true);
                if (response.data.status) {
                    setTimeout(() => {
                        handleClear();
                        navigate(-1);
                    }, 3000);
                }
            } catch (error) {
                console.error('Error sending data:', error);
            }
        } else {
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

    };

    const inputFields = [
        { label: "User ID", name: "userid", value: postData.userid, icon: ic_home_work },
        { label: "Organization Name", name: "OrganizationName", value: postData.OrganizationName, icon: person },
        { label: "Bussiness Type", name: "bussinessType", value: postData.bussinessType, icon: person },
        { label: "GST Number", name: "gstNumber", value: postData.gstNumber, icon: pen_3 },
        { label: "PAN Number", name: "panNumber", value: postData.panNumber, icon: ic_wysiwyg },
        // Add more input field objects as needed
        { label: "Aadhar Number", name: "aadharNo", value: postData.aadharNo, icon: pen_3 },
        { label: "First Name", name: "fName", value: postData.fName, icon: pen_3 },
        { label: "Last Name", name: "lName", value: postData.lName, icon: pen_3 },
        // { label: "Position", name: "Position", value: postData.Position, icon: pen_3 },
        // row 3
        { label: "Email", name: "email", value: postData.email, icon: pen_3 },
        { label: "Mobile Number", name: "mobileNo", value: postData.mobileNo, icon: pen_3 },
        // 2. UPI Payment Details:
        { label: "UPI Payment Mobile No", name: "upiPaymentNo", value: postData.upiPaymentNo, icon: pen_3 },
        { label: "UPI - Bank Account Name", name: "accName", value: postData.accName, icon: pen_3 },
        { label: "UPI - Bank Account Number", name: "accNo", value: postData.accNo, icon: pen_3 },
        { label: "Pass Book image", name: "passbookImg", value: postData.passbookImg, icon: pen_3, inputType: "file" },
        // 3. Address Details:
        { label: "Permanent Address", name: "pAddress", value: postData.pAddress, icon: pen_3 },
        { label: "Street Address", name: "streetAddress", value: postData.streetAddress, icon: pen_3 },
        { label: "City", name: "City", value: postData.City, icon: pen_3 },
        { label: "State", name: "State", value: postData.State, icon: pen_3 },

        { label: "Postal Code", name: "pCode", value: postData.pCode, icon: pen_3 },
        { label: "Communication Address", name: "CommunicationAddress", value: postData.CommunicationAddress, icon: pen_3 },
        { label: "Street Address", name: "StreetAddress2", value: postData.StreetAddress2, icon: pen_3 },
        { label: "City", name: "City2", value: postData.City, icon: pen_3 },
        { label: "State", name: "State2", value: postData.State2, icon: pen_3 },
        { label: "Postal Code", name: "PostalCode2", value: postData.PostalCode2, icon: pen_3 },
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
                        <div className="adding_new_device uppercase bold">
                            Add
                            {(Positionid_val === 4) && " Staff "}
                            {(Positionid_val === 2) && " Distributor "}
                            {(Positionid_val === 3) && " Customer "}
                            Detials </div>
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
                                    <div key={index} className="inputbox display-flex input">
                                        <div className="dsa_1st_input">
                                            {/* <label htmlFor={`input${index + 1}`}>{field.label}<span className='required'>*</span></label> */}
                                            <div className="inputs-group display-flex">
                                                <span className="input-group-loc"><Icon icon={field.icon} size={20} style={{ color: "lightgray" }} /></span>
                                                <TextField
                                                    label={
                                                        <span>{`${field.label} *`}</span>
                                                    }
                                                    // helperText="Please enter your name"
                                                    type="text"
                                                    className="form-control-loc"
                                                    value={field.value}
                                                    onChange={handleInputChange}
                                                    name={field.name}
                                                    id={`input${index + 1}`}
                                                />
                                                {/* Add error handling if needed */}
                                            </div>
                                            {/* <TextField label="Full name" fullWidth variant="outlined" margin="dense" /> */}

                                        </div>
                                    </div>
                                ))}
                            </div>


                            <div className="dsa_row_3 display-flex">

                                {inputFields.slice(4, 8).map((field, index) => (
                                    <div key={index} className="inputbox display-flex input">
                                        <div className="dsa_1st_input">
                                            <div className="inputs-group display-flex">
                                                <span className="input-group-loc"><Icon icon={field.icon} size={20} style={{ color: "lightgray" }} /></span>
                                                <TextField
                                                    label={`${field.label} *`}
                                                    type="text"
                                                    className="form-control-loc"
                                                    value={field.value}
                                                    onChange={(e) => handleInputChange(e, field.name)}
                                                    name={field.name}
                                                    id={`input${index + 1}`}
                                                    labelClassName="required"
                                                />
                                                {field.error ? 'Error' : ''}`

                                                {/* Add error handling if needed */}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                            <div className="dsa_row_3 display-flex">
                                {inputFields.slice(8, 9).map((field, index) => (
                                    <div key={index} className="inputbox display-flex input">
                                        <div className="dsa_1st_input">
                                            <div className="inputs-group display-flex">
                                                <span className="input-group-loc"><Icon icon={field.icon} size={20} style={{ color: "lightgray" }} /></span>
                                                <TextField
                                                    label={`${field.label} *`}
                                                    className="form-control-loc"
                                                    value={field.value}
                                                    onChange={(e) => handleInputChange(e, field.name)}
                                                    name={field.name}
                                                    id={`input${index + 1}`}
                                                />
                                                {/* Add error handling if needed */}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="device_info uppercase light-grey mb-loc-5">
                            UPI Payment Details
                        </div>
                        <div className="dsa_row_3 display-flex">
                            {inputFields.slice(9, 13).map((field, index) => (
                                <div key={index} className="inputbox display-flex input">
                                    <div className="dsa_1st_input">
                                        <div className="inputs-group display-flex">
                                            <span className="input-group-loc"><Icon icon={field.icon} size={20} style={{ color: "lightgray" }} /></span>
                                            <TextField
                                                label={`${field.label} *`}
                                                type={field.inputType || "text"}
                                                className="form-control-loc"
                                                value={field.value}
                                                onChange={(e) => handleInputChange(e, field.name)}
                                                name={field.name}
                                                id={`input${index + 1}`}
                                            />
                                            {/* Add error handling if needed */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="device_info uppercase light-grey mb-loc-5">
                            Address Details
                        </div>
                        <div className="dsa_row_3 display-flex">
                            {inputFields.slice(13, 18).map((field, index) => (
                                <div key={index} className="inputbox display-flex input">
                                    <div className="dsa_1st_input">
                                        <div className="inputs-group display-flex">
                                            <span className="input-group-loc"><Icon icon={field.icon} size={20} style={{ color: "lightgray" }} /></span>
                                            <TextField
                                                label={`${field.label} *`}
                                                type="text"
                                                className="form-control-loc"
                                                value={field.value}
                                                onChange={(e) => handleInputChange(e, field.name)}
                                                name={field.name}
                                                id={`input${index + 1}`}
                                            />
                                            {/* Add error handling if needed */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <Button variant="outlined " style={{ color: 'red', borderColor: 'red' }} data-bs-toggle="modal" data-bs-target="#accessControll">
                                {/* <LockClosedIcon /> */}
                                <ErrorOutlineIcon />
                            </Button>
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
            </div>
        </div >

    );
};
export default Add_User_Detials;