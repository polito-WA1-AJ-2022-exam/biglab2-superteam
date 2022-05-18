import {Film, FilmLibrary} from './film.js'
function LoadContent(){
    let lib= new FilmLibrary();
    lib.addnewfilm(new Film(1, "Pulp Fiction", true, "March 10, 2022", 5));
    lib.addnewfilm(new Film(2, "21 Grams", true, "March 17, 2022", 4));
    lib.addnewfilm(new Film(3, "Star Wars"));
    lib.addnewfilm(new Film(4, "Matrix"));
    lib.addnewfilm(new Film(5, "Shrek", false, "March 21, 2022", 3));
    return lib;
}
export default LoadContent;