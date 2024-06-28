import React from 'react';
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

const CustomerDetails = () => {
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
        navigate('/Add_Customer_Detials');
    }

    const handleIconClick = () => {
        setRotatedIndex(!rotatedIndex);
    };

    const handleDivClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (event) => {
        setText(event.target.value);
    };

    //navigate to edit page
    const Distributer_Detials_edit_page = async (data) => {
        navigate(`/Edit_Distributer_Detials`);
    }

    return (
        <div className='bar'>
            <div className='status-bar'>
                <div className="device_mangement_main_content">
                    <div className="row_with_count_status">
                        <span className='module_tittle'>Customer Detials</span>
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

                        <div className='filters2 display-flex' onClick={handleclick}>
                            <button className='btn btn-fill'>Add Customer</button>
                        </div>
                    </div>


                    <div className='col-headings'>
                        <div className="col-head">Registration ID</div>
                        <div className="col-head">Distributer Name</div>
                        <div className="col-head">Aadhar Number</div>
                        <div className="col-head">GST Number</div>
                        <div className="col-head">Business Type </div>
                        <div className="col-head">Email</div>
                        <div className="col-head">Contact Number</div>
                        <div className="col-head">Action</div>
                    </div>
                    <div className="scroll_div">
                        <div className="datas skeleton-block">
                            <div className="col-head">xxxx xx 6024</div>
                            <div className="col-head">Quantanics</div>
                            <div className="col-head">xxxx xxxx xx04</div>
                            <div className="col-head">GST546-291-341</div>
                            <div className="col-head">Self Employed</div>
                            <div className="col-head" title="Quantanics@gmail.com">Quantanics@gmail.com</div>

                            <div className="col-head">
                                {/* <FontAwesomeIcon icon={faDiamond} size="xs" />  */}
                                987654321
                            </div>
                            <div className="col-head display-flex device_action_dropdown_parent">
                                <div className="sts_icon"
                                    onClick={() => true && handleIconClick()}
                                >
                                    <Icon icon={ic_label_important} style={{ transform: rotatedIndex == true ? 'rotate(90deg)' : 'rotate(0)', color: rotatedIndex == true ? '#08c6cd' : 'lightgray', }} className='device_content_arrow' size={25} />
                                </div>
                                <div>{(rotatedIndex) &&
                                    (<div className='device_action_dropdown'>
                                        <div className='display-flex device_action_dropdown1 dropdown_action'>
                                            <FontAwesomeIcon className='device_content_arrows' icon={faAnglesDown} size='lg' />
                                            <div className='device_content_dropdown display-flex'
                                                onClick={() => Distributer_Detials_edit_page()}
                                            >Edit Distributer Detials</div>
                                        </div>
                                        <div className='display-flex device_action_dropdown2 dropdown_action'>
                                            <FontAwesomeIcon icon={faAnglesDown} className='device_content_arrows' size='lg' />
                                            <div className='device_content_dropdown display-flex'
                                            // onClick={() => { Editinactivedata(data, index) }}
                                            >Remove Distributer</div>
                                        </div>
                                    </div>
                                    )}
                                </div>
                            </div>
                        </div>
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

export default CustomerDetails;