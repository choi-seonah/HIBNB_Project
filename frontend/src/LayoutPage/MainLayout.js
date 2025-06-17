import {Link, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import '../index.css';

export default function MainLayout() {
    const userRole = useSelector(state => state.userInfo.userRole);
    console.log('current userRole state : ', userRole);

    return (
        <>
            <header>
                <h1>HI BNB</h1>
                <nav>
                    <Link to={"/"} className="header__link">홈</Link>
                    {userRole === 'ROLE_ADMIN' ? (
                        <>
                            {/* 관리자 메뉴 */}
                            <Link to={"/logout"} className="header__link">관리자 로그아웃</Link>
                            <Link to={"/admin/reports"}>신고 목록 조회</Link>
                        </>
                    ) : userRole === 'ROLE_USER' ? (
                        <>
                            {/* 일반 유저 메뉴 */}
                            <Link to={"/logout"} className="header__link">로그아웃</Link>
                            <Link to={"/mypage"} className="header__link">내정보</Link>
                            <Link to={"/hosting"} className="header__link">호스팅</Link>
                        </>
                    ) : (
                        <>
                            {/* 비로그인 시 메뉴 */}
                            <Link to={"/login"} className="header__link">로그인</Link>
                            <Link to={"/join"} className="header__link">회원가입</Link>
                        </>
                    )}
                </nav>
            </header>
            <Outlet/>
        </>
    );
}
