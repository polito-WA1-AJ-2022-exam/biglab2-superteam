import { Film } from "./film";

const APIURL = 'http://localhost:3001';

async function readFilms() {
    const url = APIURL + '/films';
    try {
        const response = await fetch(url);
        if (response.ok) {
            // process the response
            const list = await response.json();
            const filmList = list.map((f)=>new Film(f.id, f.title, f.favorite, f.watchdate, f.rating));
            return filmList;
        } else {
            // application error (404, 500, ...)
            console.log(response.statusText);
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (ex) {
        // network error
        console.log(ex);
        throw ex;
    }
}

async function readFilteredFilms(filter) {
    const url = APIURL + '/films/'+filter;
    try {
        const response = await fetch(url);
        if (response.ok) {
            // process the response
            const list = await response.json();
            const filmList = list.map((f)=>new Film(f.id, f.title, f.favorite, f.watchdate, f.rating));
            return filmList;
        } else {
            // application error (404, 500, ...)
            console.log(response.statusText);
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (ex) {
        // network error
        console.log(ex);
        throw ex;
    }
}

// API: POST /film
async function apiAddFilm(film) {
    const obj={title: film.title}; 
    if(film.favourite!== undefined)
        obj.favorite=film.favourite;
    else
        obj.favorite=false;
    if(film.date!== undefined)
        obj.watchdate=film.date;
    if(film.date!== undefined)
        obj.watchdate=film.date;
    if(film.rating!==undefined)
        obj.rating=film.rating;
    
    const url = APIURL + '/film';
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            return true;
        } else {
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (ex) {
        throw ex;
    }
}

//API: PUT /film/:id
async function apiEditFilm(film) {
    const url = APIURL + '/film/'+film.id;
    delete film.id;
    const obj={title: film.title}; 
    if(film.favourite!== undefined)
        obj.favorite=film.favourite;
    else
        obj.favorite=false;
    if(film.date!== undefined)
        obj.watchdate=film.date;
    if(film.date!== undefined)
        obj.watchdate=film.date;
    if(film.rating!==undefined)
        obj.rating=film.rating;
    try {
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            return true;
        } else {
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (ex) {
        throw ex;
    }
}

//API: PUT /film/:id/favorite
async function apiEditFilmFav(film) {
    const url = APIURL + '/film/'+film.id+'/favorite';
    let obj = {favorite: film.favourite};
    try {
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            return true;
        } else {
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (ex) {
        throw ex;
    }
}

//API: DELETE /film/:id
async function apiRemoveFilm(id) {
    const url = APIURL+ `/film/${id}`;
    try {
        const response = await fetch(url, {
            method: 'DELETE'
        });
        if(response.ok) {
            return true;
        } else {
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch(ex) {
        throw ex;
    }
}


export {readFilms, readFilteredFilms, apiAddFilm, apiEditFilm, apiEditFilmFav, apiRemoveFilm};