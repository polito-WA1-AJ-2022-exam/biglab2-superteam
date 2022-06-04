import './App.css';

/* IMPORTING REACT AND REACT BOOTSTRAP COMPONENT */
import { useEffect, useState } from "react";
import { Alert, Container, Row } from 'react-bootstrap';

/* IMPORT REACT ROUTE COMPONENT */
import { BrowserRouter }  from 'react-router-dom';
import { Navigate }       from 'react-router-dom';
import { Routes }         from "react-router-dom";
import { Route }          from 'react-router-dom'; 

/* IMPORTING BOOTSTRAP CSS */
import 'bootstrap/dist/css/bootstrap.min.css';

/* IMPORTING CUSTOMIZED COMPONENT */
import { HomePage }         from './components/Home';
import { NoMatchPage }      from './components/Home';
import { RenderFilter }     from './components/manageFilter';
import { NewFilmPage }      from './components/Home';
import { EditFilmPage }     from './components/Home';
import { LoginPage }        from './components/Home';

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
  const [loading, setLoading] = useState(false);  /* initialize state variable [loading] to false (it will indicate if the application is performing any operations that will change the render) */
  const [logged, setLogged] = useState(false);    /* initialize state variable [logged] to false (at the beginning, user needs to be authenticated) */   
  const [message, setMessage] = useState('');     /* initialize state variable [message] to empty string (handle login messages) */

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
   * Manage the login of a user
   * Performs the following operations: 
   *    - call the frontAPI to fetch the server-side endpoint implementing the login request
   *    - check for errors
   *    - actual update of the states
   */
  const handleLogin = async (credentials) => {
    try {
      const user = await frontAPI.login(credentials);
      setLogged(true);
      setMessage({
        content: `Welcome, ${user.name}`,
        type: 'success'
      });
    } catch (error) {
      console.log(error);
      setMessage({
        content: 'Wrong username or password',
        type: 'danger'
      });
    }
  }

  /**
   * Manage the logout of a user
   * Performs the following operations: 
   *    - call the frontAPI to fetch the server-side endpoint implementing the logout request
   *    - check for errors
   *    - actual update of the states
   */
  const handleLogout = async () => {
    try {
      await frontAPI.logout();
      setLogged(false);
      setFilms([]);
      setMessage('');
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
    if (logged) reloadFilms();
  }, [logged]);

  /**
   * Rendering the web interface
   */
  return (

    <>
      <BrowserRouter>
        <Routes>

          {/* --- LOGIN --- */}
          <Route path='/login' element = {
            logged ? <Navigate replace to='/' /> : <LoginPage login={handleLogin} message={message}/>
          } />

          {/* --- ROOT --- */}
          <Route path='/' element = {
            logged ? <HomePage logged={logged} message={message} logout={handleLogout}/> : <Navigate replace to='/login' />
          } />

          {/* --- FILTER: ALL --- */}
          <Route path='/all' element = {
            logged ? <RenderFilter logged={logged} logout={handleLogout} filter={"All"} loading={loading} films={films} editFilmRating={editFilmRating} removeFilm={removeFilm} editFilmFav={editFilmFav}/> : <Navigate replace to='/login' />
          } />

          {/* --- FILTER: FAVORITES --- */}
          <Route path='/favorites' element = {
            logged ? <RenderFilter logged={logged} logout={handleLogout} filter={"Favorites"} loading={loading} films={films} editFilmRating={editFilmRating} removeFilm={removeFilm} editFilmFav={editFilmFav}/> : <Navigate replace to='/login' />
          } />

          {/* --- FILTER: BEST-RATED --- */}
          <Route path='/best-rated' element = {
            logged ? <RenderFilter logged={logged} logout={handleLogout} filter={"Best Rated"} loading={loading} films={films} editFilmRating={editFilmRating} removeFilm={removeFilm} editFilmFav={editFilmFav}/> : <Navigate replace to='/login' />
          } />   

          {/* --- FILTER: LAST-SEEN --- */}
          <Route path='/last-seen' element = {
            logged ? <RenderFilter logged={logged} logout={handleLogout} filter={"Last Seen"} loading={loading} films={films} editFilmRating={editFilmRating} removeFilm={removeFilm} editFilmFav={editFilmFav}/> : <Navigate replace to='/login' />
          } />    

          {/* --- FILTER: UNSEEN --- */}
          <Route path='/unseen' element = {
            logged ? <RenderFilter logged={logged} logout={handleLogout} filter={"Unseen"} loading={loading} films={films} editFilmRating={editFilmRating} removeFilm={removeFilm} editFilmFav={editFilmFav}/> : <Navigate replace to='/login' />
          } />
          
          {/* --- FILTER: ADD FILM --- */}
          <Route path='/add-film' element = {
            logged ? <NewFilmPage logged={logged} logout={handleLogout} loading={loading} addFilm={addFilm} /> : <Navigate replace to='/login' />
          } />

          {/* --- FILTER: EDIT FILM --- */}
          <Route path='/edit-film/:id' element = {
            logged ? <EditFilmPage logged={logged} logout={handleLogout} loading={loading} films={films} editFilm={editFilm}/> : <Navigate replace to='/login' />
          } /> 

          <Route path='*' element={<NoMatchPage logged={logged} logout={handleLogout} />} />          {/* PAGE NOT FOUND */}
        </Routes>
      </BrowserRouter>

    </>

  );
}

export default App;
