import React, { useEffect, useState } from "react";
import "./CreateProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct, uploadImageProduct } from "../../Actions/ProductActions";
import { Button } from "@material-ui/core";
import MetaData from "../../Exception/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import DiscountIcon from "@material-ui/icons/LocalOffer";
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../Constant/ProductConstant";
import { toast } from 'react-toastify';

const CreateProduct = ({ history }) =>
{
	const dispatch = useDispatch();

	const { error, success } = useSelector((state) => state.newProduct);
	const { url, success: updateSuccess, message } = useSelector((state) => state.urlImage);


	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [stock, setStock] = useState(0);
	const [offerPrice, setOfferPrice] = useState("");
	const [imagesPreview, setImagesPreview] = useState([]);

	const categories = [
		"Riêng tư",
		"Quà tặng",
		"Món ăn",
		"Thiết bị điện tử",
		"Các môn thể thao",
		"Khác"
	];

	useEffect(() =>
	{
		if (error)
		{
			toast.error(error);
			dispatch(clearErrors());
		}

		if (success)
		{
			toast.success("Product Created Successfully");
			history.push("/dashboard");
			dispatch({ type: NEW_PRODUCT_RESET });
		}
	}, [dispatch, error, history, success]);

	const createProductSubmitHandler = (e) =>
	{
		e.preventDefault();

		const myForm = {
			name,
			price,
			offerPrice,
			description,
			category,
			stock,
			url
		}
		if (url === null)
		{
			toast.error(" Bức ảnh này không được tải lên, vui long chọn bức ảnh khác !!! ")
		} else if (name === null || price === null || offerPrice === null || description === null || category === null || stock === null)
		{
			toast.error("  Vui long Điền Thông Tin Các Mục Ở Trên !!! ")
		}
		else
		{
			dispatch(createProduct(myForm));
		}
	};

	const createProductImagesChange = (e) =>
	{
		const files = Array.from(e.target.files);

		setImagesPreview([]);

		files.forEach((file) =>
		{
			const reader = new FileReader();

			reader.onload = () =>
			{
				if (reader.readyState === 2)
				{
					setImagesPreview((old) => [...old, reader.result]);
				}
			};
			reader.readAsDataURL(file);
		});
		const formData = new FormData();
		formData.append('avatar', e.target.files[0]);
		dispatch(uploadImageProduct(formData));
	};

	if (updateSuccess === false)
	{
		toast.error(message);
	}

	return (
		<>
			<MetaData title="Create Product" />
			<div className="dashboard">
				<SideBar />
				<div className="newProductContainer">
					<form
						className="createProductForm"
						encType="multipart/form-data"
						onSubmit={createProductSubmitHandler}
					>
						<h1>Create Product</h1>

						<div>
							<SpellcheckIcon />
							<input
								type="text"
								placeholder="Product Name"
								required
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>

						<div>
							<DiscountIcon />
							<input
								type="String"
								placeholder="Discount Percent *optional"
								onChange={(e) => setOfferPrice(e.target.value)}
							/>
						</div>

						<div>
							<AttachMoneyIcon />
							<input
								type="number"
								placeholder="Product Price"
								required
								onChange={(e) => setPrice(e.target.value)}
							/>
						</div>

						<div>
							<DescriptionIcon />
							<textarea
								placeholder="Product Description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								cols="30"
								rows="1"
							></textarea>
						</div>

						<div>
							<AccountTreeIcon />
							<select onChange={(e) => setCategory(e.target.value)}>
								<option value="">Choose Category</option>
								{categories.map((cate) => (
									<option key={cate} value={cate}>
										{cate}
									</option>
								))}
							</select>
						</div>

						<div>
							<StorageIcon />
							<input
								type="number"
								placeholder="Stock"
								required
								onChange={(e) => setStock(e.target.value)}
							/>
						</div>

						<div id="createProductFormFile">
							<input
								type="file"
								name="avatar"
								accept="image/*"
								onChange={createProductImagesChange}
								multiple
							/>
						</div>

						<div id="createProductFormImage">
							{imagesPreview.map((image, index) => (
								<img key={index} src={image} alt="Product Preview" />
							))}
						</div>

						<Button
							id="createProductBtn"
							type="submit"
						>
							Create
						</Button>
					</form>
				</div>
			</div>

		</>
	);
};

export default CreateProduct;