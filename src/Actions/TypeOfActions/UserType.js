import
{
	ALL_USERS_FAIL,
	ALL_USERS_REQUEST,
	ALL_USERS_SUCCESS,
	DELETE_USER_FAIL,
	DELETE_USER_REQUEST,
	DELETE_USER_SUCCESS,
	FORGOT_PASSWORD_FAIL,
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	LOAD_USER_FAIL,
	LOAD_USER_REQUEST,
	LOAD_USER_SUCCESS,
	LOGIN_FAIL,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGOUT_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_USER_REQUEST,
	REGISTER_USER_SUCCESS,
	RESET_PASSWORD_FAIL,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	UPDATE_PASSWORD_FAIL,
	UPDATE_PASSWORD_REQUEST,
	UPDATE_PASSWORD_SUCCESS,
	UPDATE_PROFILE_FAIL,
	UPDATE_PROFILE_REQUEST,
	UPDATE_PROFILE_SUCCESS,
	UPDATE_USER_FAIL,
	UPDATE_USER_REQUEST,
	UPDATE_USER_SUCCESS,
	USER_DETAILS_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS
} from "../../Constant/UserConstant"
/*
================== Login Request Start ==================
*/
export const fetchLoginRequest = () =>
{
	return {
		type: LOGIN_REQUEST
	}
}
export const fetchLoginSuccess = (data) =>
{
	return {
		type: LOGIN_SUCCESS,
		payload: data
	}
}
export const fetchLoginFailure = (error) =>
{
	return {
		type: LOGIN_FAIL,
		payload: error.message
	}
}
/*
================== Login Request End ==================
*/
/*
================== Register Request Start ==================
*/
export const fetchRegisterRequest = () =>
{
	return {
		type: REGISTER_USER_REQUEST
	}
}
export const fetchRegisterSuccess = (data) =>
{
	return {
		type: REGISTER_USER_SUCCESS,
		payload: data
	}
}

/*
================== Register Request End ==================
*/
/*
================== LogOut Request Start ==================
*/
export const fetchLogoutSuccess = (data) =>
{
	return {
		type: LOGOUT_SUCCESS,
		payload: data
	}
}
export const fetchLogoutFailure = (error) =>
{
	return {
		type: LOGOUT_FAIL,
		payload: error.message
	}
}
/*
================== LogOut Request End ==================
*/

/*
================== Load User Request Start ==================
*/
export const fetchLoadUserRequest = () =>
{
	return {
		type: LOAD_USER_REQUEST
	}
}
export const fetchLoadUserSuccess = (data) =>
{
	return {
		type: LOAD_USER_SUCCESS,
		payload: data
	}
}
export const fetchLoadUserFailure = (error) =>
{
	return {
		type: LOAD_USER_FAIL,
		payload: error.message
	}
}
/*
================== Load User Request End ==================
*/
/*
================== Update Profile User Request Start ==================
*/
export const fetchUpdateProfileUserRequest = () =>
{
	return {
		type: UPDATE_PROFILE_REQUEST
	}
}
export const fetchUpdateProfileUserSuccess = (data) =>
{
	return {
		type: UPDATE_PROFILE_SUCCESS,
		payload: data
	}
}
export const fetchUpdateProfileUserFailure = (error) =>
{
	return {
		type: UPDATE_PROFILE_FAIL,
		payload: error.message
	}
}
/*
================== Update Profile User Request End ==================
*/
/*
================== Update Password User Request Start ==================
*/
export const fetchUpdatePasswordUserRequest = () =>
{
	return {
		type: UPDATE_PASSWORD_REQUEST
	}
}
export const fetchUpdatePasswordUserSuccess = (data) =>
{
	return {
		type: UPDATE_PASSWORD_SUCCESS,
		payload: data
	}
}
export const fetchUpdatePasswordUserFailure = (error) =>
{
	return {
		type: UPDATE_PASSWORD_FAIL,
		payload: error.message
	}
}
/*
================== Update Password User Request End ==================
*/
/*
================== All User Request Start ==================
*/
export const fetchAllUserRequest = () =>
{
	return {
		type: ALL_USERS_REQUEST
	}
}
export const fetchAllUserSuccess = (data) =>
{
	return {
		type: ALL_USERS_SUCCESS,
		payload: data
	}
}
export const fetchAllUserFailure = (error) =>
{
	return {
		type: ALL_USERS_FAIL,
		payload: error.message
	}
}
/*
================== All User Request End ==================
*/
/*
================== Delete User Request Start ==================
*/
export const fetchDeleteUserRequest = () =>
{
	return {
		type: DELETE_USER_REQUEST
	}
}
export const fetchDeleteUserSuccess = (data) =>
{
	return {
		type: DELETE_USER_SUCCESS,
		payload: data
	}
}
export const fetchDeleteUserFailure = (error) =>
{
	return {
		type: DELETE_USER_FAIL,
		payload: error.message
	}
}
/*
================== Delete User Request End ==================
*/
/*
==================  User Detail Request Start ==================
*/
export const fetchUserDetailsRequest = () =>
{
	return {
		type: USER_DETAILS_REQUEST
	}
}
export const fetchUserDetailsSuccess = (data) =>
{
	return {
		type: USER_DETAILS_SUCCESS,
		payload: data
	}
}
export const fetchUserDetailsFailure = (error) =>
{
	return {
		type: USER_DETAILS_FAIL,
		payload: error.message
	}
}
/*
==================  User Detail Request End ==================
*/
/*
==================  Update User Request Start ==================
*/
export const fetchUpdateUserRequest = () =>
{
	return {
		type: UPDATE_USER_REQUEST
	}
}
export const fetchUpdateUserSuccess = (data) =>
{
	return {
		type: UPDATE_USER_SUCCESS,
		payload: data
	}
}
export const fetchUpdateUserFailure = (error) =>
{
	return {
		type: UPDATE_USER_FAIL,
		payload: error.message
	}
}
/*
==================  Update User Request End ==================
*/
/*
==================  Forgot Password Request Start ==================
*/
export const fetchForgotPasswordRequest = () =>
{
	return {
		type: FORGOT_PASSWORD_REQUEST
	}
}
export const fetchForgotPasswordSuccess = (data) =>
{
	return {
		type: FORGOT_PASSWORD_SUCCESS,
		payload: data
	}
}
export const fetchForgotPasswordFailure = (error) =>
{
	return {
		type: FORGOT_PASSWORD_FAIL,
		payload: error.message
	}
}
/*
==================  Forgot Password Request End ==================
*/
/*
==================  Reset Password Request Start ==================
*/
export const fetchResetPasswordRequest = () =>
{
	return {
		type: RESET_PASSWORD_REQUEST
	}
}
export const fetchResetPasswordSuccess = (data) =>
{
	return {
		type: RESET_PASSWORD_SUCCESS,
		payload: data
	}
}
export const fetchResetPasswordFailure = (error) =>
{
	return {
		type: RESET_PASSWORD_FAIL,
		payload: error.message
	}
}
/*
================== Reset Password Request End ==================
*/
