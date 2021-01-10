import React, { Component } from "react";
import { Link } from "react-router-dom";
import Slider from "./Slider";
import Aboutus from "./Aboutus";
import Services from "./Services";
import "./Home.css";
import "./fb.css";
import Footer from "../Footer";
class Home extends Component {
	render() {
		return (
			<>
				<div className="home">
					<Aboutus></Aboutus>
					<Slider></Slider>
					<Services></Services>
					<div className="pardiv">
						<div className="fb">
							<img className="revimg" src="rev1.jpeg"></img>
							<div>
								<Link to="feedback">
									<button>Leave a Review?!</button>
								</Link>
							</div>
						</div>
						<div className="more">
							<img className="revimg" src="download.png"></img>
							<div>
								<button>More from us!</button>
							</div>
						</div>
					</div>
					<Footer />
				</div>
			</>
		);
	}
}

export default Home;
