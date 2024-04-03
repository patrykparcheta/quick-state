import React from "react";
import {Box, Button, Container} from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import GitHubIcon from "@mui/icons-material/GitHub";

export const Footer = () => {
	return (
		<Container component={"footer"}>
			<Box display={"flex"} gap={2} p={1} justifyContent={"center"}>
				<Button
					size={"small"}
					variant={"text"}
					startIcon={<AutoStoriesIcon />}
					target={"_blank"}
					href={"https://quickstate.vercel.app/docs/category/guide"}
				>
					Docs
				</Button>
				<Button
					size={"small"}
					variant={"text"}
					startIcon={<GitHubIcon />}
					target={"_blank"}
					href={"https://github.com/xpatrykk/quickstate"}
				>
					Github
				</Button>
			</Box>
		</Container>
	);
};
