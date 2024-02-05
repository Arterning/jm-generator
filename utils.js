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

function generateSpringbootPomXml(groupId, artifactId, jdkVersion) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
      <modelVersion>4.0.0</modelVersion>

      <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.1.8</version>
        <relativePath/>
      <!--  lookup parent from repository  -->
      </parent>

      <groupId>${groupId}</groupId>
      <artifactId>${artifactId}</artifactId>
      <name>${artifactId}</name>
      <description>Demo project for Spring Boot</description>
      <version>1.0.0</version>
      <packaging>jar</packaging>

      <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <maven.compiler.encoding>UTF-8</maven.compiler.encoding>
        <java.version>${jdkVersion}</java.version>
        <maven.compiler.source>${jdkVersion}</maven.compiler.source>
        <maven.compiler.target>${jdkVersion}</maven.compiler.target>
      </properties>

      <dependencies>
        <dependency>
          <groupId>org.springframework.boot</groupId>
          <artifactId>spring-boot-starter-data-jdbc</artifactId>
        </dependency>
        <dependency>
          <groupId>org.springframework.boot</groupId>
          <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>

        <dependency>
          <groupId>org.springframework.boot</groupId>
          <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
          <groupId>com.mysql</groupId>
          <artifactId>mysql-connector-j</artifactId>
          <scope>runtime</scope>
        </dependency>
        <dependency>
          <groupId>org.postgresql</groupId>
          <artifactId>postgresql</artifactId>
          <scope>runtime</scope>
        </dependency>
        <dependency>
          <groupId>org.projectlombok</groupId>
          <artifactId>lombok</artifactId>
          <optional>true</optional>
        </dependency>

        <dependency>
          <groupId>org.springframework.boot</groupId>
          <artifactId>spring-boot-starter-test</artifactId>
          <scope>test</scope>
        </dependency>
      </dependencies>


      <build>
        <plugins>
          <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
          </plugin>
        </plugins>
      </build>
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

function generateSpringbootAppJava(groupId) {
  return `package ${groupId};
  
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
  
@SpringBootApplication
public class App {
  public static void main(String[] args) {
    SpringApplication.run(App.class, args);
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

function generateSpringbootTestJava(groupId) {
  return `package ${groupId};
  
    import org.junit.jupiter.api.Test;
    import org.springframework.boot.test.context.SpringBootTest;
  
    @SpringBootTest
    class ContextTest {
      @Test
      void contextLoads() {
        System.out.println("Hello, World!");
      }
    }`;
}

module.exports = {
  generatePomXml,
  generateAppJava,
  generateTestJava,
  generateSpringbootPomXml,
  generateSpringbootAppJava,
  generateSpringbootTestJava
};
