import React, { useEffect } from 'react';
import '../../assets/style/App.css';
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
import { API_URL } from '../../config/config';
import { AddUserBtn } from '../common/AddUserBtn';

const Distributer_Detials_content = (props) => {
    console.log('Props in ChildComponent:', props);

    //states
    const [rotatedIndex, setRotatedIndex] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState('1');
    const [selectedOption, setSelectedOption] = useState('All');


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
        navigate('Add_User_Detials');
    }
    // const [rotatedIndex, setRotatedIndex] = useState(null);

    const handleIconClick = (index) => {
        setRotatedIndex(rotatedIndex === index ? null : index);
    };

    // const handleIconClick = () => {
    //     setRotatedIndex(!rotatedIndex);
    // };

    const handleDivClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (event) => {
        setText(event.target.value);
    };

    //navigate to edit page
    const Distributer_Detials_edit_page = async (data) => {
        console.log("id", data);
        navigate(`Edit_Distributer_Detials/${data}`);
    }
    const [alldata, setAlldate] = useState([]);
    useEffect(() => {
        const adminid = JSON.parse(sessionStorage.getItem("UserInfo")).userid;
       

        axios.post(`${API_URL}get/user`, { adminid: adminid, position: props.position })
            .then(response => {
                console.log(response.data.data);
                setAlldate(response.data.data);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
    }, []);
    const updateUserStatus = async (userid, currentstatus, index) => {
        try {
            const response = await axios.put(`${API_URL}/update/userremove`, {
                userid: userid, status: currentstatus
            });
            console.log(response.data.resStatus); // Assuming the API sends back a response
            if (response.data.qos === "success") {
                setAlldate((prevData) => {
                    const newData = [...prevData];
                    newData[index].status = response.data.resStatus;
                    return newData;
                });
                console.log("success : ", alldata)
            }
        } catch (error) {
            console.error('Error updating user status:', error);
        }
    }
    const userInfoString = sessionStorage.getItem("UserInfo");
    const userInfo = JSON.parse(userInfoString);
    return (
        <div className='bar'>
            <div className='status-bar'>
                <div className="device_mangement_main_content">
                    <div className="row_with_count_status">


                        {userInfo.position == 'distributor' ? (
                            <>
                                <span className='module_tittle'>Customer Detials</span>
                            </>
                        ) : (
                            <>
                                <span className='module_tittle'>Distributor Detials</span>
                            </>
                        )}
                    </div>

                    <div className='filters display-flex' >
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
                                      
                                    </div>
                                </div>
                            </div>
                        </div>
                        <AddUserBtn adduserFun={handleclick}/>
                        
                      
                    </div>


                    <div className='col-headings'>
                        <div className="col-head">Registration ID</div>
                        <div className="col-head">Distributer Name</div>
                        <div className="col-head">Aadhar Number</div>
                        <div className="col-head">PAN Number</div>
                        <div className="col-head">Postal Code </div>
                        <div className="col-head">Email</div>
                        <div className="col-head">Contact Number</div>
                        <div className="col-head">Action</div>
                    </div>
                    <div className="scroll_div">
                        {alldata.map((data, index) => (
                            <div className="datas skeleton-block">
                                {/* <div className="datas skeleton-block">
                                    {JSON.stringify(data.status)}
                                </div> */}
                                <div className="col-head">{data.userid}</div>
                                <div className="col-head">{data.name}</div>
                                <div className="col-head">{data.aadhar}</div>
                                <div className="col-head">{data.pan}</div>
                                <div className="col-head">{data.ppostalcode}</div>
                                <div className="col-head" title="Quantanics@gmail.com">{data.email}</div>
                                <div className="col-head">
                                    {/* <FontAwesomeIcon icon={faDiamond} size="xs" />  */}
                                    {data.phno}
                                </div>
                                <div className="col-head display-flex device_action_dropdown_parent">
                                    <div className="sts_icon"
                                        onClick={() => handleIconClick(index)}
                                    >
                                        <Icon icon={ic_label_important} style={{ transform: rotatedIndex === index ? 'rotate(90deg)' : 'rotate(0)', color: rotatedIndex === index ? '#08c6cd' : 'lightgray', }} className='device_content_arrow' size={25} />
                                    </div>
                                    <div>{(rotatedIndex === index) &&
                                        (<div className='device_action_dropdown'>
                                            <div className='display-flex device_action_dropdown1 dropdown_action'>
                                                <FontAwesomeIcon className='device_content_arrows' icon={faAnglesDown} size='lg' />
                                                <div className='device_content_dropdown display-flex'
                                                    onClick={() => Distributer_Detials_edit_page(data.userid)}
                                                >Edit Distributer Detials</div>
                                            </div>
                                            <div className='display-flex device_action_dropdown2 dropdown_action'>
                                                <FontAwesomeIcon icon={faAnglesDown} className='device_content_arrows' size='lg' />
                                                {data.status == 1 ? (
                                                    <div className='device_content_dropdown display-flex'
                                                        onClick={() => updateUserStatus(data.userid, 0, index)}
                                                    >Inactivate Distributer
                                                    </div>
                                                ) : (
                                                    <div className='device_content_dropdown display-flex'
                                                        onClick={() => updateUserStatus(data.userid, 1, index)}
                                                    >Activate Distributer
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>

            {/* Edit Device detials */}
            <div class="modal fade device_status_action" id="device_status_action" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="device_status_header">
                            <h5 class="modal-title" id="exampleModalLabel">EDIT DEVICE DETAILS
                            </h5>
                            {/* <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                        </div>
                        <div class="device_status_body">
                            <div className="dsa_row1">
                                <div className="dsa_1st_input">
                                    <label for="input1">Device Name</label>
                                    <div className="inputs-group">
                                        <span class="input-group-loc"><Icon icon={ic_label_important} size={20} style={{ color: "lightgray" }} /></span>
                                        <input type="text" value={"device_name"} class="form-control-loc" id="input1" />
                                    </div>
                                </div>
                                <div className="dsa_1st_input">
                                    <label for="input1">Client ID</label>
                                    <div className="inputs-group">
                                        <span class="input-group-loc"><Icon icon={ic_label_important} size={20} style={{ color: "lightgray" }} /></span>
                                        <input type="text" value={"client_id"} class="form-control-loc" id="input1" />
                                    </div>
                                </div>
                            </div>

                            <div className="dsa_row2">
                                <div className="dsa_2nd_input">
                                    <label for="input1">Device MAC Address</label>
                                    <div className="inputs-group">
                                        <span class="input-group-loc"><Icon icon={ic_label_important} size={20} style={{ color: "lightgray" }} /></span>
                                        <input type="text" value={"device_mac_address"} class="form-control-loc" id="input1" />
                                    </div>
                                </div>
                                <div className="dsa_2nd_input">
                                    <label for="input1">Firmware Version</label>
                                    <div className="inputs-group">
                                        <span class="input-group-loc"><Icon icon={ic_label_important} size={20} style={{ color: "lightgray" }} /></span>
                                        <input type="text" value={"device_firmware_version"} class="form-control-loc" id="input1" />
                                    </div>
                                </div>
                            </div>

                            <div className="dsa_row3">
                                <div className="dsa_3rd_input">
                                    <label for="input1">Device Model</label>
                                    <div className="inputs-group">
                                        <span class="input-group-loc"><Icon icon={ic_label_important} size={20} style={{ color: "lightgray" }} /></span>
                                        <input type="text" value={"device_model"} class="form-control-loc" id="input1" />
                                    </div>
                                </div>
                                <div className="dsa_3rd_input">
                                    <div className="dsa_updates">
                                        <div className="updated_by">
                                            <label htmlFor="updated_by_name" className='dsa_updates_heading'>Last Updated By
                                            </label>
                                            <div id="updated_by_name">Quantanics</div>
                                        </div>
                                        <div className="updated_on">
                                            <label htmlFor="updated_by_date" className='dsa_updates_heading'>Last Updated On
                                            </label>
                                            <div id="updated_by_date">20 march 2023, 12:57</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="device_status_footer">
                            <button type="button" class="btn-loc inactive-loc" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Distributer_Detials_content;