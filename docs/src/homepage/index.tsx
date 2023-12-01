import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {ThemeProvider, createTheme} from "@mui/material/styles";
import {Box, Container} from "@mui/material";
import {Counter} from "./counter";
import {IncrementButton} from "./increment-button";
import {ReduceButton} from "./reduce-button";
import {MyStoreProvider} from "./state";
import {GalaxyAnimation} from "./galaxy-animation";
import {PageWrapper, QuickStateLogo} from "./styles";
import {GetStarted} from "./get-started";
import {Footer} from "./footer";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#6cedae",
		},
		secondary: {
			main: "#ff338f",
		},
		background: {
			default: "#080808",
			paper: "#202020",
		},
		info: {
			main: "#5beaf4",
		},
		success: {
			main: "#00ff9a",
		},
		error: {
			main: "#f33f37",
		},
	},
});

export const CounterHero = () => {
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<MyStoreProvider>
				<PageWrapper>
					<Container component={"main"} sx={{position: "relative", zIndex: 1}}>
						<Box className={"demo-header"} mb={6} display={"flex"} justifyContent={"center"}>
							<QuickStateLogo />
						</Box>
						<Counter />
						<Box display={"flex"} gap={2} justifyContent={"center"}>
							<ReduceButton />
							<IncrementButton />
							<GetStarted />
						</Box>
					</Container>
					<GalaxyAnimation />
				</PageWrapper>
				<Footer />
			</MyStoreProvider>
		</ThemeProvider>
	);
};
