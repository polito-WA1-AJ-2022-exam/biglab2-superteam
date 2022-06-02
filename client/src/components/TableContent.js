/* IMPORTING CUSTOMIZED COMPONENTS */
import FilmRow from '../utilities/FilmRow';

/* IMPORTING API COMPONENT */
import { API } from "../utilities/API";

/* IMPORTING BOOTSTRAP COMPONENTS */
import { Table } from 'react-bootstrap'
import { useState, useEffect } from "react";


function TableContent(props) {

  /* --- STATES --- */
  const [renderedFilms, setRenderedFilms] = useState(props.films);  /* initialize the films to be rendered in the TableContent component to the whole list of films */

  /* --- DATA --- */
  const header = "Filter: " + props.filter;
  const frontAPI = new API();


  /**
   * Parsing the filter in according to the Back-End API endpoints.
   * All        --> all
   * Favorites  --> favorites
   * Best Rated --> best-rated
   * Last Seen  --> last-seen
   * Unseen     --> unseen
   */
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

  /**
   * Render different TableContent when the filter changes, in according to the filter
   * selected.
   */
  useEffect(() => {
    async function load() {
      var result = await frontAPI.readFilteredFilms(filter);
      setRenderedFilms(result);
    }
    load();
  }, [props.filter, props.films]);  /* TODO: avoid arrays as dependencies */


  if (props.loading) {
    return <>
      <Table hover>
        <thead>
          <tr>{header}</tr>
        </thead>
        <tbody>
        </tbody>
      </Table>
    </>
  } else {
    return <>
      <Table hover>
        <thead>
          <tr>{header}</tr>
        </thead>
        <tbody>
          {renderedFilms.map((film) => (<FilmRow film={film} key={[film.id, film.favourite]} editFilmRating={props.editFilmRating} removeFilm={props.removeFilm} editFilmFav={props.editFilmFav} />))}
        </tbody>
      </Table>
    </>
  }
}

export default TableContent;
