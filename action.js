let inquirer = null;

async function loadInquirer() {
  const { default: inquirerModule } = await import('inquirer');
  inquirer = inquirerModule;
}
const fs = require('fs');
const path = require('path');
const { generatePomXml,
        generateAppJava,
        generateTestJava,
        generateSpringbootPomXml,
        generateSpringbootAppJava,
        generateSpringbootController,
        generateSpringbootTestJava,
        generateSqliteTest,
        generateApplicationProperties
   } = require('./utils');

const execSync = require('child_process').execSync;

const createProject = async (projectName, options) => {
    await loadInquirer();
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'groupId',
        message: 'Enter the Group ID:',
        default: 'com.example',
      },
      {
        type: 'input',
        name: 'artifactId',
        message: 'Enter the Artifact ID:',
        default: projectName,
      },
      {
        type: 'input',
        name: 'jdkVersion',
        message: 'Enter the JDK version:',
        default: '17',
      }
    ]);

    console.log(`Creating new Java Maven project: ${projectName}`);
    
    // Check if the project already exists
    if (fs.existsSync(projectName)) {
      // Prompt the user if they want to overwrite the project
      const { overwrite } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'overwrite',
          message: `Project ${projectName} already exists. Do you want to overwrite it?`,
        }
      ])
    
      // If the user does not want to overwrite the project, exit
      if (!overwrite) {
        console.log(`Project ${projectName} not created.`);
        return;
      }

      // If the user wants to overwrite the project, delete the project
      fs.rmSync(projectName, { recursive: true, force: true });
    }

    console.log(options);
    if (options.template == null || options.template == 'normal') {
      createNormalProject(projectName, answers);
    } else if (options.template == 'springboot') {
      console.log(`Creating new Spring Boot project: ${projectName}`);
      createSpringbootProject(projectName, answers);
    } else {
      console.log(`Invalid template: ${options.template}`);
      return;
    }
    
  }


module.exports = {
  createProject
}

function createSpringbootProject(projectName, answers) {
  const projectPath = path.join(process.cwd(), projectName);
  fs.mkdirSync(projectPath, { recursive: true });
  process.chdir(projectPath);

  // Generate pom.xml
  const pomXmlContent = generateSpringbootPomXml(answers.groupId, answers.artifactId, answers.jdkVersion);
  fs.writeFileSync(path.join(projectPath, 'pom.xml'), pomXmlContent);

  // Create src/main/java directory
  const javaPackagePath = path.join(projectPath, 'src', 'main', 'java', ...answers.groupId.split('.'));
  fs.mkdirSync(javaPackagePath, { recursive: true });

  // Write App.java file
  const appJavaContent = generateSpringbootAppJava(answers.groupId);
  fs.writeFileSync(path.join(javaPackagePath, 'App.java'), appJavaContent);

  // Write Controller.java file
  const controllerJavaContent = generateSpringbootController(answers.groupId);
  fs.writeFileSync(path.join(javaPackagePath, 'UserController.java'), controllerJavaContent);


  // Create src/main/resources directory
  fs.mkdirSync(path.join(projectPath, 'src', 'main', 'resources'), { recursive: true });

  // Write application.properties file
  const applicationPropertiesContent = generateApplicationProperties(answers.groupId);
  fs.writeFileSync(path.join(projectPath, 'src', 'main', 'resources', 'application.properties'), applicationPropertiesContent);

  // Create src/test/java directory
  const testJavaPackagePath = path.join(projectPath, 'src', 'test', 'java', ...answers.groupId.split('.'));
  fs.mkdirSync(testJavaPackagePath, { recursive: true });

  // Write Test.java file
  const testJavaContent = generateSpringbootTestJava(answers.groupId);
  fs.writeFileSync(path.join(testJavaPackagePath, 'ContextTest.java'), testJavaContent);

  // Write SQLiteTest.java file
  const sqliteTestJavaContent = generateSqliteTest(answers.groupId);
  fs.writeFileSync(path.join(testJavaPackagePath, 'SQLiteTest.java'), sqliteTestJavaContent);
  createProjectConfigFile(projectPath);
}


function createProjectConfigFile(projectPath) {
  // Create README.md and write description
  const readmeContent = `# Java Maven Project Generator\n\nThis command line tool helps you create a new Java Maven project with a specified Group ID and Artifact ID. It generates the necessary project structure, including the \`pom.xml\` file and a sample \`Test.java\` file with a 'Hello, World!' program.`;
  fs.writeFileSync(path.join(projectPath, 'README.md'), readmeContent);

  // Create .gitignore file
  const gitignoreContent = `# Generated by Java Maven Project Generator
.idea/
.mvn/
target/
.mvn/wrapper/
*.db
    `;
  fs.writeFileSync(path.join(projectPath, '.gitignore'), gitignoreContent);

  // Create .editorconfig file
  const editorconfigContent = `# Generated by Java Maven Project Generator
[*]
indent_style = space
indent_size = 2
charset = utf-8
end_of_line = lf
    `;
  fs.writeFileSync(path.join(projectPath, '.editorconfig'), editorconfigContent);

  // Run git init and commit changes
  execSync('git init', { cwd: projectPath });
  execSync('git add .', { cwd: projectPath });
  execSync('git commit -m "Initial commit"', { cwd: projectPath });
  
  console.log('Java Maven project created successfully.');
}

function createNormalProject(projectName, answers) {
  const projectPath = path.join(process.cwd(), projectName);
  fs.mkdirSync(projectPath, { recursive: true });
  process.chdir(projectPath);

  // Generate pom.xml
  const pomXmlContent = generatePomXml(answers.groupId, answers.artifactId, answers.jdkVersion);
  fs.writeFileSync(path.join(projectPath, 'pom.xml'), pomXmlContent);

  // Create src/main/java directory
  const javaPackagePath = path.join(projectPath, 'src', 'main', 'java', ...answers.groupId.split('.'));
  fs.mkdirSync(javaPackagePath, { recursive: true });

  // Write App.java file
  const appJavaContent = generateAppJava(answers.groupId);
  fs.writeFileSync(path.join(javaPackagePath, 'App.java'), appJavaContent);

  // Create src/test/java directory
  const testJavaPackagePath = path.join(projectPath, 'src', 'test', 'java', ...answers.groupId.split('.'));
  fs.mkdirSync(testJavaPackagePath, { recursive: true });

  // Write Test.java file
  const testJavaContent = generateTestJava(answers.groupId);
  fs.writeFileSync(path.join(testJavaPackagePath, 'Test.java'), testJavaContent);


  createProjectConfigFile(projectPath);
}
