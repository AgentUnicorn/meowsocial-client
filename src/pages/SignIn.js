import React, {useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button, Form} from 'react-bootstrap';
import axios from 'axios';

function SignIn({onSignIn, setUser, homeUser}) { //passing setUserId function as onSignIn function
    let navigate = useNavigate();

    const useremail = useRef();
    const userpassword = useRef();

    function getUser(user) {
        axios({
            method: 'POST',
            url: "http://localhost:8080/signin",
            data: user
        }).then(res => {
            console.log(res.data)
            let loggedInUser = res.data.body;
            onSignIn(loggedInUser._id);
            setUser({...homeUser, loggedInUser});
            if(res.data.status === 'Success') {
                // localStorage.setItem('isAuthenticated', 'true');
                navigate('/message');
            }
        });
    }
    
    
    function handleSubmit(e) {
        e.preventDefault();
        const loginUser = {
            useremail: useremail.current.value,
            userpassword: userpassword.current.value
        }
        getUser(loginUser);
    }

    return (
        <div>
            <div className="form-container">
                <Form onSubmit={handleSubmit} method="POST" className="form-signin">
                    <Form.Group>

                    <div className="text-center mb-3">
                        <img src="images/logos_transparent.png" alt="logo" width="200" height="200"/>
                        <h1 className="h3 font-weight-normal">Signin your account</h1>
                        <small>Don't have an account? <a onClick={() => {navigate("/signup")}}>Signup here!</a></small>
                    </div>
                        <Form.Control ref={useremail} type="email" placeholder="Example@example.com"/>
                        <Form.Control ref={userpassword} type="password" placeholder="Password"/>
                    </Form.Group>
                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me"/> Remember me
                        </label>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Signip</button>
                    <p className="mt-2 mb-2 text-muted text-center">&copy; 2020-2021</p>
                </Form>
            </div>
        </div>
    )
}

export default SignIn
