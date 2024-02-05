#!/usr/bin/env node

const { program } = require('commander');
let inquirer = null;

async function loadInquirer() {
  const { default: inquirerModule } = await import('inquirer');
  inquirer = inquirerModule;
}
const fs = require('fs');
const path = require('path');

program
  .command('new <projectName>')
  .description('Create a new Java Maven project')
  .action(async (projectName) => {
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
        default: '11',
      }
    ]);

    console.log(`Creating new Java Maven project: ${projectName}`);
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

    // Create README.md and write description
    const readmeContent = `# Java Maven Project Generator\n\nThis command line tool helps you create a new Java Maven project with a specified Group ID and Artifact ID. It generates the necessary project structure, including the \`pom.xml\` file and a sample \`Test.java\` file with a 'Hello, World!' program.`;
    fs.writeFileSync(path.join(projectPath, 'README.md'), readmeContent);

    console.log('Java Maven project created successfully.');
  });

program.parse(process.argv);

function generatePomXml(groupId, artifactId, jdkVersion) {
  return `<!-- Add your Maven configuration here -->
  <project>

    <dependencies>
    </dependencies>

    <modelVersion>4.0.0</modelVersion>
    <groupId>${groupId}</groupId>
    <artifactId>${artifactId}</artifactId>
    <version>1.0.0</version>

    <!-- 指定编译器版本和字符编码 -->
    <properties>
      <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
      <maven.compiler.encoding>UTF-8</maven.compiler.encoding>
      <java.version>${jdkVersion}</java.version>
      <maven.compiler.source>${jdkVersion}</maven.compiler.source>
      <maven.compiler.target>${jdkVersion}</maven.compiler.target>
    </properties>

  </project>`;
}


function generateAppJava(groupId) {
  return `package ${groupId};

  public class App {
    public static void main(String[] args) {
      String ss = "Arter";
      System.out.println("Hello, World!" + ss);
    }
  }`;
}


function generateTestJava(groupId) {
  return `package ${groupId};

  public class Test {
    public static void main(String[] args) {
      System.out.println("Hello, World!");
    }
  }`;
}