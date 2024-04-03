import {Box, Button, ButtonGroup, Typography} from "@mui/material";
import React from "react";
import {ViewOptions} from "../constants";
import {setKeyValue, useSelectValue} from "../state";
import type {DevToolsState} from "../state/types";

export const ViewSwitch = () => {
	const selectedViewMode = useSelectValue("viewMode");

	const switchViewStyle = (viewMode: DevToolsState["viewMode"]) => setKeyValue("viewMode", viewMode);

	return (
		<Box display={"flex"} justifyContent={"flex-end"} gap={1} alignItems={"center"}>
			<Typography>View:</Typography>
			<ButtonGroup size={"small"} variant="outlined">
				<Button
					variant={selectedViewMode === "raw" ? "contained" : undefined}
					onClick={() => switchViewStyle("raw")}
				>
					{ViewOptions.raw}
				</Button>
				<Button
					variant={selectedViewMode === "tree" ? "contained" : undefined}
					onClick={() => switchViewStyle("tree")}
				>
					{ViewOptions.tree}
				</Button>
				<Button
					variant={selectedViewMode === "gitStyle" ? "contained" : undefined}
					onClick={() => switchViewStyle("gitStyle")}
				>
					{ViewOptions.gitStyle}
				</Button>
			</ButtonGroup>
		</Box>
	);
};
