import React from "react";
import {Box, Divider, Typography} from "@mui/material";

interface RawViewProps {
	newState: object;
	oldState: object;
}

export const RawView = ({newState, oldState}: RawViewProps) => {
	return (
		<Box width={"100%"} display={"flex"} flexWrap={"wrap"} gap={2}>
			<Box flex={"1"}>
				<Typography mb={1}>New state</Typography>
				<Divider />
				<Box pt={1}>
					<pre>{JSON.stringify(newState, null, 4)}</pre>
				</Box>
			</Box>
			<Box flex={"1"}>
				<Typography mb={1}>Old state</Typography>
				<Divider />
				<Box pt={1}>
					<pre>{JSON.stringify(oldState, null, 4)}</pre>
				</Box>
			</Box>
		</Box>
	);
};
