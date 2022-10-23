import { ADD_TO_FAVORITE, REMOVE_FROM_FAVORITE } from "../../Constant/FavoriteConstant"

/*
================== Add To Favorite Request Start ==================
*/
export const fetchAddToFavoriteSuccess = (data, quantity) =>
{
	return {
		type: ADD_TO_FAVORITE,
		payload: {
			product: data.product._id,
			name: data.product.name,
			price: data.product.price,
			image: data.product.images[0].url,
			stock: data.product.stock,
			quantity,
		},
	}
}
/*
================== Add To Favorite Request End ==================
*/
/*
================== Remove From Favorite Request Start ==================
*/
export const fetchRemoveFromFavoriteSuccess = (data) =>
{
	return {
		type: REMOVE_FROM_FAVORITE,
		payload: data,
	}
}
/*
================== Remove From Favorite Request End ==================
*/