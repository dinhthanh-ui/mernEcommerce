import React, { useState, useEffect } from "react";
import "./ResetPassword.css";
import Loading from "../../Exception/Loading";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../Actions/UserAction";
import MetaData from "../../Exception/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import { toast } from 'react-toastify';

const ResetPassword = ({ history, match }) =>
{
	const dispatch = useDispatch();

	// const { isAuthenticated } = useSelector((state) => state.user);

	const { error, success, loading } = useSelector((state) => state.myForgotPassword);

	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const resetPasswordSubmit = (e) =>
	{
		e.preventDefault();

		const myForm = {
			password,
			confirmPassword
		}
		dispatch(resetPassword(match.params.token, myForm));
	};

	useEffect(() =>
	{
		if (error)
		{
			toast.error(error);
			dispatch(clearErrors());
		}

		if (success)
		{
			toast.success("Password Updated Successfully");

			history.push("/login");
		}
	}, [dispatch, error, history, success]);

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<>
					<MetaData title="Change Password" />
					<div className="resetPasswordContainer">
						<div className="resetPasswordBox">
							<h2 className="resetPasswordHeading">Update Profile</h2>

							<form
								className="resetPasswordForm"
								onSubmit={resetPasswordSubmit}
							>
								<div>
									<LockOpenIcon />
									<input
										type="password"
										placeholder="New Password"
										required
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</div>
								<div className="loginPassword">
									<LockIcon />
									<input
										type="password"
										placeholder="Confirm Password"
										required
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
									/>
								</div>
								<input
									type="submit"
									value="Update"
									className="resetPasswordBtn"
								/>
							</form>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default ResetPassword;