import invoiceLogo from '../assets/logo/invoiceLogo.png';
import { useState, useEffect } from 'react';
import { API_URL } from '../config'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { Button, Snackbar } from '@mui/material';
import { UserActionBtn } from '../assets/style/cssInlineConfig';
import MuiAlert from '@mui/material/Alert';

const UpdatePassword = (props) => {

    const [username, setUsername] = useState("");
    const [passwordInputval, setPasswordInputval] = useState("");
    const [password, setPassword] = useState("");
    const [invalid_state, setinvalidstate] = useState(false);
    const [inactive_user, setinactive_user] = useState(false);
    const [inactive_site, setinactive_site] = useState(false);
    const [username_empty, setusername_empty] = useState(false);
    const [handlepasswordInput_empty, sethandlepasswordInput_empty] = useState(false);
    const [password_empty, setpassword_empty] = useState(false);


    const handleUserName = (event) => {
        const Username = event.target.value;
        setUsername(Username);
        setusername_empty(false)
    };
    const handlepasswordInput = (event) => {
        const Password1Val = event.target.value;
        setPasswordInputval(Password1Val);
        sethandlepasswordInput_empty(false)
    };
    const handlepassword = (event) => {
        const password = event.target.value;
        setPassword(password)
        setpassword_empty(false)
    }

    const navigate = useNavigate();
    const LoginUsername = () => {
        if (username === "" || !(/^$|@gmail\.com$/.test(username))) {
            setinactive_user(false);
            setinvalidstate(false);
            setinactive_site(false)
            setusername_empty(true)
        }
    }
    const passwordInput = () => {
        if (passwordInputval === "") {
            setinactive_user(false);
            setinvalidstate(false);
            setinactive_site(false)
            sethandlepasswordInput_empty(true)
        }
    }
    const LoginPassword = () => {
        if (password === "") {
            setinactive_user(false);
            setinvalidstate(false);
            setinactive_site(false)
            setpassword_empty(true)
        }
    }
    const [resAlert, setresAlert] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [submittedSuccess, setsubmittedSuccess] = useState(false);
    const handleSnackbarClose = () => {
        setSubmitted(false);
        setsubmittedSuccess(false);
    };
    const validate_login = async () => {
        const body = { username, passwordInputval, password };
        body.username = body.username.trim();
        body.passwordInputval = body.passwordInputval.trim();
        body.password = body.password.trim();
        // console.log(body);
        if (username === "" || !(/^$|@gmail\.com$/.test(username))) {
            setresAlert("Enter Valid Username")
            setSubmitted(true);
            // alert("Enter Valid Username")
        } else if (passwordInputval === "" || password === "") {
            setresAlert("Password can't be Null")
            setSubmitted(true);
            // alert("Password can't be Null")
        }
        else {
            if (passwordInputval === password) {
                try {
                    const response = await axios.put(`${API_URL}update/password`, body);
                    // console.log(response.data.status);
                    if (response.data.status === 'notExist') {
                        setresAlert(response.data.message);
                        setSubmitted(true);
                        // alert(response.data.message);
                    } else if (response.data.qos === 'success') {
                        setresAlert(response.data.message);
                        setsubmittedSuccess(true);
                        // alert(response.data.resStatus);
                        setTimeout(() => {
                            navigate('/');
                        }, 1000);
                    }

                } catch (error) {
                    console.error('Login failed:', error.message);
                }

            } else {
                setresAlert("Password and Re-Password doesn't match");
                setSubmitted(true);
            }
        }

    };
    // useEffect(() => {
    //     validate_login();
    // }, []);
    // const btnStyle = { backgroundColor: 'red', color: 'white', borderRadius: '7px', width: '100px' }


    return (
        <>
            <br />
            <br />
            {/* Snack bar */}
            <Snackbar open={submitted} autoHideDuration={5000} onClose={handleSnackbarClose} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}>
                <MuiAlert onClose={handleSnackbarClose} severity="warning" sx={{ width: '100%' }}>
                    {resAlert}
                </MuiAlert>
            </Snackbar>
            <Snackbar open={submittedSuccess} autoHideDuration={5000} onClose={handleSnackbarClose} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}>
                <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    {resAlert}
                </MuiAlert>
            </Snackbar>
            <div className='content'>
                <div className='digital_scan'>
                    <div className="all_inputs">
                        <div className="logo">
                            <img src={invoiceLogo} alt="Logo" />
                        </div>
                        <div className="credentials" >
                            <div className='login_input_div'>
                                {/* <input type="text" placeholder='Email' className='login_inputs_individual' value={username} onChange={handleUserName} onBlur={LoginUsername} /> */}
                                <TextField
                                    label="Username"
                                    type="text"
                                    className="form-control-loc"
                                    onBlur={LoginUsername}
                                    value={username}
                                    onChange={handleUserName}
                                // value={field.value}
                                // onChange={(e) => handleInputChange(index, e.target.value)}
                                />
                                <div className="login_error-message">{username_empty && "Enter Valid Email"}</div>
                            </div>
                            <div className='login_input_div'>
                                {/* <input type="text" placeholder='Email' className='login_inputs_individual' value={username} onChange={handleUserName} onBlur={LoginUsername} /> */}
                                <TextField
                                    label="Password"
                                    type="password"
                                    className="form-control-loc"
                                    onBlur={passwordInput}
                                    value={passwordInputval} onChange={handlepasswordInput}
                                // value={field.value}
                                // onChange={(e) => handleInputChange(index, e.target.value)}
                                />
                                <div className="login_error-message">{handlepasswordInput_empty && "Enter Valid Password"}</div>
                            </div>
                            <div className='login_input_div'>
                                {/* <input type="password" placeholder='Password' className='login_inputs_individual' value={password} onChange={handlepassword} onBlur={LoginPassword} /> */}
                                <TextField
                                    label="Re-Password"
                                    type="password"
                                    className="form-control-loc"
                                    value={password} onChange={handlepassword} onBlur={LoginPassword}
                                // value={field.value}
                                // onChange={(e) => handleInputChange(index, e.target.value)}
                                />
                                <div className="login_error-message">{password_empty && "Enter Valid Password"}</div>
                            </div>
                        </div>
                        <div className='error_forgot display-flex'>
                            <div className=' error_msg_login'>
                                {invalid_state && (
                                    <span className='display-flex' style={{ justifyContent: "start" }}>Invalid Credentials</span>
                                )}
                                {inactive_user && (
                                    <span className='display-flex' style={{ justifyContent: "start" }}>Inactive User</span>
                                )}
                                {inactive_site && (
                                    <span className='display-flex' style={{ justifyContent: "start" }}>Inactive Site</span>
                                )}
                            </div>
                        </div>
                        <Button variant="contained"
                            onClick={validate_login}
                            style={UserActionBtn}
                        >
                            Login
                        </Button>
                    </div>

                </div>
            </div>
        </>
    )
}
export default UpdatePassword;