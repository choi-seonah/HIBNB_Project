import {NavLink, Outlet} from "react-router-dom";

export default function MyInfoLayout() {
    /*
    * css따로 뺄거에용
    * */
    return (
        <div>
            <h1>내 정보</h1>
            <nav>
                <NavLink to="profile" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>
                    내 정보 확인/수정
                </NavLink>{" | "}
                <NavLink to="reservations" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>
                    예약 정보
                </NavLink>{" | "}
                <NavLink to="history" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>
                    이용 내역
                </NavLink>{" | "}
                <NavLink to="withdraw" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>
                    회원 탈퇴
                </NavLink>{" | "}
                <NavLink to="logout" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>
                    로그아웃
                </NavLink>
            </nav>
            <hr />
            <Outlet />
        </div>
    );
}