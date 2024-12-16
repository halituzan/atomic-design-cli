"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupTailwind = setupTailwind;
exports.installTailwind = installTailwind;
exports.installSass = installSass;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const child_process_1 = require("child_process");
function setupTailwind(basePath) {
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
        const tailwindConfigPath = path_1.default.join(basePath, "tailwind.config.js");
        const postcssConfigPath = path_1.default.join(basePath, "postcss.config.js");
        fs_extra_1.default.writeFileSync(tailwindConfigPath, tailwindConfigContent, "utf-8");
        fs_extra_1.default.writeFileSync(postcssConfigPath, postcssConfigContent, "utf-8");
        console.log(chalk_1.default.green("Tailwind CSS configuration files created!"));
    }
    catch (error) {
        console.error(chalk_1.default.red("Error setting up Tailwind CSS configuration:"), error);
    }
}
function installTailwind() {
    try {
        console.log(chalk_1.default.yellow("Installing Tailwind CSS and dependencies..."));
        (0, child_process_1.execSync)("npm install tailwindcss postcss autoprefixer", {
            stdio: "inherit",
        });
        console.log(chalk_1.default.green("Tailwind CSS dependencies installed successfully!"));
    }
    catch (error) {
        console.error(chalk_1.default.red("Error installing Tailwind CSS dependencies:"), error);
    }
}
function installSass() {
    try {
        console.log(chalk_1.default.yellow("Installing scss dependencies..."));
        (0, child_process_1.execSync)("npm install sass", {
            stdio: "inherit",
        });
        console.log(chalk_1.default.green("Sass dependencies installed successfully!"));
    }
    catch (error) {
        console.error(chalk_1.default.red("Error installing Sass dependencies:"), error);
    }
}
