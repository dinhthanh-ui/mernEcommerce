import axios from "axios";

import { CLEAR_ERRORS } from "../Constant/OrderConstant";
import
{
	fetchAllOrderFail,
	fetchAllOrderRequest,
	fetchAllOrderSuccess,
	fetchCreateOrderFail,
	fetchCreateOrderRequest,
	fetchCreateOrderSuccess,
	fetchDeleteOrderFail,
	fetchDeleteOrderRequest,
	fetchDeleteOrderSuccess,
	fetchMyOrderFail,
	fetchMyOrderRequest,
	fetchMyOrderSuccess,
	fetchOrderDetailFail,
	fetchOrderDetailRequest,
	fetchOrderDetailSuccess,
	fetchUpdateOrderFail,
	fetchUpdateOrderRequest,
	fetchUpdateOrderSuccess
} from "./TypeOfActions/OrderType";

// Create Order
export const createOrder = (order) => 
{
	return async (dispatch) =>
	{
		dispatch(fetchCreateOrderRequest())
		try
		{
			const { data } = await axios.post("/api/v1/order/new", order);
			dispatch(fetchCreateOrderSuccess(data))
		} catch (error)
		{
			console.error(error.response)
			dispatch(fetchCreateOrderFail(error.response.data.message))
		}
	}
};


// My Orders
export const myOrders = () => 
{
	return async (dispatch) =>
	{
		dispatch(fetchMyOrderRequest());
		try
		{
			const { data } = await axios.get("/api/v1/orders/me");
			dispatch(fetchMyOrderSuccess(data))
		} catch (error)
		{
			dispatch(fetchMyOrderFail(error.response.data.message))
		}
	}
};

// // Get Order Details
export const getOrderDetails = (id) => 
{

	return async (dispatch) =>
	{
		dispatch(fetchOrderDetailRequest())
		try
		{
			const { data } = await axios.get(`/api/v1/order/${id}`);
			dispatch(fetchOrderDetailSuccess(data.order))
		} catch (error)
		{
			dispatch(fetchOrderDetailFail(error.response.data))
		}
	}
};


// All order  -----Admin
export const getAllOrders = () => 
{
	return async (dispatch) =>
	{
		dispatch(fetchAllOrderRequest());
		try
		{
			const { data } = await axios.get("/api/v1/admin/orders");
			dispatch(fetchAllOrderSuccess(data.orders))
		} catch (error)
		{
			dispatch(fetchAllOrderFail(error.response.data))
		}
	}

};

// // Update Order
export const updateOrder = (id, order) => 
{

	return async (dispatch) =>
	{
		dispatch(fetchUpdateOrderRequest());
		try
		{
			let link = `/api/v1/admin/order/${id}`;

			const { data } = await axios.put(link, order);

			dispatch(fetchUpdateOrderSuccess(data.success))

		} catch (error)
		{
			dispatch(fetchUpdateOrderFail(error.response.data))
		}
	}
};

// Delete Order
export const deleteOrder = (id) => 
{

	return async (dispatch) =>
	{
		dispatch(fetchDeleteOrderRequest())
		try
		{
			const { data } = await axios.delete(`/api/v1/admin/order/${id}`);

			dispatch(fetchDeleteOrderSuccess(data.success))
		} catch (error)
		{
			dispatch(fetchDeleteOrderFail(error.response.data))
		}
	}
};




// Clearing Errors
export const clearErrors = () => async (dispatch) =>
{
	dispatch({ type: CLEAR_ERRORS });
};
