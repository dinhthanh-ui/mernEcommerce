import axios from "axios";
import { CLEAR_ERRORS } from "../Constant/ProductConstant";
import { UPLOAD_FILE_IMAGE_PRODUCT_FAIL, UPLOAD_FILE_IMAGE_PRODUCT_REQUEST, UPLOAD_FILE_IMAGE_PRODUCT_SUCCESS } from "../Constant/UploadFileConstant";
import
{
	fetchAdminProductFail,
	fetchAdminProductRequest,
	fetchAdminProductSuccess,
	fetchAllReviewFail,
	fetchAllReviewRequest,
	fetchAllReviewSuccess,
	fetchCreateProductFail,
	fetchCreateProductRequest,
	fetchCreateProductSuccess,
	fetchDeleteProductFail,
	fetchDeleteProductRequest,
	fetchDeleteProductSuccess,
	fetchDeleteReviewFail,
	fetchDeleteReviewRequest,
	fetchDeleteReviewSuccess,
	fetchNewReviewFail,
	fetchNewReviewRequest,
	fetchNewReviewSuccess,
	fetchProductDetailFail,
	fetchProductDetailRequest,
	fetchProductDetailSuccess,
	fetchProductFail,
	fetchProductRequest,
	fetchProductSuccess,
	fetchUpdateProductFail,
	fetchUpdateProductRequest,
	fetchUpdateProductSuccess
} from "./TypeOfActions/ProductType";
/*
================== Get All Request Start ==================
*/
export const getProduct = (keyword = "", currentPage, category) =>
{
	return async (dispatch) =>
	{
		dispatch(fetchProductRequest());
		try
		{
			let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}`;
			if (category)
			{
				link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&category=${category}`;
			}
			const res = await axios.get(link)
			dispatch(fetchProductSuccess(res.data))
		} catch (error)
		{
			dispatch(fetchProductFail(error.response.statusText
			));
		}

	}
};
/*
================== Get All Product Request End ==================
*/
/*
================== Get Products Details Request Ster ==================
*/
// Get All Products Details
export const getProductDetails = (id) =>
{

	return async (dispatch) =>
	{
		dispatch(fetchProductDetailRequest());
		try
		{
			let link = `/api/v1/product/${id}`;
			const res = await axios.get(link);
			dispatch(fetchProductDetailSuccess(res.data.product))
		} catch (error)
		{
			dispatch(fetchProductDetailFail(error.response.data));
		}
	}
};
/*
================== Get Products Details Request End ==================
*/
/*
================== Create Review Request Start ==================
*/
// NEW REVIEW
export const newReview = (reviewData) => 
{
	return async (dispatch) =>
	{
		dispatch(fetchNewReviewRequest())
		try
		{
			const { data } = await axios.post(`/api/v1/product/review`, reviewData);
			dispatch(fetchNewReviewSuccess(data.success))
		} catch (error)
		{
			dispatch(fetchNewReviewFail(error.response.data));
		}
	}
};
/*
================== Create Review Request End ==================
*/
/*
================== Get Products -----Admin Request Start ==================
*/
export const getAdminProduct = () => 
{

	return async (dispatch) =>
	{
		dispatch(fetchAdminProductRequest());

		try
		{
			const { data } = await axios.get("/api/v1/admin/products");

			dispatch(fetchAdminProductSuccess(data));
		} catch (error)
		{
			dispatch(fetchAdminProductFail(error.response.data));
		}
	}
};
/*
================== Get Products -----Admin Request End ==================
*/
/*
================== Delete Products -----Admin Request Start ==================
*/
export const deleteProduct = (id) => 
{
	return async (dispatch) =>
	{
		dispatch(fetchDeleteProductRequest());
		try
		{
			const { data } = await axios.delete(`/api/v1/product/${id}`);

			dispatch(fetchDeleteProductSuccess(data.success));
		} catch (error)
		{
			dispatch(fetchDeleteProductFail(error.response.data));
		}
	}
};
/*
================== Delete Products -----Admin Request End ==================
*/
/*
================== Update Products -----Admin Request Start ==================
*/
export const updateProduct = (id, productData) => 
{
	return async (dispatch) =>
	{
		dispatch(fetchUpdateProductRequest());
		try
		{
			let link = `/api/v1/product/${id}`
			const { data } = await axios.put(link, productData);
			dispatch(fetchUpdateProductSuccess(data.success))
		} catch (error)
		{
			dispatch(fetchUpdateProductFail(error.response.data))
		}
	}
};
/*
================== Update Products -----Admin Request End ==================
*/
/*
================== Create Products -----Admin Request Start ==================
*/
export const createProduct = (productData) => 
{

	return async (dispatch) =>
	{
		dispatch(fetchCreateProductRequest());
		try
		{
			const { data } = await axios.post(`/api/v1/product/new`, productData);

			dispatch(fetchCreateProductSuccess(data))

		} catch (error)
		{
			dispatch(fetchCreateProductFail(error.response.data))
		}
	}
};
/*
================== Create Products -----Admin Request End ==================
*/
/*
================== Get All Reviews Of A Product Request Start ==================
*/
export const getAllReviews = (id) => 
{
	return async (dispatch) =>
	{
		dispatch(fetchAllReviewRequest());
		try
		{
			const { data } = await axios.get(`/api/v1/review?id=${id}`);

			dispatch(fetchAllReviewSuccess(data.reviews));
		} catch (error)
		{
			dispatch(fetchAllReviewFail(error.response.data))
		}
	}
};
/*
================== Get All Reviews Of A Product Request End ==================
*/
/*
================== Delete Review Of A Product ------ Admin Request Start ==================
*/
export const deleteReviews = (reviewId, productId) => 
{

	return async (dispatch) =>
	{
		dispatch(fetchDeleteReviewRequest());
		try
		{
			const { data } = await axios.delete(`/api/v1/review?id=${reviewId}&productId=${productId}`);

			dispatch(fetchDeleteReviewSuccess(data.success));
		} catch (error)
		{
			dispatch(fetchDeleteReviewFail(error.response.data));
		}
	}
};
/*
================== Delete Review Of A Product ------ Admin Request End ==================
*/
/*
================== Upload Image Product Request Start ==================
*/
export const uploadImageProduct = (image) =>
{
	return async (dispatch) =>
	{
		dispatch({ type: UPLOAD_FILE_IMAGE_PRODUCT_REQUEST })
		try
		{
			let link = "/api/v1/uploadFileProduct";
			const res = await axios.post(link, image, {
				headers: { "Content-Type": "multipart/form-data" }
			})
			dispatch({ type: UPLOAD_FILE_IMAGE_PRODUCT_SUCCESS, payload: res.data })
		} catch (error)
		{
			dispatch({ type: UPLOAD_FILE_IMAGE_PRODUCT_FAIL, payload: error.response.data })
		}
	}
}
/*
================== Upload Image Product Request End ==================
*/
// Clearing Errors
export const clearErrors = () => async (dispatch) =>
{
	dispatch({ type: CLEAR_ERRORS });
};
