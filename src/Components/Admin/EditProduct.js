import React, { useEffect, useState } from "react";
import "./EditProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, updateProduct, getProductDetails, uploadImageProduct } from "../../Actions/ProductActions";
import { Button } from "@material-ui/core";
import MetaData from "../../Exception/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import DiscountIcon from "@material-ui/icons/LocalOffer";
import SideBar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../Constant/ProductConstant";
import { toast } from 'react-toastify';
import { UPLOAD_FILE_IMAGE_PRODUCT_ERROR } from "../../Constant/UploadFileConstant";

const EditProduct = ({ history, match }) =>
{

	const dispatch = useDispatch();

	const { error, products } = useSelector((state) => state.productDetail);

	const { loading, error: updateError, isUpdated } = useSelector((state) => state.deleteAndUpdateProduct);
	const { url, success, message } = useSelector((state) => state.urlImage);

	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	// eslint-disable-next-line
	const [offerPrice, setOfferPrice] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [stock, setStock] = useState(0);
	const [oldImages, setOldImages] = useState([]);
	const [imagesPreview, setImagesPreview] = useState([]);
	const [dataUrl, setDataUrl] = useState("")
	const [dataImageUrl, setDataImageUrl] = useState({});

	const categories = [
		"Riêng tư",
		"Quà tặng",
		"Món ăn",
		"Thiết bị điện tử",
		"Các môn thể thao",
		"Khác"
	];

	const productId = match.params.id;
	useEffect(() =>
	{
		if (products && products._id !== productId)
		{
			dispatch(getProductDetails(productId));
		} else
		{
			setName(products.name);
			setDescription(products.description);
			setPrice(products.price);
			setCategory(products.category);
			setStock(products.stock);
			setOldImages(products.images);
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
			toast.success("Product Updated Successfully");
			history.push("/admin/products");
			dispatch({ type: UPDATE_PRODUCT_RESET });
		}
	}, [dispatch, error, history, isUpdated, productId, products, updateError]);



	const updateProductSubmitHandler = (e) =>
	{
		e.preventDefault();

		const myForm = {
			name,
			price,
			offerPrice,
			description,
			category,
			stock,
			dataImageUrl
		}
		if (url === null)
		{
			toast.error(" Bức ảnh này không được tải lên, vui long chọn bức ảnh khác !!! ")
		} else
		{
			dispatch(updateProduct(productId, myForm));
			dispatch({ type: UPLOAD_FILE_IMAGE_PRODUCT_ERROR })
		}
	};

	// image product
	const updateProductImagesChange = (e) =>
	{
		const files = Array.from(e.target.files);

		setOldImages([]);
		setImagesPreview([])

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
	useEffect(() =>
	{
		// lay phan tu trong mang
		oldImages &&
			oldImages.map((image) => (
				setDataUrl(image.url)
			));

		// xu ly anh khi nguoi dung khong upload anh
		if (message === "")
		{
			setDataImageUrl(dataUrl)
		} else
		{
			setDataImageUrl(url)
		}

	}, [dataImageUrl, dataUrl, message, oldImages, url])

	if (success === false)
	{
		toast.error(message);
	}
	return (
		<>
			<MetaData title="Edit Product" />
			<div className="dashboard">
				<SideBar />
				<div className="newProductContainer">
					<form
						className="createProductForm"
						encType="multipart/form-data"
						onSubmit={updateProductSubmitHandler}
					>
						<h1>Edit Product</h1>

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
								value={price}
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
							<select
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							>
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
								value={stock}
							/>
						</div>

						<div id="createProductFormFile">
							<input
								type="file"
								name="avatar"
								accept="image/*"
								onChange={updateProductImagesChange}
								multiple
							/>
						</div>

						<div id="createProductFormImage">
							{oldImages &&
								oldImages.map((image, index) => (
									<>
										<img key={index} src={image.url} alt="Old Product Preview" />
									</>
								))}
						</div>

						<div id="createProductFormImage">
							{imagesPreview.map((image, index) => (
								<img key={index} src={image} alt="Product Preview" />
							))}
						</div>

						<Button
							id="createProductBtn"
							type="submit"
							disabled={loading ? true : false}
						>
							Update
						</Button>
					</form>
				</div>
			</div>

		</>
	);
};

export default EditProduct;