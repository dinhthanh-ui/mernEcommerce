import React, { useState } from 'react';
import "./Favorites.css";
import { useSelector, useDispatch } from "react-redux";
import { deleteFavoriteItemsToCart } from "../../Actions/FavoriteAction"
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/FavoriteBorder";
import { Link } from "react-router-dom";
import FavoriteItemsCard from './FavoriteItemsCard';
import MetaData from '../../Exception/MetaData';
import Loading from '../../Exception/Loading';
import BottomTab from '../../Exception/BottomTab';
import { addItemsToCart } from '../../Actions/CartAction';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Favorite = ({ history }) =>
{
	const dispatch = useDispatch();
	const [show, setShow] = useState(false);

	const { loading } = useSelector(
		(state) => state.productDetail
	);
	const { favoriteItems } = useSelector((state) => state.favorite);
	const [idProduct, setIdProduct] = useState("")
	const handleClose = () => setShow(false);

	const deleteFavoriteItems = (id) =>
	{
		setShow(true)
		setIdProduct(id)
	};
	const handleAddToCart = () =>
	{
		dispatch(addItemsToCart(idProduct, 1))
		dispatch(deleteFavoriteItemsToCart(idProduct))
		history.push("/cart")
	}
	const removeFavoriteItems = (id) =>
	{
		dispatch(deleteFavoriteItemsToCart(id))
	}

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<>
					<MetaData title="Favorites Items" />
					{favoriteItems.length === 0 ? (
						<div className="emptyCart">
							<RemoveShoppingCartIcon />
							<Typography>No Items In Favorites</Typography>
							<Link to="/products">View Products</Link>
							<BottomTab />
						</div>
					) : (
						<>
							<div className="favoritesPage">
								<div className="favoritesHeader">
									<p>Product</p>
									<p>Price</p>
									<p>Stock Status</p>
									<p>Action</p>
								</div>
								{favoriteItems &&
									favoriteItems.map((item) => (
										<div className="favoritesContainer" key={item.product}>
											<FavoriteItemsCard item={item} deleteFavoriteItems={deleteFavoriteItems} removeFavoriteItems={removeFavoriteItems} />
										</div>
									))
								}
								<BottomTab />
							</div>
						</>
					)}
					<Modal show={show} onHide={handleClose}>
						<Modal.Header closeButton>
							<Modal.Title> Giỏ Hàng</Modal.Title>
						</Modal.Header>
						<Modal.Body>Bạn Có Muốn Cho Vào Giỏ Hàng Không ???</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={() => handleClose()}>
								Không
							</Button>
							<Button variant="primary" onClick={() => handleAddToCart()}>
								Có
							</Button>
						</Modal.Footer>
					</Modal>
				</>
			)}
		</>
	)
}

export default Favorite
