import {useState} from "react";
import { useNavigate } from "react-router-dom";

function Login(props)
{
    const navigate = useNavigate();
    const [name, setName]=useState('');
    const [pass, setPass]=useState('');
    function register() {return(navigate("/register"));}
    function showError(message) {console.log(message); return(navigate("/error"));}
    const handleSubmit = (e)=>{
        e.preventDefault();
        fetch("http://localhost:8081/login", {
            headers: {
                "Content-Type": "application/json"},
            method: "post",
            body: JSON.stringify({"username" : name, "userPassword": pass})
        })
            .then((response) => {
                if (response.status === 200) return response.text();
            })
            .then((response) => {
                if(!response)
                    showError("Login fail");
                else {
                    localStorage.setItem("user", name);
                    localStorage.setItem("rol", response);
                    if (response === "admin")
                        return (navigate("/admin"));
                    else
                        return(navigate("/user"));
                }

            });
    }

    return(<div className={'modal'}><h1>Energy Consumption Login</h1>
    <div>
        <div><form onSubmit={handleSubmit}>
            <div>
                <label htmlFor={"name"}>Name</label>
                <input value={name} type={"name"} placeholder={"your_name"} id={"name"} name={"name"} onChange={(e)=>setName(e.target.value)}></input></div>
            <div>
                <label htmlFor={"password"}>Password</label>
                <input value={pass} type={"password"} placeholder={"*****"} id={"password"} name={"password"} onChange={(e)=>setPass(e.target.value)}></input></div>
            <div className="Button" ><button className='btn'>Login</button></div>
            <div className="Button" onClick={register}><button className='btn'>Register</button></div>
        </form></div>
    </div>
        </div>);
}
export default Login;