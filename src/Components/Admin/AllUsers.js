import React, { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
// import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import MetaData from "../../Exception/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { getAllUsers, clearErrors, deleteUser } from "../../Actions/UserAction";
import { DELETE_USER_RESET } from "../../Constant/UserConstant";
import { toast } from 'react-toastify';

const AllUsers = ({ history }) =>
{

	const dispatch = useDispatch();

	const { error, user } = useSelector((state) => state.allUsers);

	const { error: deleteError, isDeleted, message } = useSelector((state) => state.profile);

	const deleteUserHandler = (id) =>
	{
		dispatch(deleteUser(id));
	};

	useEffect(() =>
	{
		if (error)
		{
			toast.error(error);
			dispatch(clearErrors());
		}

		if (deleteError)
		{
			toast.error(deleteError);
			dispatch(clearErrors());
		}

		if (isDeleted)
		{
			toast.success(message);
			history.push("/admin/users");
			dispatch({ type: DELETE_USER_RESET });
		}
		dispatch(getAllUsers());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, history, isDeleted, message]);

	const columns = [
		{ field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

		{
			field: "email",
			headerName: "Email",
			minWidth: 200,
			flex: 1,
		},
		{
			field: "name",
			headerName: "Name",
			minWidth: 150,
			flex: 0.5,
		},

		{
			field: "role",
			headerName: "Role",
			type: "number",
			minWidth: 150,
			flex: 0.3,
			cellClassName: (params) =>
			{
				return params.getValue(params.id, "role") === ("admin")
					? "greenColor"
					: "redColor";
			},
		},

		{
			field: "actions",
			flex: 0.3,
			headerName: "Actions",
			minWidth: 150,
			type: "number",
			sortable: false,
			renderCell: (params) =>
			{
				return (
					<>
						<Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
							<EditIcon />
						</Link>

						<Button
							onClick={() =>
								deleteUserHandler(params.getValue(params.id, "id"))
							}
						>
							<DeleteIcon />
						</Button>
					</>
				);
			},
		},
	];

	const rows = [];

	user &&
		user.forEach((item) =>
		{
			rows.push({
				id: item._id,
				role: item.role,
				email: item.email,
				name: item.name,
			});
		});

	return (
		<>
			<MetaData title={`ALL USERS - Admin`} />

			<div className="dashboard">
				<SideBar />
				<div className="productListContainer">
					<h1 id="productListHeading">ALL USERS</h1>

					<DataGrid
						rows={rows}
						columns={columns}
						pageSize={10}
						disableSelectionOnClick
						className="productListTable"
						autoHeight
					/>
				</div>
			</div>
		</>
	);
};

export default AllUsers;