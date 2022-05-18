import dayjs from 'dayjs';

function Film(id, title, favourite, date, rating){
    this.id=id;
    this.title=title;
    this.favourite= favourite;
    if(this.date !== undefined)
             this.watchdate=this.date.$d.toString().substr(0,15);
    else
            this.watchdate="To be seen";
    if(date !== undefined && date!=='')
        this.date=dayjs(date, "MMMM DD, YYYY");
    if(rating !== undefined)
        this.rating=rating;
    this.getdiff=() =>{
        let curdate=dayjs();
        let diff=curdate.diff(this.date, 'day');
        return diff;
    }
    this.printfilm=()=>{
        let printstring="";
        let watchdate="<not defined>";
        let scoreprint="<not defined>";
        if(this.date !== undefined)
             this.watchdate=this.date.$d.toString().substr(0,15);
        if(this.rating !== undefined)
             scoreprint=this.rating;

        printstring="Id: "+this.id+", Title: "+ this.title + ", Favourite: "+((this.favourite===true)?"true":"false")+ ", Watch date: "+ watchdate + ", Score: "+ scoreprint;
        console.log(printstring);
    };
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