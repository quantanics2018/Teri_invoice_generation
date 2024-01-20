import React, { useState } from 'react';
//import react icons
import { FaTh, FaBars, FaUserAlt, FaRegChartBar, FaCommentAlt, FaShoppingBag } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faArrowRightFromBracket, faMinus } from '@fortawesome/free-solid-svg-icons';
import { NavLink, Link, BrowserRouter as Router } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from "react";


const Sidebar = ({ children, give_auth, handleLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [activelink, setActiveLink] = useState(null);
    const [logoutdiv, setlogoutdiv] = useState(false);
    const storedData = sessionStorage.getItem('access_control');
    const parsedData = JSON.parse(storedData);
    const navigate = useNavigate();
    const userInfoString = sessionStorage.getItem("UserInfo");
    const userInfo = JSON.parse(userInfoString);
    // console.log(userInfo);

    // sample data
    // const userInfo1 = {
    //     customer: "0",
    //     distributer: "3",
    //     staff: "2",
    //     email: "admin@gmail.com",
    //     invoice: "3",
    //     isLoggedIn: true,
    //     name: "admin",
    //     phno: "123456789",
    //     position: "manifacture",
    //     product: "3",
    //     userid: "123",
    //     userprofile: "1"
    // };
    const userSidebarConfig = {
        RI001: {
            menuItem: [
                {
                    icon: <FaRegChartBar />,
                    head: 'Management',
                    links: [
                        { url: '/Staff_Detials', text: 'Staff Detials', condition: userInfo.staff > 0 },
                        { url: '/Distributer_Detials', text: 'Distributor Detials', condition: userInfo.distributer > 0 },
                        { url: '/Customer_Detials', text: 'Customer Detials', condition: userInfo.customer > 0 },
                        // { url: '/Products', text: 'Products' },
                        // { url: '/Contact_us', text: 'Contact us', condition: true },
                    ],
                },
                {
                    icon: <FaShoppingBag />,
                    head: 'Products',
                    links: [
                        { url: '/Products', text: 'Products', condition: userInfo.product > 0 },
                        { url: '/InvoiceGenerator', text: 'Invoice Generator', condition: !(userInfo.position === "customer") },
                        { url: '/Invoice', text: 'Invoice', condition: userInfo.invoice > 0 },
                        { url: '/TransactionHistory', text: 'PaySlip Log', condition: true },
                    ],
                },
                {
                    icon: <FaUserAlt />,
                    head: 'Profile',
                    links: [
                        { url: '/ProfilePage', text: 'Profile Info', condition: true },
                        { url: '/feedback', text: 'Feedback', condition: true },
                    ],
                },
            ],
        },
        RI002: {
            menuItem: [
                {
                    // path: '/dashboard',
                    icon: <FaTh />,
                    head: 'Dashboard',
                    links: [
                        { url: '/dashboard', text: 'Dashboard', show: parsedData ? parsedData.dashboard !== '0' : true },
                    ],
                },
                {
                    icon: <FaUserAlt />,
                    head: 'Management',
                    links: [
                        { url: '/Assert_Management', text: 'Assert Management' },
                        { url: '/Alert_Management', text: 'Alert Management' },
                        { url: '/Device/site_id', text: 'Device Management', show: parsedData ? parsedData.device_management !== '0' : true },
                        { url: '/Site', text: 'Site Management', show: parsedData ? parsedData.site_management !== '0' : true },
                        { url: '/User', text: 'User Management', show: parsedData ? parsedData.user_management !== '0' : true },
                    ],
                },
                {
                    icon: <FaRegChartBar />,
                    head: 'Configuration',
                    links: [
                        { url: '/Alert', text: 'Alert' },
                        { url: '/Modbus_Slave', text: 'Modbus Slave' },
                        { url: '/Modbus_Master', text: 'Modbus Master' },
                    ],
                },
                {
                    icon: <FaCommentAlt />,
                    head: 'Upgradation',
                    links: [
                        { url: '/Firmware', text: 'Firmware' },
                    ],
                },
                {
                    icon: <FaShoppingBag />,
                    head: 'Log Maintenance',
                    links: [
                        { url: '/Event', text: 'Event' },
                        { url: '/Device_Connection', text: 'Device Connection' },
                        { url: '/Real_Data', text: 'Real Data' },
                    ],
                },
            ],
        },
        RI003: {
            menuItem: [
                {
                    // path: '/dashboard',
                    icon: <FaTh />,
                    head: 'Dashboard',
                    links: [
                        { url: '/dashboard', text: 'Dashboard', show: parsedData ? parsedData.dashboard !== '0' : true },
                    ],
                },
                {
                    icon: <FaUserAlt />,
                    head: 'Management',
                    links: [
                        { url: '/Assert_Management', text: 'Assert Management' },
                        { url: '/Alert_Management', text: 'Alert Management' },
                        { url: '/Device/site_id', text: 'Device Management', show: parsedData ? parsedData.device_management !== '0' : true },
                        { url: '/User', text: 'User Management', show: parsedData ? parsedData.user_management !== '0' : true },
                    ],
                },
                {
                    icon: <FaRegChartBar />,
                    head: 'Configuration',
                    links: [
                        { url: '/Alert', text: 'Alert' },
                        { url: '/Modbus_Slave', text: 'Modbus Slave' },
                        { url: '/Modbus_Master', text: 'Modbus Master' },
                    ],
                },
                {
                    icon: <FaCommentAlt />,
                    head: 'Upgradation',
                    links: [
                        { url: '/Firmware', text: 'Firmware' },
                    ],
                },
                {
                    icon: <FaShoppingBag />,
                    head: 'Log Maintenance',
                    links: [
                        { url: '/Event', text: 'Event' },
                        { url: '/Device_Connection', text: 'Device Connection' },
                        { url: '/Real_Data', text: 'Real Data' },
                    ],
                },
            ],
        },
        RI004: {
            menuItem: [
                {
                    // path: '/dashboard',
                    icon: <FaTh />,
                    head: 'Dashboard',
                    links: [
                        { url: '/dashboard', text: 'Dashboard', show: parsedData ? parsedData.dashboard !== '0' : true },
                    ],
                },
                {
                    icon: <FaUserAlt />,
                    head: 'Management',
                    links: [
                        { url: '/Assert_Management', text: 'Assert Management' },
                        { url: '/Alert_Management', text: 'Alert Management' },
                        { url: '/Device/site_id', text: 'Device Management', show: parsedData ? parsedData.device_management !== '0' : true },
                        { url: '/User', text: 'User Management', show: parsedData ? parsedData.user_management !== '0' : true },
                    ],
                },
                {
                    icon: <FaRegChartBar />,
                    head: 'Configuration',
                    links: [
                        { url: '/Alert', text: 'Alert' },
                        { url: '/Modbus_Slave', text: 'Modbus Slave' },
                        { url: '/Modbus_Master', text: 'Modbus Master' },
                    ],
                },
                {
                    icon: <FaCommentAlt />,
                    head: 'Upgradation',
                    links: [
                        { url: '/Firmware', text: 'Firmware' },
                    ],
                },
                {
                    icon: <FaShoppingBag />,
                    head: 'Log Maintenance',
                    links: [
                        { url: '/Event', text: 'Event' },
                        { url: '/Device_Connection', text: 'Device Connection' },
                        { url: '/Real_Data', text: 'Real Data' },
                    ],
                },
            ],
        },

    };
    // const { menuItem } = userSidebarConfig[give_auth] || {};
    const handleLogout1 = () => {
        handleLogout();
        setlogoutdiv(!logoutdiv)
        sessionStorage.removeItem("UserInfo");
        navigate('/', { replace: true });
        window.location.reload();
    }

    const Logout = () => {
        setlogoutdiv(!logoutdiv)
        const dropdownContent = document.getElementsByClassName('your-div');
        if (dropdownContent.style.display === "none") {
            dropdownContent.style.display = "block";
        } else {
            dropdownContent.style.display = "none";
        }
    }
    const logout_empty_space = useRef(null);
    const logout_empty_space_fun = (event) => {
        if (!logout_empty_space.current.contains(event.target)) {
            setlogoutdiv(false);
        }
    };
    useEffect(() => {
        document.addEventListener('click', logout_empty_space_fun);
        return () => {
            document.removeEventListener('click', logout_empty_space_fun);
        };
    }, []);
    const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);
    const handleLinkClick = (i, index) => {
        console.log(i, index);
        setActiveLink(i);
        setActiveDropdownIndex(index)
    };

    return (
        <div className="container-slidebar">
            <div className="sidebar">
                <div className="all_icon">
                    {
                        userSidebarConfig.RI001.menuItem.map((item, index) => (
                            <NavLink
                                key={index}
                                to={item.links[0].url}
                                className={`link ${activeDropdownIndex === index ? 'active-link' : ''}`}
                                style={{ borderRadius: "7px" }}
                                onMouseEnter={() => {
                                    const dropdownContent = document.getElementsByClassName('dropdown-content')[index];
                                    dropdownContent.style.display = 'block';
                                }}
                                onMouseLeave={() => {
                                    const dropdownContent = document.getElementsByClassName('dropdown-content')[index];
                                    dropdownContent.style.display = 'none';
                                }}
                            >
                                <div className="individual_icon">
                                    <div className={`icon ${activeDropdownIndex === index ? 'active-icon' : ''}`}>{item.icon}</div>
                                </div>

                                <div className="dropdown-content" style={{ display: 'none' }}>
                                    <div className="sidebar_head">{item.head}</div>
                                    {console.log("hai : ", item)}
                                    {item.links.map((link, i) => (
                                        (link.condition === true) && (
                                            <div key={i}>
                                                <div>
                                                    <Link to={link.url}
                                                        className={`link ${activelink === i ? 'active-link' : ''} ${(i === item.links.length - 1 )? 'last-link' : ''}`}
                                                    onClick={() => handleLinkClick(i, index)}
                                                    >{link.text}{console.log(i)}</Link>
                                                    {i !== item.links.length - 1 && <hr className="dropdown-hr" />}
                                                </div>
                                            </div>
                                        )
                                    ))}
                                </div>
                            </NavLink>
                        ))}
                </div>
                <div style={{ position: "relative" }} className='profile' ref={logout_empty_space}>
                    <div >
                        <FontAwesomeIcon
                            className="profile_pic"
                            icon={faCircleUser}
                            style={{ "--fa-primary-color": "#ffffff", "--fa-secondary-color": "#797a7c" }}
                            onClick={Logout}
                        />

                    </div>
                    {logoutdiv &&
                        <div className="your-div">
                            <div className='display-flex logout1'>
                                <FontAwesomeIcon
                                    className="profile_pic"
                                    icon={faCircleUser}
                                    style={{ "--fa-primary-color": "#ffffff", "--fa-secondary-color": "#797a7c" }}
                                    onClick={Logout}
                                />
                                <span style={{ fontWeight: "600" }} className='name'>{JSON.parse(sessionStorage.getItem("UserInfo")).name}</span>
                            </div>
                            <div className='display-flex logout2'
                                onClick={handleLogout1}
                            >
                                <FontAwesomeIcon className="profile_pic1" icon={faArrowRightFromBracket} />
                                <div style={{ fontWeight: "600" }} className='name'>Logout</div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <main>{children}</main>
        </div >


    );
};

export default Sidebar;
