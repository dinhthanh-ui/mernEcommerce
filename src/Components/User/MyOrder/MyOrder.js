import React, { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./MyOrder.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../../Actions/OrderActions";
import { Link } from "react-router-dom";
import MetaData from "../../../Exception/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";
import Loading from "../../../Exception/Loading";
import BottomTab from "../../../Exception/BottomTab";
import { toast } from "react-toastify";

const MyOrder = () =>
{
	const dispatch = useDispatch();

	const { loading, error, order, user } = useSelector((state) => state.myOrder);

	const columns = [
		{ field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

		{
			field: "status",
			headerName: "Status",
			minWidth: 150,
			flex: 0.5,
			cellClassName: (params) =>
			{
				return params.getValue(params.id, "status") === "Đã giao hàng"
					? "greenColor"
					: "redColor";
			},

		},
		{
			field: "itemsQty",
			headerName: "Items Qty",
			type: "number",
			minWidth: 150,
			flex: 0.3,
		},

		{
			field: "amount",
			headerName: "Amount",
			type: "number",
			minWidth: 270,
			flex: 0.5,
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
					<Link to={`/order/${params.getValue(params.id, "id")}`}>
						<LaunchIcon />
					</Link>
				);
			},
		},
	];

	let rows = [];

	if (loading !== true)
	{
		order &&
			order.forEach((item, index) =>
			{
				rows.push({
					itemsQty: item.orderItems.length === 0 ? 1 : item.orderItems.length,
					id: item._id,
					status: item.orderStatus,
					amount: item.totalPrice,
				});
			});
	}


	useEffect(() =>
	{
		if (error)
		{
			toast.error(error);
			dispatch(clearErrors());
		}
		dispatch(myOrders());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, alert, error]);

	return (
		<>

			<MetaData title={`${loading !== true ? user.name : null} - Orders`} />

			{loading ? (
				<Loading />
			) : (
				<div className="myOrdersPage">
					<DataGrid
						rows={rows}
						columns={columns}
						pageSize={10}
						disableSelectionOnClick
						className="myOrdersTable"
						autoHeight
					/>
				</div>
			)}
			<BottomTab />
		</>
	);
};

export default MyOrder;
