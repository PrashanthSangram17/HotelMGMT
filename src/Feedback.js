import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./fb.css";
import Footer from "./Footer";
import { useForm } from "react-hook-form";
function Feedback() {
	const [rating, setRating] = useState(null);
	const { register, handleSubmit, watch, errors } = useForm();
	const feedbacksubmit = async (data) => {
		const { customer_name, review_text } = data;
		let review = await fetch("http://localhost:4000/review", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				customer_name,
				rating,
				feedback: review_text,
			}),
		});
		review = await review.json();
		if (review === "succesful") alert("reviewed succesfully");
	};
	return (
		<>
			<div className="revparent">
				<h3>Your Feedback is valuable to us.</h3>
				<form onSubmit={handleSubmit(feedbacksubmit)}>
					<div className="name">
						<input
							className="ip"
							type="text"
							placeholder="Name"
							name="customer_name"
							ref={register({ required: true })}
						></input>
					</div>
					{errors.customer_name && <span>this field is required</span>}

					<div>
						<textarea
							className="rev"
							rows="5"
							cols="50"
							placeholder="Review"
							name="review_text"
							ref={register({ required: true })}
						></textarea>
						{errors.review_text && <span>this field is required</span>}
					</div>

					<div className="stars">
						{[...Array(5)].map((star, i) => {
							const ratingValue = i + 1;
							return (
								<label className="label">
									<input
										className="radio"
										type="radio"
										name="ratings"
										value={ratingValue}
										onClick={() => setRating(ratingValue)}
									/>
									<FaStar
										className="star"
										size={25}
										color={ratingValue <= rating ? "#ffc107" : "#C8C8C8"}
									/>
								</label>
							);
						})}
					</div>
					{errors.ratings && <span>this field is required</span>}
					<h4>Thank you for the {rating} stars! :</h4>
					<button className="sub" type="submit">
						Submit
					</button>
				</form>
			</div>

			<div className="imagesdiv">
				<img className="i" src="fb.jpeg"></img>
			</div>
			<Footer />
		</>
	);
}

export default Feedback;
