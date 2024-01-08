import { useNavigate } from "react-router-dom";
import {useState} from "react";
function RegisterForm()
{
    const navigate = useNavigate();
    function delog() {return(navigate("/"));}
    function showError(message) {console.log(message); return(navigate("/error"));}
    const [name, setName]=useState('');
    const [pass, setPass]=useState('');
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(name);
        console.log(pass);
        fetch("http://localhost:8081/person", {
            headers: {
                "Content-Type": "application/json"},
            method: "post",
            body: JSON.stringify({"username" : name, "userPassword": pass, "rol": "user"})
        })
            .then((response) => {
                if (response.status === 201) return response.text();
            })
            .then((data) => {
                console.log(data);
                if(!data)
                    showError("Register fail");
                else {
                    console.log("register sucess");
                }
            });
        delog();
    }
    return (<div className={'modal'}><form onSubmit={handleSubmit}>
            <div>
                <label htmlFor={"name"}>Name</label>
                <input value={name} type={"name"} placeholder={"your_name"} id={"name"} name={"name"} onChange={(e)=>setName(e.target.value)} ></input></div>
            <div>
                <label htmlFor={"password"}>Password</label>
                <input value={pass} type={"password"} placeholder={"*****"} id={"password"} name={"password"} onChange={(e)=>setPass(e.target.value)}></input></div>
            <div><button className='btn'>Register</button></div>
            <div onClick={delog}><button>Exit</button></div>
        </form></div>);
}
export default RegisterForm;