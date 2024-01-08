import React, {useEffect, useState} from 'react';
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import {co} from "chart.js/dist/chunks/helpers.core";

var stompClient=null;
const Notificare = () => {
    const [privateNot, setPrivateNot]= useState(new Map());
    const [tab,setTab] =useState("CHATROOM");
    const [userData, setUserData] = useState(
        {
            userName:"",
            recipientName:"",
            connected: false,
            message:""
        }
    )
    useEffect(() => {
        console.log(userData);
    }, [userData]);

    const connect =()=>{
        let Sock = new SockJS('http://localhost:8082/ws');
        stompClient = over(Sock);
        stompClient.connect({},onConnected, onError);
    }

    const onConnected = () =>{
        setUserData({...userData,"connected":true});
        stompClient.subscribe('/user/' + userData.userName +'/private', onMessageReceived);
        userJoin();
    }

    const userJoin=()=>{
        var chatMessage = {
            senderName: userData.username,
            status:"JOIN"
        };
        stompClient.send("/app/notification", {}, JSON.stringify(chatMessage));
    }

    const onMessage = (payload)=>{
        console.log(payload);
        var payloadData = JSON.parse(payload.body);
        if(privateNot.get(payloadData.senderName)){
            privateNot.get(payloadData.senderName).push(payloadData);
            setPrivateNot(new Map(privateNot));
        }else{
            let list =[];
            list.push(payloadData);
            privateNot.set(payloadData.senderName,list);
            setPrivateNot(new Map(privateNot));
        }
    }

    const handleUserName=(event)=>{
        const  {value}=event.target;
        setUserData({...userData,"userName": value})
    }
    const handleMessage =(event)=>{
        const {value}=event.target;
        setUserData({...userData,"message": value});
    }

    const sendNotification=()=>{
        if (stompClient) {
            var chatMessage = {
                senderName: userData.username,
                receiverName: tab,
                message: userData.message,
                status:"MESSAGE"
            };

            if(userData.username !== tab){
                privateNot.get(tab).push(chatMessage);
                setPrivateNot(new Map(privateNot));
            }
            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
            setUserData({...userData,"message": ""});
        }
    }

    const handleUsername=(event)=>{
        const {value}=event.target;
        setUserData({...userData,"username": value});
    }
    const registerUser=()=>{
        connect();
    }
    const onError = (err) =>{
        console.log(err);
    }

    return (
        <div className="container">
            {userData.connected?
                <div className="chat-box">
                    <div className="member-list">
                        <ul>
                            <li onClick={()=>{setTab("CHATROOM")}} className={`member ${tab==="CHATROOM" && "active"}`}>Chatroom</li>
                            {[...privateNot.keys()].map((name,index)=>(
                                <li onClick={()=>{setTab(name)}} className={`member ${tab===name && "active"}`} key={index}>{name}</li>
                            ))}
                        </ul>
                    </div>
                    {tab==="CHATROOM" && <div className="chat-content">
                        <ul className="chat-messages">
                            {privateNot.map((chat,index)=>(
                                <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                                    {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                                    <div className="message-data">{chat.message}</div>
                                    {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                                </li>
                            ))}
                        </ul>
                    </div>}
                    {tab!=="CHATROOM" && <div className="chat-content">
                        <ul className="chat-messages">
                            {[...privateNot.get(tab)].map((chat,index)=>(
                                <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                                    {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                                    <div className="message-data">{chat.message}</div>
                                    {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                                </li>
                            ))}
                        </ul>

                        <div className="send-message">
                            <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} />
                            <button type="button" className="send-button" onClick={sendNotification}>send</button>
                        </div>
                    </div>}
                </div>
                :
                <div className="register">
                    <input
                        id="user-name"
                        placeholder="Enter your name"
                        name="userName"
                        value={userData.username}
                        onChange={handleUsername}
                        margin="normal"
                    />
                    <button type="button" onClick={registerUser}>
                        connect
                    </button>
                </div>}
        </div>
    )
}
export default Notificare;