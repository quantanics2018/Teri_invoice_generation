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
            const item = data.data;
            console.log(item);
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
    // validation
    const handle_save = async () => {
        // const isValidfirst_name = /^[a-zA-Z]+$/.test(first_name)
        // const isValidlast_name = /^[a-zA-Z]+$/.test(last_name)
        // const isValidsiteid = /^[a-zA-Z0-9]+$/.test(siteid)
        // const isValidroleid = /^[a-zA-Z0-9]+$/.test(roleid)
        // const isValidcontact = /^[0-9]{10}$/.test(contact)
        // const isValidDesignation = /^[a-zA-Z]+$/.test(Designation)
        const isValidemail = /^[A-Za-z0-9._%+-]+@gmail\.com$/.test(inputValues.email)
        if ((isValidemail)) {
            console.log("success", inputValues);
            try {
                const response = await axios.put(`${API_URL}update/user`, { inputValues });
                alert(response.data.message);
            } catch (error) {
                console.error('Error updating data:', error);
            }
        }
        else {
            if (isValidemail === false) {
                alert('Please enter a valid Email ID')
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

    return (
        <div className='Add_device1 '>
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
                            </div>
                        </div>
                    </div>

                    <div className="operating_buttons display-flex padding-loc">
                        <div className="save_cancel_btn display-flex site_button gap-4">
                            <CancelBtnComp CancelBtnFun={handleCancel} />
                            <SaveBtnComp SaveBtnFun={() => handle_save()} />
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