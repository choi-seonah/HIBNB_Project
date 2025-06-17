import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import apiClient from "../util/apiInstance";
import {persistor, setToken, userLogout} from "../store";
import '../index.css';

export default function Logout() {
    const isLogin = useSelector(state => state.userInfo.userLoginFlag);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const loginData = async () => {
            try {
                const response = await apiClient.post("/logout1", {});
                if (isLogin) {
                    dispatch(setToken(null));
                    dispatch(userLogout());
                    await persistor.purge();
                    alert("로그아웃 성공");
                    navigate("/");
                }

            } catch (error) {
                console.log(error);
            }
        };
        loginData();
    }, []);

    return null;
}