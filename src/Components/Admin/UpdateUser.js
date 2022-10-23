import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import MetaData from "../../Exception/MetaData";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SideBar from "./Sidebar";
import { UPDATE_USER_RESET } from "../../Constant/UserConstant";
import { getUserDetails, updateUser, clearErrors } from "../../Actions/UserAction";
import Loading from "../../Exception/Loading";
import { toast } from 'react-toastify';


const UpdateUser = ({ history, match }) =>
{
	const dispatch = useDispatch();

	const { loading, error, user } = useSelector((state) => state.myUserDetail);

	const {
		error: updateError,
		isUpdated,
	} = useSelector((state) => state.profile);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [role, setRole] = useState("");

	const userId = match.params.id;

	useEffect(() =>
	{
		if (user && user._id !== userId)
		{
			dispatch(getUserDetails(userId));
		} else
		{
			setName(user.name);
			setEmail(user.email);
			setRole(user.role);
		}
		if (error)
		{
			toast.error(error);
			dispatch(clearErrors());
		}

		if (updateError)
		{
			toast.error(updateError);
			dispatch(clearErrors());
		}

		if (isUpdated)
		{
			toast.success("User Updated Successfully");
			setTimeout(() =>
			{
				window.location.reload();
			}, 5000);
			history.push("/admin/users");
			dispatch({ type: UPDATE_USER_RESET });
		}
	}, [dispatch, error, history, isUpdated, updateError, user, userId]);

	const updateUserSubmitHandler = (e) =>
	{
		e.preventDefault();

		const myForm = {
			name,
			email,
			role
		}
		if (name === null || email === null || role === null)
		{
			toast.error("Vui Lòng Điền Các Thông Tin Ở Trên, Xin Cảm Ơn !!!");
		} else
		{
			dispatch(updateUser(userId, myForm));
		}
	};

	return (
		<>
			<MetaData title="Update User" />
			<div className="dashboard">
				<SideBar />
				<div className="newProductContainer">
					{loading ? (
						<Loading />
					) : (
						<form
							className="createProductForm"
							onSubmit={updateUserSubmitHandler}
						>
							<h1>Update User</h1>

							<div>
								<PersonIcon />
								<input
									type="text"
									placeholder="Name"
									required
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div>
								<MailOutlineIcon />
								<input
									type="email"
									placeholder="Email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>

							<div>
								<VerifiedUserIcon />
								<select value={role} onChange={(e) => setRole(e.target.value)}>
									<option value="">Choose Role</option>
									<option value="admin">admin</option>
									<option value="user">user</option>
								</select>
							</div>

							<Button
								id="createProductBtn"
								type="submit"
							>
								Update
							</Button>
						</form>
					)}
				</div>
			</div>
		</>
	);
};

export default UpdateUser;