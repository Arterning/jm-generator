#!/usr/bin/env node

const { program } = require("commander");
const { createProject } = require("./action");

program.option("-t, --template <template>", "Project template", "normal").parse();

program
  .command("new <projectName>")
  .description("Create a new Java Maven project")
  .action(async (projectName) => {
    createProject(projectName, program.opts())
  });

program.parse(process.argv);
