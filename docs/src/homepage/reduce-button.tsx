import {Button} from "@mui/material";
import React from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import {reduceCount} from "./state";

export const ReduceButton = () => {
	return (
		<Button
			size={"large"}
			color={"secondary"}
			variant={"contained"}
			startIcon={<RemoveIcon />}
			onClick={() => reduceCount()}
		>
			Reduce
		</Button>
	);
};
