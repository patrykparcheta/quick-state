import React from "react";
import {Box, Divider, Typography} from "@mui/material";
import ReactJson from "@microlink/react-json-view";

interface TreeViewProps {
	newState: object;
	oldState: object;
}

export const TreeView = ({newState, oldState}: TreeViewProps) => {
	return (
		<Box width={"100%"} display={"flex"} flexWrap={"wrap"} gap={2}>
			<Box flex={"1"}>
				<Typography mb={1}>New state</Typography>
				<Divider />
				<Box pt={1}>
					<ReactJson collapsed={1} iconStyle={"square"} theme={"twilight"} src={newState} />
				</Box>
			</Box>
			<Box flex={"1"}>
				<Typography mb={1}>Old state</Typography>
				<Divider />
				<Box pt={1}>
					<ReactJson collapsed={1} iconStyle={"square"} theme={"twilight"} src={oldState} />
				</Box>
			</Box>
		</Box>
	);
};
