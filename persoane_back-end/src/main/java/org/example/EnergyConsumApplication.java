package org.example;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.sql.*;

@SpringBootApplication
public class EnergyConsumApplication {

	public static String EXCHANGE_NAME ="Senzor";
	public static String QUEUE_GENERIC_NAME ="SenzorQueue";
	public final static String QUEUE_SPECIFIC_NAME ="SenzorQueue1";
	public static String ROUTING_KEY ="ROUTING_KEY";
	@Bean
	public TopicExchange appExchange() {
		return new TopicExchange(EXCHANGE_NAME);
	}

	@Bean
	public Jackson2JsonMessageConverter producerJackson2MessageConverter() {
		return new Jackson2JsonMessageConverter();
	}

	@Bean
	PasswordEncoder passwordEncoder()
	{return new BCryptPasswordEncoder();}

	public static void main(String[] args) {
		SpringApplication.run(EnergyConsumApplication.class, args);
	}

}
