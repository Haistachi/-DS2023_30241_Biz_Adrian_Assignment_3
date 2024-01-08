import { useNavigate } from "react-router-dom";
function Error()
{
    const navigate = useNavigate();
    function delog() {return(navigate("/"));}
    return (<div className={'modal'}><h1>Eroare. Nu mai fi bulangiu! De ce esti bulangiu?</h1>
        <div className={'btn'} onClick={delog}><button className='btn'>Nu mai fac boss</button></div>
    </div>);
}
export default Error;