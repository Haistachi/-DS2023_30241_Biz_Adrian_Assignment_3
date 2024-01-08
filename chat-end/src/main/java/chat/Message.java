package chat;

import java.time.LocalDateTime;

public class Message {
    private String sender;
    private String receiver;
    private String content;

    private LocalDateTime time;
    private String rol;

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getTime() {return time;}

    public void setTime(LocalDateTime time) {this.time = time;}

    public String getRol() {return rol;}

    public void setRol(String rol) {this.rol = rol;}

    public Message() {

    }

    public Message(String sender, String receiver, String content, String time, String rol) {
        this.sender = sender;
        this.receiver = receiver;
        this.content = content;
        this.time = LocalDateTime.parse(time);
        this.rol = rol;
    }

    public Message(String sender, String receiver, String content) {
        this.sender = sender;
        this.receiver = receiver;
        this.content = content;
    }

    @Override
    public String toString() {
        return "Message{" +
                "sender='" + sender + '\'' +
                ", receiver='" + receiver + '\'' +
                ", content='" + content + '\'' +
                ", time=" + time +
                ", rol='" + rol + '\'' +
                '}';
    }
}
