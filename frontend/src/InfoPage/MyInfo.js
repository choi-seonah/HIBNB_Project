import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {setUserInfoList} from "../store";
import "../css/components.css";
import apiClient from "../util/apiInstance";

export default function MyInfo() {
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.userInfo.userInfoList[0]);
    console.log("current user is : ", currentUser.name);

    useEffect(() => {
        if (currentUser) {
            setEmail(currentUser.email || "");
            setPhone(currentUser.phone || "");
        }
    }, [currentUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !phone) {
            alert("이메일과 전화번호를 모두 입력해주세요.");
            return;
        }
        try {
            const updatedUser = {
                ...currentUser,
                email,
                phone,
            };

            const res = await apiClient.put("/update-inform", updatedUser);

            if (res?.data) {
                dispatch(setUserInfoList(res.data));
                alert(`정보가 수정되었습니다.\n이메일: ${res.data.email}\n전화번호: ${res.data.phone}`);
            } else {
                alert("서버로부터 올바른 응답을 받지 못했습니다.");
            }
        } catch (error) {
            console.error(error);
            alert("정보 수정 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="myinfo-container">
            <form className="myinfo-form" onSubmit={handleSubmit}>
                <h2 className="myinfo-title">내 정보 확인</h2>

                <p className="myinfo-text">
                    <strong>이름:</strong> {currentUser.name}
                </p>

                <label className="myinfo-label">
                    <strong>전화번호</strong><br/>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="myinfo-input"
                    />
                </label>

                <label className="myinfo-label">
                    <strong>이메일</strong><br/>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="myinfo-input"
                    />
                </label>
                <button type="submit" className="myinfo-button">
                    정보 수정
                </button>
            </form>
        </div>
    );
}