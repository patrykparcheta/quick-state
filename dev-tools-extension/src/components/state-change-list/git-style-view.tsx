import React, {useEffect, useRef} from "react";
import * as Diff from "diff";
import * as Diff2Html from "diff2html";
import {ColorSchemeType} from "diff2html/lib/types";
import {Box} from "@mui/material";

interface GitStyleViewProps {
	oldState: object;
	newState: object;
}

export const GitStyleView = ({oldState, newState}: GitStyleViewProps) => {
	const diffRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const oldJson = JSON.stringify(oldState, null, 4);
		const newJson = JSON.stringify(newState, null, 4);

		const diffResult = Diff.createPatch("", oldJson, newJson, "", "", {context: 0});

		if (diffRef.current) {
			Diff2Html.parse(diffResult, {
				matching: "lines",
				outputFormat: "side-by-side",
			});

			diffRef.current.innerHTML = Diff2Html.html(diffResult, {
				outputFormat: "line-by-line",
				colorScheme: ColorSchemeType.DARK,
				drawFileList: false,
			});
		}
	}, [oldState, newState]);

	return (
		<Box width={"100%"}>
			<div ref={diffRef} />
		</Box>
	);
};
