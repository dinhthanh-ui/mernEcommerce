import
{
	ADD_TO_CART,
	REMOVE_CART_ITEM,
	SAVE_SHIPPING_INFO,
} from "../Constant/CartConstant";
import { CLEAR_ERRORS } from "../Constant/CartConstant";

const INITIAL_STATE = {
	cartItems: [],
	shippingInfo: {}
};
export const cartReducer = (state = INITIAL_STATE, action) =>
{
	switch (action.type)
	{
		case ADD_TO_CART:
			const item = action.payload;
			// tim kiem id trong mang 
			const isItemExist = state.cartItems.find(
				(i) => i.productId === item.productId
			);
			if (isItemExist)
			{
				return {
					...state,
					// lap tat ca id trong mang, neu ton tai id thi hien thi san pham
					cartItems: state.cartItems.map((i) =>
						i.productId === isItemExist.productId ? item : i
					),
				};
			} else
			{
				return {
					...state,
					cartItems: [...state.cartItems, item],
				};
			}

		case REMOVE_CART_ITEM:
			return {
				...state,
				// loc tat ca cac id cua san pham neu id nao khac voi id truyen vao thi hien thi san pham co id do, va cap nhat lai state
				cartItems: state.cartItems.filter((i) => i.productId !== action.payload),
			};


		case SAVE_SHIPPING_INFO:
			return {
				...state,
				shippingInfo: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				cartItems: [],
				shippingInfo: {},
				error: null
			};
		default:
			return state;

	}
};

