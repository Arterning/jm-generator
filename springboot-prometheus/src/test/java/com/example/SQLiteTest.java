package com.example;

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
            CREATE TABLE `user` (
                id INTEGER PRIMARY KEY NOT NULL,
                name TEXT,
                create_at TEXT
            );
        """;
        
        this.jdbcTemplate.execute(ddl);

        // 2、插入一条数据
        int ret = this.jdbcTemplate.update("INSERT INTO `user` (`id`, `name`, `create_at`) VALUES (?, ?, ?);", new Object[] {1, "springdoc", LocalDateTime.now()});
        
        log.info("插入数据：{}", ret);
        
        // 3、检索一条数据
        Map<String, Object> user = this.jdbcTemplate.queryForObject("SELECT * FROM `user` WHERE `id` = ?", new ColumnMapRowMapper(), 1L);
        
        log.info("检索数据：{}", user);
    }
}
  