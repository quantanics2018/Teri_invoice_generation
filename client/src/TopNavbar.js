import React, {useState } from 'react';
import companyLogo from './assets/logo/invoiceLogo.png'
import { Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
const TopNavbar = () => {


  const [isSidebarOpen, setisSidebarOpen] = useState(false);
  const handleSidebarToggle = () => {
    setisSidebarOpen(!isSidebarOpen);
  }
  return (
    <nav className='top-nav flex-class align-center'>
      {/* Product Logo */}
      <div className='navbar_mar mar-left d-flex'>
        <h1>Organization Name</h1>
      </div>
      {/* <IconButton color="inherit" onClick={handleSidebarToggle}>
        <MenuIcon />
      </IconButton> */}

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