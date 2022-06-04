/* IMPORTING BOOTSTRAP NAVBAR */
import { Alert } from "react-bootstrap";

function Greetings(props) {
    return (
        <Alert variant="primary">
            <Alert.Heading>{`${props.message.content}`}</Alert.Heading>
            <p>
                This is really the best film library you had ever seen. You may think to have found a better film library, but you have not heard yet of the newest feature we have implemented... 
                it has <b>FILTERS</b>! No way you are gonna ever use another film library.
            </p>
            <hr />
            <p className="mb-0">
                Click on a filter and you will be redirected to the specific page where you can see the films.
            </p>
        </Alert>
    );
}

function GreetingsOnLogin(props) {
    if (props.message.type === 'danger') {
        return (
            <Alert variant="danger">
                <Alert.Heading>{props.message.content}</Alert.Heading>
                <hr />
                <p className="mb-0">
                    <b>Please, fill the form to Log In</b>
                </p>
            </Alert>
        );
    }
    return (
        <Alert variant="primary">
            <Alert.Heading>Welcome to the best Film Library</Alert.Heading>
            <hr />
            <p className="mb-0">
                <b>Please, fill the form to Log In</b>
            </p>
        </Alert>
    );
}

function GreetingsOnFilter(props) {
    return (
        <Alert variant="primary">
            <Alert.Heading>Filter applied: {props.text}</Alert.Heading>
            <p>
                Here you can see films filtered with "{props.text}".
            </p>
        </Alert>
    );
}

function GreetingsNoMatch() {
    return (
        <Alert variant="danger">
            <Alert.Heading>404: Page Not Found</Alert.Heading>
            <p>
                Ooops! <i>Here be dragons</i>... 
                Take a step back and rethink where you want to go.
            </p>
        </Alert>
    );
}

function GreetingsNewFilm() {
    return (
        <Alert variant="success">
            <Alert.Heading>New film</Alert.Heading>
            <p>
                Please, compile the form to add a new film.
            </p>
        </Alert>
    );
}

function GreetingsEditFilm() {
    return (
        <Alert variant="success">
            <Alert.Heading>Edit film</Alert.Heading>
            <p>
                Please, compile the form to edit the film.
            </p>
        </Alert>
    );
}

/* EXPORTING GREETINGS */
export { Greetings, GreetingsOnLogin, GreetingsOnFilter, GreetingsNewFilm, GreetingsEditFilm, GreetingsNoMatch }

