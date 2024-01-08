import Login from "./components/Login";
import { Route, Routes} from 'react-router-dom';
import Error from "./components/Error";
import Admin from "./components/admin/Admin";
import User from "./components/users/User";
import RegisterForm from "./components/RegisterForm";
import ChatRoom from "./components/chatroom/ChatRoom";

function App() {

  return (
    <div>
        <Routes>
            <Route path={'/'} exact element={<Login/>}></Route>
            <Route path={'/user'} element={<User/>}></Route>
            <Route path={'/admin'} element={<Admin/>}></Route>
            <Route path={'/register'} element={<RegisterForm/>}></Route>
            <Route path={'/chatroom'} element={<ChatRoom/>}></Route>
            <Route path={'/error'} element={<Error/>}></Route>
        </Routes>
    </div>
  );
}

export default App;
