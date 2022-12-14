// @ts-nocheck
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateCustomer } from "../../store/userSlice";
import './login.css'

import { GoogleLogin, GoogleLogout } from "react-google-login";

function Login() {

    const navigate = useNavigate();

    const [ripgg, setRipgg] = useState({
        name: "",
        email: "",
        url: ""
    })

    const responseGoogle = response => {
        console.log(response);
        setRipgg({
            name: response.profileObj.name,
            email: response.profileObj.email,
            url: response.profileObj.imageUrl
        })
    };

    const [resgiter, setRegiter] = useState({
        "title": "",
        "fisrtName": "",
        "lastname": "",
        "address": "",
        "phone": "",
        "url_Image": "string",
        "email": "",
        "password": "",
        "confirmPassword": ""
    })

    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("")
    //lưu bằng redux
    const dispatch = useDispatch();

    function handleClick() {
        const fetchData = async (req, res) => {
            try {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(
                        {
                            "email": username,
                            "password": pass
                        })
                };
                const response = await fetch('https://localhost:7071/api/Account/authenticate', requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        dispatch(updateCustomer(data))
                    });
            } catch (error) {
                res.send(error.stack);
            }
        }
        fetchData();
        navigate("/");

    }

    const [magin, setMargin] = useState(null)
    const loginForm = (a) => {
        setMargin({ marginLeft: a })
    }

    const handleChange = (e) => {
        let k = e.target.value;
        let j = e.target.attributes.id.value;
        setRegiter(prev => ({
            ...prev,
            [j]: k
        })
        )
    }
    const handleSignup = () => {
        const fetchData = async (req, res) => {
            try {
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'accept': '*/*',
                        'Content-Type': 'application/json-patch+json'
                    },
                    body: JSON.stringify(resgiter)
                };
                const response = await fetch('https://localhost:7071/api/Account/register', requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                    });
            } catch (error) {
                res.send(error.stack);
            }
        }
        fetchData();
    }

    return (
        <div className="body1">
            <div className="wrapper m-3">
                <div className="title-text">
                    <div className="title login" style={magin}>Login Form</div>
                    <div className="title signup">Signup Form</div>
                </div>

                <div className="form-container">
                    <div className="slide-controls">
                        <input type="radio" name="slider" id="login" hidden />
                        <input type="radio" name="slider" id="signup" hidden />
                        <label htmlFor="login" className="slide login"
                            onClick={() => loginForm('0%')}>Login</label>
                        <label htmlFor="signup" className="slide signup"
                            onClick={() => loginForm('-50%')}> Signup</label>
                        <div className="slide-tab"></div>
                    </div>

                    <div className="form-inner">
                        <form className="login" style={magin}>
                            <div className="field">
                                <input type="email" placeholder="Email Address" value={username}
                                    onChange={e => setUsername(e.target.value)} required />
                            </div>
                            <div className="field">
                                <input type="password" placeholder="Password" value={pass}
                                    onChange={e => setPass(e.target.value)} required minLength={6} />
                            </div>
                            <div className="field">
                                <input type="submit" value="Login" onClick={handleClick} />
                            </div>
                            <div className="signup-link">
                                Not a member? <a onClick={() => loginForm('-50%')}>Signup now</a>
                            </div>
                            <div className="field">
                                <GoogleLogin
                                    clientId="732917656903-hf5ng2p9756s7g611tns6l9jq6eeqamq.apps.googleusercontent.com"
                                    buttonText="Login"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={"single_host_origin"}
                                />
                            </div>
                            {/* <div>
                                <div>
                                    <h2>Welcome {ripgg.name}</h2>
                                    <h2>Email: {ripgg.email}</h2>
                                    <img src={ripgg.url} alt={ripgg.name} />
                                    <br />
                                    <GoogleLogout
                                        clientId="732917656903-hf5ng2p9756s7g611tns6l9jq6eeqamq.apps.googleusercontent.com"
                                        buttonText="Logout"
                                    />
                                </div>
                            </div> */}
                        </form>

                        <form className="signup">
                            <div className="field d-flex">
                                <input type="text" placeholder="First Name" value={resgiter.fisrtName}
                                    onChange={e => handleChange(e)} id="fisrtName" className="input2" required
                                    pattern="[a-zA-Z0-9]+" />
                                <input type="text" placeholder="Last Name" value={resgiter.lastname}
                                    onChange={e => handleChange(e)} id="lastname" className="input2" required
                                    pattern="[a-zA-Z0-9]+" />
                            </div>
                            <div className="field">
                                <input type="text" placeholder="Title" value={resgiter.title}
                                    onChange={e => handleChange(e)} id="title" required pattern="[a-zA-Z0-9]+" />
                            </div>
                            <div className="field">
                                <input type="text" placeholder="Address" value={resgiter.address}
                                    onChange={e => handleChange(e)} id="address" required pattern="[a-zA-Z0-9]+" />
                            </div>
                            <div className="field">
                                <input type="text" placeholder="Phone" value={resgiter.phone}
                                    onChange={e => handleChange(e)} id="phone" required pattern="(\+84|0)\d{9,10}" />
                            </div>
                            <div className="field">
                                <input type="email" placeholder="Email Address" value={resgiter.email}
                                    onChange={e => handleChange(e)} id="email" required />
                            </div>
                            <div className="field">
                                <input type="password" placeholder="Password" value={resgiter.password}
                                    onChange={e => handleChange(e)} id="password" required minLength={6} />
                            </div>
                            <div className="field">
                                <input type="password" placeholder="Confirm password"
                                    value={resgiter.confirmPassword}
                                    onChange={e => handleChange(e)} id="confirmPassword" required minLength={6} />
                            </div>
                            <div className="field">
                                <input type="submit" value="Signup" onClick={handleSignup} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;