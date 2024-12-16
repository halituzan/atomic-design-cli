import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { atoms, molecules, organisms, pages, templates } from "./components";
const components: Record<string, string[]> = {
  atoms: atoms,
  molecules: molecules,
  organisms: organisms,
  pages: pages,
  templates: templates,
};

const structure: string[] = [
  "atoms",
  "molecules",
  "organisms",
  "pages",
  "templates",
];

export function initProject(framework: string, css: string, basePath: string) {
  try {
    fs.ensureDirSync(basePath);
    console.log(chalk.green(`Created base folder: ${basePath}`));

    // Her klasör için döngü
    // tailwindcss yapılandırması
    if (css === "tailwindcss") {
      tailwindcss(framework, css, basePath);
    }
    // scss yapılandırması
    if (css === "scss") {
      scss(framework, css, basePath);
    }

    console.log(
      chalk.green(
        "Atomic Design System structure created successfully with default components!"
      )
    );
  } catch (error) {
    console.error(chalk.red("Error creating project structure:"), error);
  }
}

function tailwindcss(framework: string, css: string, basePath: string) {
  structure.forEach((folder) => {
    const folderPath = path.join(basePath, folder); // Özel basePath kullan
    fs.ensureDirSync(folderPath); // Klasör oluşturuluyor

    // Eğer bu klasör için bileşenler varsa, şablonları ekle
    try {
      if (components[folder]) {
        components[folder].forEach((component) => {
          const componentPath = path.join(
            folderPath,
            `${component}.${folder}.tsx`
          );

          // Dosya yolunu oluştur
          fs.ensureDirSync(path.dirname(componentPath)); // Alt klasörü oluştur

          const templateFile = path.join(
            __dirname,
            `../templates/${framework}/${css}/${folder}/${component}.template`
          );
          const targetFile = path.join(componentPath);

          // Dosya var mı kontrol et
          if (fs.existsSync(templateFile)) {
            fs.copyFileSync(templateFile, targetFile);
            console.log(
              chalk.yellow(
                `Added ${component}.${folder}.tsx component for ${folder}`
              )
            );
          } else {
            console.log(
              chalk.red(`Template file does not exist: ${templateFile}`)
            );
          }
        });
      }

      console.log(
        chalk.green(
          "Atomic Design System structure created successfully with default components!"
        )
      );
    } catch (error) {
      console.error(chalk.red("Error creating project structure:"), error);
    }
  });
}
function scss(framework: string, css: string, basePath: string) {
  structure.forEach((folder) => {
    const folderPath = path.join(basePath, folder); // Özel basePath kullan
    fs.ensureDirSync(folderPath); // Klasör oluşturuluyor

    // Eğer bu klasör için bileşenler varsa, şablonları ekle
    try {
      if (components[folder]) {
        components[folder].forEach((component) => {
          const componentPath = path.join(
            folderPath,
            `${component}/index.tsx`
          );
          const stylePath = path.join(
            folderPath,
            `${component}/${component.toLowerCase()}.scss`
          );

          // Dosya yolunu oluştur
          fs.ensureDirSync(path.dirname(componentPath)); // Alt klasörü oluştur

          const templateFile = path.join(
            __dirname,
            `../templates/${framework}/${css}/${folder}/${component}/${component.toLowerCase()}.template`
          );
          const styleFile = path.join(
            __dirname,
            `../templates/${framework}/${css}/${folder}/${component}/style.template`
          );

          const targetFile = path.join(componentPath);
          const targetScss = path.join(stylePath);

          // Dosya var mı kontrol et
          if (fs.existsSync(templateFile)) {
            fs.copyFileSync(templateFile, targetFile);
            fs.copyFileSync(styleFile, targetScss);
            console.log(
              chalk.yellow(
                `Added ${component}.tsx component for ${folder}`
              )
            );
          } else {
            console.log(
              chalk.red(`Template file does not exist: ${templateFile}`)
            );
          }
        });
      }

      console.log(
        chalk.green(
          "Atomic Design System structure created successfully with default components!"
        )
      );
    } catch (error) {
      console.error(chalk.red("Error creating project structure:"), error);
    }
  });
  const stylesFolderPath = path.join(basePath, "styles");
  fs.ensureDirSync(stylesFolderPath);
  const abstractsFolderPath = path.join(basePath + "/styles/", "abstracts");
  fs.ensureDirSync(abstractsFolderPath);

  console.log("stylesFolderPath", stylesFolderPath);
  console.log("abstractsFolderPath", abstractsFolderPath);

  const mainStyles = path.join(
    __dirname,
    `../templates/${framework}/${css}/styles/main.template`
  );
  const mixinsStyles = path.join(
    __dirname,
    `../templates/${framework}/${css}/styles/abstracts/mixins.template`
  );
  const variablesStyles = path.join(
    __dirname,
    `../templates/${framework}/${css}/styles/abstracts/variables.template`
  );
  fs.copyFileSync(mainStyles, path.join(stylesFolderPath, `main.scss`));
  fs.copyFileSync(mixinsStyles, path.join(abstractsFolderPath, `mixins.scss`));
  fs.copyFileSync(
    variablesStyles,
    path.join(abstractsFolderPath, `variables.scss`)
  );
}
