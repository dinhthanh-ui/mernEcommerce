import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
import { deleteProductReducer, deleteReviewReducer, newProductReducer, newReviewReducer, productDetailsReducer, productReviewsReducer, productsReducer } from '../Reducers/ProductReducer';
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from '../Reducers/UserReducer';
import { UploadFileImageReducer } from "../Reducers/UploadFileImageReduces";
import { cartReducer } from "../Reducers/CardReducers";
import { favoriteReducer } from "../Reducers/FavoriteReducers";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "../Reducers/OrderReducers";

const reducer = combineReducers({
	product: productsReducer,
	productDetail: productDetailsReducer,
	user: userReducer,
	profile: profileReducer,
	urlImage: UploadFileImageReducer,
	cart: cartReducer,
	favorite: favoriteReducer,
	newOrder: newOrderReducer,
	myOrder: myOrdersReducer,
	newReview: newReviewReducer,
	allOrders: allOrdersReducer,
	allUsers: allUsersReducer,
	deleteAndUpdateProduct: deleteProductReducer,
	newProduct: newProductReducer,
	deleteAndUpdateOrder: orderReducer,
	orderDetail: orderDetailsReducer,
	myUserDetail: userDetailsReducer,
	deleteReview: deleteReviewReducer,
	productReviews: productReviewsReducer,
	myForgotPassword: forgotPasswordReducer,

})
let initialState = {
	cart: {
		cartItems: localStorage.getItem("cartItems")
			? JSON.parse(localStorage.getItem("cartItems"))
			: [],

		shippingInfo: localStorage.getItem("shippingInfo")
			? JSON.parse(localStorage.getItem("shippingInfo"))
			: {},
	},
	favorite: {
		favoriteItems: localStorage.getItem("favoriteItems")
			? JSON.parse(localStorage.getItem("favoriteItems"))
			: [],
	},

};
const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store;