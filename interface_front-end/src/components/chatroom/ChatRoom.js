import React, { useState, useEffect, useRef } from 'react';
import SockJsClient from 'react-stomp';
import '../../App.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
function ChatRoom()
{
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [username, setUsername] = useState('');
    const [topics, setTopics] = useState([]);
    const [contacte, setContacte] = useState([]);
    const rol = localStorage.getItem('rol');

    // ca sa putem trimite mesaje, trebe sa facem o referinta catre obiectul de client socket, pe care o initializam cu null la inceput
    //clientRef este un obiect de referință (Ref)
    //creat folosind useRef hook din React
    //Aceasta este o modalitate de a păstra o referință către un element sau un obiect în cadrul componentelor funcționale în React,
    //care poate fi utilizată pentru a accesa și manipula acest element sau obiect.
    const clientRef = useRef(null);

    function fSetTopic()
    {
        if(rol === "admin") {
            setTopics(['/topic/messages'])
        }
        else
        {
            setTopics(['/topic/messages'])
        }
        console.log("Connected!!")
    }

    useEffect(() => {
        // Utilizarea useEffect pentru a seta username-ul când componenta este randata
        setUsername(localStorage.getItem('user') + "-" + localStorage.getItem('rol'));
        if (rol === "admin") {
            let listContacte = JSON.parse(localStorage.getItem("ChatList"));
            console.log(listContacte);
            setContacte(listContacte);
        }

        // Funcția returnată va fi apelată când componenta este dezactivată, inchidem conexiunea
        return () => {
            if (clientRef.current && clientRef.current.deactivate) {
                clientRef.current.deactivate();
            }
        };
    }, []);

    // Funcție pentru a gestiona schimbarea valorii în input-ul de mesaj
    const handleMessageChange = (e) => {
        setMessageInput(e.target.value);
    };

    function Reconect()
    {
        if (clientRef.current && clientRef.current.deactivate) {
            clientRef.current.deactivate();
        }
        fSetTopic();
    }
    function Back()
    {
        localStorage.setItem('ChatList',[]);
        if (clientRef.current && clientRef.current.deactivate) {
            clientRef.current.deactivate();
        }
        if (rol === "ROLE_ADMIN")
            return (navigate("/admin"));
        else
            return(navigate("/user"));
    }
    // Funcție pentru a trimite mesajul
    const handleSendMessage = () => {
        //aici voi schimbati, va mai adaugati ce va mai trebuie, eu am lasat reciever random
        let date = new Date();
        if(rol === "admin") {
            for(let i=0; i< contacte.length ; i++ ) {
                const message = {
                    sender: username,
                    receiver: contacte.at(i).username,
                    content: messageInput,
                    time: date.toISOString().split(".")[0],
                    rol: localStorage.getItem('rol')
                };
                if (clientRef.current && clientRef.current.sendMessage) {
                    clientRef.current.sendMessage('/app/chat', JSON.stringify(message));
                }
            }
        }else
        {
            const message = {
                sender: username,
                receiver: 'admin',
                content: messageInput,
                time: date.toISOString().split(".")[0],
                rol: localStorage.getItem('rol')
            };
            if (clientRef.current && clientRef.current.sendMessage) {
                clientRef.current.sendMessage('/app/chat', JSON.stringify(message));
            }
        }
        //current este proprietatea din obiectul de referință care conține referința efectivă către elementul sau obiectul
        //pe care l-ați legat cu useRef.
        //Prin accesarea proprietății current, puteți interacționa cu obiectul sau elementul din afara ciclului de viață al componentei.
        //practic un mod de a accesa obiectul in sine, nu doar referinta
        setMessageInput('');
    };

    // cand primim mesaj, pe langa cele pe care le avem deja vrem sa le pastram
    //de asta punem cu .. inainte, asta inseamna ca la array-ul de mesaje deja existent, mai adaugam pe cel pe care l-am primit
    const onMessageReceived = (msg) => {
        console.log("message recived: ");
        console.log(msg);
        setMessages([...messages, msg]);
    };

    //setam topicul aici ca sa evitam sa ne dea eroare de connection cannot be established yet
    let onConnected = () => {
        fSetTopic();
    }

    return (
        <div className="chat-container">
            <div className="message-container">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${msg.sender === username ? 'sender-me' : 'sender-other'}`} //aici am vrut sa fiu smechera sa pun clase diferite pt mesajele mele vs cele primite
                    >
                        {msg.time + " " + msg.sender}: {msg.content}
                    </div>
                ))}
            </div>
            <Form>
                <Form.Control
                    type="text"
                    value={messageInput}
                    onChange={handleMessageChange}
                    placeholder="Type your message..."
                    style={{ marginTop:"5px"}}
                    className="bg-dark text-light"
                />
            </Form>
            <Button style={{marginTop:"5px"}} variant='dark' onClick={handleSendMessage}>Send</Button>
            <Button style={{marginTop:"5px"}} variant='dark' onClick={Reconect}>Reconect</Button>
            <Button style={{marginTop:"5px"}} variant='dark' onClick={Back}>Back</Button>
            <SockJsClient
                url="http://localhost:8084/ws"
                topics={topics}
                onConnect={onConnected}
                onMessage={onMessageReceived}
                ref={(client) => {
                    if (client) {
                        clientRef.current = client;
                    }
                    //aici dau referinta la acest client de socket
                }}
            />
        </div>
    );
};

export default ChatRoom;
