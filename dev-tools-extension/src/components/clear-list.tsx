import React from "react";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import {Box, IconButton, Tooltip} from "@mui/material";
import {clearMessageDetailsList} from "../state";

export const ClearList = () => {
	return (
		<Box>
			<Tooltip title={"Clear list"}>
				<IconButton size={"small"} onClick={clearMessageDetailsList}>
					<ClearAllIcon />
				</IconButton>
			</Tooltip>
		</Box>
	);
};
