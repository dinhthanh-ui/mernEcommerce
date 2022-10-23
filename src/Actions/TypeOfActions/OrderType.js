import
{
	ALL_ORDERS_FAIL,
	ALL_ORDERS_REQUEST,
	ALL_ORDERS_SUCCESS,
	CREATE_ORDER_FAIL,
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	DELETE_ORDER_FAIL,
	DELETE_ORDER_REQUEST,
	DELETE_ORDER_SUCCESS,
	MY_ORDERS_FAIL,
	MY_ORDERS_REQUEST,
	MY_ORDERS_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	UPDATE_ORDER_FAIL,
	UPDATE_ORDER_REQUEST,
	UPDATE_ORDER_SUCCESS
} from "../../Constant/OrderConstant"

/*
================== Create Order Request Start ==================
*/
export const fetchCreateOrderRequest = () =>
{
	return {
		type: CREATE_ORDER_REQUEST,
	}
}
export const fetchCreateOrderSuccess = (data) =>
{
	return {
		type: CREATE_ORDER_SUCCESS,
		payload: data
	}
}
export const fetchCreateOrderFail = (error) =>
{
	return {
		type: CREATE_ORDER_FAIL,
		payload: error
	}
}
/*
================== Create Order Request End ==================
*/
/*
================== My Order Request Start ==================
*/
export const fetchMyOrderRequest = () =>
{
	return {
		type: MY_ORDERS_REQUEST,
	}
}
export const fetchMyOrderSuccess = (data) =>
{
	return {
		type: MY_ORDERS_SUCCESS,
		payload: data
	}
}
export const fetchMyOrderFail = (error) =>
{
	return {
		type: MY_ORDERS_FAIL,
		payload: error
	}
}
/*
================== My Order  Request End ==================
*/
/*
================== All Order Request Start ==================
*/
export const fetchAllOrderRequest = () =>
{
	return {
		type: ALL_ORDERS_REQUEST,
	}
}
export const fetchAllOrderSuccess = (data) =>
{
	return {
		type: ALL_ORDERS_SUCCESS,
		payload: data
	}
}
export const fetchAllOrderFail = (error) =>
{
	return {
		type: ALL_ORDERS_FAIL,
		payload: error.message
	}
}
/*
================== All Order  Request End ==================
*/
/*
================== Delete Order Request Start ==================
*/
export const fetchDeleteOrderRequest = () =>
{
	return {
		type: DELETE_ORDER_REQUEST,
	}
}
export const fetchDeleteOrderSuccess = (data) =>
{
	return {
		type: DELETE_ORDER_SUCCESS,
		payload: data
	}
}
export const fetchDeleteOrderFail = (error) =>
{
	return {
		type: DELETE_ORDER_FAIL,
		payload: error.message
	}
}
/*
================== Delete Order  Request End ==================
*/
/*
================== Order Detail Request Start ==================
*/
export const fetchOrderDetailRequest = () =>
{
	return {
		type: ORDER_DETAILS_REQUEST,
	}
}
export const fetchOrderDetailSuccess = (data) =>
{
	return {
		type: ORDER_DETAILS_SUCCESS,
		payload: data
	}
}
export const fetchOrderDetailFail = (error) =>
{
	return {
		type: ORDER_DETAILS_FAIL,
		payload: error.message
	}
}
/*
================== Order Detail  Request End ==================
*/
/*
================== Update Order  Request Start ==================
*/
export const fetchUpdateOrderRequest = () =>
{
	return {
		type: UPDATE_ORDER_REQUEST,
	}
}
export const fetchUpdateOrderSuccess = (data) =>
{
	return {
		type: UPDATE_ORDER_SUCCESS,
		payload: data
	}
}
export const fetchUpdateOrderFail = (error) =>
{
	return {
		type: UPDATE_ORDER_FAIL,
		payload: error.message
	}
}
/*
==================  Update Order   Request End ==================
*/


