import React, {type ReactNode, useState} from "react";
import type {DevToolsStateUpdateMessage} from "@quickstate/core";
import {RawView} from "./raw-view";
import {GitStyleView} from "./git-style-view";
import {TreeView} from "./tree-view";
import {Box, Chip, Typography} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import {useSelectValue} from "../../state";
import {ActionDetails} from "./action-details";

interface ListProps {
	records: Array<DevToolsStateUpdateMessage>;
}

export const List = React.memo(({records}: ListProps) => {
	const selectedViewMode = useSelectValue("viewMode");

	const [expandedElements, setExpanded] = useState<Array<number>>([]);

	return (
		<Box width={"100%"}>
			{records.map(({data}, index) => {
				const {timestamp, storeName, actionDetails, newState, oldState} = data;
				const {type, actionName} = actionDetails;

				const nameToDisplay = actionName || "Unnamed action";
				const date = new Date(timestamp);

				const expanded = expandedElements.some((i) => i === index);

				let view: ReactNode = null;

				switch (selectedViewMode) {
					case "raw":
						view = <RawView newState={newState} oldState={oldState} />;
						break;
					case "gitStyle":
						view = <GitStyleView newState={newState} oldState={oldState} />;
						break;
					case "tree":
						view = <TreeView newState={newState} oldState={oldState} />;
						break;
					default:
						view = null;
				}

				let typeLabel: string = type;

				if (actionDetails.type === "asyncAction") {
					typeLabel = `${typeLabel} - ${actionDetails.stage}`;
				}

				return (
					<Box key={timestamp} mb={1}>
						<Accordion
							expanded={expanded}
							onChange={() => {
								if (expanded) {
									setExpanded(expandedElements.filter((i) => i !== index));
								} else {
									setExpanded([...expandedElements, index]);
								}
							}}
						>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Box display={"flex"} alignItems={"center"} gap={1}>
									<Chip size={"small"} label={typeLabel} /> <Chip size={"small"} label={storeName} />{" "}
									{nameToDisplay}
								</Box>
							</AccordionSummary>
							<AccordionDetails>
								{expanded && (
									<Box>
										<Typography mb={4}>{date.toString()}</Typography>
										<ActionDetails actionDetails={actionDetails} />
										<Typography variant={"h5"} fontWeight={"bold"} mb={4}>
											Changes
										</Typography>
										{view}
									</Box>
								)}
							</AccordionDetails>
						</Accordion>
					</Box>
				);
			})}
		</Box>
	);
});
