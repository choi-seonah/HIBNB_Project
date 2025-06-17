import {useNavigate} from "react-router-dom";
import apiClient from "../util/apiInstance";
import {useState} from "react";
import '../index.css';

export default function ReConfirmID() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [emailAuthenSent, setEmailAuthenSent] = useState(false);

    const handleSendEmail = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient.get(`http://localhost:8080/email?email=${email}`);

            if (response.data) {
                alert("인증번호가 이메일로 전송되었습니다.");
                setEmailAuthenSent(true);

            }
        } catch (error) {
            console.error(error);
            alert("오류가 발생했습니다. 다시 시도해주세요. ");
        }
    }

    const successAuthen = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient.get("http://localhost:8080/re-confirm-id", {
                params: {email, code}
            });

            // 서버에서 받은 아이디 출력
            if (response.data) {
                alert(`당신의 아이디는 "${response.data}" 입니다.`);
                navigate("/login");
            } else {
                alert("인증번호가 일치하지 않거나 정보가 올바르지 않습니다.");
            }
        } catch (error) {
            console.error(error);
            alert("오류가 발생했습니다. 다시 시도해주세요.");
        }
    }

    return (
        <div>
            <h2 className={"login-form__title"}>아이디 찾기</h2>
            <form onSubmit={successAuthen} className={"login-form__form"}>
                <div className={"reconfirm-form-text"}>입력하신 이메일로 인증번호가 전송됩니다.</div><br/>
                <input
                    type="text"
                    name="email"
                    value={email}
                    placeholder={"이메일을 입력해주세요."}
                    className={"reconfirm-form-input"}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={handleSendEmail} className={"reconfirm-form-btn"}>인증번호 전송</button>
                <br/>

                <input
                    type="password"
                    name="authennum"
                    value={code}
                    placeholder={"인증번호를 입력해주세요."}
                    className={"reconfirm-form-input"}
                    onChange={(e) => setCode(e.target.value)}
                />

                <button type="submit" disabled={!code} className={"reconfirm-form-btn"}>인증하기</button>
            </form>
        </div>
    );
}