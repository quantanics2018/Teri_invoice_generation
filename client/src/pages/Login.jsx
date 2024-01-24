import invoiceLogo from '../assets/logo/invoiceLogo.png';
import { useState, useEffect } from 'react';
import { API_URL } from '../config'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { styled, useTheme } from '@mui/system';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { UserActionBtn } from '../assets/style/cssInlineConfig';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
const Login = (props) => {
    const theme = useTheme();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [invalid_state, setinvalidstate] = useState(false);
    const [inactive_user, setinactive_user] = useState(false);
    const [inactive_site, setinactive_site] = useState(false);
    const [username_empty, setusername_empty] = useState(false);
    const [password_empty, setpassword_empty] = useState(false);


    const handleUserName = (event) => {
        const Username = event.target.value;
        setUsername(Username);
        setusername_empty(false)
    };
    const handlepassword = (event) => {
        const password = event.target.value;
        setPassword(password)
        setpassword_empty(false)
    }

    const navigate = useNavigate();
    const LoginUsername = () => {
        if (username === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username)) {
            setinactive_user(false);
            setinvalidstate(false);
            setinactive_site(false)
            setusername_empty(true)
        }
    }
    const LoginPassword = () => {
        if (password == "") {
            setinactive_user(false);
            setinvalidstate(false);
            setinactive_site(false)
            setpassword_empty(true)
        }
    }
    const validate_login = async () => {
        const body = { username, password };
        body.username = body.username.trim();
        body.password = body.password.trim();
        try {
            const response = await axios.post(`${API_URL}verify/credentials`,
                {
                    username: username,
                    password: password,
                }
            );
            // console.log(response);
            if (response.data.success) {
                sessionStorage.setItem("UserInfo", JSON.stringify({ ...response.data.data, "isLoggedIn": true }));
                console.log(response.data);
                if (response.data.data.position === "manifacture") {
                    navigate("/Staff_Detials");
                }
                else if (response.data.data.position === "staff") {
                    navigate('/Distributer_Detials');
                }
                else if (response.data.data.position === "distributor") {
                    navigate('/Customer_Detials');
                }
                else {
                    navigate('/profilePage');
                }
                window.location.reload();
            }
            else {
                if (response.data.password === null) {
                    navigate('/UpdatePassword');
                }
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Login failed:', error.message);
        }
    };
    // useEffect(() => {
    //     validate_login();
    // }, []);
    // const btnStyle = { backgroundColor: 'red', color: 'white', borderRadius: '7px', width: '100px' }
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <br />
            <br />
            <div className='content'>
                <div className='digital_scan'>
                    <div className="all_inputs">
                        <div className="logo">
                            <img src={invoiceLogo} alt="Logo" />
                        </div>
                        <div className="credentials" >
                            <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined" className="credentials" >
                                <div className='login_input_div'>
                                    <TextField
                                        label="Username"
                                        type="text"
                                        className="form-control-loc"
                                        onBlur={LoginUsername}
                                        value={username} onChange={handleUserName}
                                        sx={{ m: 0, width: '30ch' }}
                                    />
                                    <div className="login_error-message">{username_empty && "Enter Valid Email"}</div>
                                </div>
                                <div className='login_input_div'>
                                    <TextField
                                        label="Password"
                                        // type="password"
                                        type={showPassword ? 'text' : 'password'}
                                        className="form-control-loc"
                                        value={password} onChange={handlepassword} onBlur={LoginPassword}
                                        sx={{ m: 0, width: '30ch' }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <div className="login_error-message">{password_empty && "Enter Valid Password"}</div>
                                </div>
                            </FormControl>
                            {/* <div className='login_input_div'>
                                <TextField
                                    label="Password"
                                    type="password"
                                    className="form-control-loc"
                                    value={password} onChange={handlepassword} onBlur={LoginPassword}
                                />
                                <div className="login_error-message">{password_empty && "Enter Valid Password"}</div>
                            </div> */}
                            {/* <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={handlepassword}
                                        onBlur={LoginPassword}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                                <div className="login_error-message">{password_empty && "Enter Valid Password"}</div>
                            </div> */}

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
                            <Button color="secondary">
                                Forgot Password
                            </Button>
                            {/* <div className="forget">
                                <span className='display-flex' style={{ justifyContent: "end" }}>Forgot Password</span>
                            </div> */}
                        </div>
                        {/* <div className="login_btn_div" onClick={validate_login} style={{ textAlign: "center" }}>
                            <input type="submit" className='login_btn' value={"Login"} />
                        </div> */}
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
export default Login;