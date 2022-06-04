/**
 * BigLab2D --> Authentication
 * ------------------------------------------------------------------------------------------------
 * Logout.js contains the authentication components created to handle the logout of a user inside the
 * Web Application.
 */

'use strict' ;

/* ------------ IMPORT REACT-BOOTSTRAP MODULES ------------ */
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

/**
 * Logout button component
 * ----------------------------------------------------------
 * @param {Object} props list of properties of this component
 * @returns render the logout button
 */
function LogoutButton(props) {
    return(
        <Row>
            <Col>
                <Button variant="light" onClick={props.logout}>Logout</Button>
            </Col>
        </Row>
    );
}

export { LogoutButton };