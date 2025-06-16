import {useEffect, useState} from "react";
import "./MyRoom.css"
import dayjs from "dayjs";
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import {useSelector} from "react-redux";
import apiClient from "./util/apiInstance";

dayjs.extend(isSameOrBefore);
export default function MyRoom() {
    const [showModal, setShowModal] = useState(false);
    const [history, setHistory] = useState([]);
    const [reviewText, setReviewText] = useState("");
    const currentUser = useSelector((state) => state.userInfo.currentUser);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                console.log("📌 현재 사용자:", currentUser?.username);

                const resBook = await apiClient.get("/book/list", {
                    params: { username: currentUser?.username },
                });
                console.log("📌 예약 목록 (book):", resBook.data);//

                const resAccom = await apiClient.get("/accom/list");
                console.log("📌 숙소 목록 (accom):", resAccom.data);

                // const now = dayjs();

                // ✅ checkout이 '오늘까지 포함되도록' 필터 조건 수정
                const pastReservations = resBook.data
                    .filter(item => item.status === "이용완료");

                const formatted = pastReservations.map((item, index) => {
                    const accom = resAccom.data.find(a => a.id === item.accomid);
                    return {
                        id: item.id,
                        place: accom ? accom.address : `숙소 ID ${item.accomid}`,
                        date: `${item.checkindate} ~ ${item.checkoutdate}`,
                        isMostRecent: index === 0,
                    };
                });

                console.log("✅ 과거 예약 필터링 결과:", formatted);
                setHistory(formatted);
            } catch (error) {
                console.error("❌ 이용 내역 불러오기 실패: ", error);
            }
        };

        if (currentUser?.username) {
            fetchHistory();
        }
    }, [currentUser?.username]);
    console.log("히스토리",history);

    return (
        <div className="room-container">
            <h2 className="room-title">이용 내역</h2>

            {history.length === 0 ? (
                <p className="room-empty">이용 내역이 없습니다.</p>
            ) : (
                <ul className="room-list">
                    {history.map((item) => (
                        <li key={item.id} className="room-card">
                            <div>
                                <div className="room-place">예약자: {currentUser.username}</div>
                                <div className="room-place">{item.place}</div>
                                <div className="room-date">{item.date}</div>
                            </div>
                            {item.isMostRecent && (
                                <button
                                    className="room-review-btn"
                                    onClick={() => setShowModal(true)}
                                >
                                    리뷰 쓰기
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="modal-close-btn"
                            onClick={() => setShowModal(false)}
                        >
                            ×
                        </button>
                        <h3 className="modal-title">리뷰 작성</h3>
                        <textarea
                            className="modal-textarea"
                            placeholder="숙소는 어땠나요? 호스트는 친절했나요?"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                        />
                        <div className="modal-footer">
                            <button
                                className="modal-submit-btn"
                                onClick={() => setShowModal(false)}
                            >
                                제출
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}