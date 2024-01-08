package measurements.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.socket.WebSocketMessage;

    @Controller
    public class WebSocketController {

        @Autowired
        SimpMessagingTemplate template;

        @PostMapping("/send")
        public ResponseEntity<Void> sendMessage(@RequestBody String textMessageDTO) {
            template.convertAndSend("/topic/message", textMessageDTO);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }