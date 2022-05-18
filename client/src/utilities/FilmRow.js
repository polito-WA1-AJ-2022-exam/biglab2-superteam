/* IMPORTING BOOTSTRAP COMPONENTS */
import { PencilSquare }     from 'react-bootstrap-icons';
import { Trash3Fill }       from 'react-bootstrap-icons';
import { useState }         from "react";
import { useNavigate }  from "react-router-dom";

/* IMPORTING CUSTOMIZED COMPONENTS */
import StarElem             from "./StarElem.js"



function FilmRow(props) {

    /* DATA AND STATES USED */
    let arr = [];
    let [fav, setFav] = useState(props.film.favourite);

    const navigate = useNavigate();

    /* COMPUTING WATCHDATE */
    let watchdate = (props.film.date !== undefined) ? props.film.date.$d.toString().substr(0,15) : "To be seen"

    /* COMPUTING RATINGS */
    const MAX_RATING = 5;
    let current_rating = (props.film.rating === undefined) ? 0 : props.film.rating;
    for (let i = 0; i < MAX_RATING; i++) {
        arr[i] = (i < current_rating) ? 1 : 0
    }

    let trash3FillOnClickHandler = () => {
    
        if(window.confirm('Are you sure you want to remove this film?') == true) {
            props.removeFilm(props.film.id);
            if (props.mode === 'edit' && props.editedFilm.id === props.film.id)
                props.updateMode('view');
        } 
    }

    let favouriteOnClickHandler = (event) => {
        if (props.mode !== 'edit' && props.editedFilm.id !== props.film.id) {

            /* CHECKING IF THE FILM HAS A WATCHDATE */
            if (props.film.date !== undefined) {
                props.editFilmFav(props.film);
                setFav(event.target.checked)
            } else {
                alert("You may not like this one...");
                event.target.checked = !event.target.checked
            }
        }
    }

    let ratingOnClickHandler = (film, number) => {
        if (props.mode !== 'edit' && props.editedFilm.id !== props.film.id)
            
            /* CHECKING IF THE FILM HAS A WATCHDATE */
            if (film.date !== undefined) {

                /* CHECKING IF IT IS A CLICK TO REMOVE THE LAST STAR */
                if (number === 1 && film.rating === 1) {
                    number = 0;
                }
                props.editFilmRating(film,number);
            } else {
                alert("'E non ha mai criticato un film\n Senza prima, prima vederlo'");
            }

    }


    return(
        <tr>
            {/* ICONS FOR EDITING AND TRASHING */}
            <td>
                <PencilSquare onClick={()=>(navigate('/edit-film/'+props.film.id))}/>
                <>{" "}</> {/* just some spacing between the icons */}
                <Trash3Fill onClick={()=>(trash3FillOnClickHandler())}/>
            </td>

            {/* TITLE */}
            <td className={props.film.favourite === true ? "text-danger" : "text-dark"}>
                {props.film.title}
            </td>

            {/* FAVORITE */}
            <td>
                <input class="checkbox_id" type="checkbox"  disabled={props.mode === 'edit' && props.editedFilm.id === props.film.id} name="favorite" checked={fav} onChange={(event)=>(favouriteOnClickHandler(event))}  />
                {" "}<label htmlFor="favorite"> Favorite</label>
            </td>

            {/* WATCHDATE */}
            <td>
                {watchdate}
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