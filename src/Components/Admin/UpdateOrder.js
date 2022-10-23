import React, { useEffect, useState } from "react";
import MetaData from "../../Exception/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import SideBar from "./Sidebar";
import { getOrderDetails, clearErrors, updateOrder, } from "../../Actions/OrderActions";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../Exception/Loading";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../../Constant/OrderConstant";
import "./UpdateOrder.css";
import { toast } from 'react-toastify';
import { getAdminProduct } from "../../Actions/ProductActions";

const UpdateOrder = ({ match }) =>
{
	const dispatch = useDispatch();
	let test = []
	const { order, error, loading } = useSelector((state) => state.orderDetail);
	const { error: updateError, isUpdated } = useSelector((state) => state.deleteAndUpdateOrder);
	const { products } = useSelector((state) => state.product);

	const [status, setStatus] = useState("");
	const updateOrderSubmitHandler = (e) =>
	{
		e.preventDefault();

		const myForm = {
			status
		}
		let animal_names = test && test.map((animal) =>
		{
			return animal
		})
		for (let i = 0; i < animal_names.length; i++)
		{
			// console.log(animal_names[i])
			if (animal_names[i].stock === 0 & status !== "Đã giao hàng")
			{
				toast.error(`Sản Phẩm ${animal_names[i].stock === 0 ? animal_names[i].name : ""} Trong Kho Không Còn Nữa, Vui Lòng Báo Với Khách Hàng`)
			} else
			{
				dispatch(updateOrder(match.params.id, myForm));
			}
		}
	};

	useEffect(() =>
	{
		if (error)
		{
			toast.error(error);
			dispatch(clearErrors());
		}
		if (updateError)
		{
			toast.error(updateError);
			dispatch(clearErrors());
		}
		if (isUpdated)
		{
			toast.success("Order Updated Successfully");
			dispatch({ type: UPDATE_ORDER_RESET });
		}
		dispatch(getOrderDetails(match.params.id));
		dispatch(getAdminProduct())
	}, [dispatch, error, match.params.id, isUpdated, updateError]);

	useEffect(() =>
	{
		// lay phan tu trong mang
		if (loading === false)
		{
			for (let i = 0; i < order.orderItems.length; i++)
			{
				let idTes = order.orderItems[i].productId;
				const id = products &&
					products.filter((i) => i._id === idTes)
				test.push(id[0])
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading, test])

	return (
		<>
			<MetaData title="Process Order" />
			<div className="dashboard">
				<SideBar />
				<div className="newProductContainer">
					{loading ? (
						<Loading />
					) : (
						<div
							className="confirmOrderPage"
							style={{
								display: order !== null ? order.orderStatus === "Đã giao hàng" ? "block" : "grid" : null,
							}}
						>
							<div>
								<div className="confirmShippingArea">
									<Typography>Shipping Info</Typography>
									<div className="orderDetailsContainerBox">
										<div>
											<p>Name:</p>
											<span>{order !== null ? order.user && order.user.name : null}</span>
										</div>
										<div>
											<p>Phone:</p>
											<span>
												{order !== null ? order.shippingInfo && order.shippingInfo.phoneNo : null}
											</span>
										</div>
										<div>
											<p>Address:</p>
											<span>
												{order !== null ? order.shippingInfo &&
													`${order.shippingInfo.address}, ${order.shippingInfo.city}` : null}
											</span>
										</div>
									</div>

									<Typography>Payment</Typography>
									<div className="orderDetailsContainerBox">
										<div>
											<p style={{
												color: "green"
											}}>
												PAID
											</p>
										</div>

										<div>
											<p>Amount:</p>
											<span>${order !== null ? order.totalPrice && order.totalPrice : null}</span>
										</div>
									</div>

									<Typography>Order Status</Typography>
									<div className="orderDetailsContainerBox">
										<div>
											<p
												className={
													order !== null ? order.orderStatus && order.orderStatus === "Đã giao hàng"
														? "greenColor"
														: "redColor"
														: null
												}
											>
												{order !== null ? order.orderStatus && order.orderStatus : null}
											</p>
										</div>
									</div>
								</div>
								<div className="confirmCartItems">
									<Typography>Your Cart Items:</Typography>
									<div className="confirmCartItemsContainer">
										{order !== null ? order.orderItems &&
											order.orderItems.map((item) => (
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
											)) : null}
									</div>
								</div>
							</div>
							{/*  */}
							<div
								style={{
									display: order !== null ? order.orderStatus === "Đã giao hàng" ? "none" : "block" : null,
								}}
							>
								<form
									className="updateOrderForm"
									onSubmit={updateOrderSubmitHandler}
								>
									<h1>Process Order</h1>

									<div>
										<AccountTreeIcon />
										<select onChange={(e) => setStatus(e.target.value)}>
											<option value="">Choose Category</option>
											{order !== null ? order.orderStatus === "Đang Xử lý" && (
												<option value="Đã vận chuyển">Đã vận chuyển</option>
											) : null}

											{order !== null ? order.orderStatus === "Đã vận chuyển" && (
												<option value="Đã giao hàng">Đã giao hàng</option>
											) : null}
										</select>
									</div>

									<Button
										id="createProductBtn"
										type="submit"
									>
										Process
									</Button>
								</form>
							</div>
						</div>
					)}
				</div>
			</div>

		</>
	);
};

export default UpdateOrder;