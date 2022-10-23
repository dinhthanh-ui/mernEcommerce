import React from "react";
import "./ConfirmOrder.css";
import { useSelector } from "react-redux";
import CheckoutSteps from "./CheckoutSteps";
import MetaData from "../../Exception/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import BottomTab from "../../Exception/BottomTab";

const ConfirmOrder = ({ history }) =>
{
	const { shippingInfo, cartItems } = useSelector((state) => state.cart);

	const { user } = useSelector((state) => state.user);

	let productPrice = cartItems.reduce(
		(acc, item) => acc + (item.quantity * item.productPrice),
		0
	);

	const subtotal = productPrice

	const shippingCharges = productPrice > 100 ? 0 : 50;

	const totalPrice = subtotal + shippingCharges;

	const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.country}`;

	const proceedToPayment = () =>
	{
		const data = {
			subtotal,
			shippingCharges,
			totalPrice,
		};
		sessionStorage.setItem("orderInfo", JSON.stringify(data));
		history.push("/process/payment");
	};

	return (
		<>
			<MetaData title="Confirm Order" />
			<CheckoutSteps activeStep={1} />
			<div className="confirmOrderPage">
				<div>
					<div className="confirmShippingArea">
						<Typography>Shipping Info</Typography>
						<div className="confirmShippingAreaBox">
							<div>
								<p>Name:</p>
								<span>{user.name}</span>
							</div>
							<div>
								<p>Phone:</p>
								<span>{shippingInfo.phoneNo}</span>
							</div>
							<div>
								<p>Address:</p>
								<span>{address}</span>
							</div>
						</div>
					</div>
					<div className="confirmCartItems">
						<Typography>Your Cart Items:</Typography>

						{cartItems.length === 0 ?
							<div className="confirmCartItemsContainer">
								""
							</div>
							:
							<div className="confirmCartItemsContainer">
								{cartItems.map((item) => (
									<div key={item.productId}>
										<img src={item.productImage} alt="Product" />
										<Link to={`/product/${item.productId}`}>
											{item.productName}
										</Link>{" "}
										<span>
											{item.quantity} X ${item.productPrice} ={" "}
											<b>${item.productPrice * item.quantity}</b>
										</span>
									</div>
								))
								}
							</div>
						}

					</div>
				</div>
				{/*  */}
				<div>
					<div className="orderSummary">
						<Typography>Order Summery</Typography>
						<div>
							<div>
								<p>Subtotal:</p>
								<span>${subtotal}</span>
							</div>
							<div>
								<p>Shipping Charges:</p>
								<span>${shippingCharges}</span>
							</div>
							<div>
							</div>
						</div>

						<div className="orderSummaryTotal">
							<p>
								<b>Total:</b>
							</p>
							<span>${totalPrice}</span>
						</div>

						<button onClick={proceedToPayment}>Proceed To Payment</button>
					</div>
				</div>
			</div>
			<BottomTab />
		</>
	);
};

export default ConfirmOrder;
