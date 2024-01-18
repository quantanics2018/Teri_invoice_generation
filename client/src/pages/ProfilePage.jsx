import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const ProfilePage = () => {
    const userInfoString = sessionStorage.getItem("UserInfo");
    const userInfo = JSON.parse(userInfoString);
    console.log(userInfo.userid);

    const userInfoFields = [
        { label: 'UserId', value: userInfo.userid },
        { label: 'Full name', value: userInfo.name },
        { label: 'Email', value: userInfo.email },
        { label: 'Full name', value: userInfo.phno },
        { label: 'Address', value: "Madurai" },
        { label: 'Pin code', value: "625019" },
        // Add more fields as needed
    ];

    return (
        <Container>
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
                                <Typography variant="h5">{userInfo.position}</Typography>
                                <Typography variant="h4">{userInfo.name}</Typography>
                                <Typography variant="body1" style={{ color: 'black' }}>User ID: {userInfo.userid}</Typography>
                                <Typography variant="body2" style={{ color: 'black' }}>Kalavasl, Madurai 619025</Typography>
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
                                    <Grid item xs={12} md={6}>
                                        <TextField label="UPI Payment Mobile Number" fullWidth variant="outlined" type="tel" margin="dense" />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField label="UPI - Bank Account Name" fullWidth variant="outlined" margin="dense" />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField label="UPI - Bank Account Number" fullWidth variant="outlined" margin="dense" />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField label="State" fullWidth variant="outlined" margin="dense" />
                                    </Grid>
                                    {/* Add more fields as needed */}
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
