import {Container, ContainerProps, styled} from "@mui/material";
import {Logo} from "./logo";

const FOOTER_HEIGHT = 100;

export const QuickStateLogo = styled(Logo)({
	width: "100%",
	maxWidth: "700px",
});

export const PageWrapper = styled("div")({
	position: "relative",
	height: `calc(100vh - ${FOOTER_HEIGHT}px)`,
	display: "flex",
	alignItems: "center",
	overflow: "hidden",
	padding: "32px 0",
});

export const PageFooter = styled(Container)<ContainerProps>({
	height: `${FOOTER_HEIGHT}px`,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
});

export const GalaxyCanvas = styled("canvas")({
	position: "absolute",
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	width: "100%",
	height: "100%",
});
