#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const init_1 = require("./commands/init");
const setup_1 = require("./commands/setup");
const program = new commander_1.Command();
program
    .name("atomic-design")
    .description("CLI for Atomic Design System")
    .version("1.0.0");
program
    .command("init")
    .option("-f,--framework <framework>", "Specify the framework (react, vue, etc.)")
    .option("-c,--css <css>", "Specify the CSS framework (tailwindcss, scss, etc.)")
    .option("-b,--basePath <basePath>", "Specify the base directory (default: src/components)")
    .action((options) => {
    const framework = options.framework || "react";
    const css = options.css || "scss";
    const basePath = options.basePath || "src/components";
    (0, init_1.initProject)(framework, css, basePath);
    if (css === "tailwindcss") {
        (0, setup_1.installTailwind)();
        (0, setup_1.setupTailwind)(process.cwd());
    }
    if (css === "scss") {
        (0, setup_1.installSass)();
    }
});
program.parse(process.argv);
