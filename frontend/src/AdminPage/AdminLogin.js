import apiClient from "../util/apiInstance";
import {setToken, setUserInfoList, setUserRole} from "../store";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import '../index.css';

export default function AdminLogin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        const data = {
            username: "ADMIN@" + e.target.username.value,
            password: e.target.password.value
        }
        try {
            const response = await apiClient.post("/login",
                new URLSearchParams(data));
            console.log('login reponse', response.data);
            //const userInfo=response.data;
            // console.log(response.headers['authorization']);
            // console.log(response.data);
            //
            dispatch(setToken(response.headers['authorization']));
            dispatch(setUserInfoList([response.data]));
            // dispatch(userLogin());
            console.log('login response role:', response.data.role);

            dispatch(setUserRole(response.data.role));

            alert("로그인 성공!")
            navigate("/");

        } catch (error) {
            alert("로그인에 실패했습니다.");
            console.log(error);
        }
    };

    return (
        <div className={"login-form"}>
            <form onSubmit={handleLogin} className={"login-form__form"}>
                <h2 className={"login-form__title"}>관리자 로그인</h2>
                <p> ID:
                    <input type="text" name={"username"} required className={"login-form__input"}/>
                </p>
                <p> PW:
                    <input type="password" name={"password"} required className={"login-form__input"}/>
                </p>
                <button type={"submit"} className={"login-form__submit-btn"}>관리자 로그인</button>
                <br/>
            </form>
        </div>
    );
}