import React, { useEffect } from 'react';
import '../assets/style/App.css';
//import icons from fontawesome and react icon kit
import { Icon } from 'react-icons-kit';
import { ic_label_important } from 'react-icons-kit/md/ic_label_important';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesDown, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
// import { Button, Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL, SECRET_KEY } from '../config';
// import { Button } from '@mui/material';
import { UserActionBtn, padding_top } from '../assets/style/cssInlineConfig';
import { AddUserBtn } from '../components/AddUserBtn';
import Example from '../components/Example';
import EditDistributerDetails from './Edit_Distributer_Detials';
import {
    Button,
    Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import CryptoJS from 'crypto-js';
import ActionButton from '../components/ActionButton';

const Staff_Detials = (props) => {
    const { Positionid_val, position } = props;
    console.log(Positionid_val);
    // console.log(props.position);
    //states
    const [rotatedIndex, setRotatedIndex] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState('1');
    const [selectedOption, setSelectedOption] = useState('All');
    const [submitted, setSubmitted] = useState(false);
    const handleSnackbarClose = () => {
        setSubmitted(false);
    };

    const [isOpen3, setIsOpen3] = useState(false);
    const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);
    const dropdownRef3 = useRef(null);
    const dropdown3 = () => {
        setIsOpen3(!isOpen3);
        setIsDropdownOpen3(!isDropdownOpen3);
    };


    // //Navigate to Add Device Page
    const navigate = useNavigate();
    const handleclick = () => {
        navigate(`Add_User_Details`);
    }
    const [alldata, setAlldate] = useState([]);

    const userInfo = JSON.parse(sessionStorage.getItem("UserInfo"));
    // console.log(userInfo);
    // const handleIconClick = () => {
    //     // userInfo.staff
    //     if (userInfo.staff > 2) {
    //         setRotatedIndex(!rotatedIndex);
    //     } else {
    //         alert("Option Disabled for Staff")
    //     }

    // };
    const handleIconClick = (index) => {
        // if (userInfo.staff > 2) {
        setRotatedIndex(!rotatedIndex);
        setRotatedIndex(rotatedIndex === index ? null : index);
        // } else {
        //     alert("Option Disabled")
        // }
    };

    const handleDivClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (event) => {
        setText(event.target.value);
    };

    //navigate to edit page
    const Staff_Detials_edit_page = async (data) => {
        const secretKey = `${SECRET_KEY}`;
        const encryptedText = CryptoJS.AES.encrypt(data, secretKey).toString();
        // console.log(encryptedText);
        const encodedText = encodeURIComponent(encryptedText);
        if (props.position === 2) {
            navigate(`Edit_Distributer_Details/${encodedText}`);
        }
        if (props.position === 3) {
            navigate(`Edit_Customer_Details/${encodedText}`);
        }
        if (props.position === 4) {
            navigate(`Edit_Staff_Details/${encodedText}`);
        }
        if (props.position === 5) {
            navigate(`Edit_D_Staff_Details/${encodedText}`);
        }

    }
    const [inactivateAlert, setInactivateAlert] = useState(false);

    const modalRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setInactivateAlert(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [setInactivateAlert]);

    const updateUserStatus = async (userid, currentstatus, index) => {
        const fetchAllUser = () => {
            const adminid = JSON.parse(sessionStorage.getItem("UserInfo")).userid;
            axios.post(`${API_URL}get/user`, { adminid: adminid, position: props.position })
                .then(response => {
                    // console.log(response.data.data);
                    setAlldate(response.data.data)
                })
                .catch(error => {
                    console.error("Error fetching user data:", error);
                });
        }
        try {
            const statusApiAction = async () => {
                const response = await axios.put(`${API_URL}update/userremove`, {
                    userid: userid, status: currentstatus
                });
                console.log(response.data.resStatus);
                if (response.data.qos === "success") {
                    fetchAllUser();
                    setAlldate((prevData) => {
                        const newData = [...prevData];
                        newData[index].status = response.data.resStatus;
                        return newData;
                    });
                    console.log("success : ", alldata)
                }
            }
            // console.log(userInfo.distributer);
            if (userInfo.distributer > 2) {
                // alert("Can edit")
                if (currentstatus == 1) {
                    currentstatus = 0;
                    const confirmed = window.confirm("Are You Sure! You Want to Inactivate the User?");
                    // setInactivateAlert(true)
                    if (confirmed) {
                        statusApiAction();
                    }
                }
                else {
                    currentstatus = 1
                    statusApiAction();
                    setSubmitted(true);
                }
            }
            else {
                alert("You don't have permission to do this action.")
            }

        } catch (error) {
            console.error('Error updating user status:', error);
        }
    }
    useEffect(() => {
        const fetchAllUser = () => {
            const adminid = JSON.parse(sessionStorage.getItem("UserInfo")).userid;
            axios.post(`${API_URL}get/user`, { adminid: adminid, position: props.position })
                .then(response => {
                    // console.log(response.data.data);
                    setAlldate(response.data.data)
                })
                .catch(error => {
                    console.error("Error fetching user data:", error);
                });
        }
        fetchAllUser();
    }, []);

    // alert(props.position===4)

    return (
        <div className='bar'>
            {/* Start Modal */}
            <div class="modal fade modal-lg" id="EditDetials" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            {/* <EditDistributerDetails /> */}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* End Modal */}
            <div className='status-bar'>
                <div className="device_mangement_main_content">
                    <div className="row_with_count_status">
                        <span className='module_tittle'>
                            {props.position === 5 &&
                                "D_Staff Details"
                            }
                            {props.position === 4 &&
                                "Staff Details"
                            }
                            {props.position === 3 &&
                                "Customer Details"
                            }
                            {props.position === 2 &&
                                "Distibutor Details"
                            }
                        </span>
                        <Button variant="contained"
                            onClick={handleclick}
                            // style={{...UserActionBtn,marginLeft: '100px'}}
                            className='user_action_buttons'
                            style={UserActionBtn}
                            
                        >
                            {(props.position === 2) && "Add Distributor"}
                            {(props.position === 3) && "Add Customer"}
                            {(props.position === 4) && "Add Staff"}
                            {(props.position === 5) && "Add D_Staff"}
                        </Button>
                    </div>

                    {/* <div className='filters display-flex' >
                        <div className="pagination_with_filters">
                            <div class="pagination display-flex" onClick={handleDivClick}>
                                <div className="focus-page">
                                    <input
                                        // ref={inputRef}
                                        type="number"
                                        value={text}
                                        onChange={handleInputChange}
                                        // onBlur={handleInputBlur}
                                        autoFocus
                                        className='editable_input_box'
                                    />

                                </div>
                                <div className="upcomming-pages">
                                    of 20 pages
                                </div>
                            </div>

                            <div className='move_head'>
                                <div className='filters1 display-flex'>
                                    <div class="dropdown-filter"
                                        ref={dropdownRef3}
                                    >
                                        <div class="device_filters" onClick={dropdown3}>
                                            <div className="device_name">
                                                Bussiness Type
                                            </div>
                                            <div className="dropdown_icon">
                                                <FontAwesomeIcon
                                                    icon={isDropdownOpen3 ? faChevronDown : faChevronUp}
                                                    className="dropdown-icon"
                                                />
                                            </div>
                                        </div>
                                        {isOpen3 && (
                                            <div className="dropdown_menu2 dashboard_dropdown-menu dropdown-colors">
                                                <div>
                                                    <div className='device_dropdown'>
                                                        <input
                                                            className='device_sts_checkbox'
                                                            type="checkbox"
                                                            checked={selectedOption === 'All'}
                                                        // onChange={() => handleOptionChange('All')}
                                                        />
                                                        <div className="div_sts">All</div>
                                                    </div>
                                                    <div className='device_dropdown'>
                                                        <input
                                                            className='device_sts_checkbox'
                                                            type="checkbox"
                                                            checked={selectedOption === 'Active'}
                                                        // onChange={() => handleOptionChange('Active')}
                                                        />
                                                        <div className="div_sts">Employed</div>
                                                    </div>
                                                    <div className='device_dropdown'>
                                                        <input
                                                            className='device_sts_checkbox'
                                                            type="checkbox"
                                                            checked={selectedOption === 'Inactive'}
                                                        // onChange={() => handleOptionChange('Inactive')}
                                                        />
                                                        <div className="div_sts">Self Employed</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Button variant="contained"
                            onClick={handleclick}
                            style={UserActionBtn}
                        >
                            {(props.position === 2) && "Add Distributor"}
                            {(props.position === 3) && "Add Customer"}
                            {(props.position === 4) && "Add Staff"}
                            {(props.position === 5) && "Add D_Staff"}
                        </Button>

                        <div className='filters2 display-flex' onClick={handleclick}>
                            <button className='btn btn-fill'>Add User</button>
                        </div>
                    </div> */}

                    {(Positionid_val === 4 || Positionid_val === 5) ? (
                        <div className='col-headings'>
                            <div className="col-head">Registration ID</div>
                            <div className="col-head">
                                {props.position === 2 && "Distributor "
                                }
                                {props.position === 3 && "Customer "
                                }
                                {props.position === 4 && "Staff "
                                }
                                {props.position === 5 && "D_Staff "
                                }
                                Name
                            </div>
                            <div className="col-head">Aadhar Number</div>
                            <div className="col-head">Email</div>
                            <div className="col-head">Contact Number</div>
                            <div className="col-head">Action</div>
                        </div>
                    ) : (
                        <div className='col-headings'>
                            <div className="col-head">Registration ID</div>
                            <div className="col-head">
                                {props.position === 2 && "Distributor "
                                }
                                {props.position === 3 && "Customer "
                                }
                                {props.position === 4 && "Staff "
                                }
                                {props.position === 5 && "D_Staff "
                                }
                                Name
                            </div>

                            <div className="col-head">Aadhar Number</div>
                            <div className="col-head">PAN Number</div>
                            <div className="col-head">Postal Code </div>
                            <div className="col-head">Email</div>
                            <div className="col-head">Contact Number</div>
                            <div className="col-head">Action</div>
                        </div>
                    )}


                    <div className="scroll_div" style={padding_top}>
                        {alldata.map((data, index) => (
                            (Positionid_val === 4 || Positionid_val === 5) ? (
                                <div>
                                    <div className="datas skeleton-block">
                                        <div className="col-head">{data.userid}</div>
                                        <div className="col-head">{data.fname}</div>
                                        <div className="col-head">{data.aadhar}</div>
                                        <div className="col-head" title={data.email}>{data.email}</div>
                                        <div className="col-head">
                                            {data.phno}
                                        </div>
                                        <ActionButton fun_to_rotate_btn={() => handleIconClick(index)} index={index} rotatedIndex={rotatedIndex} data={data} updateUserStatus={() => updateUserStatus(data.userid, data.status, index)} props={props} StaffDetialsEditPage={() => Staff_Detials_edit_page(data.userid)} />
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="datas skeleton-block">
                                        <div className="col-head">{data.userid}</div>
                                        <div className="col-head">{data.fname}</div>
                                        <div className="col-head">{data.aadhar}</div>
                                        <div className="col-head">{data.pan}</div>
                                        <div className="col-head">{data.cpostalcode}</div>
                                        <div className="col-head" title={data.email}>{data.email}</div>
                                        <div className="col-head">
                                            {data.phno}
                                        </div>
                                        <ActionButton fun_to_rotate_btn={() => handleIconClick(index)} index={index} rotatedIndex={rotatedIndex} data={data} updateUserStatus={() => updateUserStatus(data.userid, data.status, index)} props={props} StaffDetialsEditPage={() => Staff_Detials_edit_page(data.userid)} />

                                    </div>
                                </div>
                            )

                        ))}
                    </div>
                </div>
            </div>
            <Snackbar open={submitted} autoHideDuration={2500} onClose={handleSnackbarClose}>
                <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Successfully Activated
                </MuiAlert>
            </Snackbar>
        </div>
    );
};

export default Staff_Detials;