import React, { useState } from 'react';
//import react icons
import { FaTh, FaBars, FaUserAlt, FaRegChartBar, FaCommentAlt, FaShoppingBag } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faArrowRightFromBracket, faMinus } from '@fortawesome/free-solid-svg-icons';
import { NavLink, Link, BrowserRouter as Router } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from "react";


const Sidebar1 = ({ children, handleLogout }) => {
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
                        // { url: '/Distributer_Detials', text: 'Distributor Detials', condition: userInfo.distributer > 0 , classname:{userInfo.customer !> 0 ? 'last-link',''}},
                        { url: '/Distributer_Detials', text: 'Distributor Details', condition: userInfo.distributer > 0, classname: userInfo.customer == 0 ? 'last-link' : '' },
                        { url: '/Customer_Detials', text: 'Customer Detials', condition: userInfo.customer > 0, classname: 'last-link' },
                    ],
                },
                {
                    icon: <FaShoppingBag />,
                    head: 'Products',
                    links: [
                        { url: '/Products', text: 'Products', condition: userInfo.product > 0 },
                        { url: '/InvoiceGenerator', text: 'Invoice Generator', condition: true },
                        // !(userInfo.position === "customer")
                        { url: '/TransactionHistory', text: 'PaySlip Log', condition: userInfo.invoicepayslip > 0 },
                        { url: '/Invoice', text: 'Invoice', condition: userInfo.invoicegenerator > 0 },
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
    };
    const handleLogout1 = () => {
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
                                // to={item.links[0].url}
                                className={`link sidebarIcon ${activeDropdownIndex === index ? 'active-link' : ''}`}
                                style={{ borderRadius: "7px" }}
                                onMouseEnter={() => {
                                    const dropdownContent = document.getElementsByClassName('dropdown-content')[index];
                                    dropdownContent.style.display = 'flex';
                                    dropdownContent.style.animation = 'slideInFromLeft 0.5s ease-in-out forwards';
                                }}
                                onMouseLeave={() => {
                                    const dropdownContent = document.getElementsByClassName('dropdown-content')[index];
                                    dropdownContent.style.display = 'none';
                                    // dropdownContent.style.animation = 'slideOutToLeft 0.5s ease-in-out forwards';
                                }}
                            >
                                <div className="individual_icon">
                                    <div className={`icon ${activeDropdownIndex === index ? 'active-icon' : ''}`}>{item.icon}</div>
                                </div>
                                <div className="dropdown-content" style={{ display: 'none' }}
                                    onMouseLeave={() => {
                                        const dropdownContent = document.getElementsByClassName('dropdown-content')[index];
                                        dropdownContent.style.display = 'none';
                                        // dropdownContent.style.animation = 'slideOutToLeft 0.2s ease-in-out forwards';
                                        // alert(index)
                                    }}
                                >
                                    <div className="link_head sidebar_head bottomBorder">{item.head}</div>
                                    {/* {<div className="dropdown-hr hr_for_head" />} */}
                                    {item.links.map((link, i) => (
                                        (link.condition === true) && (
                                            <div className={(i === item.links.length - 1) ? "" : "bottomBorder"} key={i}>
                                                <div>
                                                    <Link to={link.url}
                                                        className={`innerLink ${activelink === i ? 'active-link' : ''} ${(i === item.links.length - 1 || item.links[1].classname === 'last-link') ? 'last-link' : ''}`}
                                                        onClick={() => handleLinkClick(i, index)}
                                                    >{link.text}{console.log("hlo : ", item.links[1].classname)}</Link>
                                                    {/* {<div className="dropdown-hr" />} */}
                                                </div>
                                                {/* {i !== item.links.length - 1 && <div className="dropdown-hr" />} */}
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
                        // onMouseLeave={LogoutLeaveParrent}
                        />

                    </div>
                    {logoutdiv &&
                        <div className="logoutDiv"
                        // onMouseLeave={LogoutLeave}
                        >
                            <div className='logout1'
                                onClick={Logout}
                            >
                                <div className="display-flex hoverColour1">
                                    <FontAwesomeIcon
                                        className="profile_pic"
                                        icon={faCircleUser}
                                        style={{ "--fa-primary-color": "#ffffff", "--fa-secondary-color": "#797a7c" }}
                                    />
                                    <span style={{ fontWeight: "600" }} className='name'>{JSON.parse(sessionStorage.getItem("UserInfo")).name}</span>
                                </div>
                            </div>
                            <div className='logout2'
                                onClick={handleLogout1}
                            >
                                <div className="display-flex hoverColour2">
                                    <FontAwesomeIcon className="profile_pic1" icon={faArrowRightFromBracket} />
                                    <div style={{ fontWeight: "600" }} className='name'>Logout</div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <main>{children}</main>
        </div >


    );
};

export default Sidebar1;
