#!/usr/bin/env node

import { Command } from "commander";
import { initProject } from "./commands/init";
import { installSass, installTailwind, setupTailwind } from "./commands/setup";

const program = new Command();

program
  .name("atomic-design")
  .description("CLI for Atomic Design System")
  .version("1.0.0");

program
  .command("init")
  .option(
    "-f,--framework <framework>",
    "Specify the framework (react, vue, etc.)"
  )
  .option(
    "-c,--css <css>",
    "Specify the CSS framework (tailwindcss, scss, etc.)"
  )
  .option(
    "-b,--basePath <basePath>",
    "Specify the base directory (default: src/components)"
  )
  .action((options) => {
    const framework = options.framework || "react";
    const css = options.css || "scss";
    const basePath = options.basePath || "src/components";
    initProject(framework, css, basePath);
    if (css === "tailwindcss") {
      installTailwind();
      setupTailwind(process.cwd());
    }
    if (css === "scss") {
      installSass();
    }
  });

program.parse(process.argv);
