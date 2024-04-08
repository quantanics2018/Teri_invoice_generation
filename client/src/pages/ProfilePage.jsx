import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { API_URL } from '../config';
import { Button, Box, Snackbar } from '@mui/material';
import Loader from '../components/Loader';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import bootstrapMin from 'bootstrap/dist/js/bootstrap.min';
import { df } from '../assets/style/mailInlineCss';
import { SaveBtn } from '../assets/style/cssInlineConfig';



// import { getRandomValues } from 'crypto';

const ProfilePage = () => {


    const updatedInputField = [];

    const userInfoString = sessionStorage.getItem("UserInfo");
    const userInfo = JSON.parse(userInfoString);
    console.log("user info in session");
    console.log(userInfo);
    const userid = JSON.parse(sessionStorage.getItem("UserInfo")).userid;
    const [profileInfoRes, setprofileInfoRes] = useState({
        // id:userid,
        fname: '',
        lname: '',
        email: '',
        mobile: '',
        aadhar: '',
        pannumber: '',
        streetname: '',
        dname: '',
        sname: '',
        orgname: '',
        btype: '',
        pcode: '',

        bname: '',
        acno: '',
        ifsc_code: '',
        achname: '',
        upi_id: '',
        gstno: '',


    })

    const [fixed_data, setfixed_data] = useState({
        fname: '',
        lname: '',
        position: '',
        streetname: '',
        dname: '',
        sname: '',
        positionid: '',
    })
    useEffect(() => {
        const fetchData = async () => {
            try {
                // const userid = JSON.parse(sessionStorage.getItem("UserInfo")).userid;
                await axios.post(`${API_URL}get/profileInfo`, { userid }).then(res => {
                    console.log("ajax data");
                    console.log(res.data.data[0]);
                    setprofileInfoRes({
                        ...profileInfoRes,
                        fname: res.data.data[0].fname,
                        lname: res.data.data[0].lname,
                        email: res.data.data[0].email,
                        mobile: res.data.data[0].phno,
                        aadhar: res.data.data[0].aadhar,
                        pannumber: res.data.data[0].pan,
                        streetname: res.data.data[0].pstreetname,
                        dname: res.data.data[0].pdistrictid,
                        sname: res.data.data[0].pstateid,
                        orgname: res.data.data[0].organizationname,
                        btype: res.data.data[0].bussinesstype,
                        pcode: res.data.data[0].cpostalcode,
                        position: res.data.data[0].position,
                        positionid: res.data.data[0].positionid,

                        bname: res.data.data[0].bankname,
                        acno: res.data.data[0].bankaccno,
                        ifsc_code: res.data.data[0].ifsccode,
                        achname: res.data.data[0].accholdername,
                        upi_id: res.data.data[0].upiid,
                        gstno: res.data.data[0].gstnno,
                    });


                    setfixed_data({
                        ...fixed_data,
                        fname: res.data.data[0].fname,
                        lname: res.data.data[0].lname,
                        position: res.data.data[0].position,
                        streetname: res.data.data[0].pstreetname,
                        dname: res.data.data[0].pdistrictid,
                        sname: res.data.data[0].pstateid,
                        pcode: res.data.data[0].cpostalcode,
                        positionid: res.data.data[0].positionid,
                    });
                    // userInfoFields.value = 'hao'
                    if (res.data.data[0].positionid === "1") {
                        setmanufacture(true);
                        console.log("position id is  manufacturer");
                    } else {
                        setmanufacture(false);
                        console.log("position id is not manufacturer");
                    }
                    if (res.data.data[0].positionid === "2") {
                        setdistributor(true);
                    } else {
                        setdistributor(false);
                    }

                    if (res.data.data[0].positionid === "1" || res.data.data[0].positionid === "2" || res.data.data[0].positionid === "3") {
                        setInputChange(true);
                    }
                    else if (res.data.data[0].positionid === "4" || res.data.data[0].positionid === "5") {
                        setInputChange(false);
                    }


                });

            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, []);
    // console.log("profile data ajax data");
    // console.log(profileInfoRes);
    console.log(userInfo.positionid);

    if (userInfo.positionid === 1 || userInfo.positionid === 2 || userInfo.positionid === 3) {
        updatedInputField = userInfoFields.slice(0, userInfoFields.length);
    } else if (userInfo.positionid === 4 || userInfo.positionid === 5) {
        updatedInputField = userInfoFields.slice(0, userInfoFields.length - 8);
    }

    const userInfoFields = [
        // { label: 'UserId',fieldname:'id'},
        // { label: 'Full name', value: userInfo.fname + {userInfo.lname == null ? '':userInfo.lname}},
        { label: 'First Name', fieldname: 'fname' },
        { label: 'Last Name', fieldname: 'lname' },
        { label: 'Email', fieldname: 'email' },
        { label: 'Mobile Number', fieldname: 'mobile' },
        { label: 'Aadhar Number', fieldname: 'aadhar' },
        { label: 'Pan Number', fieldname: 'pannumber' },
        { label: 'Street Name', fieldname: 'streetname' },
        { label: 'District Name', fieldname: 'dname' },
        { label: 'State Name', fieldname: 'sname' },
        { label: 'Organization Name', fieldname: 'orgname' },
        { label: 'Bussiness Type', fieldname: 'btype' },
        { label: 'Postal code', fieldname: 'pcode' },

        { label: 'Bank Name', fieldname: 'bname' },
        { label: 'Account No', fieldname: 'acno' },
        { label: 'IFSC Code', fieldname: 'ifsc_code' },
        { label: 'Account Holder Name', fieldname: 'achname' },
        { label: 'UPI Id', fieldname: 'upi_id' },
        { label: 'GST Number', fieldname: 'gstno' },
        { label: 'Signature', fieldname: 'Signature', fieldType: 'file' },

        // Add more fields as needed
    ];
    const staff_input_fields = [
        { label: 'First Name', fieldname: 'fname' },
        { label: 'Last Name', fieldname: 'lname' },
        { label: 'Email', fieldname: 'email' },
        { label: 'Mobile Number', fieldname: 'mobile' },
        { label: 'Aadhar Number', fieldname: 'aadhar' },
        { label: 'Signature', fieldname: 'Signature', fieldType: 'file' },

    ]
    const data = [
        { label: 'UPI ID', value: profileInfoRes ? `${profileInfoRes.upiid || ''}` : '' },
        { label: 'Bank Name', value: profileInfoRes ? `${profileInfoRes.bankname || ''}` : '' },
        { label: 'Bank Account Number', value: profileInfoRes ? `${profileInfoRes.bankaccno || ''}` : '' },
        // { label: 'Image',value:profileInfoRes ? `${profileInfoRes.passbookimg || ''}` : '' },
    ];


    // handle input change
    const handleInputchange = (event) => {
        const { name, value, type } = event.target;
        setprofileInfoRes({
            ...profileInfoRes,
            [name]: event.target.value, // Use the file from the input
        });
    }


    // profile data onsubmit function
    const [loading, setLoading] = useState(false);
    const [resAlert, setresAlert] = useState(null)
    const handleSubmit = async (event) => {
        event.preventDefault()

        const userId = userid.trim();

        // valid field testing
        const isValiduserid = userId !== '' && /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(userId);
        const isValidaadharNo = /^\d{12}$/.test(profileInfoRes.aadhar)
        const isValidfName = /^[A-Za-z\s'-]+$/.test(profileInfoRes.fname)
        const isValidlName = /^[A-Za-z\s'-]+$/.test(profileInfoRes.lname)
        const isValidemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileInfoRes.email)
        const isValidMobileNo = /^\d{10}$/.test(profileInfoRes.mobile)
        const isValidbussinessType = (profileInfoRes.btype === 'Organization' || profileInfoRes.btype === 'Individual');
        const isValidpanNumber = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(profileInfoRes.pannumber);

        // empty checking 
        const isValidOrgName = profileInfoRes.orgname.trim() !== '';
        const isValidstreetAddress = profileInfoRes.streetname.trim() !== '';
        const isValidCity = profileInfoRes.dname.trim() !== '';
        const isValidState = profileInfoRes.sname.trim() !== '';
        const isValidpCode = profileInfoRes.pcode.trim() !== '';

        const isValidupiPaymentNo = profileInfoRes.upi_id.trim() !== '';
        const isValidaccName = profileInfoRes.bname.trim() !== '';
        const isValidaccHolderName = profileInfoRes.achname.trim() !== '';
        const isValidaccNo = (/^\d*$/.test(profileInfoRes.acno) & profileInfoRes.acno.trim() !== '');
        const isValidifscCode = profileInfoRes.ifsc_code.trim() !== '';
        const isValidgstNumber = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(profileInfoRes.gstno);

        if (isValiduserid && isValidaadharNo && isValidfName && isValidlName && isValidemail && isValidMobileNo
            && isValidbussinessType && isValidOrgName && isValidpanNumber && isValidstreetAddress && isValidCity
            && isValidState && isValidpCode && isValidupiPaymentNo && isValidaccName && isValidaccHolderName && isValidaccNo
            && isValidifscCode && isValidgstNumber) {
            // alert(isValiduserid+" the userid is:\t"+userId);
            // setSubmitted(true);
            try {

                setLoading(true);
                const response = await axios.put(`${API_URL}profile_udpate/user`, { userId: userId, userDetails: profileInfoRes });
                console.log("ajax response for profile updation");
                console.log(response.data.status);
                if (response.data.status) {
                    setresAlert(response.data.message);
                    setSubmitted(true);
                    if (response.data.status) {
                        // setTimeout(() => {
                        setLoading(false);
                        // alert("Update Profile Data");
                        // }, 1000);
                    }
                } else {
                    alert(response.data.message)
                }
            }
            catch (error) {
                console.log("profile page updation ajax error");
                console.log(error);
            }

        } else {

            const fiedl_validation_arr = [
                { isValid: isValiduserid, message: 'Valid UserID !!' },
                { isValid: isValidaadharNo, message: 'Valid Aadhar Number !!' },
                { isValid: isValidfName, message: 'Valid First Name !!' },
                { isValid: isValidlName, message: 'Valid Last Name !!' },
                { isValid: isValidemail, message: 'Valid Email !!' },
                { isValid: isValidMobileNo, message: 'Valid Mobile Number !!' },
                { isValid: isValidbussinessType, message: 'Valid BussinessType !!' },
                { isValid: isValidOrgName, message: 'Valid Organization !!' },
                { isValid: isValidpanNumber, message: 'Valid Pan Number !!' },
                { isValid: isValidstreetAddress, message: 'Valid Street Name !!' },
                { isValid: isValidCity, message: 'Valid City !!' },
                { isValid: isValidState, message: 'Valid State !!' },
                { isValid: isValidpCode, message: 'Valid Postal Code' },

                { isValid: isValidupiPaymentNo, message: 'Valid UPI ID Number' },
                { isValid: isValidaccName, message: 'Valid Bank Name' },
                { isValid: isValidaccHolderName, message: 'Valid Account Holder Namer' },
                { isValid: isValidaccNo, message: 'Valid Account Number' },
                { isValid: isValidifscCode, message: 'Valid IFSC Code Number' },
                { isValid: isValidgstNumber, message: 'Valid GST Number' },

            ];

            // valid field checking 
            fiedl_validation_arr.forEach(field => {
                if (!field.isValid) {
                    setresAlert(field.message);
                    setSubmitted(true);
                }
            });

        }

    }

    const handleSnackbarClose = () => {
        setSubmitted(false);
    };

    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);

    const [isdistributor, setdistributor] = useState(false);
    const [ismanufacture, setmanufacture] = useState(false);
    const [isInputchange, setInputChange] = useState(true);
    const [file, setFile] = useState(null);

    const isImageValid = (file) => {
        // console.log(file); 
        if (!file) {
            return false; // No file present
        }
        if (typeof file === 'string') {
            const allowedFormats = ['png'];
            const fileExtension = file.split('.').pop().toLowerCase();
            if (!allowedFormats.includes(fileExtension)) {
                return false; // File format not allowed
            }
        } else {
            const allowedFormats = ['png'];
            const fileExtension = file.name.split('.').pop().toLowerCase();
            if (!allowedFormats.includes(fileExtension)) {
                return false; // File format not allowed
            }
            const maxSizeInBytes = 10 * 1024 * 1024; // 10 MB
            if (file.size > maxSizeInBytes) {
                return false; // File size exceeds the limit
            }
        }
        return true;
    };

    const handleFileChanges = (e) => {
        setFile(e.target.files[0]);
    };
    const formData = new FormData();
    formData.append('image', file);
    formData.append('imageName', userInfo.userid);

    const updateSignApi = async () => {
        const isImagePresent = isImageValid(file);
        console.log("isImagePresent :", isImagePresent);

        if (isImagePresent) {
            const response = await axios.post(`${API_URL}upload`,
                formData
            );
            console.log(response.data.status);
            if (response.data.status) {
                const modal = document.querySelector('.modal');
                if (modal) {
                    modal.classList.remove('show');
                    modal.setAttribute('aria-hidden', 'true');
                    modal.setAttribute('style', 'display: none');
                    const modalBackdrop = document.querySelector('.modal-backdrop');
                    if (modalBackdrop) {
                        modalBackdrop.remove();
                        document.body.style.overflow = 'auto';
                    }
                }
                setresAlert(response.data.message);
                setSubmitted(true);
            }
        } else {
            alert("File type should be PNG and less than 10mb")
        }
    }
    const [UpdateBtnSts, SetUpdateBtnStatus] = useState(true);

    const acceptanceCheckBox = () => {
        // SetUpdateBtnStatus(!e.target.checked);
        const checkbox = document.querySelector('#acceptance');
        console.log(file !== null);
        console.log(checkbox.checked);
        if (checkbox.checked) {
            SetUpdateBtnStatus(false)
        } else {
            SetUpdateBtnStatus(true)
        }
    }


    const dailoge = {
        // maxWidth: 'auto',
        marginRight: '0',
        marginLeft: '0',
        backgroundColor:'red',
        position :'absolute',
        // top :'50%',
        left :'20%'
    }

    return (
        <>
            {loading && <Loader />}
            {/* Snack bar */}
            <Snackbar open={submitted} autoHideDuration={5000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}>
                <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    {resAlert}
                </MuiAlert>
            </Snackbar>
            {/* End  of snack bar */}
            {/* Start Sign popup modal */}
            <div class="modal fade" id="SignatureModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" 
                // style={dailoge}
                >
                    <div class="modal-content"
                    // style={{ width: '80vw', marginLeft: '-15rem' }}
                    >
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Terms and conditions for obtaining a digital signature</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <Box sx={{ display: 'flex', direction: 'row', alignItems: 'center', justfiyContent: 'center' }}>
                                <Typography sx={{ marginLeft: '0.5rem', marginRight: '1rem' }} style={{ fontSize: "12px" }}>
                                    1. <b>Digital Signature Acceptance:</b> By providing your digital signature, you acknowledge that it has the same legal standing as your handwritten signature and signifies your acceptance of the document or transaction.
                                    <br /><br />
                                    2. <b>Authorization and Consent:</b> You authorize <b>Terion Organization</b> to use your digital signature for the specified purpose outlined in the document. Your digital signature confirms your agreement to the terms and conditions associated with the document.
                                    <br /><br />
                                    3. <b>Security Responsibilities:</b> We are responsible for maintaining the security and confidentiality of your digital signature. Do not share or disclose your digital signature to any unauthorized person or entity.
                                    <br /><br />
                                    4. <b>Legal Validity:</b> Your digital signature meets legal requirements for authenticity and integrity. It may be relied upon as evidence of your identity and agreement to contractual terms.
                                    <br /><br />
                                    5. <b>Revocation and Termination:</b> You have the right to revoke or terminate your digital signature at any time by following the procedures specified by <b>Terion Organization</b>. Upon revocation or termination, certain services may be restricted.
                                    <br /><br />
                                    6. <b>Limitation of Liability:</b> <b>Terion Organization</b> shall not be liable for damages arising from the unauthorized use of your digital signature. You agree to indemnify and hold <b>Terion Organization</b> harmless from any claims arising from such use.
                                    <br /><br />
                                    7. <b>Governing Law:</b> This agreement is <span style={{ color: "red" }}>Governed by the laws of Indian Constituion.</span> Disputes shall be resolved exclusively by the courts of Indian Constituion.
                                    <br /><br />
                                    8. <b>Usage Instructions:</b> Upon providing your digital signature, please proceed to [specific instructions on what action to take next, e.g., submit the form, complete the transaction, etc.].
                                    <br /><br />
                                    9. <b>Confirmation Email:</b> Once your digital signature is received and processed, you will receive a confirmation email containing details of the transaction and a copy of the signed document for your records.
                                    <br /><br />
                                    10. <b>Data Protection:</b> We are committed to protecting your personal information. Any data collected during the digital signature process will be handled in accordance with our Privacy Policy
                                    {/* (link-to-privacy-policy). */}
                                    <br /><br />
                                    11. <b>Feedback and Support:</b> Your feedback is valuable to us. If you encounter any issues or have suggestions for improvement regarding the digital signature process, please feel free to contact our support team
                                    {/* (support-contact-info). */}
                                    <br /><br />
                                    12. <b>Continued Use:</b> By providing your digital signature, you acknowledge that you have read, understood, and agreed to abide by our Terms of Service
                                    {/* (link-to-terms-of-service)  */}
                                    and all relevant policies and agreements.
                                    <br /><br />
                                    Thank you once again for choosing <b>Terion Organization</b>. We appreciate your trust and confidence in our services.
                                    <br /><br />
                                    <input type="checkbox" name="acceptance" id="acceptance" onChange={acceptanceCheckBox} /> {'  '}
                                    By providing your digital signature, you indicate your <span style={{ color: "red" }}>understanding and acceptance of these terms and conditions.</span> If you do not agree with any part of this agreement, please refrain from providing your digital signature.
                                    <br /><br />


                                    <input type="file" onChange={handleFileChanges} />
                                </Typography>
                                {/* <button onClick={handleUpload}>Upload Image</button> */}
                            </Box>
                        </div>
                        <div class="modal-footer" style={{ ...df, gap: '1rem' }}>
                            {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                            <Button type="button" variant='outlined' color='warning' data-bs-dismiss="modal">Cancel</Button>
                            <Button type="button" variant='outlined' color='success' onClick={updateSignApi}
                                //  data-bs-dismiss="modal"
                                disabled={UpdateBtnSts}>Update</Button>
                            {/* <button type="button" className="btn btn-primary" onClick={updateSignApi}
                                //  data-bs-dismiss="modal"
                                disabled={UpdateBtnSts}>Update</button> */}
                        </div>
                    </div>
                </div>
            </div>


            {/* end Sign popup modal */}

            {/* <Container style={{ marginLeft: '53px' }}> */}
            <Container>
                <Grid container spacing={3} style={{ marginTop: '1rem' }}>

                    {/* Top Section */}
                    <Grid container spacing={2}>
                        {/* Left column for the image */}
                        <Grid item xs={12} md={6}>
                            <CardContent>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', filter: 'drop-shadow(0px 0px 3px red)' }}>
                                    <Avatar src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" sx={{ width: 150, height: 150 }} />
                                </div>
                            </CardContent>
                        </Grid>

                        {/* Right column for profile information */}
                        <Grid item xs={12} md={6}>
                            <CardContent>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    {/* <Typography variant="h5" style={{ textTransform: 'capitalize' }}>{fixed_data.position}</Typography> */}
                                    <Typography variant="h5" style={{ textTransform: 'capitalize' }}>
                                        {/* {fixed_data.data.data[0].positionid === '1' && 'Manufacturer'} */}
                                        {/* {console.log("Test data",fixed_data)}
                                        {fixed_data.positionid=== '1' && 'Manufacturer'}
                                        {fixed_data.positionid=== '2' && 'Distributor'}
                                        {fixed_data.positionid=== '3' && 'Customer'}
                                        {fixed_data.positionid=== '4' && 'Staff'}
                                        {fixed_data.positionid=== '5' && 'Distributor Staff'} */}
                                        {fixed_data.position}
                                    </Typography>
                                    {console.log("user info data position:\t" + fixed_data.position)}

                                    <Typography variant="h4">{fixed_data.fname} {fixed_data.lname}</Typography>
                                    <Typography variant="body1" style={{ color: 'black' }}>User ID: {userid}</Typography>
                                    <Typography variant="body2" style={{ color: 'black' }}>
                                        {fixed_data.streetname} {fixed_data.dname} , {fixed_data.sname} - {fixed_data.pcode}
                                    </Typography>
                                </div>
                            </CardContent>
                        </Grid>
                    </Grid>



                    {/* Bottom Section */}
                    <Grid item xs={12} md={8} spaceing={1} display={'contents'}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" style={{ marginBottom: 20 }}>Profile Information</Typography>
                                <form >
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} md={6} key={0} >
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                margin="dense"
                                                InputLabelProps={{ shrink: true }}
                                                value={userid}
                                                label="UserId"
                                                disabled={true}
                                            />
                                        </Grid>

                                        {isInputchange && userInfoFields.map((field, index) => (

                                            <Grid item xs={12} md={6} key={index} >
                                                {field.fieldType === 'file' ? (
                                                    <Button type="button" variant='outlined' data-bs-toggle="modal" data-bs-target="#SignatureModal" style={{ marginTop: '20px' }}> Update sign </Button>
                                                ) : (
                                                    <TextField
                                                        fullWidth
                                                        variant="outlined"
                                                        margin="dense"
                                                        InputLabelProps={{ shrink: true }}
                                                        value={profileInfoRes[field.fieldname]}
                                                        defaultValue={profileInfoRes[field.fieldname]}
                                                        // onChange={(e)=>{setprofileInfoRes({[field.fieldname] : e.target.value})}}
                                                        onChange={handleInputchange}
                                                        name={field.fieldname}
                                                        label={`${field.label}`}
                                                        // disabled={!ismanufacture && !isdistributor && field.fieldname== 'fname'}
                                                        disabled={((ismanufacture && (field.fieldname === 'email')) || (isdistributor && (field.fieldname === 'fname' || field.fieldname === 'lname' || field.fieldname === 'orgname' || field.fieldname === 'btype' || field.fieldname === 'gstno' || field.fieldname === 'email'))) || (userInfo.positionid === "3" || userInfo.positionid === "4" || userInfo.positionid === "5")}
                                                    />
                                                )}

                                            </Grid>
                                        ))}

                                        {/* if staff login and view profile page it does not show entire field is list out some fields only */}
                                        {!isInputchange && staff_input_fields.map((field, index) => (
                                            <Grid item xs={12} md={6} key={index} >
                                                {field.fieldType === 'file' ? (
                                                    <Button type="button" variant='outlined' data-bs-toggle="modal" data-bs-target="#SignatureModal"> Update sign </Button>
                                                ) : (
                                                    <TextField
                                                        fullWidth
                                                        variant="outlined"
                                                        margin="dense"
                                                        InputLabelProps={{ shrink: true }}
                                                        value={profileInfoRes[field.fieldname]}
                                                        defaultValue={profileInfoRes[field.fieldname]}
                                                        // onChange={(e)=>{setprofileInfoRes({[field.fieldname] : e.target.value})}}
                                                        onChange={handleInputchange}
                                                        name={field.fieldname}
                                                        label={field.label}
                                                        disabled={!ismanufacture}
                                                    />
                                                )}

                                            </Grid>

                                        ))}

                                    </Grid>
                                    {/* {ismanufacture &&
                                        <Box width={'100%'} margin={'1rem'} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                            <Button variant="contained" width={'100%'} onClick={(e) => handleSubmit(e)}>Update Data</Button>
                                        </Box>
                                    } */}
                                    {ismanufacture &&
                                        <Box width={'100%'} margin={'1rem'} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                            <Button variant="contained" width={'100%'} onClick={(e) => handleSubmit(e)}>Update Data</Button>
                                        </Box>
                                    }
                                    {isdistributor &&
                                        <Box width={'100%'} margin={'1rem'} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                            <Button variant="contained" width={'100%'} onClick={(e) => handleSubmit(e)}>Update Data</Button>
                                        </Box>
                                    }

                                </form>
                            </CardContent>
                        </Card>


                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default ProfilePage;
