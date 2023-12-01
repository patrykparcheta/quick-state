import React from "react";
import {PageFooter} from "./styles";
import {Box, Button} from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import GitHubIcon from "@mui/icons-material/GitHub";

export const Footer = () => {
	return (
		<PageFooter component={"footer"}>
			<Box display={"flex"} gap={2} justifyContent={"center"}>
				<Button variant={"text"} startIcon={<AutoStoriesIcon />} href={"/docs/category/guide"}>
					Docs
				</Button>
				<Button variant={"text"} startIcon={<GitHubIcon />} href={"https://github.com/xpatrykk/quickstate"}>
					Github
				</Button>
			</Box>
		</PageFooter>
	);
};
