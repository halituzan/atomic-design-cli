"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initProject = initProject;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const components_1 = require("./components");
const components = {
    atoms: components_1.atoms,
    molecules: components_1.molecules,
    organisms: components_1.organisms,
    pages: components_1.pages,
    templates: components_1.templates,
};
const structure = [
    "atoms",
    "molecules",
    "organisms",
    "pages",
    "templates",
];
function initProject(framework, css, basePath) {
    try {
        fs_extra_1.default.ensureDirSync(basePath);
        console.log(chalk_1.default.green(`Created base folder: ${basePath}`));
        // Her klasör için döngü
        // tailwindcss yapılandırması
        if (css === "tailwindcss") {
            tailwindcss(framework, css, basePath);
        }
        // scss yapılandırması
        if (css === "scss") {
            scss(framework, css, basePath);
        }
        console.log(chalk_1.default.green("Atomic Design System structure created successfully with default components!"));
    }
    catch (error) {
        console.error(chalk_1.default.red("Error creating project structure:"), error);
    }
}
function tailwindcss(framework, css, basePath) {
    structure.forEach((folder) => {
        const folderPath = path_1.default.join(basePath, folder); // Özel basePath kullan
        fs_extra_1.default.ensureDirSync(folderPath); // Klasör oluşturuluyor
        // Eğer bu klasör için bileşenler varsa, şablonları ekle
        try {
            if (components[folder]) {
                components[folder].forEach((component) => {
                    const componentPath = path_1.default.join(folderPath, `${component}.${folder}.tsx`);
                    // Dosya yolunu oluştur
                    fs_extra_1.default.ensureDirSync(path_1.default.dirname(componentPath)); // Alt klasörü oluştur
                    const templateFile = path_1.default.join(__dirname, `../templates/${framework}/${css}/${folder}/${component}.template`);
                    const targetFile = path_1.default.join(componentPath);
                    // Dosya var mı kontrol et
                    if (fs_extra_1.default.existsSync(templateFile)) {
                        fs_extra_1.default.copyFileSync(templateFile, targetFile);
                        console.log(chalk_1.default.yellow(`Added ${component}.${folder}.tsx component for ${folder}`));
                    }
                    else {
                        console.log(chalk_1.default.red(`Template file does not exist: ${templateFile}`));
                    }
                });
            }
            console.log(chalk_1.default.green("Atomic Design System structure created successfully with default components!"));
        }
        catch (error) {
            console.error(chalk_1.default.red("Error creating project structure:"), error);
        }
    });
}
function scss(framework, css, basePath) {
    structure.forEach((folder) => {
        const folderPath = path_1.default.join(basePath, folder); // Özel basePath kullan
        fs_extra_1.default.ensureDirSync(folderPath); // Klasör oluşturuluyor
        // Eğer bu klasör için bileşenler varsa, şablonları ekle
        try {
            if (components[folder]) {
                components[folder].forEach((component) => {
                    const componentPath = path_1.default.join(folderPath, `${component}/index.tsx`);
                    const stylePath = path_1.default.join(folderPath, `${component}/${component.toLowerCase()}.scss`);
                    // Dosya yolunu oluştur
                    fs_extra_1.default.ensureDirSync(path_1.default.dirname(componentPath)); // Alt klasörü oluştur
                    const templateFile = path_1.default.join(__dirname, `../templates/${framework}/${css}/${folder}/${component}/${component.toLowerCase()}.template`);
                    const styleFile = path_1.default.join(__dirname, `../templates/${framework}/${css}/${folder}/${component}/style.template`);
                    const targetFile = path_1.default.join(componentPath);
                    const targetScss = path_1.default.join(stylePath);
                    // Dosya var mı kontrol et
                    if (fs_extra_1.default.existsSync(templateFile)) {
                        fs_extra_1.default.copyFileSync(templateFile, targetFile);
                        fs_extra_1.default.copyFileSync(styleFile, targetScss);
                        console.log(chalk_1.default.yellow(`Added ${component}.tsx component for ${folder}`));
                    }
                    else {
                        console.log(chalk_1.default.red(`Template file does not exist: ${templateFile}`));
                    }
                });
            }
            console.log(chalk_1.default.green("Atomic Design System structure created successfully with default components!"));
        }
        catch (error) {
            console.error(chalk_1.default.red("Error creating project structure:"), error);
        }
    });
    const stylesFolderPath = path_1.default.join(basePath, "styles");
    fs_extra_1.default.ensureDirSync(stylesFolderPath);
    const abstractsFolderPath = path_1.default.join(basePath + "/styles/", "abstracts");
    fs_extra_1.default.ensureDirSync(abstractsFolderPath);
    console.log("stylesFolderPath", stylesFolderPath);
    console.log("abstractsFolderPath", abstractsFolderPath);
    const mainStyles = path_1.default.join(__dirname, `../templates/${framework}/${css}/styles/main.template`);
    const mixinsStyles = path_1.default.join(__dirname, `../templates/${framework}/${css}/styles/abstracts/mixins.template`);
    const variablesStyles = path_1.default.join(__dirname, `../templates/${framework}/${css}/styles/abstracts/variables.template`);
    fs_extra_1.default.copyFileSync(mainStyles, path_1.default.join(stylesFolderPath, `main.scss`));
    fs_extra_1.default.copyFileSync(mixinsStyles, path_1.default.join(abstractsFolderPath, `mixins.scss`));
    fs_extra_1.default.copyFileSync(variablesStyles, path_1.default.join(abstractsFolderPath, `variables.scss`));
}
