import {useState} from "react";
import '../index.css';

export default function MyRoom(){
        /*
        * 이용내역
        * 대충 짜본 틀
        * css는 나중에 뺄꺼에용
        */
    const [showModal, setShowModal] = useState(false);
    const history = [
        {
            id: 1,
            place: "서울 홍대 게스트하우스",
            date: "2025-06-01 ~ 2025-06-03",
            isMostRecent: true,
        },
        {
            id: 2,
            place: "부산 해운대 민박",
            date: "2025-04-15 ~ 2025-05-15",
            isMostRecent: false,
        },
        {
            id: 3,
            place: "제주도 펜션",
            date: "2025-02-10 ~ 2025-02-13",
            isMostRecent: false,
        },
    ];


    return (
        <div className="room-container">
            <h2 className="room-title">이용 내역</h2>
            <ul className="room-list">
                {history.map((item) => (
                    <li key={item.id} className="room-card">
                        <div>
                            <div className="room-place">{item.place}</div>
                            <div className="room-date">{item.date}</div>
                        </div>
                        {item.isMostRecent && (
                            <button className="room-review-btn" onClick={() => setShowModal(true)}>
                                리뷰 쓰기
                            </button>
                        )}
                    </li>
                ))}
            </ul>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={() => setShowModal(false)}>
                            ×
                        </button>
                        <h3 className="modal-title">리뷰 작성</h3>
                        <textarea
                            className="modal-textarea"
                            placeholder="숙소는 어땠나요? 호스트는 친절했나요?"
                        />
                        <div className="modal-footer">
                            <button className="modal-submit-btn" onClick={() => setShowModal(false)}>
                                제출
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}