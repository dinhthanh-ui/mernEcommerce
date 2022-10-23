import React, { useState, useEffect } from "react";
import "./ForgotPassword.css";
import Loading from "../../Exception/Loading";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../Actions/UserAction";
import { toast } from 'react-toastify';
import MetaData from "../../Exception/MetaData";

const ForgotPassword = () =>
{
	const dispatch = useDispatch();

	const { error, message, loading } = useSelector(
		(state) => state.myForgotPassword
	);

	const [email, setEmail] = useState("");

	const forgotPasswordSubmit = (e) =>
	{
		e.preventDefault();
		const myForm = { email }
		dispatch(forgotPassword(myForm));
	};

	useEffect(() =>
	{
		if (error)
		{
			toast.error(error);
			dispatch(clearErrors());
		}

		if (message)
		{
			toast.success(message);
		}
	}, [dispatch, error, message]);

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<>
					<MetaData title="Forgot Password" />
					<div className="forgotPasswordContainer">
						<div className="forgotPasswordBox">
							<h2 className="forgotPasswordHeading">Forgot Password</h2>

							<form
								className="forgotPasswordForm"
								onSubmit={forgotPasswordSubmit}
							>
								<div className="forgotPasswordEmail">
									<MailOutlineIcon />
									<input
										type="email"
										placeholder="Email"
										required
										name="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>

								<input
									type="submit"
									value="Send"
									className="forgotPasswordBtn"
								/>
							</form>
						</div>
						{message ?
							<h3 style={{
								color: "red", marginTop: "25rem",
								marginLeft: "-25rem"
							}} > Quý khách hàng hãy vào hòm thư Gmail để lấy thông báo từ đó</h3>
							: ""
						}
					</div>
				</>
			)}

		</>
	);
};

export default ForgotPassword
