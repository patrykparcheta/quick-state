import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {ThemeProvider} from "@mui/material/styles";
import {Box, Container, Divider} from "@mui/material";
import {withStateProvider} from "./state";
import {Footer, Logo, StateSelect} from "./components";
import {theme} from "./theme";
import {StateChangeList} from "./components/state-change-list";
import {ViewSwitch} from "./components/view-switch";
import {ClearList} from "./components/clear-list";
import {useGetMessages} from "./hooks";
import "diff2html/bundles/css/diff2html.min.css";

export const DevTools = withStateProvider(() => {
	useGetMessages();

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Container
				component={"main"}
				sx={{width: "100%", maxWidth: "800px", minWidth: "500px", position: "relative", zIndex: 1}}
			>
				<Box p={2} className={"demo-header"} mb={6} display={"flex"} justifyContent={"space-between"}>
					<Logo />
					<StateSelect />
				</Box>
				<Box
					mb={2}
					display={"flex"}
					alignItems={"center"}
					justifyContent={"flex-end"}
					flexWrap={"wrap"}
					gap={1}
				>
					<ViewSwitch />
					<ClearList />
				</Box>
				<StateChangeList />
			</Container>
			<Divider />
			<Footer />
		</ThemeProvider>
	);
});
