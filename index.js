#!/usr/bin/env node

const { program } = require('commander');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

program
  .command('new <projectName>')
  .description('Create a new Java Maven project')
  .action(async (projectName) => {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'groupId',
        message: 'Enter the Group ID:',
      },
      {
        type: 'input',
        name: 'artifactId',
        message: 'Enter the Artifact ID:',
      },
    ]);

    console.log(`Creating new Java Maven project: ${projectName}`);
    const projectPath = path.join(process.cwd(), projectName);
    fs.mkdirSync(projectPath, { recursive: true });
    process.chdir(projectPath);

    // Generate pom.xml
    const pomXmlContent = generatePomXml(answers.groupId, answers.artifactId);
    fs.writeFileSync(path.join(projectPath, 'pom.xml'), pomXmlContent);

    // Create src/main/java directory
    fs.mkdirSync(path.join(projectPath, 'src', 'main', 'java'), { recursive: true });

    console.log('Java Maven project created successfully.');
  });

program.parse(process.argv);

function generatePomXml(groupId, artifactId) {
  return `<!-- Add your Maven configuration here -->
  <project>
    <modelVersion>4.0.0</modelVersion>
    <groupId>${groupId}</groupId>
    <artifactId>${artifactId}</artifactId>
    <version>1.0.0</version>
  </project>`;
}