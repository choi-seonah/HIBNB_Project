import {useState} from "react";
import '../index.css';

export default function Quit(){
        /*
        회원탈퇴
        나중에 다시 수정할 것
        * 대충 짜본 틀
        */
    const [showConfirm, setShowConfirm] = useState(false);
    const handleQuit = () => {
        alert("🙇‍♂️그동안 이용해주셔서 감사합니다.🙇‍♂️");
        setShowConfirm(false);

    };

    const styles = {
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            fontFamily: "sans-serif",
            backgroundColor: "#f9f9f9",
        },
        card: {
            background: "#fff",
            padding: "30px",
            borderRadius: "16px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
            textAlign: "center",
            maxWidth: "400px",
            width: "100%",
        },
        message: {
            fontSize: "18px",
            marginBottom: "20px",
        },
        buttonDanger: {
            backgroundColor: "#ff385c",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            fontWeight: "600",
            cursor: "pointer",
            marginRight: "10px",
        },
        buttonCancel: {
            backgroundColor: "#eee",
            color: "#333",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                {!showConfirm ? (
                    <>
                        <p style={styles.message}>정말 탈퇴하시겠습니까?</p>
                        <button style={styles.buttonDanger} onClick={() => setShowConfirm(true)}>
                            회원탈퇴
                        </button>
                    </>
                ) : (
                    <>
                        <p style={styles.message}>정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다. 신중히 선택하세요.</p>
                        <button style={styles.buttonDanger} onClick={handleQuit}>
                            탈퇴 확인
                        </button>
                        <button style={styles.buttonCancel} onClick={() => setShowConfirm(false)}>
                            취소
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
