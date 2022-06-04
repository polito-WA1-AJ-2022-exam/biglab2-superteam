/**
 * BigLab2D --> Authentication
 * ------------------------------------------------------------------------------------------------
 * Login.js contains the authentication components created to handle the login of a user inside the
 * Web Application.
 */

'use strict' ;

/* ------------ IMPORT REACT MODULES ------------ */
import { useState } from "react";

/* ------------ IMPORT REACT-BOOTSTRAP MODULES ------------ */
import { Form }      from 'react-bootstrap';
import { Button }    from 'react-bootstrap';

/**
 * Login form component
 * ----------------------------------------------------------
 * @param {Object} props list of properties of this component
 * @returns render the login form
 */
function LoginForm (props) {

    /* --- STATES --- */
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    /* --- UTILITIES --- */

    /**
     * Validate the username string inserted in the login form
     * -------------------------------------------------------
     * @param {String} email string to be valuated as email
     * @returns True on success
     */
    const validateEmail = (email) => {
        return String(email).toLowerCase().match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    /**
     * Validate the password string inserted in the login form
     * -------------------------------------------------------
     * @param {String} password string to be valuated as password
     * @returns True on success
     */
    const validatePassword = (password) => {
        return password.length >= 6;
    }

    /**
     * Handle the submit request after fields validations
     * --------------------------------------------------
     */
    const handleSubmit = (event) => {

        event.preventDefault();
        if (validateEmail(username) && validatePassword(password)) {
            props.login({username, password});
        } else {
            alert("NON VALID");
        }
        
    }

    /* --- RENDER LOGIN FORM --- */
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId='username'>
                <Form.Label>email</Form.Label>
                <Form.Control type='email' value={username} onChange={ev => setUsername(ev.target.value)} required={true} />
            </Form.Group>
    
            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' value={password} onChange={ev => setPassword(ev.target.value)} required={true} minLength={6}/>
            </Form.Group>
            <hr />
            <Button type="submit">Login</Button>
      </Form>
    );
}

export { LoginForm };