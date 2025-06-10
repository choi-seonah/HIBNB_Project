import {Link, Outlet, useLocation} from "react-router-dom";
import Login from "./UserLogin";
import Join from "./UserJoin";
import MainSearch from "./MainSearch";

export default function MainLayout() {

    return (
        <>
            <h1>HI BNB</h1>
            <Link to={"/"}>🎁</Link>
            <Link to={"/login"}>로그인</Link>
            <Link to={"/join"}>회원가입</Link>
            <Link to={"/hosting"}>호스팅</Link>
            <Outlet/>
        </>
    );
}
