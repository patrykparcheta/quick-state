import React from "react";
import {Box, Typography} from "@mui/material";
import {selectCount} from "./state";

export const Counter = () => {
	const count = selectCount();

	return (
		<Box mb={6} display={"flex"} justifyContent={"center"}>
			<Typography variant={"h3"} fontWeight={"bold"}>
				Speed: {count}
			</Typography>
		</Box>
	);
};
