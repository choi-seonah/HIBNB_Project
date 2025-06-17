import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import apiClient from "../util/apiInstance"
import {addUserInfo} from "../store";
import '../index.css';

export default function UserJoin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            username: "USER@" + e.target.username.value,
            password: e.target.password.value,
            name: e.target.name.value,
            phone: e.target.phone.value,
            email: e.target.email.value,
            age: e.target.age.value,
        }
        try {
            const response = await apiClient.post("/join", data)
            dispatch(addUserInfo(data));
            alert("회원가입 성공")
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    const handleClose = () => {
        navigate("/");
    };

    return (
        <div className="join-form">
            <form onSubmit={handleSubmit} className="join-form__form">
                <h2 className="join-form__title">회원가입</h2>
                <p>
                    ID:
                    <input type="text" name="username" required className="join-form__input"/>
                </p>
                <p>
                    PW:
                    <input type="password" name="password" required className="join-form__input"/>
                </p>
                <p>
                    NAME:
                    <input type="text" name="name" required className="join-form__input"/>
                </p>
                <p>
                    PHONE:
                    <input type="text" name="phone" required className="join-form__input"/>
                </p>
                <p>
                    EMAIL:
                    <input type="email" name="email" required className="join-form__input"/>
                </p>
                <p>
                    AGE:
                    <input type="number" name="age" required className="join-form__input"/>
                </p>
                <button type="submit" className="join-form__submit-btn">저장</button>
                <button type="button" onClick={handleClose} className="join-form__close-btn">닫기</button>
            </form>
        </div>
    );
}
