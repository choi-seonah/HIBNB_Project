import {NavLink, Outlet} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {userLogin} from "../store";
import '../index.css';

export default function MyInfoLayout() {
    const dispatch = useDispatch();

    useEffect(() => {
        const user = {
            userId: 1,
            name: "최장박",
            phone: "010-1234-5678",
            email: "cjp@example.com",
        };
        dispatch(userLogin(user));
    },[dispatch]);
    return (
        <div>
            <h2>내 정보</h2>
            <nav>
                <NavLink
                    to="profile"
                    style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal" })}
                >
                    내 정보 확인/수정
                </NavLink>{" "}
                |{" "}
                <NavLink
                    to="reservations"
                    style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal" })}
                >
                    예약 정보
                </NavLink>{" "}
                |{" "}
                <NavLink
                    to="myroom"
                    style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal" })}
                >
                    이용 내역
                </NavLink>{" "}
                |{" "}
                <NavLink
                    to="quit"
                    style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal" })}
                >
                    회원 탈퇴
                </NavLink>
            </nav>
            <hr />
            <Outlet />
        </div>
    );
}