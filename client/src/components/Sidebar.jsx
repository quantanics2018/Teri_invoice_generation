import React, { useState } from 'react';
//import react icons
import { FaTh, FaBars, FaUserAlt, FaRegChartBar, FaCommentAlt, FaShoppingBag } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faArrowRightFromBracket, faMinus } from '@fortawesome/free-solid-svg-icons';
import { NavLink, Link, BrowserRouter as Router } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from "react";


const Sidebar = ({ children, handleLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
   
    const [logoutdiv, setlogoutdiv] = useState(false);
    const storedData = sessionStorage.getItem('access_control');
    const parsedData = JSON.parse(storedData);
    const navigate = useNavigate();
    const userInfoString = sessionStorage.getItem("UserInfo");
    const userInfo = JSON.parse(userInfoString);
    const [activelink, setActiveLink] = useState(0);

    // side menubar submenu 
   
    var tmp_position = userInfo.position;
    console.log("first login state");
    console.log(tmp_position);

    /*
    if (tmp_position==="distributor") {
        setActiveLink(2);
    }else if(tmp_position==="manifacture"){
        setActiveLink(0);
    }
    else if(tmp_position==="customer"){
        setActiveLink(3);
    }
    else if(tmp_position==="staff"){
        setActiveLink(1);
    }
    else if(tmp_position==="d_staff"){
        setActiveLink(3);
    }else{
        setActiveLink(0);
    }
    */
    
    const userSidebarConfig =
        [
            {
                icon: <FaRegChartBar />,
                head: 'Management',
                links: [
                    { url: '/Staff_Details', text: 'Staff Details', condition: userInfo.staff > 0 },
                    // { url: '/Distributer_Detials', text: 'Distributor Detials', condition: userInfo.distributer > 0 , classname:{userInfo.customer !> 0 ? 'last-link',''}},
                    { url: '/Distributer_Details', text: 'Distributor Details', condition: userInfo.distributer > 0, classname: userInfo.customer == 0 ? 'last-link' : '' },
                    { url: '/D_Staff_Details', text: 'D_Staff Details', condition: userInfo.d_staff > 0, classname: userInfo.d_staff == 0 ? 'last-link' : '' },
                    { url: '/Customer_Details', text: 'Customer Details', condition: userInfo.customer > 0, classname: 'last-link' },
                ],
                condition: !(userInfo.position === 'customer')
            },
            {
                icon: <FaShoppingBag />,
                head: 'Products',
                links: [
                    { url: '/Products', text: 'Products', condition: userInfo.product > 0 },
                    { url: '/InvoiceGenerator', text: 'Invoice Generator', condition: userInfo.invoicegenerator > 0 },
                    // !(userInfo.position === "customer")
                    { url: '/TransactionHistory', text: 'PaySlip Log', condition: userInfo.invoicepayslip > 0 },
                    // { url: '/Invoice', text: 'Invoice', condition: userInfo.invoicegenerator > 0 },
                ],
                condition: true
            },
            {
                icon: <FaUserAlt />,
                head: 'Profile',
                links: [
                    { url: '/ProfilePage', text: 'Profile Info', condition: true },
                    { url: '/feedback', text: 'Feedback', condition: true },
                ],
                condition: true
            },
        ]
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
    const [activeDropdownIndex, setActiveDropdownIndex] = useState(0);
    const handleLinkClick = (i, index) => {
        setActiveLink(i);
        setActiveDropdownIndex(index);
    };



    return (
        <div className="container-slidebar">
            <div className="sidebar">
               
                <div className="all_icon" style={{alignItems:"center"}}>
                    {
                        
                        userSidebarConfig.map((item, index) => (
                         
                            <NavLink
                                key={index}
                                className={`link`}
                                style={{ borderRadius: "7px", width: "max-content", position: "relative" }}
                                onMouseLeave={() => {
                                    const dropdownContent = document.getElementsByClassName('dropdown-content')[index];
                                    dropdownContent.style.display = 'none';

                                    // dropdownContent.style.animation = 'slideOutToLeft 0.5s ease-in-out forwards';
                                }}
                            >
                                {(item.condition === true) &&

                                    <div
                                        className={`mouseEntering ${activeDropdownIndex === index ? 'active-link' : ''}`}
                                        onMouseEnter={() => {
                                            const dropdownContent = document.getElementsByClassName('dropdown-content')[index];
                                            dropdownContent.style.display = 'flex';
                                            dropdownContent.style.animation = 'slideInFromLeft 0.3s ease-in-out forwards';

                                        }}
                                    // className={`link sidebarIcon ${activeDropdownIndex === index ? 'active-link' : ''}`}

                                    >
                                        <div className="individual_icon">
                                            <div className={`icon ${activeDropdownIndex === index ? 'active-icon' : ''}`}>{item.icon}</div>
                                        </div>
                                    </div>
                                }
                                <div className={`dropdown-content`} style={{ display: 'none', marginTop: '0', top: '0rem' }}

                                    onMouseLeave={() => {
                                        const dropdownContent = document.getElementsByClassName('dropdown-content')[index];
                                        dropdownContent.style.display = 'none';
                                        // dropdownContent.style.animation = 'slideOutToLeft 0.2s ease-in-out forwards';
                                        // alert(index)
                                    }}
                                >
                                    <div className={`link_head sidebar_head bottomBorder`}>{item.head}</div>
                                    {/* {<div className="dropdown-hr hr_for_head" />} */}
                                    {item.links.map((link, i) => (
                                        
                                        (link.condition === true) && (
                                            <div className={(i === item.links.length - 1) ? "" : "bottomBorder"} key={i}>
                                                
                                                    <Link to={link.url}
                                                        className={`innerLink  ${(i === item.links.length - 1 || item.links[1].classname === 'last-link') ? 'last-link' : ''} ${(activelink === i && activeDropdownIndex===index) ? 'active-innerlink' : ''} ${i+'-'+index}`}
                                                        onClick={() => handleLinkClick(i, index)}
                                                    >{link.text}
                                                    </Link>
                                              
                                            </div>
                                        )
                                    ))}
                                </div>
                            </NavLink>)
                        )}
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
                                    <span style={{ fontWeight: "600" }} className='name'>{JSON.parse(sessionStorage.getItem("UserInfo")).fname}</span>
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


export default Sidebar;
