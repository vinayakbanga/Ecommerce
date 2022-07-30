import React from 'react'
import ReactStars from 'react-rating-stars-component';
import profilePng from "../../Profile.png"

const ReviewCard = ({review}) => {
    const options = {
        size: "large",
        value: review.rating,
        readOnly: true,
        precision: 0.5,
      };
  return (
    <>
    <div className=' border-black w-1/4 flex flex-col items-center shadow-2xl' >
        <img src={profilePng} className="w-20" alt="user"/>
        <p className='font-semibold text-lg'>{review.name}</p>
        <ReactStars {...options}/>
        <span className='text-gray-800 font-light'>{review.comment}</span>
    </div>
    </>
  )
}

export default ReviewCard