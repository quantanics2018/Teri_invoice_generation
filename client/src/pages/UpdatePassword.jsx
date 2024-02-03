import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import invoiceLogo from '../assets/logo/invoiceLogo.png';
import { API_URL } from '../config';
import { UserActionBtn } from '../assets/style/cssInlineConfig';
import CryptoJS from 'crypto-js';

const UpdatePassword = () => {
    const [username, setUsername] = useState('');
    const [passwordInputval, setPasswordInputval] = useState('');
    const [password, setPassword] = useState('');
    const [handlepasswordInput_empty, sethandlepasswordInput_empty] = useState(false);
    const [password_empty, setpassword_empty] = useState(false);
    const [resAlert, setresAlert] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [submittedSuccess, setsubmittedSuccess] = useState(false);

    // const { encryptedtext } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSnackbarClose = () => {
        setSubmitted(false);
        setsubmittedSuccess(false);
    };

    const handleUserName = (event) => {
        setUsername(event.target.value.trim());
    };

    const handlepasswordInput = (event) => {
        setPasswordInputval(event.target.value.trim());
        sethandlepasswordInput_empty(false);
    };

    const handlepassword = (event) => {
        setPassword(event.target.value.trim());
        setpassword_empty(false);
    };
    // function decryptString(encryptedText, secretKey) {
    //     const decryptedData = CryptoJS.AES.decrypt(atob(decodeURIComponent(encryptedText)), secretKey);
    //     const decryptedText = decryptedData.toString(CryptoJS.enc.Utf8);
    //     return decryptedText;
    // }
    const params = new URLSearchParams(location.search);
    const encryptedtext = params.get('email');
    useEffect(() => {
        try {
            console.log(encryptedtext);
            console.log(encryptedtext);
            const secretKey = 'edf6537e67f256578bbb90b2adb1617622d6cbe49702b832c99c6feb8cce817c';
            const bytes = CryptoJS.AES.decrypt(atob(decodeURIComponent(encryptedtext)), secretKey);
            const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
            console.log(decryptedText);
            setUsername(decryptedText);
            return decryptedText;
        } catch (error) {
            console.error('Decryption error:', error.message);
            return null;
        }
    }, [location.search, setUsername]);

    // if (!username || !/^$|@gmail\.com$/.test(username)) {
    //     setresAlert('Enter Valid Username');
    //     setSubmitted(true);
    // } else 

    const validate_login = async () => {
        if (!passwordInputval) {
            setresAlert('Password can\'t be Null');
            setSubmitted(true);
        } else {
            if (passwordInputval === password) {
                console.log(passwordInputval);
                try {
                    const response = await axios.put(`${API_URL}update/password`, { username, passwordInputval, password });
                    if (response.data.status === 'notExist') {
                        setresAlert(response.data.message);
                        setSubmitted(true);
                    } else if (response.data.qos === 'success') {
                        setresAlert(response.data.message);
                        setsubmittedSuccess(true);
                        // setTimeout(() => navigate('/'), 1000);
                        navigate('/');
                        window.location.reload();

                    }
                } catch (error) {
                    console.error('Login failed:', error.message);
                }
            } else {
                setresAlert('Password and Re-Password doesn\'t match');
                setSubmitted(true);
            }
        }
    };

    return (
        <>
            <Snackbar open={submitted || submittedSuccess} autoHideDuration={5000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <MuiAlert onClose={handleSnackbarClose} severity={submittedSuccess ? 'success' : 'warning'} sx={{ width: '100%' }}>
                    {resAlert}
                </MuiAlert>
            </Snackbar>
            <div className='content'>
                <div className='digital_scan'>
                    <div className="all_inputs">
                        <div className="logo">
                            <img src={invoiceLogo} alt="Logo" />
                        </div>
                        <div className="credentials">
                            Set The Password
                            <div className='login_input_div'>
                                <TextField label="Password" type="password" className="form-control-loc" onBlur={() => sethandlepasswordInput_empty(!passwordInputval)} value={passwordInputval} onChange={handlepasswordInput} />
                                <div className="login_error-message">{handlepasswordInput_empty && 'Enter Valid Password'}</div>
                            </div>
                            <div className='login_input_div'>
                                <TextField label="Re-Password" type="password" className="form-control-loc" value={password} onChange={handlepassword} onBlur={() => setpassword_empty(!password)} />
                                <div className="login_error-message">{password_empty && 'Enter Valid Password'}</div>
                            </div>
                        </div>
                        <Button variant="contained" onClick={validate_login} style={UserActionBtn}>
                            Login
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdatePassword;
