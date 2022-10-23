
import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../../Constant/CartConstant"

/*
================== Add To Cart Request Start ==================
*/
export const fetchAddToCartSuccess = (data, quantity) =>
{
	return {
		type: ADD_TO_CART,
		payload: {
			productId: data.product._id,
			productName: data.product.name,
			productPrice: data.product.price,
			productImage: data.product.images[0].url,
			stock: data.product.stock,
			quantity,
		},
	}
}
/*
================== Add To Cart Request End ==================
*/
/*
================== Remove Cart Item Request Start ==================
*/
export const fetchRemoveCartItemSuccess = (data) =>
{
	return {
		type: REMOVE_CART_ITEM,
		payload: data,
	}
}
/*
================== Remove Cart Item Request End ==================
*/
/*
================== Save Shipping Info Request Start ==================
*/
export const fetchSaveShippingInfoSuccess = (data) =>
{
	return {
		type: SAVE_SHIPPING_INFO,
		payload: data,
	}
}
/*
================== Save Shipping Info Request End ==================
*/

