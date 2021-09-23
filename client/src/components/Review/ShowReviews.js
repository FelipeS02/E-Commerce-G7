import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StarsRating from "react-star-rate";
import {
  Form,
  FormControl,
  Button,
  Card,
  Container,
  Accordion,
} from "react-bootstrap";
import { getReviews } from "../../actions/orderActions";

const ShowReview = (props) => {

    const { clotheId, userId } = props;
    const reviews = useSelector(state => state.orderState.reviews.data);
    const dispatch = useDispatch();
    const [value, setValue] = useState(0);

    useEffect(() => {
        dispatch(getReviews(clotheId));
    }, [clotheId])

    console.log(reviews);
  
    return (
      <Container>
        {reviews?.map((review, index) => (
            <div key = {index}>
            <div>{review.username}</div>
            <StarsRating
            value={value}
            allowHalf={false}
            disabled={true}
            onChange={(value) => {
              setValue(value);
            }}
          />
            </div>
         ))}
      </Container>
    );
  };
  export default ShowReview;