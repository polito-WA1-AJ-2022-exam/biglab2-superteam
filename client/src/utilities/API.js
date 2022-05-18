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

export {readFilms, readFilteredFilms};