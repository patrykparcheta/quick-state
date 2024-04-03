import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import React from "react";
import {selectStatesList, setKeyValue, useSelectValue} from "../state";
import type {SelectInputProps} from "@mui/material/Select/SelectInput";
import {AllStatesOption} from "../constants";

export const StateSelect = () => {
	const statesList = selectStatesList();

	const selectedState = useSelectValue("selectedState");

	const handleChange: SelectInputProps<string>["onChange"] = ({target}) => setKeyValue("selectedState", target.value);

	return (
		<Box sx={{width: "100%", maxWidth: "180px"}}>
			<FormControl size={"small"} fullWidth>
				<InputLabel id="state-select-label">State</InputLabel>
				<Select
					labelId="state-select-label"
					id="state-select"
					value={selectedState || ""}
					label="State"
					onChange={handleChange}
				>
					<MenuItem key={`states-list-${AllStatesOption}`} value={AllStatesOption}>
						All
					</MenuItem>
					{statesList.map((state) => (
						<MenuItem key={`states-list-${state}`} value={state}>
							{state}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Box>
	);
};
