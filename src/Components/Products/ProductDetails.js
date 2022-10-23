import React, { useEffect, useState } from "react";
import MetaData from "../../Exception/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProductDetails, newReview } from "../../Actions/ProductActions";
import Carousel from "react-material-ui-carousel";
import { Rating } from "@material-ui/lab";
import "./ProductDetails.css";
import { toast } from "react-toastify";
import Loading from "../../Exception/Loading";
import Header from "../Home/Header";
import Footer from "../Footer/Footer";
import { addItemsToCart } from "../../Actions/CartAction";
import { addFavoriteItemsToCart } from "../../Actions/FavoriteAction";
import BottomTab from "../../Exception/BottomTab";
import ReviewCard from "./ReviewCard";
import { NEW_REVIEW_RESET } from "../../Constant/ProductConstant";


const ProductDetails = ({ match, history }) =>
{
	const dispatch = useDispatch();
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");
	const { products, loading, error } = useSelector(
		(state) => state.productDetail,
	);
	const { isAuthenticated } = useSelector((state) => state.user);
	useEffect(() =>
	{
		dispatch(getProductDetails(match.params.id));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, match]);

	if (error)
	{
		toast.error(error);
		dispatch(clearErrors());
	}
	const options = {
		value: products ? products.ratings || 0 : 0,
		readOnly: true,
		precision: 0.5,
	};

	// Increase quantity
	const [quantity, setQuantity] = useState(0);

	const increaseQuantity = () =>
	{
		if (products.stock <= quantity)
			return toast.error(
				`Số lượng sản phẩm trong kho còn: ${products.stock} sản phẩm. Mong Quý Khách Thông Cảm !!!!!  `,
			);
		const qty = quantity + 1;
		setQuantity(qty);
	};

	const decreaseQuantity = () =>
	{
		if (quantity <= 1) return;
		const qty = quantity - 1;
		setQuantity(qty);
	};

	const addToCartHandler = () =>
	{
		if (products.stock > 0 && quantity > 0)
		{
			dispatch(addItemsToCart(match.params.id, quantity));
			toast.success("Product Added to cart");
		} else if (quantity === 0)
		{
			toast.error("Vui Lòng Chọn Số Lượng Sản Phẩm");
		}
		else
		{
			toast.error("Product stock limited");
		}
	};
	const addToFavoriteHandler = () =>
	{
		dispatch(addFavoriteItemsToCart(match.params.id, quantity));
		toast.success("Product Added to Favorites");
	};

	const reviewSubmitHandler = (e) =>
	{
		e.preventDefault();

		const productId = match.params.id;

		const myForm = {
			rating,
			comment,
			productId
		}
		dispatch(newReview(myForm));

		if (isAuthenticated !== true)
		{
			history.push(`/login?redirect=/`)
		}

		if (comment.length === 0)
		{
			toast.error("Please fill the comment box")
		} else
		{
			setTimeout(() =>
			{
				window.location.reload();
			}, 5000);
			toast.success("Đánh giá hoàn thành, cảm ơn quý khách hàng !!!")
		}
		dispatch({ type: NEW_REVIEW_RESET });
	};

	if (loading)
	{
		return <Loading />;
	} else
	{
		return (
			<>
				<MetaData title={`${products ? products.name : ""}`} />
				<Header />
				<div className="ProductDetails">
					<div className="first__varse">
						<Carousel>
							{products
								? products.images &&
								products.images.map((item, i) => (
									<img
										className="CarouselImage"
										key={i}
										src={item.url}
										alt={`${i} Slide`}
									/>
								))
								: ""}
						</Carousel>
					</div>
					<div className="varse__2">
						<div className="detailsBlock-1">
							<h2>{products ? products.name : ""}</h2>
						</div>
						<div className="detailsBlock-2">
							<Rating {...options} />
							<span>({products ? products.numOfReviews : 0} Reviews)</span>
						</div>
						<div className="detailsBlock">
							<div
								style={{
									display: "flex",
								}}
							>
								<h1>{`$${products ? products.price : 0}`}</h1>
								<h1 className="discountPrice">
									{products
										? products.offerPrice > 0
											? `$${products.offerPrice}`
											: ""
										: ""}
								</h1>
							</div>
							<div className="detailsBlock-3-1">
								<span className="quantity">Quantity</span>
								<div className="detailsBlock-3-1-1">
									<button onClick={decreaseQuantity}>-</button>
									<input type="number" readOnly value={quantity} />
									<button onClick={increaseQuantity}>+</button>
								</div>{" "}
							</div>
							<p className="stock__meta" style={{ paddingBottom: ".5vmax" }}>
								<b
									className={
										products
											? products.stock < 1
												? "redColor"
												: "greenColor"
											: ""
									}
								>
									{products
										? products.stock < 1
											? "OutOfStock"
											: "InStock"
										: ""}
								</b>
							</p>
							<div
								className="Description"
								style={{
									display: "flex",
									alignItems: "center",
								}}
							>
								<span>Description:</span>
								<p>{products ? products.description : ""}</p>
							</div>
							<div
								style={{
									display: "flex",
									alignItems: "center",
								}}
							>
								<div
									className="wishlist"
									style={{
										display: "flex",
										alignItems: "center",
										cursor: "pointer",
										padding: "15px 5px",
									}}
									onClick={addToFavoriteHandler}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										fill="currentColor"
										className="bi bi-heart"
										viewBox="0 0 16 16"
										style={{ hover: "color: red" }}
									>
										<path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
									</svg>
									<span
										className="cartBtn"
										style={{ opacity: 0.7, padding: "0px 5px" }}
									>
										Add to wishlist
									</span>
								</div>

								<div
									className="pointer flex"
									style={{
										padding: "10px 5px",
										alignItems: "center",
										backgroundColor: "#E4EAEC",
									}}
									onClick={addToCartHandler}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										fill="currentColor"
										className="bi bi-bag"
										viewBox="0 0 16 16"
									>
										<path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
									</svg>
									<button
										className="cartBtn"
										style={{
											opacity: 0.7,
											padding: "0px 5px",
											border: "none",
											cursor: "pointer",
											background: "none",
										}}
									>
										Add to Cart
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* Reviews */}
				<div className="reviews__heading">
					<h1
						style={{
							padding: "5px 30px",
							opacity: 1,
							borderBottom: "1px solid #999",
							fontFamily: "Poppins,sans-serif",
						}}
					>
						Reviews
					</h1>
				</div>

				<div>
					{/* Reviews */}
					<div
						style={{
							padding: "1vmax",
						}}
					>
						{products ? (
							products.reviews && products.reviews[0] ? (
								<div className="review__option">
									{products.reviews &&
										products.reviews.map((review, i) => (
											<ReviewCard review={review} key={i} />
										))}
								</div>
							) : (
								<p
									className="noReviews"
									style={{
										fontFamily: "Poppins,sans-serif",
									}}
								>
									No Reviews Yet *
								</p>
							)
						) : (
							""
						)}
						<div
							style={{
								padding: "0px 2vmax",
								display: "flex",
								flexDirection: "column",
							}}
						>
							<span
								style={{
									fontSize: "1.8vmax",
									fontWeight: "700",
									lineHeight: 1,
									letterSpacing: "-.0125em",
									color: "#222",
									fontFamily: "Poppins,sans-serif",
								}}
							>
								Add a Review
							</span>
							<div
								style={{
									margin: "1vmax 0",
									flexDirection: "column",
									display: "flex",
								}}
							>
								<div>
									<span
										style={{
											color: "#222",
											fontFamily: "Poppins,sans-serif",
											padding: "1vmax 0",
										}}
									>
										Your Rating*
									</span>
									<Rating
										onChange={(e) => setRating(e.target.value)}
										value={rating}
										size="large"
										name="hover-feedback"
										precision={0.5}
										max={5}
									/>
									<div
										style={{
											display: "flex",
											flexDirection: "column",
										}}
									></div>
								</div>
							</div>
							<textarea
								cols="30"
								rows="6"
								placeholder="Comment *"
								onChange={(e) => setComment(e.target.value)}
								style={{
									maxWidth: "100%",
									color: "#111",
									borderColor: "#e1e1e1",
									background: "#fff",
									borderRadius: "0.3rem",
									outline: "none",
									padding: "5px",
									fontSize: "1.2vmax",
									lineHeight: "1.5",
									resize: "none",
									display: "block",
								}}
							></textarea>
							<button
								type="submit"
								style={{
									width: "12vmax",
									margin: "1vmax 0px",
									fontFamily: "sans-serif",
									padding: "10px 15px",
									background: "#3BB77E",
									border: "none",
									cursor: "pointer",
									color: "#fff",
								}}
								onClick={reviewSubmitHandler}
							>
								Submit
							</button>
						</div>
					</div>
				</div>
				<Footer />
				<BottomTab />
			</>
		);
	}
};

export default ProductDetails;
