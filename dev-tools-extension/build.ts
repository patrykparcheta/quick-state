import * as fs from "fs";
import * as path from "path";

const buildForBrowser = async (browser: string): Promise<void> => {
	console.log(`Building for ${browser}...`);

	const buildDirPath = path.resolve(__dirname, "build");
	const packageJsonPath = path.resolve(__dirname, "package.json");
	const manifestV3Path = path.resolve(buildDirPath, "manifest.json");
	const manifestV2Path = path.resolve(buildDirPath, "manifest-v2.json");
	const targetBuildDir = `build-${browser}`;
	const targetBuildDirPath = path.resolve(__dirname, targetBuildDir);

	const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
	const version: string = packageJson.version;

	const manifestPath = browser === "chrome" ? manifestV3Path : manifestV2Path;
	const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
	manifest.version = version;

	fs.writeFileSync(path.resolve(buildDirPath, "manifest.json"), JSON.stringify(manifest, null, 2));

	copyDir(buildDirPath, targetBuildDirPath);

	console.log(`Build for ${browser} completed.`);
};

const copyDir = (src: string, dest: string): void => {
	fs.mkdirSync(dest, {recursive: true});
	const entries = fs.readdirSync(src, {withFileTypes: true});

	entries.forEach((entry) => {
		const srcPath = path.join(src, entry.name);
		const destPath = path.join(dest, entry.name);

		entry.isDirectory() ? copyDir(srcPath, destPath) : fs.copyFileSync(srcPath, destPath);
	});
};

const removeBuildFolders = (): void => {
	const directory = path.resolve(__dirname);
	fs.readdirSync(directory).forEach((file) => {
		if (file.startsWith("build-")) {
			const filePath = path.join(directory, file);
			fs.rmSync(filePath, {recursive: true, force: true});
			console.log(`Removed ${filePath}`);
		}
	});
};

const browsers: string[] = ["chrome", "firefox", "opera", "brave"];

const buildSequentially = async () => {
	removeBuildFolders();

	for (const browser of browsers) {
		await buildForBrowser(browser).catch((error) => {
			console.error(`Build failed for ${browser}:`, error);
		});
	}
};

buildSequentially();
