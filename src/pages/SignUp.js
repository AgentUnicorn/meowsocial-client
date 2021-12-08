import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Button, Form} from 'react-bootstrap';
import axios from 'axios';

function SignUp() {
    let navigate = useNavigate();

    function createUser(newuser) {
        axios({
            method: 'POST',
            url: "http://localhost:8080/register",
            data: newuser
        }).then(res => console.log(res.data));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const formInput = e.target.elements;
        const newUser = {
            username: formInput.username.value,
            useremail: formInput.useremail.value,
            userpassword: formInput.userpassword.value
        }
        createUser(newUser);
    }

    return (
        <div>
            <div className="form-container">
                <Form onSubmit={handleSubmit} method="POST" className="form-signin">
                    <Form.Group>

                    <div className="text-center mb-3">
                        <img src="images/logos_transparent.png" alt="logo" width="200" height="200"/>
                        <h1 className="h3 font-weight-normal">Signup your account</h1>
                        <small>Already have an account? <a onClick={() => {navigate("/signin")}}>Signin here!</a></small>
                    </div>
                        <Form.Control name="username" placeholder="Username"/>
                        <Form.Control name="useremail" type="email" placeholder="Example@example.com"/>
                        <Form.Control name="userpassword" type="password" placeholder="Password"/>
                    </Form.Group>
                    <div className="checkbox mb-3">
                        <label>
                        <input type="checkbox" value="remember-me"/> Remember me
                    </label>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Signup</button>
                    <p className="mt-2 mb-2 text-muted text-center">&copy; 2020-2021</p>
                </Form>
            </div>
        </div>
    )
}

export default SignUp