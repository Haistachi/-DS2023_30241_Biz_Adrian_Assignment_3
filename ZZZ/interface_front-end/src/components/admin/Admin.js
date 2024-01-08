import {Link, useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";
import table from "../../commons/tables/table";
import {
    deleteDevice,
    deletePerson,
    getDevices,
    getPersons,
    insertDevice,
    insertPerson, 
    updateDevice,
    updatePerson,
    updateTreshhold,
    insertTreshhold,
    deleteTreshhold,
    deleteActive
} from "./admin-api";
function Admin()
{
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const [rol, setRol] = useState("");
    const [persons, setPersons] = useState([]);
    const [devices, setDevices] = useState([]);
    const [idPerson, setIdPerson] = useState("");
    const [pagePersons, setPagePersons]= useState(0);
    const [pageDevice, setPageDevice]= useState(0);
    const [idDevice, setIdDevice] = useState("");
    const [owner, setOwner] = useState("");
    const [desc, setDesc] = useState("");
    const [addr, setAddr] = useState("");
    const [consume, setConsume] = useState("");

    var tableUser = document.getElementById("UserTable");
    if (tableUser) {
        for (var i = 0; i < tableUser.rows.length; i++) {
            tableUser.rows[i].onclick = function() {
                userTableText(this);
            };
        }
    }
    var tableDevice = document.getElementById("DeviceTable");
    if (tableDevice) {
        for (var i = 0; i < tableDevice.rows.length; i++) {
            tableDevice.rows[i].onclick = function() {
                deviceTableText(this);
            };
        }
    }

    function userTableText(tableRow) {
        var id = tableRow.childNodes[0].innerHTML;
        setOwner(id);
        var user = tableRow.childNodes[1].innerHTML;
        var pass = tableRow.childNodes[2].innerHTML;
        var rol = tableRow.childNodes[3].innerHTML;
        var obj = {'Id': id, 'User': user, 'Pass': pass, 'Rol': rol};
        console.log(obj);
    }
    function deviceTableText(tableRow) {
        var id = tableRow.childNodes[0].innerHTML;
        var owner = tableRow.childNodes[1].innerHTML;
        var address = tableRow.childNodes[2].innerHTML;
        var consumption = tableRow.childNodes[3].innerHTML;
        var obj = {'Id': id, 'Owner': owner, 'Address': address, 'Consumption': consumption};
        console.log(obj);
    }
    function createUser(){
        console.log(name, pass, rol);
        insertPerson({name, pass, rol}, (res, stat, err)=>{if(err) console.log(err);})
        getPersons((res, stat, err)=>{if(err) console.log(err);
        else
            setPersons(res);
        });
    }
    function deleteUser(){
        console.log(devices);
        let devicesUser = devices.filter(d=>{return d.person == idPerson;});
        console.log(devicesUser);
        console.log("Start delete device chain:")
        for(var i =0; i<devicesUser.length;i++)
        {
            console.log(`Delete device ${devicesUser[i].id}.`)
            deleteDeviceById(devicesUser[i].id);
        }
        console.log("Finish delete device chain, now delete person:")
        deletePerson(idPerson, devicesUser, (res, stat, err)=>{if(err) console.log(err);});
        getPersons((res, stat, err)=>{if(err) console.log(err);
        else {
            console.log(`Succesfule deleted person with id ${idPerson}.`)
            setPersons(res);
        }
        });
    }
    function updateUser(){
        console.log(idPerson);
        updatePerson({id: idPerson, username: name, userPassword: pass, rol: rol},
            (res, stat, err)=>{if(err) console.log(err);});
        getPersons((res, stat, err)=>{if(err) console.log(err);
        else
            setPersons(res);
        });
    }
    function createDevice(){
        console.log(owner, desc, addr, consume);
        let newDevice=0;
        if(persons.find(obj => {return obj.id==owner;})) {
            insertDevice({owner, desc, addr, consume}, (res, stat, err) => {
                if (err) console.log(err);
                console.log(res);
                newDevice=res;
                localStorage.setItem("idDev", res);
                finsertTreshhold(localStorage.getItem("idDev"), consume);
            })
            getDevices((res, stat, err) => {
                if (err) console.log(err);
                else
                {
                    setDevices(res);
                }
            });} else
            console.log(`User cu id-ul ${owner} nu exista!`);
    }
    function finsertTreshhold(idDevice, consume){
        console.log(idDevice, consume);
        insertTreshhold(idDevice, consume, (res, stat, err)=>{if(err) console.log(err);});
    }
    function fupdateTreshhold(idDevice, consume){
        console.log(idDevice, consume);
        updateTreshhold(idDevice, consume, (res, stat, err)=>{if(err) console.log(err);});
    }
    function fdeleteTreshhold(idDevice){
        console.log(idDevice);
        deleteTreshhold(idDevice, (res, stat, err)=>{if(err) console.log(err);});
    }
    function deleteDeviceB(){
        console.log(idDevice);
        deleteDevice(idDevice, (res, stat, err)=>{if(err) console.log(err);});
        fdeleteTreshhold(idDevice);
        deleteActiveDevice(idDevice);
        getDevices((res, stat, err)=>{if(err) console.log(err);
        else
            setDevices(res);
        });
    }
    function deleteDeviceById(id){
        console.log(id);
        deleteDevice(id, (res, stat, err)=>{if(err) console.log(err);});
        fdeleteTreshhold(id);
        deleteActiveDevice(id);
        getDevices((res, stat, err)=>{if(err) console.log(err);
        else {
            console.log(res);
            setDevices(res);
        }
        });
    }
    function deleteActiveDevice(id){
        console.log(id);
        deleteActive(id, (res, stat, err)=>{if(err) console.log(err);});
    }
    function updateDeviceB(){
        console.log(idDevice);
        console.log(owner);
        if(persons.find(obj => {return obj.id==owner;})) {
        updateDevice({id: idDevice, person: owner, description: desc, address: addr, consumption: consume},
            (res, stat, err)=>{if(err) console.log(err);});
        fupdateTreshhold(idDevice, consume);
        getDevices((res, stat, err)=>{if(err) console.log(err);
        else
        {
            setDevices(res);
        }
        });} else
            console.log(`User cu id-ul ${owner} nu exista!`);
    }
    function addOwner() {setOwner(idPerson);}
    function showError(message) {console.log(message); return(navigate("/error"));}
    function delog() { localStorage.clear(); return(navigate("/"));}
    const onBackPersons=()=>{setPagePersons(pagePersons -1 >-1 ? pagePersons-1:pagePersons)}
    const onNextPersons=()=>{setPagePersons(pagePersons +1 < persons.length/10 ? pagePersons+1:pagePersons)}
    const onBackDevice=()=>{setPageDevice(pageDevice -1 >-1 ? pageDevice-1:pageDevice)}
    const onNextDevice=()=>{setPageDevice(pageDevice +1 < devices.length/10 ? pageDevice+1:pageDevice)}
     useEffect(
        ()=>{
            if(localStorage.getItem("rol") !== "admin")
                return(showError("Only admin role allowed!"));

            getPersons((res, stat, err)=>{if(err) console.log(err);
            else setPersons(res);});
            getDevices((res, stat, err)=>{if(err) console.log(err);
            else setDevices(res);});
            }, [])

    return(<div><h1>Bine ai venit admin {localStorage.getItem("user")}</h1>
        <div>
            <h2>Users</h2>
            <div> <label htmlFor={"name"}>Name</label>
                <input value={name} type={"name"} placeholder={"your_name"} id={"name"} name={"name"}
                       onChange={(e)=>setName(e.target.value)}></input>
                <label htmlFor={"pass"}>Pass</label>
                <input value={pass} type={"pass"} placeholder={"your_pass"} id={"pass"} name={"pass"}
                       onChange={(e)=>setPass(e.target.value)}></input>
                <label htmlFor={"rol"}>Role</label>
                <input value={rol} type={"rol"} placeholder={"your_rol"} id={"rol"} name={"rol"}
                       onChange={(e)=>setRol(e.target.value)}></input>
            </div>
            <div className="Button" ><button onClick={createUser}>Create</button></div>
            <div className="Button" ><button onClick={deleteUser}>Delete</button></div>
            <div className="Button" ><button onClick={updateUser}>Update</button></div>
        </div>
        {persons && <div style={{width: "50%", boxShadow: "3px 6px 3px #ccc"}}>
            <table cellSpacing={"0"}
                   style={{width: "100%", height: "auto", padding: "5px 10 px"}} id={"UserTable"}>
            <thead><tr>
                <th>ID</th>
                <th>User</th>
                <th>Pass</th>
                <th>Rol</th>
            </tr></thead>
            <tbody>{persons.slice(10 * pagePersons, 10*pagePersons+10).map((person)=>
            {return(<tr key={person.id} onClick={()=>setIdPerson(person.id)}>
                <td>{person.id}</td>
                <td>{person.username}</td>
                <td>{person.userPassword}</td>
                <td>{person.rol}</td>
            </tr>)})}</tbody>
        </table>
                <div style={{padding: "10px 0"}}>
                    <button onClick={onBackPersons}>Back</button>
                    <label style={{padding: "0 lem"}}>{pagePersons+1}</label>
                    <button onClick={onNextPersons}>Next</button>
                </div>
        </div>}

        <div>
            <h2>Devices</h2>
            <div> <label htmlFor={"owner"}>Owner</label>
                <input value={owner} type={"owner"} placeholder={"owner_id"} id={"owner"} name={"owner"}
                       onChange={(e)=>setOwner(e.target.value)}></input>
                <label htmlFor={"desc"}>Description</label>
                <input value={desc} type={"desc"} placeholder={"desc_device"} id={"desc"} name={"desc"}
                       onChange={(e)=>setDesc(e.target.value)}></input>
                <label htmlFor={"addr"}>Address</label>
                <input value={addr} type={"addr"} placeholder={"addr"} id={"addr"} name={"addr"}
                       onChange={(e)=>setAddr(e.target.value)}></input>
                <label htmlFor={"consume"}>Consumption</label>
                <input value={consume} type={"consume"} placeholder={"consume"} id={"consume"}
                       name={"consume"} onChange={(e)=>setConsume(e.target.value)}></input>
            </div>
            <div className="Button" ><button onClick={addOwner}>addOwner</button></div>
            <div className="Button" ><button onClick={createDevice}>Create</button></div>
            <div className="Button" ><button onClick={deleteDeviceB}>Delete</button></div>
            <div className="Button" ><button onClick={updateDeviceB}>Update</button></div>
        </div>
        {devices && <div style={{width: "50%", boxShadow: "3px 6px 3px #ccc"}}>
            <table cellSpacing={"0"} style={{width: "100%", height: "auto", padding: "5px 10 px"}} id={"DeviceTable"}>
            <thead><tr>
                <th>ID</th>
                <th>Person</th>
                <th>Description</th>
                <th>Adress</th>
                <th>Consumption</th>
            </tr></thead>
            <tbody>{devices.slice(10 * pageDevice, 10*pageDevice+10).map((device)=>
            {return(<tr key={device.id} onClick={()=>setIdDevice(device.id)}>
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
                </div>
        </div>}
        <div className="Button" ><button onClick={delog}>Delog</button></div>
    </div>);
}
export default Admin;