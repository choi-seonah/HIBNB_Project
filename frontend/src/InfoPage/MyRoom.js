import { useEffect, useState } from "react";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useSelector } from "react-redux";
import "../css/components.css";
import apiClient from "../util/apiInstance";

dayjs.extend(isSameOrBefore);

export default function MyRoom() {
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [reportModal, setReportModal]=useState(false);
    const [reviewText, setReviewText] = useState("");
    const [reportText, setReportText]=useState("");
    const [reportType, setReportType]=useState("");
    const currentUser = useSelector((state) => state.userInfo.userInfoList[0]);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        const fetchHistory = async () => {
            if (!currentUser?.username) {
                setError("로그인이 필요합니다.");
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const response = await apiClient.get("/book/list", {
                    params: { username: currentUser.username },
                });

                const pastReservations = response.data.filter(
                    (item) => item.status === "이용완료"
                );

                const formattedHistory = pastReservations.map((item, index) => ({
                    id: item.id,
                    place: item.accom?.address || `숙소 ID ${item.accomid}`,
                    date: `${item.checkindate} ~ ${item.checkoutdate}`,
                    isMostRecent: index === 0,
                    accomid: item.accomid,
                }));

                setHistory(formattedHistory);
            } catch (error) {
                console.error("❌ 이용 내역 불러오기 실패: ", error);
                setError("이용 내역을 불러오는 데 실패했습니다. 다시 시도해주세요.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchHistory();
    }, [currentUser?.username]);

    const handleReviewSubmit = async () => {
        if (!reviewText.trim()) {
            alert("리뷰 내용을 입력해주세요.");
            return;
        }

        try {
            const mostRecentBooking = history.find((item) => item.isMostRecent);
            if (!mostRecentBooking) {
                throw new Error("예약 정보를 찾을 수 없습니다.");
            }

            const now = new Date().toISOString();

            await apiClient.post("/review/save",  {
                bookid: mostRecentBooking.id,
                accomid: mostRecentBooking.accomid,
                username: currentUser.username,
                comment: reviewText,
                rating: rating, // Default rating, can be enhanced with a rating input
                createdAt: now,
            });

            alert("리뷰가 성공적으로 제출되었습니다!");
            setReviewText("");
            setShowModal(false);
        } catch (error) {
            console.error("❌ 리뷰 제출 실패: ", error);
            alert("리뷰 제출에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const handleReportSubmit = async () => {
        if (!reportText.trim()) {
            alert("신고 내용을 입력해주세요.");
            return;
        }

        try {
            const mostRecentBooking = history.find((item) => item.isMostRecent);
            if (!mostRecentBooking) {
                throw new Error("예약 정보를 찾을 수 없습니다.");
            }

            const now = new Date().toISOString();

            await apiClient.post("/report/save",  {
                bookid: mostRecentBooking.id,
                accomid: mostRecentBooking.accomid,
                username: currentUser.username,
                comment: reportText,
                createdAt: now,
                type:reportType,
            });

            alert("신고가 성공적으로 제출되었습니다!");
            setReportText("");
            setReportModal(false);
        } catch (error) {
            console.error("❌ 신고 제출 실패: ", error);
            alert("신고 제출에 실패했습니다. 다시 시도해주세요.");
        }
    };


    return (
        <div className="room-container">
            <h2 className="room-title">이용 내역</h2>

            {isLoading && <p className="room-loading">로딩 중...</p>}
            {error && <p className="room-error">{error}</p>}

            {!isLoading && !error && history.length === 0 && (
                <p className="room-empty">이용 내역이 없습니다.</p>
            )}

            {!isLoading && !error && history.length > 0 && (
                <ul className="room-list">
                    {history.map((item) => (
                        <li key={item.id} className="room-card">
                            <div className="room-place">예약자: {currentUser.username}</div>
                            <div className="room-place">{item.place}</div>
                            <div className="room-date">{item.date}</div>

                            {item.isMostRecent && (
                                <div className="room-btn-group">
                                    <button className="room-review-btn" onClick={() => setShowModal(true)}>
                                        리뷰 쓰기
                                    </button>
                                    <button className="room-review-btn" onClick={() => setReportModal(true)}>
                                        신고하기
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}

            {showModal && (
                <div className="review-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="review-modal" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="review-close-btn"
                            onClick={() => setShowModal(false)}
                        >
                            ×
                        </button>
                        <h3 className="review-modal-title">리뷰 작성</h3>
                        <select
                            className="rating-select"
                            onChange={(e) => setRating(e.target.value)}
                        >
                            <option value="1">⭐</option>
                            <option value="2">⭐⭐</option>
                            <option value="3">⭐⭐⭐</option>
                            <option value="4">⭐⭐⭐⭐</option>
                            <option value="5">⭐⭐⭐⭐⭐</option>
                        </select>
                        <textarea
                            className="review-textarea"
                            placeholder="숙소는 어땠나요? 호스트는 친절했나요?"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                        />
                        <div className="review-modal-footer">
                            <button
                                className="review-cancel-btn"
                                onClick={() => setShowModal(false)}
                            >
                                취소
                            </button>
                            <button
                                className="review-submit-btn"
                                onClick={handleReviewSubmit}
                            >
                                제출
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {reportModal && (
                <div className="report-modal-overlay" onClick={() => setReportModal(false)}>
                    <div className="report-modal" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="report-close-btn"
                            onClick={() => setReportModal(false)}
                        >
                            ×
                        </button>
                        <div>
                            <label className="report-label">
                                사유:
                                <select
                                    className="report-select"
                                    value={reportType}
                                    onChange={(e) => setReportType(e.target.value)}
                                >
                                    <option value="">선택하세요</option>
                                    <option value="관리 부실">관리 부실</option>
                                    <option value="폭언/비매너">폭언/비매너</option>
                                    <option value="기타">기타</option>
                                </select>
                            </label>
                            <br />
                            <label className="report-label">
                                상세 내용:
                                <br />
                                <textarea
                                    className="report-textarea"
                                    value={reportText}
                                    onChange={(e) => setReportText(e.target.value)}
                                    rows={4}
                                    cols={50}
                                />
                            </label>
                            <br />
                            <div className="report-modal-footer">
                                <button
                                    className="report-cancel-btn"
                                    onClick={() => setReportModal(false)}
                                >
                                    취소
                                </button>
                                <button
                                    className="report-submit-btn"
                                    onClick={handleReportSubmit}
                                >
                                    제출
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}