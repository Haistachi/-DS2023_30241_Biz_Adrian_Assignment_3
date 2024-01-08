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
        fetch("http://localhost:8081/login/aut3", {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"},
            method: "POST",
            body: new URLSearchParams({
                'username': name,
                'userPassword': pass})
        })
            .then((response) => {
                if (response.status === 200) return response.text();
            })
            .then((response) => {
                if(!response) {
                    showError("Login fail");
                }
                else {
                    const jsonObj= JSON.parse(response);
                    console.log(JSON.parse(response));
                    localStorage.setItem("access_token", jsonObj.access_token);
                    localStorage.setItem("refresh_token", jsonObj.refresh_token);
                    const jwtToken=jsonObj.access_token;
                    fetch("http://localhost:8081/login/aut2", {
                        headers: {
                            "Content-Type": "application/json",
                            'Authorization': `Bearer ${jwtToken}`
                        },
                        method: "POST",
                        body: JSON.stringify({"username" : name, "userPassword": pass})
                    })
                        .then((response) => {
                            if (response.status === 200) return response.text();
                        })
                        .then((response) => {
                            if(!response)
                                showError("Login fail");
                            else {
                                const jsonObj2= JSON.parse(response);
                                console.log(jsonObj2);
                                localStorage.setItem("user", jsonObj2.username);
                                localStorage.setItem("pass", pass);
                                const role = jsonObj2.authorities.map(auth => auth.authority)[0];
                                localStorage.setItem("rol", role);
                                console.log(role=== "ROLE_ADMIN");
                                if (role=== "ROLE_ADMIN")
                                    return (navigate("/admin"));
                                else
                                    return(navigate("/user"));
                            }

                        });
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