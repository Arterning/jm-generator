package com.example;

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
  
  }