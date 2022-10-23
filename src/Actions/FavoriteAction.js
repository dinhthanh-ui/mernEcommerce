
import axios from "axios";
import { fetchAddToFavoriteSuccess, fetchRemoveFromFavoriteSuccess } from "./TypeOfActions/FavoriteType";

// Add to favorites
export const addFavoriteItemsToCart = (id, quantity) => 
{
	return async (dispatch, getState) =>
	{
		const { data } = await axios.get(`/api/v1/product/${id}`);

		dispatch(fetchAddToFavoriteSuccess(data, quantity));
		localStorage.setItem("favoriteItems", JSON.stringify(getState().favorite.favoriteItems));
	}
}

// Delete from favorites
export const deleteFavoriteItemsToCart = (id) =>
{
	return async (dispatch, getState) =>
	{
		dispatch(fetchRemoveFromFavoriteSuccess(id))
		localStorage.setItem("favoriteItems", JSON.stringify(getState().favorite.favoriteItems));
	}

};
