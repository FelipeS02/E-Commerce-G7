import ReactStars from 'react-stars';
import React from 'react';


const Review = () => {
    const [review, setReview] = useState()
    const ratingChanged = (newRating) => {
        console.log(newRating)
    }

    return (
        <ReactStars
        count={5}
        onChange={ratingChanged}
        size={24}
        color2={'#ffd700'} />
        );
}
export default Review;
