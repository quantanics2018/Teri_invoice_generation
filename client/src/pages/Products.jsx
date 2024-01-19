import React from 'react';
import '../assets/style/App.css';
import { API_URL } from '../config'


//import icons from fontawesome and react icon kit
import { Icon } from 'react-icons-kit';
import { ic_label_important } from 'react-icons-kit/md/ic_label_important';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiamond } from '@fortawesome/free-solid-svg-icons';
import { faAnglesDown, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
// import { Button, Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AddUserBtn } from '../components/AddUserBtn';

const Products = () => {
    //states
    const [allnetdata, setnetwork] = useState([]);
    const [allupdatedata, setdevice_updated_on] = useState([]);
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen4, setIsOpen4] = useState(false);
    const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
    const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
    const [isDropdownOpen4, setIsDropdownOpen4] = useState(false);
    const [rotatedIndex, setRotatedIndex] = useState(null);
    const [device_active, setdevice_active] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState('1');
    const [activeCount, setactiveCount] = useState(0);
    const [inactiveCount, setinactiveCount] = useState(0);
    const [deviceModel_data, setdevicemodel] = useState([]);
    const [deviceName_data, setdevicename] = useState([]);
    const [active_inactive, setactive_inactive] = useState([]);
    const [selectedOption, setSelectedOption] = useState('All');
    // const dropdownRef1 = useRef(null);
    const dropdown1 = () => {
        setIsOpen1(!isOpen1);
        setIsDropdownOpen1(!isDropdownOpen1);
    };


    const [isOpen3, setIsOpen3] = useState(false);
    const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);
    const dropdownRef3 = useRef(null);
    const dropdown3 = () => {
        setIsOpen3(!isOpen3);
        setIsDropdownOpen3(!isDropdownOpen3);
    };
    const empty_space_down3 = (event) => {
        if (!dropdownRef3.current.contains(event.target)) {
            setIsOpen3(false);
            setIsDropdownOpen3(false)

        }
    };


    // //Navigate to Add Device Page
    const navigate = useNavigate();
    const handleclick = () => {
        navigate('Add_Products');
    }

    // //rotate the arrow in the device action
    const handleIconClick = (index) => {
        setRotatedIndex(rotatedIndex === index ? null : index);
        // const sts = document.getElementsByClassName('device_active');
        // if (sts === 'Active') {
        //     setdevice_active('Active')
        // }
        // if (sts === 'Inactive') {
        //     setdevice_active('Inactive')
        // }
        // setRotatedIndex(!rotatedIndex);
    };



    const handleDivClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (event) => {
        setText(event.target.value);
    };

    const handleInputBlur = () => {
        setIsEditing(false);
    };
    const [isless_than_10_active, setisless_than_10_active] = useState(false)
    const [isgreater_than_10_inactive, setisgreater_than_10_inactive] = useState(false)
    useEffect(() => {
        if (activeCount < 10) {
            setisless_than_10_active(true)
        }
        else {
            setisless_than_10_active(false);
        }
        if (inactiveCount < 10) {
            setisgreater_than_10_inactive(true)
        }
        else {
            setisgreater_than_10_inactive(false);
        }
    })

    //navigate to edit page
    const Products_edit_page = async () => {
        navigate(`Edit_Products`);
    }
    const Product_edit_page = (data) => {
        navigate(`Edit_Product_Detials/${data}`);
    }
    const [alldata, setAlldate] = useState([]);
    useEffect(() => {
        const userid = JSON.parse(sessionStorage.getItem("UserInfo")).userid;
        // console.log(userid);
        axios.post(`${API_URL}get/products`, { userid })
            .then(response => {
                setAlldate(response.data.data);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
    }, []);
    // console.log(alldata);

    const updateUserStatus = async (productid, currentstatus, index) => {
        try {
            // console.log(productid);
            const response = await axios.put(`${API_URL}update/productremove`, {
                productid: productid, status: currentstatus
            });
            // console.log(response.data.resStatus); 
            if (response.data.qos === "success") {
                setAlldate((prevData) => {
                    const newData = [...prevData];
                    newData[index].status = response.data.resStatus;
                    return newData;
                });
                // console.log("success : ", alldata)
            }
        } catch (error) {
            console.error('Error updating user status:', error);
        }
    }
    const [editableIndex, setEditableIndex] = useState(null);
    const handleDoubleClick = (index) => {
        setEditableIndex(index);
    };
    const handleQuantityChange = (event, index) => {
        console.log(`Quantity changed for index ${index}: ${event.target.value}`);
    };

    return (
        <div className='bar'>
            <div className='status-bar'>
                <div className="device_mangement_main_content">
                    <div className="row_with_count_status">
                        <span className='module_tittle'>Products</span>
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
                                        onBlur={handleInputBlur}
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
                                    {/* <div class="dropdown-filter"
                                    // ref={dropdownRef1}
                                    >
                                        <div class="device_filters" onClick={dropdown1}>
                                            <div className="device_name">
                                                Device Name
                                            </div>
                                            <div className="dropdown_icon">
                                                <FontAwesomeIcon
                                                    icon={isDropdownOpen1 ? faChevronDown : faChevronUp}
                                                    className="dropdown-icon"
                                                />
                                            </div>
                                        </div>
                                        {isOpen1 && (
                                            <div className="dropdown_menu2 dashboard_dropdown-menu heights dropdown-colors ">
                                                {deviceName_data.map((data, index) => (
                                                    <div className='device_scroll' key={index}>
                                                        <div>
                                                            <div className='device_dropdown'>
                                                                <input
                                                                    className='device_sts_checkbox'
                                                                    type="checkbox"
                                                                // checked={data.device_name.trim() === selectedDevice}
                                                                // onChange={() => handleDeviceChange(data.device_name.trim())}
                                                                />
                                                                <div className="div_sts">{data.device_name}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div> */}
                                    {/* <div class="dropdown-filter"
                                        ref={dropdownRef3}
                                    >
                                        <div class="device_filters" onClick={dropdown3}>
                                            <div className="device_name">
                                                Category
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
                                                        <div className="div_sts">Machine</div>
                                                    </div>
                                                    <div className='device_dropdown'>
                                                        <input
                                                            className='device_sts_checkbox'
                                                            type="checkbox"
                                                            checked={selectedOption === 'Inactive'}
                                                        // onChange={() => handleOptionChange('Inactive')}
                                                        />
                                                        <div className="div_sts">Refill</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <AddUserBtn adduserFun={handleclick} value={"Add Products"} />

                        {/* <div className='filters2 display-flex' onClick={handleclick}>
                            <button className='btn btn-fill'>Add Products</button>
                        </div> */}
                    </div>
                    <div className='col-headings'>
                        <div className="col-head">Product ID</div>
                        <div className="col-head">Product Name</div>
                        <div className="col-head">Quantity</div>
                        <div className="col-head">Product Price</div>
                        <div className="col-head">Action</div>
                    </div>
                    <div className="scroll_div">
                        {/* <div className="datas skeleton-block">
                            <div className="col-head">84199090</div>
                            <div className="col-head">Ink Machine</div>
                            <div className="col-head">Education</div>
                            <div className="col-head">Reuseability</div>
                            <div className="col-head">507</div>
                            <div className="col-head">$1500</div>
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
                                                onClick={() => Products_edit_page()}
                                            >Edit Product Count</div>
                                        </div>
                                        <div className='display-flex device_action_dropdown2 dropdown_action'>
                                            <FontAwesomeIcon icon={faAnglesDown} className='device_content_arrows' size='lg' />
                                            <div className='device_content_dropdown display-flex'
                                            // onClick={() => { Editinactivedata(data, index) }}
                                            >Remove Product</div>
                                        </div>
                                    </div>)}
                                </div>
                            </div>
                        </div> */}
                        {alldata.map((data, index) => (
                            <div className="datas skeleton-block">
                                <div className="col-head" key={index}>{data.productid}</div>
                                <div className="col-head" key={index}>{data.productname}</div>
                                {/* <div className="col-head" key={index}>{data.quantity}</div> */}
                                {editableIndex === index ? (
                                    <input
                                        type="number"
                                        className='col-head'
                                        value={data.quantity}
                                        onChange={(event) => handleQuantityChange(event, index)}
                                        onBlur={() => setEditableIndex(null)}
                                    />
                                ) : (
                                    <div
                                        className="col-head editable"
                                        onDoubleClick={() => handleDoubleClick(index)}
                                    >
                                        {data.quantity}
                                    </div>
                                )}
                                <div className="col-head" key={index}>{data.priceperitem}</div>
                                <div className="col-head display-flex device_action_dropdown_parent">
                                    <div className="sts_icon"
                                        onClick={() => handleIconClick(index)}
                                    >
                                        <Icon icon={ic_label_important} style={{ transform: rotatedIndex === index ? 'rotate(90deg)' : 'rotate(0)', color: rotatedIndex === index ? '#08c6cd' : 'lightgray', }} className='device_content_arrow' size={25} />
                                    </div>
                                    <div key={index}>{(rotatedIndex === index) &&
                                        (<div className='device_action_dropdown'>
                                            <div className='display-flex device_action_dropdown1 dropdown_action'>
                                                <FontAwesomeIcon className='device_content_arrows' icon={faAnglesDown} size='lg' />
                                                <div className='device_content_dropdown display-flex'
                                                    onClick={() => Product_edit_page(data.productid)}
                                                >Edit Product Detials</div>
                                            </div>
                                            <div className='display-flex device_action_dropdown2 dropdown_action'>
                                                <FontAwesomeIcon icon={faAnglesDown} className='device_content_arrows' size='lg' />
                                                {data.status == 1 ? (
                                                    <div className='device_content_dropdown display-flex'
                                                        onClick={() => updateUserStatus(data.productid, 0, index)}
                                                    >Inactivate Product
                                                    </div>
                                                ) : (
                                                    <div className='device_content_dropdown display-flex'
                                                        onClick={() => updateUserStatus(data.productid, 1, index)}
                                                    >Activate Product
                                                    </div>
                                                )}
                                                {/* <div className='device_content_dropdown display-flex'
                                                // onClick={() => { Editactivedata(data, index) }}
                                                >Activate Device</div> */}
                                            </div>
                                        </div>)}
                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>
                    {/* <div className='device_bottom'>
                        <div className='device_export cursor-pointer'>
                            <div className='device_exports'>Export</div>
                        </div>
                    </div> */}
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

export default Products;