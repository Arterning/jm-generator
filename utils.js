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

module.exports = {
  generatePomXml,
  generateAppJava,
  generateTestJava,
};
