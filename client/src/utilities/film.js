import dayjs from 'dayjs';

class Film {

    /**
     * Constructor og the film object
     * @param {Number} id 
     * @param {String} title 
     * @param {Boolean} favorite 
     * @param {Date} watchdate 
     * @param {Number} rating 
     */
    constructor(id, title, favorite, watchdate, rating) {
        this.id = id;
        this.title = title;
        this.favorite = (favorite !== undefined) ? favorite : undefined;
        this.watchdate = (watchdate !== undefined) ? watchdate : undefined;
        this.rating = (rating !== undefined) ? rating : undefined;
    }
}

function FilmLibrary(){
    this.filmlist=[];
    this.addnewfilm= (newfilm) => {this.filmlist.push(newfilm);};
    this.printlist= ()=>{
        console.log("***** List of films *****");
        this.filmlist.forEach(element => { 
            element.printfilm();
            }
        );
    };

    this.getFilmList = () => {return this.filmlist}

    this.getFavourite =() => {
        let newfilmlist=[];
        for(const element of this.filmlist){
            if(element.favourite === true){
                newfilmlist.push(element);
            }
        };  
        return newfilmlist;
    }
    this.getBestRated =() => {
        let newfilmlist=[];
        for(const element of this.filmlist){
            if(element.rating === 5){
                newfilmlist.push(element);
            }
        };  
        return newfilmlist;
    }

    this.getRated= () => {
        let newfilmlist=[];
        this.filmlist.forEach(element => { 
            console.log("***** Films filtered, only the rated ones *****");
            if(element.rating !== undefined){
                newfilmlist.push(element);
                element.printfilm();
            }
        });  
    };
    this.sortByDate= () =>{
        this.filmlist.sort((a,b) => {
            const date1=a.date;
            const date2=b.date;
            if (date1 === undefined)
                return 1;
            if (date2 === undefined)
                return -1;
            if (date1.$y<date2.$y)
                return -1;
            if (a.date['$M']<b.date.month['$M'])
                return -1;
            if (a.date['$D']<b.date['$D'])
                return -1;
            if(a.date['$D']===b.date['$D'])
                return 0;
            return 1;
        } )
    };
    this.deleteFilm= (id) => {
        let newfilmlist=[];
        this.filmlist.forEach(element => { 
            if(element.id!==id)
                newfilmlist.push(element);
        });
        this.filmlist=newfilmlist;
    };

    this.resetWatchedFilms= () => {
        this.filmlist.forEach(element => { 
            element.date=undefined;
        });
    };

}

export {Film, FilmLibrary};