#!/usr/bin/env node

const { program } = require('commander');
const { createNormalProject } = require('./create-normal-project');

program
  .command('new <projectName>')
  .description('Create a new Java Maven project')
  .action(createNormalProject);

program.parse(process.argv);

