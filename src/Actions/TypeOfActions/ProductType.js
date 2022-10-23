import
{
	ADMIN_PRODUCT_FAIL,
	ADMIN_PRODUCT_REQUEST,
	ADMIN_PRODUCT_SUCCESS,
	ALL_PRODUCT_FAIL,
	ALL_PRODUCT_REQUEST,
	ALL_PRODUCT_SUCCESS,
	ALL_REVIEW_FAIL,
	ALL_REVIEW_REQUEST,
	ALL_REVIEW_SUCCESS,
	DELETE_PRODUCT_FAIL,
	DELETE_PRODUCT_REQUEST,
	DELETE_PRODUCT_SUCCESS,
	DELETE_REVIEW_FAIL,
	DELETE_REVIEW_REQUEST,
	DELETE_REVIEW_SUCCESS,
	NEW_PRODUCT_FAIL,
	NEW_PRODUCT_REQUEST,
	NEW_PRODUCT_SUCCESS,
	NEW_REVIEW_FAIL,
	NEW_REVIEW_REQUEST,
	NEW_REVIEW_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	UPDATE_PRODUCT_FAIL,
	UPDATE_PRODUCT_REQUEST,
	UPDATE_PRODUCT_SUCCESS,
} from "../../Constant/ProductConstant";

/*
================== All Product Request Start ==================
*/
export const fetchProductRequest = () =>
{
	return {
		type: ALL_PRODUCT_REQUEST,
	}
}
export const fetchProductSuccess = (data) =>
{
	return {
		type: ALL_PRODUCT_SUCCESS,
		payload: data
	}
}
export const fetchProductFail = (error) =>
{
	return {
		type: ALL_PRODUCT_FAIL,
		dataProduct: error.response
	}
}
/*
================== All Product Request End ==================
*/

/*
================== Product Details Request Start ==================
*/
export const fetchProductDetailRequest = () =>
{
	return {
		type: PRODUCT_DETAILS_REQUEST,
	}
}
export const fetchProductDetailSuccess = (data) =>
{
	return {
		type: PRODUCT_DETAILS_SUCCESS,
		payload: data
	}
}
export const fetchProductDetailFail = (error) =>
{
	return {
		type: PRODUCT_DETAILS_FAIL,
		payload: error.message
	}
}
/*
================== Product Details Request End ==================
*/
/*
================== New Review Request Start ==================
*/
export const fetchNewReviewRequest = () =>
{
	return {
		type: NEW_REVIEW_REQUEST,
	}
}
export const fetchNewReviewSuccess = (data) =>
{
	return {
		type: NEW_REVIEW_SUCCESS,
		payload: data
	}
}
export const fetchNewReviewFail = (error) =>
{
	return {
		type: NEW_REVIEW_FAIL,
		payload: error.message
	}
}
/*
================== New Review Request End ==================
*/
/*
================== Admin Product Request Start ==================
*/
export const fetchAdminProductRequest = () =>
{
	return {
		type: ADMIN_PRODUCT_REQUEST,
	}
}
export const fetchAdminProductSuccess = (data) =>
{
	return {
		type: ADMIN_PRODUCT_SUCCESS,
		payload: data
	}
}
export const fetchAdminProductFail = (error) =>
{
	return {
		type: ADMIN_PRODUCT_FAIL,
		payload: error.message
	}
}
/*
================== Admin Product Request End ==================
*/
/*
================== Delete Product Request Start ==================
*/
export const fetchDeleteProductRequest = () =>
{
	return {
		type: DELETE_PRODUCT_REQUEST,
	}
}
export const fetchDeleteProductSuccess = (data) =>
{
	return {
		type: DELETE_PRODUCT_SUCCESS,
		payload: data
	}
}
export const fetchDeleteProductFail = (error) =>
{
	return {
		type: DELETE_PRODUCT_FAIL,
		payload: error.message
	}
}
/*
================== Delete Product Request End ==================
*/

/*
================== Update Product Request Start ==================
*/
export const fetchUpdateProductRequest = () =>
{
	return {
		type: UPDATE_PRODUCT_REQUEST,
	}
}
export const fetchUpdateProductSuccess = (data) =>
{
	return {
		type: UPDATE_PRODUCT_SUCCESS,
		payload: data
	}
}
export const fetchUpdateProductFail = (error) =>
{
	return {
		type: UPDATE_PRODUCT_FAIL,
		payload: error.message
	}
}
/*
================== Update Product Request End ==================
*/
/*
================== Create Product Request Start ==================
*/
export const fetchCreateProductRequest = () =>
{
	return {
		type: NEW_PRODUCT_REQUEST,
	}
}
export const fetchCreateProductSuccess = (data) =>
{
	return {
		type: NEW_PRODUCT_SUCCESS,
		payload: data
	}
}
export const fetchCreateProductFail = (error) =>
{
	return {
		type: NEW_PRODUCT_FAIL,
		payload: error.message
	}
}
/*
================== Create Product Request End ==================
*/
/*
================== All Review Request Start ==================
*/
export const fetchAllReviewRequest = () =>
{
	return {
		type: ALL_REVIEW_REQUEST,
	}
}
export const fetchAllReviewSuccess = (data) =>
{
	return {
		type: ALL_REVIEW_SUCCESS,
		payload: data
	}
}
export const fetchAllReviewFail = (error) =>
{
	return {
		type: ALL_REVIEW_FAIL,
		payload: error.message
	}
}
/*
================== All Review Request End ==================
*/
/*
================== Delete Review Request Start ==================
*/
export const fetchDeleteReviewRequest = () =>
{
	return {
		type: DELETE_REVIEW_REQUEST,
	}
}
export const fetchDeleteReviewSuccess = (data) =>
{
	return {
		type: DELETE_REVIEW_SUCCESS,
		payload: data
	}
}
export const fetchDeleteReviewFail = (error) =>
{
	return {
		type: DELETE_REVIEW_FAIL,
		payload: error.message
	}
}
/*
================== Delete Review Request End ==================
*/


