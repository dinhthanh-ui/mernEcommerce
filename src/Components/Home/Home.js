import { React, useEffect } from "react";
import "./Home.css";
import bg from "../../Assets/sale24h.png";
import bg2 from "../../Assets/sale1010.png";
import bg3 from "../../Assets/sale1210.png";
import bg4 from "../../Assets/sale.png";
import bg5 from "../../Assets/sale10.png";
import Carousel from "react-material-ui-carousel";
import { clearErrors, getProduct } from "../../Actions/ProductActions";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../Products/ProductCard";
import { toast } from "react-toastify";
import MetaData from "../../Exception/MetaData";
import Loading from "../../Exception/Loading";
import Header from "./Header";
import Footer from "../Footer/Footer";
import BottomTab from "../../Exception/BottomTab";

const Home = () =>
{

	const dispatch = useDispatch();
	const { products, error, loading } = useSelector((state) => state.product);

	useEffect(() =>
	{
		if (error)
		{
			toast.error(error);
			dispatch(clearErrors());
		}
		dispatch(getProduct());

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, error]);
	if (loading)
	{
		return <Loading />;
	} else
	{
		return (
			<>
				<MetaData title="Home" />
				<Header />
				<div className="banner">
					<Carousel>
						<img src={bg} className="bgImg" alt="" />
						<img src={bg2} className="bgImg" alt="" />
						<img src={bg3} className="bgImg" alt="" />
						<img src={bg4} className="bgImg" alt="" />
						<img src={bg5} className="bgImg" alt="" />
					</Carousel>
					<div className="home__content">
						<div
							style={{
								display: "flex",
								alignItems: "center",
							}}
						>
							<h2
								style={{
									fontFamily: "Segoe Script",
									fontSize: "3em",
									fontWeight: "500",
								}}
							>
								Buy 2 Get
							</h2>
							<span
								style={{
									padding: "10px",
									backgroundColor: "#fff",
									margin: "0px 10px",
									textAlign: "center",
									width: "150px",
									height: "40px",
									color: "#26c",
									fontFamily: "Segoe Script",
									fontSize: "2.4em",
									display: "flex",
									justifyContent: "center",
									lineHeight: ".7",
									alignItems: "center",
								}}
							>
								1 Free
							</span>
						</div>
						<div>
							<h2
								style={{
									fontSize: "4.5em",
									fontFamily: "Poppins,sans-serif",
									color: "#fff",
								}}
							>
								Fashionable
							</h2>
						</div>
						<div>
							<h2
								style={{
									fontSize: "4.5em",
									fontWeight: "400",
									fontFamily: "Poppins,sans-serif",
									color: "#fff",
									lineHeight: ".7",
								}}
							>
								Collection
							</h2>
						</div>
						<div>
							<h2
								style={{
									fontWeight: "400",
									fontFamily: "Poppins,sans-serif",
									color: "#fff",
									fontSize: "1em",
									paddingTop: "10px",
								}}
							>
								Get Free Shipping on all orders over $99.00
							</h2>
						</div>
						<div>
							<a href="#container">
								<button
									type="submit"
									style={{
										width: "135px",
										height: "50px",
										border: "none",
										background: "#3BB77E",
										margin: "10px 0",
										fontSize: "1.1vmax",
										color: "#fff",
										cursor: "pointer",
									}}
									className="Home__button"
								>
									SHOP NOW
								</button>
							</a>
						</div>
					</div>
				</div>

				<h2 className="homeHeading">Featured Products</h2>
				<div className="container" id="container">
					{products &&
						products.map((product) => (
							<ProductCard key={product._id} product={product} />
						))}
				</div>
				<Footer />
				<BottomTab />
			</>
		);
	}
};

export default Home;
