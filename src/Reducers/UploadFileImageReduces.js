import
{
	UPLOAD_FILE_IMAGE_ERROR,
	UPLOAD_FILE_IMAGE_FAIL,
	UPLOAD_FILE_IMAGE_PRODUCT_ERROR,
	UPLOAD_FILE_IMAGE_PRODUCT_FAIL,
	UPLOAD_FILE_IMAGE_PRODUCT_REQUEST,
	UPLOAD_FILE_IMAGE_PRODUCT_SUCCESS,
	UPLOAD_FILE_IMAGE_REQUEST,
	UPLOAD_FILE_IMAGE_SUCCESS
} from "../Constant/UploadFileConstant";

const INITIAL_STATE = {
	message: "",
	url: {},
}

export const UploadFileImageReducer = (state = INITIAL_STATE, action) =>
{
	switch (action.type)
	{
		case UPLOAD_FILE_IMAGE_REQUEST:
		case UPLOAD_FILE_IMAGE_PRODUCT_REQUEST:
			return {
				...state,
				message: "",
				success: null
			}
		case UPLOAD_FILE_IMAGE_SUCCESS:
		case UPLOAD_FILE_IMAGE_PRODUCT_SUCCESS:
			return {
				...state,
				url: action.payload.url,
				message: action.payload.message,
				success: action.payload.success
			}
		case UPLOAD_FILE_IMAGE_FAIL:
		case UPLOAD_FILE_IMAGE_PRODUCT_FAIL:
			return {
				...state,
				url: null,
				message: action.payload.message,
				success: action.payload.success
			}
		case UPLOAD_FILE_IMAGE_PRODUCT_ERROR:
		case UPLOAD_FILE_IMAGE_ERROR:
			return {
				...state,
				url: "",
				message: "",
			}
		default:
			return state;
	}
}