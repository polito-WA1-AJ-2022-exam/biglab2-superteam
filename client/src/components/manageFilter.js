/* IMPORTING BOOTSTRAP COMPONENTS */
import { ListGroup }    from 'react-bootstrap';
import { Col }          from "react-bootstrap";
import { Container }    from "react-bootstrap";
import { Row }          from "react-bootstrap";

/* IMPORTING REACT ROUTER COMPONENTS */
import { useNavigate }  from 'react-router-dom';

/* IMPORT CUSTOMIZED COMPONENTS */
import AsideChoice              from "./AsideChoice";
import { GreetingsOnFilter }    from "../utilities/Messages";
import MyNavbar                 from "./NavigationBar";
import TableContent             from "./TableContent";



function FilterSelection() {

    const navigate = useNavigate();

    return (
        <ListGroup >
            <ListGroup.Item action onClick={() => {navigate('/all');}}>
                All
            </ListGroup.Item>
            <ListGroup.Item action onClick={() => {navigate('/favorites');}}>
                Favorites
            </ListGroup.Item>
            <ListGroup.Item action onClick={() => {navigate('/best-rated');}}>
                Best Rated
            </ListGroup.Item>
            <ListGroup.Item action onClick={() => {navigate('/last-seen');}}>
                Last Seen
            </ListGroup.Item>
            <ListGroup.Item action onClick={() => {navigate('/unseen');}}>
                Unseen
            </ListGroup.Item>
            <ListGroup.Item variant='success' action onClick={() => {navigate('/add-film');}}>
                <b>Add new film</b>
            </ListGroup.Item>
        </ListGroup>
    );
}

function RenderFilter(props) {
    return (
        <div>
            {/* NAVIGATION BAR */}
            <MyNavbar />

            {/* GREETINGS MESSAGE */}
            <GreetingsOnFilter text={props.filter}/>
            
            <Container>
                <Row>
                    <Col>
                        {/* ASIDE CHOICE */}
                        <AsideChoice filter={props.filter}/>
                    </Col>

                    <Col>
                        {/* TABLE OF CONTENTS */}
                        <TableContent films={props.films} setFilms={props.setFilms} filter={props.filter} editFilmRating={props.editFilmRating} removeFilm={props.removeFilm} editFilmFav={props.editFilmFav}/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export { FilterSelection, RenderFilter }