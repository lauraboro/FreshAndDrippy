package org.school.freshanddrippy;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.datasource.init.ScriptUtils;

import javax.sql.DataSource;
@SpringBootApplication
public class FreshAndDrippyApplication {

    public static void main(String[] args) {
        SpringApplication.run(FreshAndDrippyApplication.class, args);
    }

    @Bean
    public CommandLineRunner runScript(DataSource dataSource) {
        return args -> {
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            Resource resource = new ClassPathResource("queries/initialize_data.sql");
            ScriptUtils.executeSqlScript(dataSource.getConnection(), resource);
        };
    }

}