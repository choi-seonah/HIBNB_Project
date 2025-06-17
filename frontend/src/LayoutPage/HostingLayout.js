import {Link, Outlet} from "react-router-dom";
import '../index.css';

export default function HostingLayout() {

    return (
        <>
            <div className={"main-search"}>
            <Link to="save" className={"header__link"}>숙소 등록</Link>
            <Link to="list" className={"header__link"}>숙소 수정</Link>
            <Link to="history" className={"header__link"}>호스트 내역</Link>
            </div>
            <Outlet/>
        </>
    )
}