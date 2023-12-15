package chat;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    // Înregistrarea endpoint-ului WebSocket și definirea originilor permise pentru conexiuni
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws").setAllowedOrigins("http://localhost:3000").withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // Activarea unui broker de mesaje simplu pentru transmiterea mesajelor către anumite destinații (topic-uri)
        registry.enableSimpleBroker("/topic");
        // Setarea prefixelor destinațiilor la care sunt direcționate mesajele din aplicație
        registry.setApplicationDestinationPrefixes("/app");
    }
}
