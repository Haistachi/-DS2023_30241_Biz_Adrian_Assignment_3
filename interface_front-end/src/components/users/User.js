import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";
import table from "../../commons/tables/table";
import Calendar from "./Calendar";
import {findDeviceActive, findDevicesByOwner, findPersonIdByName, getActives} from "./user-api";
import Active from "./Active";
import SockJsClient from 'react-stomp';
import Card from 'react-bootstrap/Card';

function User(props)
{
    let nr=0;
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [id, setId] = useState(0);
    const [devices, setDevices] = useState([]);
    const [pageDevice, setPageDevice]= useState(0);
    const [chartData, setChartData]= useState([]);
    const [calendarDate, setCalendarDate] = useState(new Date());
    const [idDevice, setIdDevice] = useState("");
    const [activeChart, setActiveChart] = useState(false);
    const onBackDevice=()=>{setPageDevice(pageDevice -1 >-1 ? pageDevice-1:pageDevice)}
    const onNextDevice=()=>{setPageDevice(pageDevice +1 < devices.length/10 ? pageDevice+1:pageDevice)}

    const [isMsg, setIsMsg] = useState(false);
    const [message, setMessage] = useState('');
    const [topics, setTopics] = useState([]);
    
    var tableDevice = document.getElementById("DeviceTable");
    if (tableDevice) {
        for (var i = 0; i < tableDevice.rows.length; i++) {
            tableDevice.rows[i].onclick = function() {
                deviceTableText(this);
            };
        }
    }
    function deviceTableText(tableRow) {
        var id = tableRow.childNodes[0].innerHTML;
        var owner = tableRow.childNodes[1].innerHTML;
        var address = tableRow.childNodes[2].innerHTML;
        var consumption = tableRow.childNodes[3].innerHTML;
        var obj = {'Id': id, 'Owner': owner, 'Address': address, 'Consumption': consumption};
        console.log(obj);
    }
    function importData()
    {
        return({
            labels: chartData.map((data) => data.hour),
                datasets: [
            {
                label: "Device Consume",
                data: chartData.map((data) => data.deviceConsume),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                ],
                borderColor: "black",
                borderWidth: 2
            }
        ]
        });
    }
    function statistic()
    {
        console.log(calendarDate.toISOString().split(".")[0]);
        findDeviceActive(idDevice, calendarDate,(res, stat, err)=>{if(err) console.log(err);
        else {console.log(res);
            console.log(res.map((measurement) => measurement.val));
            setChartData(res.map((measurement) => measurement.val));
        }});
        setActiveChart(true);
    }
    function showError(message) {console.log(message); return(navigate("/error"));}
    function delog() { localStorage.clear(); return(navigate("/"));}
    function chat() { return(navigate("/chatroom"));}
    useEffect(
        ()=>{
            //console.log(localStorage.getItem("rol"));
            if(localStorage.getItem("rol") !== "ROLE_USER")
                return(navigate("/error"));
            setName(localStorage.getItem("user"));
            findPersonIdByName(localStorage.getItem("user"),(response, stat, err)=>{if(err) console.log(err);
            else {console.log(`response for name: ${response}`);
                nr=response;
                setId(Number(response));
                console.log(`id from name: ${id}`);
                findDevicesByOwner(nr,(res, stat, err)=>{if(err) console.log(err);
                else {console.log(res);
                    setDevices(res);
                    console.log(Array.isArray(res));
                }});
            }});
        }, [])

    let onConnected = () => {
        console.log("Connected!!")
        setTopics(['/topic/measurements']);
    }

    let onDisconnect = () => {
        console.log("DISConnected!!")
    }

    let onMessageReceived = (msg) => {
        setMessage(msg)
        setIsMsg(true)
        //setTimeout
    }

    return(<div><h1>Bine ai venit user {props.name}</h1>
        <div>
            <div className="Button" >{<Calendar date={calendarDate} setDate={setCalendarDate}/>}
                <button onClick={statistic}>Statistic</button> </div>
            {activeChart && <Active chartData={chartData} date={calendarDate}/>}
            <label htmlFor={"idDevice"}>Device: </label>
            <input readOnly={idDevice} type={"idDevice"} placeholder={idDevice} id={"idDevice"} name={"idDevice"}
                   style={{width: "20%", boxShadow: "3px 6px 3px #ccc"}}></input>
            <h2>Your devices</h2>
            {devices && <div style={{width: "80%", boxShadow: "3px 6px 3px #ccc"}}>
                <table cellSpacing={"0"} style={{width: "100%", height: "auto", padding: "5px 10 px", textAlign:"center"}} id={"DeviceTable"}>
                <thead><tr>
                    <th>ID</th>
                    <th>Person</th>
                    <th>Description</th>
                    <th>Adress</th>
                    <th>Consumption</th>
                </tr></thead>
                <tbody>{devices.slice(10 * pageDevice, 10*pageDevice+10).map((device)=>{return(<tr key={device.id} onClick={()=>setIdDevice(device.id)}>
                    <td>{device.id}</td>
                    <td>{device.person}</td>
                    <td>{device.description}</td>
                    <td>{device.address}</td>
                    <td>{device.consumption}</td>
                </tr>)})}</tbody>
            </table>
                <div style={{padding: "10px 0"}}>
                        <button onClick={onBackDevice}>Back</button>
                        <label style={{padding: "0 lem"}}>{pageDevice+1}</label>
                        <button onClick={onNextDevice}>Next</button>
                </div></div>}
            <div className="Button"><button onClick={chat}>ChatRoom</button></div>
            <div className="Button"><button onClick={delog}>Delog</button></div>
        </div>
        
        <SockJsClient
            url={'http://localhost:8083/ws-message'}
            topics={topics}
            onConnect={onConnected}
            onDisconnect={onDisconnect}
            onMessage={msg => onMessageReceived(msg)}
            debug={false}
        />
        { isMsg && < Card bg='danger' style={{ width: '20rem',marginLeft:'40%',alignContent:'center' }}>
            <div>
                <Card.Text style={{textAlign:"center",padding:"20px"}} >{message}</Card.Text>
            </div></Card>}
    </div>);
}

export default User;