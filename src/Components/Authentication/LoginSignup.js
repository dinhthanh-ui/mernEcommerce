import React, { useState, useRef, useEffect } from 'react'
import MetaData from "../../Exception/MetaData"
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import "./LoginSignup.css";
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register, uploadImage } from '../../Actions/UserAction';
import { toast } from "react-toastify";

const LoginSignup = ({ history, location }) =>
{

	const dispatch = useDispatch();
	const { error, isAuthenticated } = useSelector((state) => state.user);
	const { url, success, message } = useSelector((state) => state.urlImage);

	// console.log(isAuthenticated);

	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");

	const redirect = location.search ? location.search.split("=")[1] : "/";

	const [user, setUser] = useState({
		name: "",
		email: "",
		password: "",
	});

	const { name, email, password } = user;
	const [avatarPreview, setAvatarPreview] = useState("/profile.png");

	const loginTab = useRef(null);
	const registerTab = useRef(null);
	const switcherTab = useRef(null);


	const switchTabs = (e, tab) =>
	{
		if (tab === "login")
		{
			switcherTab.current.classList.add("shiftToNeutral");
			switcherTab.current.classList.remove("shiftToRight");

			registerTab.current.classList.remove("shiftToNeutralForm");
			loginTab.current.classList.remove("shiftToLeft");
		}
		if (tab === "register")
		{
			switcherTab.current.classList.add("shiftToRight");
			switcherTab.current.classList.remove("shiftToNeutral");

			registerTab.current.classList.add("shiftToNeutralForm");
			loginTab.current.classList.add("shiftToLeft");
		}
	};
	// register
	const registerDataChange = (e) =>
	{
		if (e.target.name === "avatar")
		{
			const reader = new FileReader();

			reader.onload = () =>
			{
				if (reader.readyState === 2)
				{
					setAvatarPreview(reader.result);
				}
			};
			reader.readAsDataURL(e.target.files[0]);
			const formData = new FormData();
			formData.append('avatar', e.target.files[0]);
			dispatch(uploadImage(formData));
		} else
		{
			setUser({ ...user, [e.target.name]: e.target.value });
		}
	}

	const loginSubmit = (e) =>
	{
		e.preventDefault();
		dispatch(login(loginEmail, loginPassword));
	};

	// register
	const registerSubmit = (e) =>
	{
		e.preventDefault();
		const myForm = { name, email, password, url }

		if (url === null)
		{
			toast.error(" Bức ảnh này không được tải lên, vui long chọn bức ảnh khác !!! ")
		} else
		{
			dispatch(register(myForm));
		}
	};


	if (error)
	{
		toast.error(error);
		dispatch(clearErrors());
	}
	useEffect(() =>
	{

		if (isAuthenticated)
		{
			history.push(redirect);
		}
		// eslint-disable-next-line
	}, [history, toast, isAuthenticated]);

	if (success === false)
	{
		toast.error(message);
	}
	return (
		<>
			<MetaData title="Login or Signup" />
			<div className="LoginSignUpContainer">
				<div className="LoginSignUpBox">
					<div>
						<div className="login_signUp_toggle">
							<p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
							<p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
						</div>
						<button ref={switcherTab}></button>
					</div>
					{/* ======== Login Form Start ========== */}
					<form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
						<div className="loginEmail">
							<MailOutlineIcon />
							<input
								type="email"
								placeholder="Email"
								required
								value={loginEmail}
								onChange={(e) => setLoginEmail(e.target.value)}
							/>
						</div>
						<div className="loginPassword">
							<LockOpenIcon />
							<input
								type="password"
								placeholder="Password"
								required
								value={loginPassword}
								onChange={(e) => setLoginPassword(e.target.value)}
							/>
						</div>
						<Link to="/password/forgot">Forgot Password ?</Link>
						<input type="submit" value="Login" className="loginBtn" />
						<Link to="/">
							<span>Login as a guest ?</span>
						</Link>
					</form>
					{/* ======== Login Form End ========== */}

					{/* ======== Register Form Start ========== */}
					<form
						className="signUpForm"
						ref={registerTab}
						encType="multipart/form-data"
						onSubmit={registerSubmit}
					>
						<div className="signUpName">
							<FaceIcon />
							<input
								type="text"
								placeholder="Name"
								required
								name="name"
								value={name}
								onChange={registerDataChange}
							/>
						</div>
						<div className="signUpEmail">
							<MailOutlineIcon />
							<input
								type="email"
								placeholder="Email"
								required
								name="email"
								value={email}
								onChange={registerDataChange}
							/>
						</div>
						<div className="signUpPassword">
							<LockOpenIcon />
							<input
								type="password"
								placeholder="Password"
								required
								name="password"
								value={password}
								onChange={registerDataChange}
							/>
						</div>

						<div id="registerImage">
							<img src={avatarPreview} alt="Avatar Preview" />
							<input
								type="file"
								name="avatar"
								accept="image/*"
								onChange={registerDataChange}
							/>
						</div>
						<input type="submit" value="Register" className="signUpBtn" />
					</form>
					{/* ======== Register Form Start ========== */}
				</div>
			</div>
		</>
	)
}

export default LoginSignup