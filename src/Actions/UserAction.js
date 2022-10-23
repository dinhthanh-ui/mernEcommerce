import axios from "axios";
import { UPLOAD_FILE_IMAGE_FAIL, UPLOAD_FILE_IMAGE_REQUEST, UPLOAD_FILE_IMAGE_SUCCESS } from "../Constant/UploadFileConstant";
import { CLEAR_ERRORS } from "../Constant/UserConstant"
import
{
	fetchAllUserFailure,
	fetchAllUserRequest,
	fetchAllUserSuccess,
	fetchDeleteUserFailure,
	fetchDeleteUserRequest,
	fetchDeleteUserSuccess,
	fetchForgotPasswordFailure,
	fetchForgotPasswordRequest,
	fetchForgotPasswordSuccess,
	fetchLoadUserFailure,
	fetchLoadUserRequest,
	fetchLoadUserSuccess,
	fetchLoginFailure,
	fetchLoginRequest,
	fetchLoginSuccess,
	fetchLogoutFailure,
	fetchLogoutSuccess,
	fetchRegisterRequest,
	fetchRegisterSuccess,
	fetchResetPasswordFailure,
	fetchResetPasswordRequest,
	fetchResetPasswordSuccess,
	fetchUpdatePasswordUserFailure,
	fetchUpdatePasswordUserRequest,
	fetchUpdatePasswordUserSuccess,
	fetchUpdateProfileUserFailure,
	fetchUpdateProfileUserRequest,
	fetchUpdateProfileUserSuccess,
	fetchUpdateUserFailure,
	fetchUpdateUserRequest,
	fetchUpdateUserSuccess,
	fetchUserDetailsFailure,
	fetchUserDetailsRequest,
	fetchUserDetailsSuccess,
} from "./TypeOfActions/UserType";

/*
================== Login Request Start ==================
*/
export const login = (email, password) =>
{
	return async (dispatch) =>
	{
		dispatch(fetchLoginRequest());
		const config = { headers: { "Content-Type": "application/json" } };
		try
		{
			let link = `/api/v1/login`
			const res = await axios.post(link, { email, password }, config)
			dispatch(fetchLoginSuccess(res.data.user))
		} catch (error)
		{
			dispatch(fetchLoginFailure(error.response.data));
		}
	}
};
/*
================== Login Request End ==================
*/
/*
================== Register Request Start ==================
*/
export const register = (userData) =>
{
	return async (dispatch) =>
	{
		dispatch(fetchRegisterRequest());
		try
		{
			let link = `/api/v1/register`
			const res = await axios.post(link, userData)
			dispatch(fetchRegisterSuccess(res.data.user))
		} catch (error) { }
	}
};
/*
================== Register Request End ==================
*/
/*
================== Log Out  Request Start ==================
*/
export const logout = () =>
{
	return async (dispatch) =>
	{
		try
		{
			let link = `/api/v1/logout`
			const res = await axios.get(link);
			dispatch(fetchLogoutSuccess(res.data.message));
		} catch (error)
		{
			dispatch(fetchLogoutFailure(error.response.data));
		}
	}
}
/*
================== Log Out  Request End ==================
*/
/*
================== Load User  Request Start ==================
*/
export const loadUser = () =>
{
	return async (dispatch) =>
	{
		dispatch(fetchLoadUserRequest());
		try
		{
			let link = `/api/v1/me`
			const res = await axios.get(link);
			dispatch(fetchLoadUserSuccess(res.data.user));
		} catch (error)
		{
			dispatch(fetchLoadUserFailure(error.response.data));
		}
	}
}
/*
================== Load User  Request End ==================
*/
/*
================== Update Profile User  Request Start ==================
*/
export const updateProfile = (userData) => 
{
	return async (dispatch) =>
	{
		dispatch(fetchUpdateProfileUserRequest());
		try
		{
			let link = `/api/v1/me/update/info`;
			const res = await axios.put(link, userData);
			dispatch(fetchUpdateProfileUserSuccess(res.data.success))

		} catch (error)
		{
			dispatch(fetchUpdateProfileUserFailure(error.response.data));
		}
	}

};
/*
================== Update Profile User Request End ==================
*/
/*
================== Update User Password Request Start ==================
*/
export const updatePassword = (password) =>
{
	return async (dispatch) =>
	{
		dispatch(fetchUpdatePasswordUserRequest());
		try 
		{
			let link = `/api/v1/me/update`;
			const res = await axios.put(link, password);
			dispatch(fetchUpdatePasswordUserSuccess(res.data.success))
		} catch (error)
		{
			dispatch(fetchUpdatePasswordUserFailure(error.response.data))
		}
	}
};
/*
================== Update User Password Request End ==================
*/

/*
================== Get All User Request Start ==================
*/
export const getAllUsers = () =>
{
	return async (dispatch) =>
	{
		dispatch(fetchAllUserRequest())
		try
		{
			const { data } = await axios.get(`/api/v1/admin/users`);
			dispatch(fetchAllUserSuccess(data.users))
		} catch (error)
		{
			dispatch(fetchAllUserFailure(error.response.data))
		}
	}
};
/*
================== Get All  Request End ==================
*/
/*
================== Delete User  Request End ==================
*/
// Delete User ----- Admin
export const deleteUser = (id) => 
{

	return async (dispatch) =>
	{
		dispatch(fetchDeleteUserRequest());
		try
		{
			const { data } = await axios.delete(`/api/v1/admin/users/${id}`);

			dispatch(fetchDeleteUserSuccess(data))
		} catch (error)
		{
			dispatch(fetchDeleteUserFailure(error.response.data))
		}
	}
};
/*
================== Delete User  Request End ==================
*/
/*
================== Get  User Details -- Admin Request Start ==================
*/
export const getUserDetails = (id) => 
{

	return async (dispatch) =>
	{
		dispatch(fetchUserDetailsRequest());
		try
		{
			const { data } = await axios.get(`/api/v1/admin/users/${id}`);

			dispatch(fetchUserDetailsSuccess(data.user))

		} catch (error)
		{
			dispatch(fetchUserDetailsFailure(error.response.data))
		}
	}
};
/*
================== Get  User Details -- Admin Request End ==================
*/
/*
================== Update User -- Admin Request Start ==================
*/
export const updateUser = (id, userData) =>
{
	return async (dispatch) =>
	{
		dispatch(fetchUpdateUserRequest());
		try
		{
			let link = `/api/v1/admin/users/${id}`;

			const { data } = await axios.put(link, userData);

			dispatch(fetchUpdateUserSuccess(data.success));
		} catch (error)
		{
			dispatch(fetchUpdateUserFailure(error.response.data))
		}
	};
}
/*
================== Update User -- Admin Request End ==================
*/
/*
================== Forgot Password Request Start ==================
*/
export const forgotPassword = (email) =>
{

	return async (dispatch) =>
	{
		dispatch(fetchForgotPasswordRequest());
		try
		{
			let link = `/api/v1/password/forgot`;

			const { data } = await axios.post(link, email);

			dispatch(fetchForgotPasswordSuccess(data.message))
		} catch (error)
		{
			dispatch(fetchForgotPasswordFailure(error.response.data))
		}
	}
};
/*
================== Forgot Password Request End ==================
*/
/*
================== Forgot Password Request Start ==================
*/
// Reset Password
export const resetPassword = (token, passwords) => 
{
	return async (dispatch) =>
	{
		dispatch(fetchResetPasswordRequest());
		try
		{
			let link = `/api/v1/password/reset/${token}`;
			const { data } = await axios.put(link, passwords);

			dispatch(fetchResetPasswordSuccess(data.success))
		} catch (error)
		{
			dispatch(fetchResetPasswordFailure(error.response.date));
		}
	}
};
/*
================== Forgot Password Request End ==================
*/
/*
================== Upload Image User  Request Start ==================
*/
export const uploadImage = (image) =>
{
	return async (dispatch) =>
	{
		dispatch({ type: UPLOAD_FILE_IMAGE_REQUEST })
		try
		{
			let link = "/api/v1/uploadFile";
			const res = await axios.post(link, image, {
				headers: { "Content-Type": "multipart/form-data" }
			})
			dispatch({ type: UPLOAD_FILE_IMAGE_SUCCESS, payload: res.data })
		} catch (error)
		{
			dispatch({ type: UPLOAD_FILE_IMAGE_FAIL, payload: error.response.data })
		}
	}
}
/*
================== Upload Image User Request Start ==================
*/

//   Clearing errors
export const clearErrors = () => async (dispatch) =>
{
	dispatch({
		type: CLEAR_ERRORS
	})
}


