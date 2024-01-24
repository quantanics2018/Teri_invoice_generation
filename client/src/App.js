import React, { useState } from 'react';
import './assets/style/App.css'
import './assets/style/main.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// import { HashRouter as Router, Route, Routes } from 'react-router-dom';

//Managements
import DistributerDetails from './pages/Distributer_Detials.jsx';
import Products from './pages/Products.jsx';
import AddUserDetails from './pages/Add_User_Detials';
import EditDistributerDetails from './pages/Edit_Distributer_Detials';
import CustomerDetails from './pages/CustomerDetails';
import Add_Customer_Detials from './pages/Add_Customer_Detials';
import Add_site from './pages/Add_Products.jsx';
import Invoice from "./components/Invoice.jsx";
import InvoiceGenerator from "./pages/InvoiceGenerator.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import TransactionHistory from "./pages/TransactionHistory.jsx";

// Main Content Template
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import TopNavbar from './TopNavbar';
import UpdatePassword from './pages/UpdatePassword.jsx';
import StaffDetails from './pages/Staff_Detials.jsx';
import AddProducts from './pages/Add_Products.jsx';
import EditProduct from './pages/EditProduct.jsx';
import FeedbackForm from './pages/FeedbackForm.jsx';
import { API_URL_CLIENT } from './config.js';

const App = () => {
  const handleLogout = () => {
    sessionStorage.removeItem('userType');
    sessionStorage.removeItem('session_dbName');
    sessionStorage.removeItem('access_control');
    sessionStorage.removeItem('state_count');
  };
  // const userInfo1 = {
  //   customer: "0",
  //   distributer: "3",
  //   staff: "2",
  //   email: "admin@gmail.com",
  //   invoice: "3",
  //   isLoggedIn: true,
  //   name: "admin",
  //   phno: "123456789",
  //   position: "manifacture",
  //   product: "3",
  //   userid: "123",
  //   userprofile: "1"
  // };
  const userInfoString = sessionStorage.getItem("UserInfo");
  const userInfo = JSON.parse(userInfoString);
  // console.log(userInfo.distributer);

  return (
    // http://localhost:3001/
    // https://terion.quantanics.in/
    <BrowserRouter>
      {window.location.href !== `${API_URL_CLIENT}` && userInfo.isLoggedIn && (
        <div>
          <TopNavbar />
          <Sidebar handleLogout={handleLogout}>
          </Sidebar>
          {userInfo.staff > 0 && (
            <div style={{ marginLeft: '50px' }}>
              <Routes>
                {/* Staff module */}
                <Route path='/Staff_Detials' element={<StaffDetails position={4} />} />
                <Route path='/Staff_Detials/Edit_Staff_Detials/:userid' element={<EditDistributerDetails />} />
                <Route path='/Staff_Detials/Add_User_Detials' element={<AddUserDetails />} />
              </Routes>
            </div>
          )}


          {userInfo.distributer > 0 && (
            <div style={{ marginLeft: '50px' }}>
              <Routes>
                {/* Distributer module */}
                <Route path='/Distributer_Detials' element={<StaffDetails position={2} />} />
                <Route path='/Distributer_Detials/Edit_Distributer_Detials/:userid' element={<EditDistributerDetails />} />
                <Route path='/Distributer_Detials/Add_User_Detials' element={<AddUserDetails />} />
              </Routes>
            </div>
          )}

          {userInfo.customer > 0 && (
            <div style={{ marginLeft: '50px' }}>
              <Routes>
                {/* Customer module */}
                <Route path='/Customer_Detials' element={<StaffDetails position={3} />} />
                <Route path='/Customer_Detials/Add_User_Detials' element={<AddUserDetails />} />
                <Route path='/Edit_Distributer_Detials/:userid' element={<EditDistributerDetails />} />
              </Routes>
            </div>
          )}

          {userInfo.product > 0 && (
            <div style={{ marginLeft: '50px' }}>
              <Routes>
                {/* Products Module */}
                <Route path='/Products' element={<Products />} />
                <Route path='/Products/Add_Products' element={<AddProducts />} />
                <Route path='/Products/Edit_Product_Detials/:productid' element={<EditProduct />} />
              </Routes>
            </div>

          )}

          {userInfo.invoicegenerator > 0 && (
            <div style={{ marginLeft: '50px' }}>
              <Routes>
                {/* Invoice Module */}
                <Route path='InvoiceGenerator' element={<InvoiceGenerator />} />
              </Routes>
            </div>
          )}
          {userInfo.invoicepayslip > 0 && (
            <div style={{ marginLeft: '50px' }}>
              <Routes>
                {/* Invoice Module */}
                <Route path='TransactionHistory' element={<TransactionHistory />} />
              </Routes>
            </div>
          )}
          <Routes>
            <Route path='ProfilePage' element={<ProfilePage />} />
            <Route path='feedback' element={<FeedbackForm />} />
            <Route path='Invoice' element={<Invoice />} />
          </Routes>
        </div>
      )}

      {window.location.href === `${API_URL_CLIENT}` && (
        <Routes>
          hhhh
          <Route path='/' element={<Login />} />
          <Route path='/UpdatePassword' element={<UpdatePassword />} />
        </Routes>
      )}
    </BrowserRouter>

  );

};


export default App;