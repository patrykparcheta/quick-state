import {themes as prismThemes} from "prism-react-renderer";
import type {Config} from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
	title: "QuickState",
	tagline:
		"QuickState is a lightweight and highly efficient state management library for React. It provides fast performance with minimal overhead. Thanks to its user-friendly API, it allows for easy integration and seamless state management.",
	favicon: "assets/logo-square.svg",
	url: "https://quickstate.vercel.app",
	baseUrl: "/",
	onBrokenLinks: "throw",
	onBrokenMarkdownLinks: "warn",
	presets: [
		[
			"classic",
			{
				docs: {
					sidebarPath: "./sidebars.ts",
				},
				theme: {
					customCss: "./src/css/custom.css",
				},
			} satisfies Preset.Options,
		],
	],
	themeConfig: {
		navbar: {
			logo: {
				alt: "My Site Logo",
				src: "assets/logo-dark.svg",
				srcDark: "assets/logo-white.svg",
			},
			items: [
				{
					type: "docSidebar",
					sidebarId: "tutorialSidebar",
					position: "left",
					label: "Documentation",
				},
				{
					href: "https://github.com/xpatrykk/quickstate",
					label: "GitHub",
					position: "right",
				},
			],
		},
		footer: {
			style: "dark",
			copyright: `Copyright © ${new Date().getFullYear()} QuickState`,
		},
		prism: {
			theme: prismThemes.github,
			darkTheme: prismThemes.dracula,
		},
		colorMode: {
			defaultMode: "dark",
			disableSwitch: false,
			respectPrefersColorScheme: true,
		},
	} satisfies Preset.ThemeConfig,
};

export default config;
