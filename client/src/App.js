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
import { readFilms }        from "./utilities/API.js";
import { HomePage }         from "./components/Home";
import { NoMatchPage }      from "./components/Home";
import { RenderFilter }     from "./components/manageFilter";
import { NewFilmPage }      from './components/Home';
import { EditFilmPage }     from './components/Home';



/**
 * @brief Main function
 * 
 * @returns the main page of the website
 */
function App() {

  /* DATA AND STATES USED */
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    async function load() {
      const list = await readFilms();
      setFilms(list);
      setLoading(false);
    }
    load();
  }, []);

  const removeFilm = (id) =>{
    setFilms((oldFilms)=> (oldFilms.filter((film)=>(film.id!==id))));
  }

  const editFilm = (id, title, fav, date, rating) =>{
    let filmMod = new Film(id, title, fav, date, rating);

    var index = 0;
    for (let i = 0; i < films.length; i++) {
      if (films[i].id === id) {
        index = i
      }
    }

    console.log(films);
    films.splice(index, 1);
    console.log(films);
    films.push(filmMod);
    return filmMod;
  }

  const addFilm = (title, fav, date, rating) =>{
    let film = new Film((films.length+1), title, fav, date, rating);
    setFilms((oldFilms)=> ([...oldFilms, film]));
  }

  const editFilmFav = (filmMod) =>{
    filmMod.favourite=!(filmMod.favourite);
    setFilms((oldFilms)=> (oldFilms.map((film)=>((film.id===filmMod.id)?filmMod:film))));
    return filmMod;
  }

  const editFilmRating = (filmMod, newrating) =>{
    filmMod.rating=newrating;
    setFilms((oldFilms)=> (oldFilms.map((film)=>((film.id===filmMod.id)?filmMod:film))));
    return filmMod;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />         {/* HOME PAGE */}
        <Route path='/all' element={<RenderFilter setFilms={setFilms} filter={"All"} films={films}  editFilmRating={editFilmRating} removeFilm={removeFilm} editFilmFav={editFilmFav}/>} />      {/* FILTERS */}
        <Route path='/favorites' element={<RenderFilter filter={"Favorites"} films={films} setFilms={setFilms} editFilmRating={editFilmRating} removeFilm={removeFilm} editFilmFav={editFilmFav}/>} />      {/* FILTERS */}
        <Route path='/best-rated' element={<RenderFilter filter={"Best Rated"} films={films} setFilms={setFilms} editFilmRating={editFilmRating} removeFilm={removeFilm} editFilmFav={editFilmFav}/>} />      {/* FILTERS */}
        <Route path='/last-seen' element={<RenderFilter filter={"Last Seen"} films={films} setFilms={setFilms} editFilmRating={editFilmRating} removeFilm={removeFilm} editFilmFav={editFilmFav}/>} />      {/* FILTERS */}
        <Route path='/unseen' element={<RenderFilter filter={"Unseen"} films={films} setFilms={setFilms} editFilmRating={editFilmRating} removeFilm={removeFilm} editFilmFav={editFilmFav}/>} />      {/* FILTERS */}

        {/* ADD AND EDIT FUNCTIONALITY */}
        <Route path='/add-film' element={<NewFilmPage addFilm={addFilm} />} />
        <Route path='/edit-film/:id' element={<EditFilmPage editFilm={editFilm} films={films}/>} />

        <Route path='*' element={<NoMatchPage />} />          {/* PAGE NOT FOUND */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
