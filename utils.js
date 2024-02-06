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
          <artifactId>spring-boot-starter-jdbc</artifactId>
        </dependency>
        <dependency>
            <groupId>org.xerial</groupId>
            <artifactId>sqlite-jdbc</artifactId>
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

function generateSqliteTest(groupId) {
  return `package ${groupId};

import java.time.LocalDateTime;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.jdbc.core.ColumnMapRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
  
  
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class SQLiteTest {

    static final Logger log = LoggerFactory.getLogger(SqliteTest.class);

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Test
    public void test_crud_user() throws Exception {
        // 1、首先创建数据表
        String ddl = """
            CREATE TABLE \`user\` (
                id INTEGER PRIMARY KEY NOT NULL,
                name TEXT,
                create_at TEXT
            );
        """;
        
        this.jdbcTemplate.execute(ddl);

        // 2、插入一条数据
        int ret = this.jdbcTemplate.update("INSERT INTO \`user\` (\`id\`, \`name\`, \`create_at\`) VALUES (?, ?, ?);", new Object[] {1, "springdoc", LocalDateTime.now()});
        
        log.info("插入数据：{}", ret);
        
        // 3、检索一条数据
        Map<String, Object> user = this.jdbcTemplate.queryForObject("SELECT * FROM \`user\` WHERE \`id\` = ?", new ColumnMapRowMapper(), 1L);
        
        log.info("检索数据：{}", user);
    }
}
  `
}

function generateApplicationProperties() {
  return `server.port=8080
  spring.datasource.driver-class-name=org.sqlite.JDBC
  spring.datasource.url=jdbc:sqlite:./app.db
  spring.datasource.type=com.zaxxer.hikari.HikariDataSource`;
}


function generateSpringbootController(groupId) {
  return `package ${groupId};

  import lombok.Data;
  import org.springframework.jdbc.core.JdbcTemplate;
  import org.springframework.web.bind.annotation.*;
  
  import java.util.List;
  import java.util.Map;
  
  @RestController
  @RequestMapping("/users")
  public class UserController {
  
      private final JdbcTemplate jdbcTemplate;
  
      public UserController(JdbcTemplate jdbcTemplate) {
          this.jdbcTemplate = jdbcTemplate;
      }
  
      @GetMapping
      public List<Map<String, Object>> getAllUsers() {
          return jdbcTemplate.queryForList("SELECT * FROM user");
      }
  
      @GetMapping("/{id}")
      public Map<String, Object> getUserById(@PathVariable Long id) {
          return jdbcTemplate.queryForMap("SELECT * FROM user WHERE id = ?", id);
      }
  
      @PostMapping
      public void createUser(@RequestBody User user) {
          jdbcTemplate.update("INSERT INTO user (name, create_at) VALUES (?, ?)", user.getName(), user.getCreateAt());
      }
  
      @PutMapping("/{id}")
      public void updateUser(@PathVariable Long id, @RequestBody User user) {
          jdbcTemplate.update("UPDATE user SET name = ?, create_at = ? WHERE id = ?", user.getName(), user.getCreateAt(), id);
      }
  
      @DeleteMapping("/{id}")
      public void deleteUser(@PathVariable Long id) {
          jdbcTemplate.update("DELETE FROM user WHERE id = ?", id);
      }
  }
  
  @Data
  class User {
  
    private Long id;
  
    private String name;
  
    private String createAt;
  
  }`
}

module.exports = {
  generatePomXml,
  generateAppJava,
  generateTestJava,
  generateSpringbootPomXml,
  generateSpringbootAppJava,
  generateSpringbootController,
  generateSpringbootTestJava,
  generateSqliteTest,
  generateApplicationProperties
};
