/* IMPORTING CUSTOMIZED COMPONENT */
import NavigationBar            from './NavigationBar.js';
import { Greetings }            from "../utilities/Messages";
import { GreetingsOnLogin }     from "../utilities/Messages";
import { GreetingsNoMatch }     from "../utilities/Messages";
import { GreetingsNewFilm }     from "../utilities/Messages";
import { GreetingsEditFilm }    from "../utilities/Messages";
import { FilterSelection }      from './manageFilter.js';
import FilmForm                 from "../utilities/FilmForm";

/* IMPORT REACT BOOTSTRAP COMPONENTS */
import { Container }    from 'react-bootstrap';
import { Row }          from 'react-bootstrap';
import { Col }          from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { LoginForm } from './Login.js';


function HomePage(props) {
    return (
        <div>
            {/* NAVIGATION BAR */}
            <div>
                <NavigationBar logged={props.logged} logout={props.logout}/>
            </div>

            {/* HOME PAGE MESSAGE */}
            <div>
                <Greetings message={props.message}/>
            </div>      

            {/* FILTER SELECTION */}
            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col md="4" className='text-center'>
                        <FilterSelection />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

function NewFilmPage(props) {
    return (
        <div>
            {/* NAVIGATION BAR */}
            <div>
                <NavigationBar logged={props.logged} logout={props.logout}/>
            </div>

            {/* HOME PAGE MESSAGE */}
            <div>
                <GreetingsNewFilm />
            </div>      

            {/* NEW FILM */}
            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col md="4" className='text-center'>
                        <FilmForm loading={props.loading} addFilm={props.addFilm} mode={"add"}/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

function EditFilmPage(props) {

    /* retrieving specific film to edit given ID from URL */
    const { id } = useParams();
    const targetFilm = props.films.filter((film) => {return film.id === parseInt(id)});

    return (
        <div>
            {/* NAVIGATION BAR */}
            <div>
                <NavigationBar logged={props.logged} logout={props.logout}/>
            </div>

            {/* HOME PAGE MESSAGE */}
            <div>
                <GreetingsEditFilm />
            </div>  

            {/* NEW FILM */}
            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col md="4" className='text-center'>
                        <FilmForm loading={props.loading} targetFilm={targetFilm[0]} editFilm={props.editFilm} mode={"edit"} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

function LoginPage(props) {
    return (
        <div>
            {/* NAVIGATION BAR */}
            <div>
                <NavigationBar />
            </div>

            {/* HOME PAGE MESSAGE */}
            <div>
                <GreetingsOnLogin message={props.message}/>
            </div>  

            {/* LOGIN FORM */}
            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col md="4" className='text-center'>
                        <LoginForm login={props.login}/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

function NoMatchPage(props) {
    return (
        <div>
            {/* NAVIGATION BAR */}
            <div>
                <NavigationBar logged={props.logged} logout={props.logout} />
            </div>

            {/* HOME PAGE MESSAGE */}
            <div>
                <GreetingsNoMatch />
            </div>      
        </div>
    );
}

export { HomePage, NewFilmPage, EditFilmPage, LoginPage, NoMatchPage }