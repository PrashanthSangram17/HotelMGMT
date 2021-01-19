import React, { useState } from "react";
import "./Projindex.css";
import "./mycss.css";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Footer from "./Footer";

function UserDetails() {
	const { register, handleSubmit, watch, errors } = useForm();
	const [formErr, setFormErr] = useState("");
	const [notAvail, setNotAvail] = useState("");
	const [orderId, setOrderId] = useState("");
	const [daysnotaval, setDaysnotaval] = useState([]);
	const [stringnotaval, setStringnotaval] = useState("");
	const [isModal, setIsmodal] = useState(false);
	const [custo, setCust] = useState({});
	const [room, setRoom] = useState({});
	const [message, setMessage] = useState("");
	const [totalrooms, setTotalrooms] = useState(0);

	const [buttonclick, setButtonclick] = useState(false);
	let cust, room_det;
	Modal.setAppElement("#root");
	function isDateBefore(date1, date2) {
		return (
			new Date(new Date(date1).toDateString()) <
			new Date(new Date(date2).toDateString())
		);
	}

	const onSubmit = async (data) => {
		let notavaldays = [];
		const {
			first_name,
			last_name,
			in_date,
			out_date,
			e_mail,
			phone_num,
			roomid,
		} = data;
		setOrderId("");
		setNotAvail("");
		setStringnotaval("");
		setDaysnotaval();
		if (isDateBefore(data.out_date, data.in_date)) {
			setNotAvail("Checkout date not valid");
			return;
		}
		let order_status = await fetch("http://localhost:4000/orderstatus", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ roomid, in_date, out_date }),
		});
		order_status = await order_status.json();

		if (order_status.roomsnotavail.length > 0) {
			setStringnotaval("rooms are not available on");
			order_status.roomsnotavail.forEach((ele) => notavaldays.push(ele));
			setDaysnotaval(notavaldays);
		} else {
			const da1 = new Date(out_date);
			const da2 = new Date(in_date);
			console.log(da1.getDate(), da2.getDate());
			setTotalrooms(da1.getDate() - da2.getDate());

			setDaysnotaval();
			cust = await fetch("http://localhost:4000/customer", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ first_name, last_name, e_mail, phone_num }),
			});
			room_det = await fetch(`http://localhost:4000/room/${roomid}`);
			cust = await cust.json();
			room_det = await room_det.json();
			setCust(cust[0]);
			setRoom(room_det[0]);
			console.log(room_det);
			console.log(cust);
			setIsmodal(true);
		}
	};
	const paymentsub = async (e) => {
		console.log(custo);
		console.log(e);
		const { in_date, last_name, payment_type, out_date } = e;
		let order = await fetch("http://localhost:4000/order", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				customer_id: custo.customer_id,
				room_id: e.roomid,
				in_date,
				out_date,
			}),
		});
		order = await order.json();
		console.log(order);
		if (order.message === "succesful") {
			let payment = await fetch("http://localhost:4000/payment", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					customer_id: custo.customer_id,
					room_id: e.roomid,
					payment_type,
				}),
			});
			payment = await payment.json();
			console.log(payment);
			if (payment === "payment succesful") {
				setMessage(payment);
				setOrderId("your order id is " + order.orderid);
				setButtonclick(true);
			}
		}
	};
	return (
		<>
			<section className="head">
				<h1>Thank You for choosing to stay at our hotel!</h1>
				<h3>Please Enter your details.</h3>
			</section>

			<form className="parent" onSubmit={handleSubmit(onSubmit)}>
				<div className="img"></div>
				<div className="details">
					<div className="name">
						<div>
							<input
								name="first_name"
								ref={register({ required: true })}
								type="text"
								placeholder="First Name"
							></input>
							{errors.first_name && <span>This field is required</span>}
						</div>
						<div>
							<input
								name="last_name"
								ref={register({ required: true })}
								type="text"
								placeholder="Last Name"
							></input>
							{errors.last_name && <span>This field is required</span>}
						</div>
					</div>
					<div className="email">
						<input
							name="e_mail"
							type="email"
							placeholder="Email Address"
							ref={register({ required: true })}
						></input>
						{errors.e_mail && <span>This field is required</span>}
					</div>
					<div className="phone_no">
						<input
							name="phone_num"
							type="tel"
							placeholder="Enter your phone number"
							ref={register({ required: true })}
						></input>
						{errors.phone_num && <span>This field is required</span>}
					</div>
					<div className="rooms">
						<select name="roomid" ref={register}>
							<option value="100">Premium King Room</option>
							<option value="101">Deluxe Room</option>
							<option value="102">Double Room</option>
							<option value="103">Luxury Room</option>
							<option value="104">Room With View</option>
							<option value="105">Small View</option>
						</select>
					</div>
					<label>Check-in date.</label>
					<input
						ref={register({ required: true })}
						name="in_date"
						type="date"
						className="dateInput"
					/>
					{errors.in_date && <span>This field is required</span>}
					<label>Check-out date.</label>
					<input
						ref={register({ required: true })}
						name="out_date"
						type="date"
						className="dateInput"
					/>
					{errors.out_date && <span>This field is required</span>}
					<div className="notAvail">{notAvail}</div>
					<div className="notAvail">
						{stringnotaval} {daysnotaval}
					</div>
					<button> Book </button>
					<div className="orderId">{orderId}</div>
				</div>
			</form>
			{
				<Modal
					style={{
						overlay: { position: "fixed" },
						content: {
							width: "500px",
							height: "250px",
							position: "absolute",
							top: "250px",
							left: "430px",
						},
					}}
					isOpen={isModal}
					onRequestClose={() => setIsmodal(false)}
				>
					<div>
						<h3>Name:{custo.first_name + " " + custo.last_name}</h3>
						<h4>Roomcost:{Number(room.room_cost) * totalrooms}</h4>
						<form onSubmit={handleSubmit(paymentsub)}>
							<div className="payment">
								<select name="payment_type" ref={register}>
									<option value="cash">Cash</option>
									<option value="creditcard">Creditcard</option>
								</select>
								<button disabled={buttonclick}>Pay</button>
								<h4>{message}</h4>
							</div>
						</form>
					</div>
				</Modal>
			}
			<Footer />
		</>
	);
}

export default UserDetails;
