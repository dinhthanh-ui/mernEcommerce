import React, { useEffect } from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./Success.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { clearErrorsCart } from "../../Actions/CartAction";
import { useDispatch } from "react-redux";

const Success = () =>
{
	const dispatch = useDispatch();
	useEffect(() =>
	{
		localStorage.removeItem("cartItems");
		localStorage.removeItem("shippingInfo");
		dispatch(clearErrorsCart())
	}, [dispatch])

	return (
		<div className="orderSuccess">
			<CheckCircleIcon />

			<Typography>Your Order has been Placed successfully </Typography>
			<Link to="/orders">View Orders</Link>
		</div>
	);
};

export default Success;