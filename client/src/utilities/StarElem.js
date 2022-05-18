/* IMPORTING BOOTSTRAP COMPONENTS */
import { Star }         from "react-bootstrap-icons";
import { StarFill }     from "react-bootstrap-icons";


function StarElem(props) {
    if (props.fill === 1)
        return(<StarFill onClick={()=>(props.ratingOnClickHandler(props.film,props.number))}/>);
    else
        return(<Star onClick={()=>(props.ratingOnClickHandler(props.film,props.number))}/>);
}

export default  StarElem;