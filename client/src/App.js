import React, { useState } from 'react';
import './assets/style/App.css'
import './assets/style/main.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

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
  const currentLoc = window.location.href;


  return (
    <BrowserRouter>
      {(window.location.href !== `${API_URL_CLIENT}` && userInfo) ? (
        <div>
          <TopNavbar />
          <Sidebar handleLogout={handleLogout}>
          </Sidebar>
          {/* {(window.location.href !== `http://localhost:3001/`)&& <Navigate to='/Staff_Details' />} */}
          {userInfo.staff > 0 && (
            <div style={{ marginLeft: '50px' }}>
              <Routes>
                {/* Staff module */}
                <Route path='/Staff_Details' element={<StaffDetails position={4} Positionid_val={4} />} />
                <Route path='/Staff_Details/Edit_Staff_Details/:useridEnc' element={<EditDistributerDetails Positionid_val={4} />} />
                <Route path='/Staff_Details/Add_User_Details' element={<AddUserDetails Positionid_val={4} />} />
              </Routes>
            </div>
          )}


          {userInfo.distributer > 0 && (
            <div style={{ marginLeft: '50px' }}>
              <Routes>
                {/* Distributer module */}
                <Route path='/Distributer_Details' element={<StaffDetails position={2} Positionid_val={2} />} />
                <Route path='/Distributer_Details/Edit_Distributer_Details/:useridEnc' element={<EditDistributerDetails Positionid_val={2} />} />
                <Route path='/Distributer_Details/Add_User_Details' element={<AddUserDetails Positionid_val={2} />} />
              </Routes>
            </div>
          )}

          {userInfo.d_staff > 0 && (
            <div style={{ marginLeft: '50px' }}>
              <Routes>
                {/* D_Staff_Detials module */}
                <Route path='/D_Staff_Details' element={<StaffDetails position={5} Positionid_val={5} />} />
                <Route path='/D_Staff_Details/Edit_D_Staff_Details/:useridEnc' element={<EditDistributerDetails Positionid_val={5} />} />
                <Route path='/D_Staff_Details/Add_User_Details' element={<AddUserDetails Positionid_val={5} />} />
              </Routes>
            </div>
          )}

          {userInfo.customer > 0 && (
            <div style={{ marginLeft: '50px' }}>
              <Routes>
                {/* Customer module */}
                <Route path='/Customer_Details' element={<StaffDetails position={3} Positionid_val={3} />} />
                <Route path='/Customer_Details/Edit_Customer_Details/:useridEnc' element={<EditDistributerDetails Positionid_val={3} />} />
                <Route path='/Customer_Details/Add_User_Details' element={<AddUserDetails Positionid_val={3} />} />
              </Routes>
            </div>
          )}

          {userInfo.product > 0 && (
            <div style={{ marginLeft: '50px' }}>
              <Routes>
                {/* Products Module */}
                <Route path='/Products' element={<Products />} />
                <Route path='/Products/Add_Products' element={<AddProducts />} />
                <Route path='/Products/Edit_Product_Details/:productid/:productBatch' element={<EditProduct />} />
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
            {/* <Route path='Invoice' element={<Invoice />} /> */}
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='UpdatePassword' element={<UpdatePassword />} />
        </Routes>
      )}
      {/* {(currentLoc === `${API_URL_CLIENT}` || currentLoc === `${API_URL_CLIENT}/UpdatePassword`) && ( */}
      {/* )}  */}
    </BrowserRouter>

  );

};


export default App;