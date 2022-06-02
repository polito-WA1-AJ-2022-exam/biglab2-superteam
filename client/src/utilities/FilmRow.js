/* IMPORTING BOOTSTRAP COMPONENTS */
import { PencilSquare }     from 'react-bootstrap-icons';
import { Trash3Fill }       from 'react-bootstrap-icons';
import { useEffect, useState }         from "react";
import { useNavigate }  from "react-router-dom";

/* IMPORTING CUSTOMIZED COMPONENTS */
import StarElem             from "./StarElem.js"

const MAX_RATING = 5;

function FilmRow(props) {

    /* --- STATES --- */
    let [fav, setFav] = useState(props.film.favorite); 
    let [color, setColor] = useState(props.film.favorite ? 'text-danger' : 'text-dark');

    /* --- UTILITIES --- */
    const navigate = useNavigate();

    /* --- COMPUTING FILM VALUES FOR RENDERING --- */
    let currentRating = (props.film.rating === null) ? 0 : props.film.rating;
    let arr = [];
    for (let i = 0; i < MAX_RATING; i++) {
        arr[i] = (i < currentRating) ? 1 : 0
    }

    let trash3FillOnClickHandler = () => {
    
        if(window.confirm('Are you sure you want to remove this film?') === true) {
            props.removeFilm(props.film.id);
        } 
    }

    let favouriteOnClickHandler = (event) => {

        /* checking watchdate constraint: cannot set a film as favorite if it has not been seen yet */
        if (props.film.watchdate !== null) {
            setFav((props.film.favorite === 1) ? 0 : 1);
            setColor((props.film.favorite === 1) ? 'text-danger' : 'text-dark');

            /* hooking App() for API call and re-rendering */
            props.film.favorite = (props.film.favorite === 1) ? 0 : 1;
            props.editFilmFav(props.film);
        } else {
            alert("You may not like this one...");
            event.target.checked = !event.target.checked;
        }
    }

    let ratingOnClickHandler = (film, number) => {

        /* checking watchdate constraint: cannot set a film as favorite if it has not been seen yet */
        if (props.film.watchdate !== null) {
            if (number === 1 && film.rating === 1) {
                number = 0;
            }
            /* hooking App() for API call and re-rendering */
            if (film.rating !== number) {
                film.rating = number;
                props.editFilmRating(film);
            }
        } else {
            alert("You may not like this one...");
        }
    }

    useEffect(() => {
        setFav(props.film.favorite);
        setColor((props.film.favorite === 1) ? 'text-danger' : 'text-dark');
    });

    /**
     * Rendering the component
     */
    return(
        <tr>
            {/* ICONS FOR EDITING AND TRASHING */}
            <td>
                <PencilSquare onClick={()=>(navigate('/edit-film/'+props.film.id))}/>
                <>{" "}</> {/* just some spacing between the icons */}
                <Trash3Fill onClick={()=>(trash3FillOnClickHandler())}/>
            </td>

            {/* TITLE */}
            <td className={color}>
                {props.film.title}
            </td>

            {/* FAVORITE */}
            <td>
                <input class="checkbox_id" type="checkbox"  name="favorite" checked={fav} onChange={(event)=>(favouriteOnClickHandler(event))}  />
                {" "}<label htmlFor="favorite"> Favorite</label>
            </td>

            {/* WATCHDATE */}
            <td>
                {(props.film.watchdate === null) ? '📅' : props.film.watchdate}
            </td>

            {/* RATINGS */}
            <td>
                <StarElem fill={arr[0]} ratingOnClickHandler={ratingOnClickHandler} number={1} film={props.film}/>  
                <StarElem fill={arr[1]} ratingOnClickHandler={ratingOnClickHandler} number={2} film={props.film}/> 
                <StarElem fill={arr[2]} ratingOnClickHandler={ratingOnClickHandler} number={3} film={props.film}/> 
                <StarElem fill={arr[3]} ratingOnClickHandler={ratingOnClickHandler} number={4} film={props.film}/> 
                <StarElem fill={arr[4]} ratingOnClickHandler={ratingOnClickHandler} number={5} film={props.film}/>   
            </td>      
        </tr>
    );
}

export default FilmRow;