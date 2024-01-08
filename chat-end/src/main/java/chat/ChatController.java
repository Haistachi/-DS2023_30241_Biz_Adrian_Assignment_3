package chat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
@CrossOrigin(origins = "*")
@Controller
public class ChatController {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @MessageMapping("/chat")
    public void sendMessage(Message message) {
        System.out.println(message);
        // Metoda care primește un mesaj și îl trimite către un anumit topic pentru broadcast către clienți
        messagingTemplate.convertAndSend("/topic/messages", message);
    }
}
