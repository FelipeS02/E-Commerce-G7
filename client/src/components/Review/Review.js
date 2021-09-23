import ReactStars from 'react-stars'
import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import StarsRating from 'react-star-rate';
import { Form, FormControl, Button, Card, Container, Accordion} from "react-bootstrap";
import { reviewUser } from '../../actions/orderActions';
import {  useHistory } from "react-router-dom";
import swal from 'sweetalert';

const Review = (props) => {

    const history = useHistory();
    const { clotheId, userId } = props;
    const dispatch = useDispatch();
    const [value, setValue] = useState(0);
    const data = {};
    const [review, setReview] = useState('');

    function handleText(e){
        setReview(e.target.value);
    }

    function handleSubmit(e){

        e.preventDefault();

        data.clotheId = clotheId;
        data.userId = userId;
        data.score = value;
        data.review = review;

        dispatch(reviewUser(data));
        swal("Gracias por dejarnos tu opinón");
        history.push("/");

    }

    return (

        <>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>DEJANOS TU OPINIÓN</Form.Label>
                <Form.Control
                            autoComplete='off'
                            type="text"
                            name='review'
                            value={review}
                            onChange={handleText}
                            />
            </Form.Group>
      <StarsRating
        value={value}
        allowHalf={false}
        onChange={value => {
          setValue(value);
        }}
      />
       <Button type='submit' >ENVIAR</Button>
    </Form>

</>

);
}
export default Review;
//