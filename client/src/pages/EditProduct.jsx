import React from 'react';
import '../assets/style/App.css';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import { API_URL } from '../config'

//import icons from fontawesome and react icon kit
import { Icon } from 'react-icons-kit';
import { person } from 'react-icons-kit/iconic/person';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { phone } from 'react-icons-kit/icomoon/phone'
import { location2 } from 'react-icons-kit/icomoon/location2'
import { ic_wysiwyg } from 'react-icons-kit/md/ic_wysiwyg'
import { location } from 'react-icons-kit/entypo/location'
import { ic_room } from 'react-icons-kit/md/ic_room';
import { map } from 'react-icons-kit/fa/map';
import { ic_mail } from 'react-icons-kit/md/ic_mail';
import { ic_home_work } from 'react-icons-kit/md/ic_home_work';
import { ic_domain } from 'react-icons-kit/md/ic_domain';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { following } from 'react-icons-kit/ikons/following'
import { followers } from 'react-icons-kit/ikons/followers'
import { pen_3 } from 'react-icons-kit/ikons/pen_3'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CancelBtnComp, SaveBtnComp } from '../components/AddUserBtn';
import { Box, Snackbar, TextField } from '@mui/material';
import MuiAlert from '@mui/material/Alert';



const EditProduct = () => {
    const { productid , productBatch} = useParams();
    console.log(productBatch);
    // const { productInfo } = useParams();
    // console.log(productInfo.productid);
    const userInfoString = sessionStorage.getItem("UserInfo");
    const userInfo = JSON.parse(userInfoString);
    // console.log(productid);

    // set var
    const [company_name, setcompanyname] = useState("");
    const [role_in_input, setrole_in_input] = useState("");
    const [site_name, setsitename] = useState("");
    const [email, setemail] = useState("");
    const [location_name, setlocationName] = useState("");
    const [site_address, setsiteaddress] = useState("");
    const [Desigination, setDesigination] = useState("");
    const [first_name, setfirstName] = useState("")
    const [last_name, setlastName] = useState("")
    const [contact, setcontact] = useState();
    const [mailstate, setmailstate] = useState(true);
    const [location_drop, setlocationNamedrop] = useState([]);

    const [admin_value, setadmin] = useState([]);
    const [roles_value, setroles_value] = useState([]);


    //  validation states
    const [company_nameerror, setcompanynameerror] = useState("");

    const [site_nameerror, setsitenameerror] = useState("");
    const [emailerror, setemailerror] = useState("");
    const [locationNameerror, setlocationNameerror] = useState("");
    const [site_addresserror, setsiteaddresserror] = useState("");
    const [Desiginationerror, setDesiginationerror] = useState("");
    const [firstNameerror, setfirstNameerror] = useState("");
    const [lastNameerror, setlastNameerror] = useState("");
    const [contacterror, setcontacterror] = useState("");
    const [checkemail, setcheckemail] = useState(false);

    // cancel script
    function handleCancel() {
        navigate(-1);
    }
    //redirect to device content page
    const navigate = useNavigate();
    // const [postData, setPostData] = useState({
    //     hsncode: '',
    //     quantity: '',
    //     priceperitem: '',
    //     productname: '',
    // });
    const [inputValues, setInputValues] = useState({
        productid: '',
        productname: '',
        quantity: '',
        priceperitem: '',
        batchno: '',
        CGST: '',
        SGCT: '',
    });
    // console.log(userInfo.userid);
    const userid = userInfo.userid;
    useEffect(() => {
        const device_user_data = async () => {
            // console.log(API_URL);
            try {
                const response = await axios.post(`${API_URL}get/product`, { userid, productid: productid ,batchno: productBatch});
                const data = response.data;
                // console.log(data.data.productid);
                // all_data_fun(data)
                const item = data.data;
                // console.log(item);
                setInputValues((prevValues) => ({
                    ...prevValues,
                    priceperitem: item.priceperitem,
                    productid: item.productid,
                    productname: item.productname,
                    quantity: item.quantity,
                    batchno: item.batchno,
                    CGST: item.cgst,
                    SGCT: item.sgst
                }));
                // console.log(inputValues);

            } catch (error) {
                console.error(error);
            }
        };
        device_user_data();
    }, [productid]);

    console.log(!(userInfo.position === 'staff' || userInfo.position === 'manifacture'));
    const inputFields = [
        { label: "HSN Code", name: "productid", value: inputValues.productid, icon: ic_home_work, disabled: true },
        { label: "Batch No", name: "batchno", value: inputValues.batchno, icon: person , disabled: true},
        { label: "Product Name", name: "productname", value: inputValues.productname, icon: person },
        { label: "Quantity", name: "quantity", value: inputValues.quantity, icon: person, disabled: !(userInfo.position === 'staff' || userInfo.position === 'manifacture') },
        { label: "Price Per Item", name: "priceperitem", value: inputValues.priceperitem, icon: person },
        { label: "CGST", name: "CGST", value: inputValues.CGST, icon: person },
        { label: "SGCT", name: "SGCT", value: inputValues.SGCT, icon: person }
    ]

    // const handleInputChange = (name, value) => {
    //     setInputValues((prevValues) => ({
    //         ...prevValues,
    //         [name]: value,
    //     }));
    //     console.log(name, value);
    // };
    //  const handleInputChange = (index, value) => {
    //     const fieldName = inputFields[index].name;
    //     setInputValues((prevValues) => ({
    //         ...prevValues,
    //         [fieldName]: value,
    //     }));
    //     console.log(fieldName, value);
    // };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // alert(name);
        // const fieldName = inputFields[index].name;
        setInputValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
    // console.log(inputValues);

    const [resAlert, setresAlert] = useState(null)
    const [submitted, setSubmitted] = useState(false);
    const handleSnackbarClose = () => {
        setSubmitted(false);
    };
    // validation
    const handleClick = async () => {
        const isValidhsncode = /^[0-9]+$/.test(inputValues.productid);
        const isValidbatchno = /^[0-9]+$/.test(inputValues.batchno);
        const isValidproductname = (inputValues.productname.trim() !== '');
        const isValidQuantityNo = /^[0-9]+$/.test(inputValues.quantity);
        const isValidpriceperitem = /^[0-9]+$/.test(inputValues.priceperitem);
        const isValidCGST = /^[0-9]+$/.test(inputValues.CGST);
        const isValidSGCT = /^[0-9]+$/.test(inputValues.SGCT);
        if (isValidhsncode & isValidbatchno & isValidproductname & isValidQuantityNo & isValidpriceperitem & isValidCGST & isValidSGCT) {
            try {
                // console.log("hai", inputValues);
                const response = await axios.put(`${API_URL}update/product`, { productdetial: inputValues, updator: userInfo.userid ,batchno: productBatch});
                // alert("response.data.message");
                // console.log(response.data.message);
                if (response.data.status) {
                    setresAlert(response.data.message);
                    setSubmitted(true);
                    if (response.data.status) {
                        setTimeout(() => {
                            navigate(-1);
                        }, 1000);
                    }
                } else {
                    alert(response.data.message)
                }
            } catch (error) {
                console.error('Error sending data:', error);
            }
        }
        else {
            if (isValidhsncode === false) {
                alert("Enter a valid HSN Code")
            }
            else if (isValidbatchno === false) {
                alert("Enter a valid Batch Number")
            }
            else if (isValidproductname === false) {
                alert("Enter a valid Product Name")
            }
            else if (isValidQuantityNo === false) {
                alert("Enter a valid Quantity Number")
            }
            else if (isValidpriceperitem === false) {
                alert("Enter a valid Price Detail")
            }
            else if (isValidCGST === false) {
                alert("Enter a valid CGST")
            }
            else if (isValidSGCT === false) {
                alert("Enter a valid SGST")
            }
        }
    }



    return (
        <div className='Add_device1 '>
            {/* Snack bar */}
            <Snackbar open={submitted} autoHideDuration={5000} onClose={handleSnackbarClose} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}>
                <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    {resAlert}
                </MuiAlert>
            </Snackbar>
            <div className="modal fade boot-modals" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable custom-modal-dialog">
                    <div className="modal-content width_of_model height_of_modal_content">
                        <div className="modal-header-confirm">
                            <h5 className="modal-title" id="exampleModalLabel">CONFIRMATION</h5>
                        </div>
                        <div className="modal-main-confirm">
                            <h5 className="modal-title ">Are you sure you want Exit?</h5>
                        </div>
                        <div className="modal-footer-confirm">
                            <button type="button" className="btn-loc active-loc" data-bs-dismiss="modal" onClick={handleCancel}>YES</button>
                            <button type="button" className="btn-loc inactive-loc" data-bs-dismiss="modal">NO</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="device_management display-flex page_top_box box-shadow">
                <span className='module_tittle '>Product Detials</span>
            </div>
            <div className="add_device_container1">
                <div className="new_device_content scroll_div">
                    <div className="row_one display-flex">
                        <div className="adding_new_device uppercase bold">Add Product Detials </div>
                    </div>

                    <div className="row_two display-flex padding-loc">
                        <div className="device_info uppercase light-grey mb-loc-5">
                            Product info
                        </div>
                        <div className="input-boxes">
                            <div className="cmpny_and_site_name display-flex">
                                {inputFields.slice(0, 4).map((field, index) => (
                                    <div key={index} className="inputbox display-flex input">
                                        <div className="dsa_1st_input">
                                            <Box className="inputs-group display-flex">
                                                <TextField
                                                    label={`${field.label}`}
                                                    type="text"
                                                    className="form-control-loc"
                                                    value={field.value}
                                                    onChange={handleInputChange}
                                                    name={field.name}
                                                    id={`input${index + 1}`}
                                                    disabled={field.disabled}
                                                    InputLabelProps={{
                                                        className: 'required-label',
                                                        required: true
                                                    }}
                                                />
                                            </Box>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="cmpny_and_site_name display-flex">
                                {inputFields.slice(4, 8).map((field, index) => (
                                    <div key={index} className="inputbox display-flex input">
                                        <div className="dsa_1st_input">
                                            <Box className="inputs-group display-flex">
                                                <TextField
                                                    label={`${field.label}`}
                                                    type="text"
                                                    className="form-control-loc"
                                                    value={field.value}
                                                    onChange={handleInputChange}
                                                    name={field.name}
                                                    id={`input${index + 1}`}
                                                    readOnly={field.readOnly || false}
                                                    InputLabelProps={{
                                                        className: 'required-label', 
                                                        required: true
                                                    }}
                                                />
                                            </Box>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="operating_buttons display-flex padding-loc">
                        <div className="save_cancel_btn display-flex site_button gap-4">
                            <CancelBtnComp CancelBtnFun={handleCancel} />
                            <SaveBtnComp SaveBtnFun={() => handleClick()} />
                        </div>
                    </div>
                </div>
            </div>
        </div >

    );
};
export default EditProduct;