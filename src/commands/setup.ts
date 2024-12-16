import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { execSync } from "child_process";

export function setupTailwind(basePath: string) {
  try {
    // Tailwind Config Dosyası
    const tailwindConfigContent = `module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};`;

    // PostCSS Config Dosyası
    const postcssConfigContent = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`;

    // Config Dosyalarını Hedef Yerlere Yazma
    const tailwindConfigPath = path.join(basePath, "tailwind.config.js");
    const postcssConfigPath = path.join(basePath, "postcss.config.js");

    fs.writeFileSync(tailwindConfigPath, tailwindConfigContent, "utf-8");
    fs.writeFileSync(postcssConfigPath, postcssConfigContent, "utf-8");

    console.log(chalk.green("Tailwind CSS configuration files created!"));
  } catch (error) {
    console.error(
      chalk.red("Error setting up Tailwind CSS configuration:"),
      error
    );
  }
}

export function installTailwind() {
  try {
    console.log(chalk.yellow("Installing Tailwind CSS and dependencies..."));
    execSync("npm install tailwindcss postcss autoprefixer", {
      stdio: "inherit",
    });
    console.log(
      chalk.green("Tailwind CSS dependencies installed successfully!")
    );
  } catch (error) {
    console.error(
      chalk.red("Error installing Tailwind CSS dependencies:"),
      error
    );
  }
}

export function installSass() {
  try {
    console.log(chalk.yellow("Installing scss dependencies..."));
    execSync("npm install sass", {
      stdio: "inherit",
    });
    console.log(chalk.green("Sass dependencies installed successfully!"));
  } catch (error) {
    console.error(chalk.red("Error installing Sass dependencies:"), error);
  }
}
