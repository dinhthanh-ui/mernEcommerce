import React from "react";
import { Typography, Stepper, StepLabel, Step, Box } from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import BottomTab from "../../Exception/BottomTab";

const CheckoutSteps = ({ activeStep }) =>
{
	const steps = [
		{
			label: <Typography>Shipping Details</Typography>,
			icon: <LocalShippingIcon />,
		},
		{
			label: <Typography>Confirm Order</Typography>,
			icon: <LibraryAddCheckIcon />,
		},
		{
			label: <Typography>Payment</Typography>,
			icon: <AccountBalanceIcon />,
		},
	];

	const stepStyles = {
		boxSizing: "border-box",
	};

	return (
		<>
			<Box sx={{ width: '100%' }}>
				<Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
					{steps.map((item, index) => (
						<Step
							key={index}
							active={activeStep === index ? true : false}
							completed={activeStep === index ? true : false}
						>
							<StepLabel
								style={{
									color: activeStep >= index ? "#3BB77E" : "rgb(90 90 90)",
								}}
								icon={item.icon}
							>
								{item.label}
							</StepLabel>
						</Step>
					))}
				</Stepper>
			</Box>
			<BottomTab />
		</>
	);
};

export default CheckoutSteps;