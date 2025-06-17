import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import '../index.css';

export function MyInfo() {
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const currentUser = useSelector(state => state.userInfo.currentUser);

    useEffect(() => {
        if (currentUser) {
            setEmail(
                currentUser.email || ""
            );
            setPhone(
                currentUser.phone || ""
            );
        }
    }, [currentUser]);

    // if(!currentUser){
    //     return <p>로그인이 필요합니다.</p>;
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`수정된 정보:\n이메일: ${email}\n전화번호: ${phone}`);
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",  // 가로 중앙
                minHeight: "100vh",        // 화면 전체 높이
                backgroundColor: "#ffffff",
                padding: "20px"
            }}
        >
            <form
                onSubmit={handleSubmit}
                style={{
                    width: "70%",
                    maxWidth: "800px",
                    minHeight: "600px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    padding: "40px",

                    // alignItems 제거 (라벨 왼쪽 정렬 유지 위해)
                }}
            >
                <h2 style={{ textAlign: "center" }}>내 정보 확인</h2>

                <p style={{ width: "100%", textAlign: "left" }}>
                    <strong>이름:</strong> {currentUser?.name || "이름 없음"}
                </p>

                <label style={{ width: "100%", textAlign: "left", display: "block" }}>
                    <strong>전화번호</strong><br />
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                            textAlign: "left",
                        }}
                    />
                </label>

                <label style={{ width: "100%", textAlign: "left", display: "block" }}>
                    <strong>이메일</strong><br />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                            textAlign: "left",
                        }}
                    />
                </label>

                <button
                    type="submit"
                    style={{
                        padding: "14px",
                        backgroundColor: "#FF5A5F",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        fontSize: "16px",
                        width: "150px",
                        alignSelf: "center", // 버튼만 가로 중앙에 배치
                        textAlign: "center",
                    }}
                >
                    정보 수정
                </button>
            </form>
        </div>
    );

}