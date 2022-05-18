/* IMPORTING BOOTSTRAP LIST */
import { ListGroup } from 'react-bootstrap';

/* IMPORTING REACT ROUTER COMPONENTS */
import { useNavigate } from 'react-router-dom';

/**
 * 
 * @param {String} filter filter chosen by the user
 * @param {String} comp   compare the filter chose by the user with this string
 * @returns 
 */
function isActive(filter, comp) {
  return (comp === filter) ? true : false
}

function AsideChoice(props){

  const navigate = useNavigate();
  return( 
      <ListGroup >
        <ListGroup.Item  action active={isActive(props.filter, "All")} onClick={() => {navigate('/all');}}>
            All
        </ListGroup.Item>
        <ListGroup.Item  action active={isActive(props.filter, "Favorites")} onClick={() => {navigate('/favorites');}} >
            Favorites
        </ListGroup.Item>
        <ListGroup.Item  action  active={isActive(props.filter, "Best Rated")} onClick={() => {navigate('/best-rated');}}>
          Best Rated
        </ListGroup.Item>
        <ListGroup.Item  action  active={isActive(props.filter, "Last Seen")} onClick={() => {navigate('/last-seen');}}>
          Last Seen
        </ListGroup.Item>
        <ListGroup.Item  action  active={isActive(props.filter, "Unseen")} onClick={() => {navigate('/unseen');}}>
          Unseen
        </ListGroup.Item>
        <ListGroup.Item variant='success' action onClick={() => {navigate('/add-film');}}>
          <b>Add new film</b>
        </ListGroup.Item>
      </ListGroup>
  );
};

export default AsideChoice;