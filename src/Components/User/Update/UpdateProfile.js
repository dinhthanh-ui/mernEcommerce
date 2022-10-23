import React, { useState, useEffect, Fragment } from "react";
import "./UpdateProfile.css";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updateProfile, uploadImage } from "../../../Actions/UserAction";
import Loading from "../../../Exception/Loading";
import MetaData from "../../../Exception/MetaData";
import { UPDATE_PROFILE_RESET } from "../../../Constant/UserConstant";
import { toast } from 'react-toastify';
import { UPLOAD_FILE_IMAGE_PRODUCT_ERROR } from "../../../Constant/UploadFileConstant";

const UpdateProfile = ({ history }) =>
{
	const dispatch = useDispatch();

	const { user } = useSelector(
		(state) => state.user
	);
	const { url, message, success } = useSelector(
		(state) => state.urlImage
	);
	const { error, isUpdated, loading } = useSelector((state) => state.profile);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [avatarPreview, setAvatarPreview] = useState("/profile.png");

	const updateProfileSubmit = (e) =>
	{
		e.preventDefault();

		const myForm = {
			name,
			email,
			url
		}
		if (url === null)
		{
			toast.error(" Bức ảnh này không được tải lên, vui long chọn bức ảnh khác !!! ")
		} else
		{
			dispatch(updateProfile(myForm));
			dispatch({ type: UPLOAD_FILE_IMAGE_PRODUCT_ERROR })
		}
	};

	const updateProfileDataChange = (e) =>
	{
		const reader = new FileReader();
		reader.onload = () =>
		{
			if (reader.readyState === 2)
			{
				setAvatarPreview(reader.result);
			}
		}
		reader.readAsDataURL(e.target.files[0]);
		const formData = new FormData();
		formData.append('avatar', e.target.files[0]);
		dispatch(uploadImage(formData))
	};

	if (success === false)
	{
		toast.error(message);
	}
	useEffect(() =>
	{
		if (user)
		{
			setName(user.name);
			setEmail(user.email);
			setAvatarPreview(user.avatar.url)
		}
		if (error)
		{
			toast.error(error);
			dispatch(clearErrors());
		}

		if (isUpdated)
		{
			toast.success("Profile updated successfully");
			dispatch(loadUser());

			history.push("/me");

			dispatch({
				type: UPDATE_PROFILE_RESET,
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, error, alert, history, isUpdated, user]);
	return (
		<>
			{loading ? (<Loading />) : (
				<>
					<MetaData title="Update Profile" />
					<div className="updateProfileContainer">
						<div className="updateProfileBox">
							<h2 className="updateProfileHeading">Update Profile</h2>
							<form
								className="updateProfileForm"
								encType="multipart/form-data"
								onSubmit={updateProfileSubmit}
							>
								<div className="updateProfileName">
									<FaceIcon />
									<input
										type="text"
										placeholder="Name"
										required
										name="name"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>
								<div className="updateProfileEmail">
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

								<div id="updateProfileImage">
									<img src={avatarPreview} alt="Avatar Preview" />
									<input
										type="file"
										name="avatar"
										accept="image/*"
										onChange={updateProfileDataChange}
									/>
								</div>
								<input
									type="submit"
									value="Update"
									className="updateProfileBtn"
								/>
							</form>
						</div>
					</div>
				</>
			)}
		</>
	)
}

export default UpdateProfile
