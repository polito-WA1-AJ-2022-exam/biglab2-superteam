/* IMPORTING CUSTOMIZED COMPONENT */
import NavigationBar            from './NavigationBar.js';
import { Greetings }            from "../utilities/Messages";
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


function HomePage(props) {
    return (
        <div>
            {/* NAVIGATION BAR */}
            <div>
                <NavigationBar />
            </div>

            {/* HOME PAGE MESSAGE */}
            <div>
                <Greetings />
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
                <NavigationBar />
            </div>

            {/* HOME PAGE MESSAGE */}
            <div>
                <GreetingsNewFilm />
            </div>      

            {/* NEW FILM */}
            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col md="4" className='text-center'>
                        <FilmForm addOrEditFilm={props.addFilm} mode={"add"}/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

function EditFilmPage(props) {

    const { id } = useParams();
    return (
        <div>
            {/* NAVIGATION BAR */}
            <div>
                <NavigationBar />
            </div>

            {/* HOME PAGE MESSAGE */}
            <div>
                <GreetingsEditFilm />
            </div>  

            {/* NEW FILM */}
            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col md="4" className='text-center'>
                        <FilmForm editFilm={props.editFilm} films={props.films} mode={"edit"} id={id} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

function NoMatchPage() {
    return (
        <div>
            {/* NAVIGATION BAR */}
            <div>
                <NavigationBar />
            </div>

            {/* HOME PAGE MESSAGE */}
            <div>
                <GreetingsNoMatch />
            </div>      
        </div>
    );
}

export { HomePage, NewFilmPage, EditFilmPage, NoMatchPage }