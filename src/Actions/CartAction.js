import axios from "axios";
import { CLEAR_ERRORS } from "../Constant/CartConstant";
import { fetchAddToCartSuccess, fetchRemoveCartItemSuccess, fetchSaveShippingInfoSuccess } from "./TypeOfActions/CartType";

// Add to Cart ---Product
export const addItemsToCart = (id, quantity) => 
{
	return async (dispatch, getState) =>
	{
		const { data } = await axios.get(`/api/v1/product/${id}`);

		dispatch(fetchAddToCartSuccess(data, quantity));

		localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
	}

};

// REMOVE FROM CART ---Product
export const removeItemsFromCart = (id) =>
{
	return async (dispatch, getState) =>
	{
		dispatch(fetchRemoveCartItemSuccess(id))
		localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
	}

};

// SAVE SHIPPING INFO 
export const saveShippingInfo = (data) =>
{
	return async (dispatch) =>
	{
		dispatch(fetchSaveShippingInfoSuccess(data))

		localStorage.setItem("shippingInfo", JSON.stringify(data));
	}

};
export const clearErrorsCart = () => async (dispatch) =>
{
	dispatch({
		type: CLEAR_ERRORS
	})
}