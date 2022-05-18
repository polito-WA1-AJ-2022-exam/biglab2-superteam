/* IMPORTING CUSTOMIZED COMPONENTS */
import FilmRow from '../utilities/FilmRow';
import { readFilteredFilms, readFilms }        from "../utilities/API.js";

/* IMPORTING BOOTSTRAP COMPONENTS */
import { Table } from 'react-bootstrap'
import { useState, useEffect } from "react";


function TableContent(props) {

  /* HEADER OF THE TABLE WHEN A FILTER IS SELECTED */
  const header = "Filter: " + props.filter;

  const [editedFilm, setEditedFilm] = useState({});
  const [loading, setLoading] = useState(true);

  const updateEditedFilm = (film) => {
    setEditedFilm(film);
  }


  var filter;
  if (props.filter === "All") {
    filter='all';
  } else if (props.filter === "Favorites") {
    filter='favorites';
  } else if (props.filter === "Best Rated") {
    filter='best-rated';
  } else if (props.filter === "Last Seen") {
    filter='last-seen';
  } else if (props.filter === "Unseen") {
    filter='unseen';
  }

  useEffect(()=>{
    async function load() {
       var list = await readFilteredFilms(filter);
      props.setFilms(list);
      setLoading(false);
    }
    load();
  }, [props.filter]);

  if (loading)
    return (
     <>
        <Table hover>
          <thead>
            <tr>{header}</tr>
          </thead>
          <tbody>
          </tbody>
        </Table>
      </>
    );
  else
    return (
     <>
        <Table hover>
          <thead>
            <tr>{header}</tr>
          </thead>
          <tbody>
          {props.films.map((film) => (<FilmRow film={film} editedFilm={editedFilm} updateEditedFilm={updateEditedFilm} key={[film.id, film.favourite]} editFilmRating={props.editFilmRating} removeFilm={props.removeFilm} editFilmFav={props.editFilmFav} />))}
          </tbody>
        </Table>
      </>
    );
}

export default TableContent;
