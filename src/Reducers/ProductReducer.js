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
	CLEAR_ERRORS,
	DELETE_PRODUCT_FAIL,
	DELETE_PRODUCT_REQUEST,
	DELETE_PRODUCT_RESET,
	DELETE_PRODUCT_SUCCESS,
	DELETE_REVIEW_FAIL,
	DELETE_REVIEW_REQUEST,
	DELETE_REVIEW_RESET,
	DELETE_REVIEW_SUCCESS,
	NEW_PRODUCT_FAIL,
	NEW_PRODUCT_REQUEST,
	NEW_PRODUCT_RESET,
	NEW_PRODUCT_SUCCESS,
	NEW_REVIEW_FAIL,
	NEW_REVIEW_REQUEST,
	NEW_REVIEW_RESET,
	NEW_REVIEW_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	UPDATE_PRODUCT_FAIL,
	UPDATE_PRODUCT_REQUEST,
	UPDATE_PRODUCT_RESET,
	UPDATE_PRODUCT_SUCCESS,
} from "../Constant/ProductConstant";

const INITIAL_STATE = {
	loading: true,
	products: []
};
export const productsReducer = (state = INITIAL_STATE, action) =>
{
	switch (action.type)
	{
		case ALL_PRODUCT_REQUEST:
		case ADMIN_PRODUCT_REQUEST:
			return {
				...state
			};

		case ALL_PRODUCT_SUCCESS:
			return {
				...state,
				loading: false,
				products: action.payload.products,
				resultPage: action.payload.resultPage,
				productsCount: action.payload.productsCount
			};
		case ADMIN_PRODUCT_SUCCESS:
			return {
				...state,
				loading: false,
				products: action.payload.products,
				resultPage: action.payload.resultPage
			};
		case ALL_PRODUCT_FAIL:
		case ADMIN_PRODUCT_FAIL:
			return {
				...state,
				loading: false,
				products: [],
				error: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

export const productDetailsReducer = (state = INITIAL_STATE, action) =>
{
	switch (action.type)
	{
		case PRODUCT_DETAILS_REQUEST:
			return {
				...state,
			};
		case PRODUCT_DETAILS_SUCCESS:
			return {
				...state,
				loading: false,
				products: action.payload,
			};
		case PRODUCT_DETAILS_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

// Product review
export const newReviewReducer = (state = {}, action) =>
{
	switch (action.type)
	{
		case NEW_REVIEW_REQUEST:
			return {
				...state,
				loading: true,
			};
		case NEW_REVIEW_SUCCESS:
			return {
				loading: false,
				success: action.payload,
			};
		case NEW_REVIEW_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case NEW_REVIEW_RESET:
			return {
				...state,
				success: false,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

// Delete and Update Product
export const deleteProductReducer = (state = {}, action) =>
{
	switch (action.type)
	{
		case DELETE_PRODUCT_REQUEST:
		case UPDATE_PRODUCT_REQUEST:
			return {
				...state,
				loading: true,
			};
		case DELETE_PRODUCT_SUCCESS:
			return {
				...state,
				loading: false,
				isDeleted: action.payload,
			};

		case UPDATE_PRODUCT_SUCCESS:
			return {
				...state,
				loading: false,
				isUpdated: action.payload,
			};
		case DELETE_PRODUCT_FAIL:
		case UPDATE_PRODUCT_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case DELETE_PRODUCT_RESET:
			return {
				...state,
				isDeleted: false,
			};
		case UPDATE_PRODUCT_RESET:
			return {
				...state,
				isUpdated: false,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

// New Product ----Admin
export const newProductReducer = (state = INITIAL_STATE, action) =>
{
	switch (action.type)
	{
		case NEW_PRODUCT_REQUEST:
			return {
				...state
			};
		case NEW_PRODUCT_SUCCESS:
			return {
				...state,
				loading: false,
				success: action.payload.success,
				product: action.payload.product,
			};
		case NEW_PRODUCT_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case NEW_PRODUCT_RESET:
			return {
				...state,
				success: false,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

const INITIAL_STATE_REVIEW = {
	loading: true,
	reviews: []
};
// All reviews --- Admin
export const productReviewsReducer = (state = INITIAL_STATE_REVIEW, action) =>
{
	switch (action.type)
	{
		case ALL_REVIEW_REQUEST:
			return {
				...state,
			};
		case ALL_REVIEW_SUCCESS:
			return {
				loading: false,
				reviews: action.payload,
			};
		case ALL_REVIEW_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};
// Delete Review ----- Admin
export const deleteReviewReducer = (state = {}, action) =>
{
	switch (action.type)
	{
		case DELETE_REVIEW_REQUEST:
			return {
				...state,
				loading: true,
			};
		case DELETE_REVIEW_SUCCESS:
			return {
				...state,
				loading: false,
				isDeleted: action.payload,
			};
		case DELETE_REVIEW_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case DELETE_REVIEW_RESET:
			return {
				...state,
				isDeleted: false,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};