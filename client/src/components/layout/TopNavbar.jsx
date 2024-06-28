import React, { useState } from 'react';
import companyLogo from '../../assets/logo/invoiceLogo.png';
import { Avatar, Badge, Button, Chip, Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import { deepOrange, red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const TopNavbar = () => {


  const [isSidebarOpen, setisSidebarOpen] = useState(false);
  const handleSidebarToggle = () => {
    setisSidebarOpen(!isSidebarOpen);
  }
  const userInfoString = sessionStorage.getItem("UserInfo");
  const userInfo = JSON.parse(userInfoString);
  // console.log(userInfo.email);
  const navigate = useNavigate();

  const navigateProfileInfo = () =>{
    navigate('/ProfilePage')
  }
  return (
    <nav className='top-nav flex-class align-center'>
      {/* Product Logo */}
      <div className='navbar_mar mar-left d-flex'>
        <img src={companyLogo} alt="Terion" width="200" height="25" />
      </div>
      {/* <IconButton color="inherit" onClick={handleSidebarToggle}>
        <MenuIcon />
      </IconButton> */}
      <div className='usernameProfile'>
        <Chip label={userInfo.email} variant="outlined" style={{marginRight:'11px'}} onClick={() => navigateProfileInfo()} />
        {/* <Badge color='success' variant='dot' overlap='circular' anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} > */}
          {/* <Avatar sx={{ bgcolor: red[500] }} alt={(userInfo.email).toUpperCase()} src="/static/images/avatar/1.jpg" /> */}
        {/* </Badge> */}
      </div>

      {/* Site Dropdown */}
      <Drawer anchor="left" open={isSidebarOpen} onClose={handleSidebarToggle}>
        <div className="p-4" style={{ width: '300px' }}>
          {/* Sidebar content goes here */}
          <p>Sidebar Content</p>
          {/* <Sidebar/> */}
        </div>
      </Drawer>


    </nav>
  );
};
export default TopNavbar;