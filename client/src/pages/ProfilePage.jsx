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

const ProfilePage = () => {
    const userInfoString = sessionStorage.getItem("UserInfo");
    const userInfo = JSON.parse(userInfoString);
    // console.log(userInfo);

    const [profileInfoRes, setprofileInfoRes] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userid = JSON.parse(sessionStorage.getItem("UserInfo")).userid;
                const response = await axios.post(`${API_URL}get/profileInfo`, { userid });
                setprofileInfoRes(response.data.data[0])
                userInfoFields.value = 'hao'
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, []);
    console.log(profileInfoRes);
    const userInfoFields = [
        { label: 'UserId', value: profileInfoRes ? profileInfoRes.userid : '' },
        // { label: 'Full name', value: userInfo.fname + {userInfo.lname == null ? '':userInfo.lname}},
        { label: 'Full name', value: profileInfoRes ? `${profileInfoRes.fname} ${profileInfoRes.lname || ''}` : '' },
        { label: 'Email', value: profileInfoRes ? profileInfoRes.email : '' },
        { label: 'Mobile Number', value: profileInfoRes ? profileInfoRes.phno : '' },
        { label: 'Aadhar Number', value: profileInfoRes ? profileInfoRes.aadhar : '' },
        { label: 'Pan Number', value: profileInfoRes ? profileInfoRes.pan : '' },
        { label: 'Address', value: profileInfoRes ? `${profileInfoRes.pstreetname || ''},${profileInfoRes.pdistrictid || ''},${profileInfoRes.pstateid || ''}  ` : '' },
        { label: 'Organization Name', value: profileInfoRes ? `${profileInfoRes.organizationname || ''}` : '' },
        { label: 'Bussiness Type', value: profileInfoRes ? `${profileInfoRes.bussinesstype || ''}` : '' },
        { label: 'Postal code', value: profileInfoRes ? `${profileInfoRes.ppostalcode || ''}` : '' },
        // Add more fields as needed
    ];
    const data = [
        { label: 'UPI ID', value: profileInfoRes ? `${profileInfoRes.upiid || ''}` : '' },
        { label: 'Bank Name', value: profileInfoRes ? `${profileInfoRes.bankname || ''}` : '' },
        { label: 'Bank Account Number', value: profileInfoRes ? `${profileInfoRes.bankaccno || ''}` : '' },
        // { label: 'Image',value:profileInfoRes ? `${profileInfoRes.passbookimg || ''}` : '' },
    ];

    return (
        <Container style={{ marginLeft: '53px' }}>
            <Grid container spacing={3} style={{ marginTop: '1rem' }}>

                {/* Top Section */}
                <Grid container spacing={2}>
                    {/* Left column for the image */}
                    <Grid item xs={12} md={6}>
                        <CardContent>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Avatar src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" sx={{ width: 150, height: 150 }} />
                            </div>
                        </CardContent>
                    </Grid>

                    {/* Right column for profile information */}
                    <Grid item xs={12} md={6}>
                        <CardContent>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography variant="h5" style={{ textTransform: 'capitalize' }}>{userInfo.position}</Typography>
                                <Typography variant="h4">{userInfo.name}</Typography>
                                <Typography variant="body1" style={{ color: 'black' }}>User ID: {userInfo.userid}</Typography>
                                <Typography variant="body2" style={{ color: 'black' }}>
                                    {profileInfoRes ? `${profileInfoRes.pstreetname || ''}, ${profileInfoRes.pdistrictid || ''}, ${profileInfoRes.pstateid || ''}` : ''}
                                </Typography>
                            </div>
                        </CardContent>
                    </Grid>
                </Grid>



                {/* Bottom Section */}
                <Grid item xs={12} md={8} md={{ order: 2 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" style={{ marginBottom: 20 }}>Profile Information</Typography>
                            <form>
                                <Grid container spacing={3}>
                                    {userInfoFields.map((field, index) => (
                                        <Grid item xs={12} md={6} key={index}>
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                margin="dense"
                                                value={field.value}
                                                label={field.label}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>

                    <Card style={{ marginTop: 20 }}>
                        <CardContent>
                            <Typography variant="h6" style={{ marginBottom: 20 }}>Additional Information</Typography>
                            <form>
                                <Grid container spacing={3}>
                                    {data.map((item, index) => (
                                        <Grid key={index} item xs={12} md={6}>
                                            <TextField
                                                label={item.label}
                                                fullWidth
                                                variant='outlined'
                                                type={item.type}
                                                margin='dense'
                                                value={item.value}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProfilePage;
