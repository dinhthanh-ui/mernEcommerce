import React from 'react';
import { Link } from 'react-router-dom';
import "./FavoriteItemsCard.css";
import { useSelector } from "react-redux";

const FavoriteItemsCard = ({ item, deleteFavoriteItems, removeFavoriteItems }) =>
{
	const { products } = useSelector((state) => state.productDetail);
	return (
		<div className='FavoriteItemsCard'>
			<div>
				<img src={item.image} alt="ssa" />
				<p onClick={() => removeFavoriteItems(item.product)}>Remove</p>

				<Link to={`/product/${item.product}`} style={{
					fontSize: "300 0.9vmax",
					fontFamily: "cursive",
				}}>{item.name}</Link>
			</div>

			<div>
				<span>{`$ ${item.price}`}</span>
			</div>

			<div>
				<p style={{ paddingBottom: ".5vmax" }}>
					<b className={products.stock < 1 ? "redColor" : "greenColor"}>
						{products.stock < 1 ? "OutOfStock" : "InStock"}
					</b>
				</p>
			</div>

			<div>
				<Link>
					<button className='favoritesButton' onClick={
						() => deleteFavoriteItems(item.product)}>Add To Cart</button>
				</Link>
			</div>

		</div>
	)
}

export default FavoriteItemsCard
