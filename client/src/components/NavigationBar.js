/* IMPORTING BOOTSTRAP NAVBAR */
import { Navbar }       from "react-bootstrap";
import { Container }    from "react-bootstrap";
import { Nav }          from "react-bootstrap";
import { useNavigate }  from "react-router-dom";

/* IMPORTING CUSTOMIZED COMPONENT */
import { LogoutButton }     from '../components/Logout';

function MyNavbar(props) {
    const navigate = useNavigate();
    return ( 
        <Navbar expand="lg" bg="primary" variant="dark">

            {/* LOGO AND NAVBAR BRAND */}
            <Container>
                <Navbar.Brand action style={{cursor:'pointer'}} onClick={() => {navigate('/');}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-film" viewBox="0 0 16 16"><path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z"/></svg>{' '}
                    FilmLibrary
                </Navbar.Brand>
            </Container>
            
            {/* SEARCH INPUT FORM */}
            <Container>
                <form class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                </form>
            </Container>

            {/* USER LOGO */}
            {!props.logged && <Container>
                <Nav className="ms-auto">
                    <Nav.Link>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                        </svg>
                    </Nav.Link>
                </Nav>
            </Container>}
            {props.logged && <Container>
                <Nav className="ms-auto">
                    <Nav.Link>
                        <LogoutButton logout={props.logout} />
                    </Nav.Link>
                </Nav>
            </Container>}
    </Navbar>
    );
}

/* EXPORTING NAVBAR */
export default MyNavbar;