import { useEffect, useState } from "react";
import dayjs from 'dayjs';

/* IMPORTING REACT ROUTER COMPONENTS */
import { useNavigate, useParams }  from 'react-router-dom';

/* IMPORTING REACT BOOTSTRAP COMPONENTS */
import { Button } from 'react-bootstrap';
import { Form }   from 'react-bootstrap';

function FilmForm(props) {

  /* DATA AND STATES USED */
  const [validated, setValidated] = useState(false);
  const defaultTitle = '';
  const defaultFavourite = false;
  const defaultDate = '';
  const defaultRating = 0;

  const [fav, setFav] = useState(props.mode === 'add' ? defaultFavourite : props.targetFilm.favorite);
  const [title, setTitle] = useState(props.mode === 'add' ? defaultTitle : props.targetFilm.title);
  const [date, setDate] = useState(props.mode === 'add' ? defaultDate : props.targetFilm.watchdate);
  const [rating, setRating] = useState(props.mode === 'add' ? defaultRating : props.targetFilm.rating);

  
  const [validDate, setValidDate] = useState(date !== null && date !== '' && dayjs().diff((dayjs(date, "YYYY-MM-DD"), 'day') >= 0));

 
  const navigate = useNavigate();

  const getDate = (day) => {
    let daystring = '';
    if (day !== undefined)
        daystring = daystring + day.year() + '-' + ((day.month() < 9) ? ("0" + (day.month()+1)) : (day.month()+1)) + '-' + ((day.date() < 10) ? ("0" + day.date()) : day.date());
      return daystring;
  }

  const getCurrDate = () => {
    getDate(dayjs());
  }

  const checkValidity = (date) =>{
    const diff = dayjs().diff(dayjs(date, "YYYY-MM-DD"), 'day');
    if (date !== undefined && diff >= 0)
      setValidDate(true);
    else{
      setValidDate(false);
      setFav(false);
      setRating(0);
    }
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false ) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    if (props.mode === "add") {
      if (window.confirm("Are you sure you want to add this film?") === true) {

        /* creating the newFilm object and hooks App() to call the client-side API */
        const newFilm = {
          title: title,
          favorite: fav,
          ...((date !== '') && {watchdate: date}),  /* add object attribute conditionally */
          ...((date !== '') && {rating: rating})    /* add object attribute conditionally */
        }
        props.addFilm(newFilm);

        // adding the film to the film list
        setValidated(true);
        alert('A new film was submitted: ' + title);
        
        /* GOING BACK TO THE PREVIOUS PAGE */
        navigate(-1);
      }
    } else {
      if (window.confirm("Are you sure you want to edit this film?") === true) {

        /* creating the newFilm object and hooks App() to call the client-side API */
        const newFilm = {
          id: props.targetFilm.id,
          title: title,
          favorite: fav,
          watchdate: date,
          rating: rating
        }
        props.editFilm(newFilm);

        // adding the film to the film list
        setValidated(true);
        alert('A film was submitted: ' + title);
        
        /* GOING BACK TO THE PREVIOUS PAGE */
        navigate(-1);
      }
    }    
  };

  
  return (
    <div style={{ borderColor: 'grey', borderWidth: 2, borderStyle: 'dotted', padding: 10 }}>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>

        {/* TITLE */}
        <Form.Group className='mb-3' >
          <Form.Label>Title</Form.Label>
          <Form.Control type='text' value={title} required={true} placeholder="Title" onChange={(event) => {setTitle(event.target.value)} } />
          <Form.Control.Feedback type="invalid">
            Please provide a title.
          </Form.Control.Feedback>
        </Form.Group>

        {/* FAVORITE */}
        <Form.Group className='mb-3'>
          <Form.Label>Favourite</Form.Label>
          <Form.Check type="checkbox" checked={fav} isValid={true} disabled={!validDate} onChange={(event) => { setFav(event.target.checked) }}/>
            {!validDate && <Form.Text muted>
                You can add the film as favourite after having added a watchdate.
                </Form.Text>}
        </Form.Group>

        {/* WATCHDATE */}        
        <Form.Group className='mb-3'>
          <Form.Label>Date</Form.Label>
          <Form.Control type='date' max={getCurrDate()} value={date} onChange={(event) => { setDate(event.target.value); checkValidity(event.target.value) }} />
        </Form.Group>

        {/* RATINGS */}        
        <Form.Group className='mb-3'>
          <Form.Label>Rating   </Form.Label>
          <Form.Control type='number' value={rating} min={0} max={5} disabled={!validDate} onChange={(event) => { setRating(event.target.value) }} />
          <Form.Control.Feedback type="invalid">
            Please provide a correct rating (between 0 and 5).
          </Form.Control.Feedback>
          {!validDate && <Form.Text muted>
              You can give a rating to the film after having added a watchdate.
              </Form.Text>}
        </Form.Group>

        {/* BUTTON FOR SUBMIT AND CANCEL */}
        <div align='right'>
          <Button variant='outline-secondary' onClick={() => navigate(-1)}>Cancel</Button>
          <Button type='submit' variant='outline-success'>{props.mode === 'edit' ? 'Edit' : 'Add'}</Button>
        </div>
      </Form>
    </div> 
  );
}

export default FilmForm;