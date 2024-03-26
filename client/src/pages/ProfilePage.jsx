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
import { Button,Box,Snackbar } from '@mui/material';
import Loader from '../components/Loader';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';



// import { getRandomValues } from 'crypto';

const ProfilePage = () => {


   

    const userInfoString = sessionStorage.getItem("UserInfo");
    const userInfo = JSON.parse(userInfoString);
 
    const userid = JSON.parse(sessionStorage.getItem("UserInfo")).userid;
    const [profileInfoRes, setprofileInfoRes] = useState({
        // id:userid,
        fname:'',
        lname:'',
        email:'',
        mobile:'',
        aadhar:'',
        pannumber:'',
        streetname:'',
        dname:'',
        sname:'',
        orgname:'',
        btype:'',
        pcode:''


    })

    const [fixed_data,setfixed_data] = useState({
        fname:'',
        lname:'',
        position:'',
        streetname:'',
        dname:'',
        sname:'',
        positionid:'',
    })
    useEffect(() => {
        const fetchData = async () => {
            try {
                // const userid = JSON.parse(sessionStorage.getItem("UserInfo")).userid;
                await axios.post(`${API_URL}get/profileInfo`, { userid }).then(res=>{
                    console.log("ajax data");
                    console.log(res.data.data[0]);
                    setprofileInfoRes({...profileInfoRes,
                        fname : res.data.data[0].fname,
                        lname:res.data.data[0].lname,
                        email: res.data.data[0].email,
                        mobile:res.data.data[0].phno,
                        aadhar: res.data.data[0].aadhar,
                        pannumber: res.data.data[0].pan,
                        streetname: res.data.data[0].pstreetname,
                        dname:res.data.data[0].pdistrictid,
                        sname:res.data.data[0].pstateid,
                        orgname: res.data.data[0].organizationname,
                        btype: res.data.data[0].bussinesstype,
                        pcode: res.data.data[0].cpostalcode,
                        position:res.data.data[0].position,
                    });


                    setfixed_data({...fixed_data,
                        fname:res.data.data[0].fname,
                        lname:res.data.data[0].lname,
                        position:res.data.data[0].position,
                        streetname:res.data.data[0].pstreetname,
                        dname:res.data.data[0].pdistrictid,
                        sname:res.data.data[0].pstateid,
                        pcode: res.data.data[0].cpostalcode,
                        positionid:res.data.data[0].positionid,
                    });
                    // userInfoFields.value = 'hao'
                    if (res.data.data[0].positionid==="1") {
                        setmanufacture(true);
                        console.log("position id is  manufacturer");
                    }else{
                        setmanufacture(false);
                        console.log("position id is not manufacturer");
                    }
                });
               
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, []);
    console.log("profile data ajax data");
    console.log(profileInfoRes);
    const userInfoFields = [
        // { label: 'UserId',fieldname:'id'},
        // { label: 'Full name', value: userInfo.fname + {userInfo.lname == null ? '':userInfo.lname}},
        { label: 'First Name',fieldname:'fname'},
        { label: 'Last Name',fieldname:'lname'},
        { label: 'Email',fieldname:'email'},
        { label: 'Mobile Number',fieldname:'mobile'},
        { label: 'Aadhar Number',fieldname:'aadhar'},
        { label: 'Pan Number',fieldname:'pannumber'},
        { label: 'Street Name',fieldname:'streetname'},
        { label: 'District Name',fieldname:'dname'},
        { label: 'State Name',fieldname:'sname'},
        { label: 'Organization Name',fieldname:'orgname'},
        { label: 'Bussiness Type',fieldname:'btype'},
        { label: 'Postal code' ,fieldname:'pcode'},
        // Add more fields as needed
    ];
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
    const handleSubmit = async (event) =>{
        event.preventDefault()

        const userId = userid.trim();

        const isValiduserid = userId !== '' && /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(userId);
        const isValidaadharNo = /^\d{12}$/.test(profileInfoRes.aadhar)
        const isValidfName = /^[A-Za-z\s'-]+$/.test(profileInfoRes.fname)
        const isValidlName = /^[A-Za-z\s'-]+$/.test(profileInfoRes.lname)
        const isValidemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileInfoRes.email)
        const isValidMobileNo = /^\d{10}$/.test(profileInfoRes.mobile)
        const isValidbussinessType = (profileInfoRes.btype === 'Organization' || profileInfoRes.btype === 'Individual');
        const isValidOrgName = profileInfoRes.orgname.trim() !== '';
        const isValidpanNumber = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(profileInfoRes.pannumber);
        const isValidstreetAddress = profileInfoRes.streetname.trim() !== '';
        const isValidCity = profileInfoRes.dname.trim() !== '';
        const isValidState = profileInfoRes.sname.trim() !== '';
        const isValidpCode = profileInfoRes.pcode.trim() !== '';

        if(isValiduserid && isValidaadharNo && isValidfName && isValidlName && isValidemail && isValidMobileNo 
            && isValidbussinessType && isValidOrgName && isValidpanNumber && isValidstreetAddress && isValidCity
            && isValidState && isValidpCode)
        {
            // alert(isValiduserid+" the userid is:\t"+userId);
            // setSubmitted(true);
            try{

                setLoading(true);
                const response = await axios.put(`${API_URL}profile_udpate/user`, { userId:userId,userDetails: profileInfoRes });
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
            catch(error){
                console.log("profile page updation ajax error");
                console.log(error);
            }

        }else{
            if (!isValiduserid) {
                setresAlert("UserID Field is Empty");
                setSubmitted(true);
            }

            if (!isValidaadharNo) {
                setresAlert("Aadhar Number Field is Empty");
                setSubmitted(true);
            }


            if (!isValidfName) {
                setresAlert("First Name Field is Empty");
                setSubmitted(true);
            }

            if (!isValidlName) {
                setresAlert("Last Name Field is Empty");
                setSubmitted(true);
            }
            if (!isValidemail) {
                setresAlert("Email Field is Empty");
                setSubmitted(true);
            }
            if (!isValidMobileNo) {
                setresAlert("MObile Number Field is Empty");
                setSubmitted(true);
            }
            if (!isValidbussinessType) {
                setresAlert("Bussiness Type Field is Empty");
                setSubmitted(true);
            }
            if (!isValidOrgName) {
                setresAlert("Organization Name Field is Empty");
                setSubmitted(true);
            }

            if (!isValidpanNumber) {
                setresAlert("Pan Number Field is Empty");
                setSubmitted(true);
            }
            if (!isValidstreetAddress) {
                setresAlert("Street Name Field is Empty");
                setSubmitted(true);
            }
            if (!isValidCity) {
                setresAlert("City Field is Empty");
                setSubmitted(true);
            }
            if (!isValidState) {
                setresAlert("State Field is Empty");
                setSubmitted(true);
            }

            if(!isValidpCode){
                setresAlert("Postal Code is Empty")
            }
            
        }


    }
   
    const handleSnackbarClose = () => {
        setSubmitted(false);
    };

    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);

    const [ismanufacture,setmanufacture] = useState(false);

    return (
        <>
        {loading && <Loader />}
        {/* Snack bar */}
        <Snackbar open={submitted} autoHideDuration={5000} onClose={handleSnackbarClose} anchorOrigin={{vertical: 'bottom',horizontal: 'right',}}>
            <MuiAlert onClose={handleSnackbarClose} severity="warning" sx={{ width: '100%' }}>
                {resAlert}
            </MuiAlert>
        </Snackbar>
        <Container style={{ marginLeft: '53px' }}>
            <Grid container spacing={3} style={{ marginTop: '1rem' }}>

                {/* Top Section */}
                <Grid container spacing={2}>
                    {/* Left column for the image */}
                    <Grid item xs={12} md={6}>
                        <CardContent>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',filter: 'drop-shadow(0px 0px 3px red)'}}>
                                <Avatar src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" sx={{ width: 150, height: 150 }} />
                            </div>
                        </CardContent>
                    </Grid>

                    {/* Right column for profile information */}
                    <Grid item xs={12} md={6}>
                        <CardContent>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography variant="h5" style={{ textTransform: 'capitalize' }}>{fixed_data.position}</Typography>
                                {console.log("user info data position:\t"+fixed_data.position)}
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

                                    {userInfoFields.map((field, index) => (
                                        
                                        <Grid item xs={12} md={6} key={index} >
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
                                        </Grid> 
                                    ))}
                                </Grid>
                                {ismanufacture  && 
                                <Box width={'100%'} margin={'1rem'} sx={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                    <Button variant="contained" width={'100%'} onClick={(e)=>handleSubmit(e)}>Update Data</Button>
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
