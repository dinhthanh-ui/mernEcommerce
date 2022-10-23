import React, { useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import CheckoutSteps from "../Cart/CheckoutSteps";
import MetaData from "../../Exception/MetaData";
import HomeIcon from "@material-ui/icons/Home";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { saveShippingInfo } from "../../Actions/CartAction";
import BottomTab from "../../Exception/BottomTab";
import { toast } from "react-toastify";

const Shipping = ({ history }) =>
{
	const dispatch = useDispatch();

	const { shippingInfo } = useSelector((state) => state.cart);

	const [address, setAddress] = useState(shippingInfo.address);
	const [city, setCity] = useState(shippingInfo.city);
	const [country, setCountry] = useState(shippingInfo.country);
	const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
	const shippingSubmit = (e) =>
	{
		e.preventDefault();

		if (phoneNo.length < 10 || phoneNo.length > 11)
		{
			toast.error("Số điện thoại phải có 10 & 11 chữ số");
			return;
		}
		dispatch(saveShippingInfo({ address, city, country, phoneNo }));
		history.push("/order/confirm");
	};

	return (
		<>
			<MetaData title="Shipping Details" />

			<CheckoutSteps activeStep={0} />

			<div className="shippingContainer">
				<div className="shippingBox">
					<h2 className="shippingHeading">Shipping Details</h2>

					<form
						className="shippingForm"
						encType="multipart/form-data"
						onSubmit={shippingSubmit}
					>
						<div>
							<HomeIcon />
							<input
								type="text"
								placeholder="Address"
								required
								value={address}
								onChange={(e) => setAddress(e.target.value)}
							/>
						</div>

						<div>
							<PhoneIcon />
							<input
								type="number"
								placeholder="Phone Number"
								required
								value={phoneNo}
								onChange={(e) => setPhoneNo(e.target.value)}
								size="10"
							/>
						</div>

						<div>
							<PublicIcon />

							<select
								required
								value={country}
								onChange={(e) => setCountry(e.target.value)}
							>
								<option value="">Country</option>
								{Country &&
									Country.getAllCountries().map((item) => (
										<option key={item.isoCode} value={item.isoCode}>
											{item.name}
										</option>
									))}
							</select>
						</div>

						{country && (
							<div>
								<TransferWithinAStationIcon />
								<select
									required
									value={city}
									onChange={(e) => setCity(e.target.value)}
								>
									<option value="">City</option>
									{State &&
										State.getStatesOfCountry(country).map((item) => (
											<option key={item.isoCode} value={item.name}>
												{item.name}
											</option>
										))}
								</select>
							</div>
						)}

						<input
							type="submit"
							value="Continue"
							className="shippingBtn"
							disabled={city ? false : true}
						/>
					</form>
				</div>
			</div>
			<BottomTab />
		</>
	);
};

export default Shipping;
