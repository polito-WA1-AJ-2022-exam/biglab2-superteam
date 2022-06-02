import './App.css';

/* IMPORTING REACT BOOTSTRAP COMPONENT */
import { useEffect, useState }       from "react";

/* IMPORT REACT ROUTE COMPONENT */
import { BrowserRouter }  from 'react-router-dom';
import { Routes }         from "react-router-dom";
import { Route }          from 'react-router-dom'; 

/* IMPORTING BOOTSTRAP CSS */
import 'bootstrap/dist/css/bootstrap.min.css';

/* IMPORTING CUSTOMIZED COMPONENT */
import { Film }             from "./utilities/film.js";
import { HomePage }         from "./components/Home";
import { NoMatchPage }      from "./components/Home";
import { RenderFilter }     from "./components/manageFilter";
import { NewFilmPage }      from './components/Home';
import { EditFilmPage }     from './components/Home';

/* IMPORTING API COMPONENT */
import { API } from "./utilities/API";



/**
 * @brief Main function
 * 
 * @returns the main page of the website
 */
function App() {

  /* --- STATES --- */
  const [films, setFilms] = useState([]);         /* initialize state variable [films] to empty list (no film at the beginning) */
  const [loading, setLoading] = useState(false)   /* initialize state variable [loading] to false (it will indicate if the application is performing any operations that will change the render) */

  /* --- API UTILITIES --- */
  const frontAPI = new API();

  /* --- APP.js UTILITIES --- */
  /**
   * Reload the list of films from the DB in order to keep the state up-to-date.
   * Performs the following operations: 
   *    - call the frontAPI to fetch the server-side endpoint implementing the GET request for retrieving the whole list of films from the DB
   *    - check for errors
   *    - actual update of the states
   */
  const reloadFilms = async () => {
    try {
      setLoading(true);
      const result = await frontAPI.readFilms();
      setLoading(false);
      setFilms(result);
    } catch (error) {
      console.log(error);
      alert(error);            
    }
  }

  /**
   * Reload the list of films from the DB in order to keep the state up-to-date.
   * Performs the following operations: 
   *    - call the frontAPI to fetch the server-side endpoint implementing the GET request for retrieving the whole list of films from the DB
   *    - check for errors
   *    - actual update of the states
   */
  const addFilm = async (newFilm) => {
    try {
      setLoading(true);
      await frontAPI.addFilm(newFilm);
      setLoading(false);
      reloadFilms();
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  /**
   * Receive a new film object which will be added in the DB.
   * Performs the following operations: 
   *    - call the frontAPI to fetch the server-side endpoint implementing the POST request for adding a specific film in the DB
   *    - check for errors
   *    - actual update of the states
   * @param {Film} newFilm 
   */
  const editFilmRating = async (newFilm) => {
    try {
      setLoading(true);
      await frontAPI.editFilm(newFilm);
      reloadFilms();
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert(error);             
    }
  }

  /**
   * Receive a new film object which will overwrite the corresponding id film favorite in the DB.
   * Performs the following operations: 
   *    - call the frontAPI to fetch the server-side endpoint implementing the PUT request for editing a specific film favorite in the DB
   *    - check for errors
   *    - actual update of the states
   * @param {Film} newFilm 
   */
  const editFilmFav = async (newFilm) => {
    try {
      setLoading(true);
      await frontAPI.editFilmFavorite(newFilm);
      setLoading(false);
      reloadFilms();
    } catch (error) {
      console.log(error);
      alert(error);             
    }
  }

  /**
   * Receive a new film object which will overwrite the corresponding id film in the DB.
   * Performs the following operations: 
   *    - call the frontAPI to fetch the server-side endpoint implementing the PUT request for editing a specific film in the DB
   *    - check for errors
   *    - actual update of the states
   * @param {Film} newFilm 
   */
  const editFilm = async (newFilm) => {
    try {
      setLoading(true);
      await frontAPI.editFilm(newFilm);
      setLoading(false);
      reloadFilms();
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  /**
   * Remove a film from the DB
   * Performs the following operations: 
   *    - call the frontAPI to fetch the server-side endpoint implementing the DELETE request for removing a specific film in the DB
   *    - check for errors
   *    - actual update of the states
   */
  const removeFilm = async (targetID) => {
    try {
      setLoading(true);
      await frontAPI.removeFilm(targetID);
      setLoading(false);
      reloadFilms();
    } catch (error) {
      console.log(error);
      alert(error);
    }
  } 

  /**
   * Called only when the App component is mounted: loads all the films
   * from DB to states.
   */
  useEffect(() => {
    reloadFilms();
  }, []);

  /**
   * Rendering the web interface
   */
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />         {/* HOME PAGE */}
        <Route path='/all' element={<RenderFilter filter={"All"} loading={loading} films={films} editFilmRating={editFilmRating} removeFilm={removeFilm} editFilmFav={editFilmFav}/>} />      {/* FILTERS */}
        <Route path='/favorites' element={<RenderFilter filter={"Favorites"} loading={loading} films={films} editFilmRating={editFilmRating} removeFilm={removeFilm} editFilmFav={editFilmFav}/>} />      {/* FILTERS */}
        <Route path='/best-rated' element={<RenderFilter filter={"Best Rated"} loading={loading} films={films} editFilmRating={editFilmRating} removeFilm={removeFilm} editFilmFav={editFilmFav}/>} />      {/* FILTERS */}
        <Route path='/last-seen' element={<RenderFilter filter={"Last Seen"} loading={loading} films={films} editFilmRating={editFilmRating} removeFilm={removeFilm} editFilmFav={editFilmFav}/>} />      {/* FILTERS */}
        <Route path='/unseen' element={<RenderFilter filter={"Unseen"} loading={loading} films={films} editFilmRating={editFilmRating} removeFilm={removeFilm} editFilmFav={editFilmFav}/>} />      {/* FILTERS */}
        <Route path='/add-film' element={<NewFilmPage loading={loading} addFilm={addFilm} />} />
        <Route path='/edit-film/:id' element={<EditFilmPage loading={loading} films={films} editFilm={editFilm}/>} />

        <Route path='*' element={<NoMatchPage />} />          {/* PAGE NOT FOUND */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
