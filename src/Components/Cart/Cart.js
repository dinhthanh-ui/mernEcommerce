import React from "react";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../Actions/CartAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";
import CartItemCard from "./CartItemCard";
import BottomTab from "../../Exception/BottomTab";
import { toast } from 'react-toastify';

const Cart = ({ history }) =>
{
	const dispatch = useDispatch();

	const { cartItems } = useSelector((state) => state.cart);
	let Price = cartItems.reduce(
		(acc, item) => acc + (item.quantity * item.productPrice),
		0
	);

	let totalPrice = Price;
	const increaseQuantity = (id, quantity, stock) =>
	{
		const newQty = quantity + 1;
		if (stock <= quantity)
		{
			return toast.error(`Số lượng sản phẩm trong kho còn: ${stock} sản phẩm. Mong Quý Khách Thông Cảm !!!!!  `);
		}
		dispatch(addItemsToCart(id, newQty));
	};

	const decreaseQuantity = (id, quantity) =>
	{
		const newQty = quantity - 1;
		if (1 >= quantity)
		{
			return;
		}
		dispatch(addItemsToCart(id, newQty));
	};

	const deleteCartItems = (id) =>
	{
		dispatch(removeItemsFromCart(id));
	};

	const checkoutHandler = () =>
	{
		history.push("/login?redirect=shipping");
	};

	return (
		<>
			{cartItems.length === 0 ? (
				<div className="emptyCart">
					<RemoveShoppingCartIcon />
					<Typography>No Items In Cart</Typography>
					<Link to="/products">View Products</Link>
					<BottomTab />
				</div>
			) : (
				<>
					<div className="cartPage">
						<div className="cartHeader">
							<p>Product</p>
							<p>Quantity</p>
							<p>Subtotal</p>
						</div>

						{cartItems &&
							cartItems.map((item) => (
								<div className="cartContainer" key={item.productId}>
									<CartItemCard item={item} deleteCartItems={deleteCartItems} />
									<div className="cartInput">
										<button
											onClick={() =>
												decreaseQuantity(item.productId, item.quantity)
											}
										>
											-
										</button>
										<input type="number" readOnly value={item.quantity} />
										<button
											onClick={() =>
												increaseQuantity(
													item.productId,
													item.quantity,
													item.stock
												)
											}
										>
											+
										</button>
									</div>
									<p className="cartSubtotal">{`$${item.productPrice * item.quantity
										}`}</p>
								</div>
							))}

						<div className="cartGrossProfit">
							<div></div>
							<div className="cartGrossProfitBox">
								<p>Price Total</p>
								<p>$ {totalPrice}</p>
							</div>
							<div></div>
							<div className="checkOutBtn">
								<button onClick={checkoutHandler}>Check Out</button>
							</div>
						</div>
					</div>
					<BottomTab />
				</>
			)}
		</>
	);
};

export default Cart;
