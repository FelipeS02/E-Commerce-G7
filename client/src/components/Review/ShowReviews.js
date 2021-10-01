import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StarsRating from "react-star-rate";
import {
  Form,
Fade,  Button,
  Row,
  Container,
  Accordion,
} from "react-bootstrap";
import { getReviews, reviewUser } from "../../actions/orderActions";

const ShowReview = (props) => {

    const { clotheId, userId } = props;
    const reviews = useSelector(state => state.orderState.reviews.data);
    const dispatch = useDispatch();
    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        dispatch(getReviews(clotheId));
    }, [clotheId])


    console.log(reviews);
  
    return (
      <Container className='mt-4 '>
        <Button
            onClick={() => setOpen(!open)}
            aria-controls="example-fade-text"
            aria-expanded={open}>
            Reseñas
        </Button>
             
              
                  { reviews?.length === 0 ? 
                    ( <Fade in={open}>
                  <div id="example-fade-text">
                  <h4 className='m-3 '> PRODUCTO SIN RESEÑA</h4>
                      </div>
                      </Fade>) :
                        (<Fade in={open} className="border border-primary-5">
                  <div id="example-fade-text" >
                          {reviews?.slice(0,3).map((review, index) => (
                        <div  className=' p-2 text-center ' key = {index}>
                          <Row className='ml-5'> 
                              {review.username} opina que:
                          </Row>
                          <Row className='ml-5'>
                            "{review.review}"
                          </Row>
                          <StarsRating
                              value={review.score}
                              allowHalf={false}
                              disabled={true}
                              onChange={(value) => {
                                setValue(value);
                            }}
                          />
                        </div>
                        ))}
                  </div> 
              </Fade>)}
      </Container>
    );
  };
  export default ShowReview;