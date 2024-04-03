import React from "react";
import type {StateUpdateVariants} from "@quickstate/core";
import {Box, Typography} from "@mui/material";
import ReactJson from "@microlink/react-json-view";

interface ActionDetailsProps {
	actionDetails: StateUpdateVariants;
}

export const ActionDetails = ({actionDetails}: ActionDetailsProps) => {
	return (
		<Box mb={4}>
			<Typography variant={"h5"} fontWeight={"bold"} mb={4}>
				Action details
			</Typography>
			<ReactJson collapsed={2} iconStyle={"square"} theme={"twilight"} src={actionDetails} />
		</Box>
	);
};
