import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {setUserInfoList} from "../store";
import "../css/components.css";
import apiClient from "../util/apiInstance";
import {useNavigate} from "react-router-dom";

export default function MyInfo() {
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfoList = useSelector(state => state.userInfo.userInfoList);
    const currentUser = userInfoList && userInfoList.length > 0 ? userInfoList[0] : null;
    console.log("current user is : ",currentUser.name);



    useEffect(() => {
        if (currentUser) {
            setEmail(currentUser.email || "");
            setPhone(currentUser.phone || "");
            setName(currentUser.name || "");
            setAge(currentUser.age || "");
        }
    }, [currentUser]);

    useEffect(() => {
        if (userInfoList && userInfoList.length > 0) {
            // 필요한 상태 설정이나 API 호출 등
        }
    }, [userInfoList]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !phone || !name || !age) {
            alert("이름, 나이, 이메일, 전화번호를 모두 입력해주세요.");
            return;
        }

        const changes = [];
        if (currentUser.name !== name) changes.push(`- 이름: ${currentUser.name} → ${name}`);
        if (currentUser.age !== age) changes.push(`- 나이: ${currentUser.age} → ${age}`);
        if (currentUser.email !== email) changes.push(`- 이메일: ${currentUser.email} → ${email}`);
        if (currentUser.phone !== phone) changes.push(`- 전화번호: ${currentUser.phone} → ${phone}`);

        if (changes.length === 0) {
            alert("변경된 내용이 없습니다.");
            return;
        }

        try {
            const updatedUser = {
                ...currentUser,
                name,
                email,
                phone,
                age
            };

            const res = await apiClient.put("/update-inform", updatedUser);

            console.log("res.data", res.data);
            console.log("typeof res.data", typeof res.data);
            console.log("setUserInfoList payload", [res.data]);

            if (res?.data) {
                // Redux 업데이트
                dispatch(setUserInfoList([res.data]));


                // 입력 필드 상태값도 업데이트
                setName(res.data.name || "");
                setAge(res.data.age || "");
                setEmail(res.data.email || "");
                setPhone(res.data.phone || "");

                alert(`정보가 수정되었습니다.\n\n변경된 항목:\n${changes.join("\n")}`);
                // navigate("/");
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
                    <strong>전화번호</strong><br />
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="myinfo-input"
                    />
                </label>

                <label className="myinfo-label">
                    <strong>이름</strong><br />
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="myinfo-input"
                    />
                </label>

                <label className="myinfo-label">
                    <strong>나이</strong><br />
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="myinfo-input"
                    />
                </label>


                <label className="myinfo-label">
                    <strong>이메일</strong><br />
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