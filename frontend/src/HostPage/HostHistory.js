import apiClient from "../util/apiInstance";
import {useSelector} from "react-redux";
import {useState} from "react";
import '../index.css';

export default function HostHistory() {
    const user = useSelector(state => state.userInfo.userInfoList);
    const [bookings, setBookings] = useState([]);
    const [reportTargetId, setReportTargetId] = useState(null);
    const [reportType, setReportType] = useState('');
    const [reportComment, setReportComment] = useState('');

    const handleCheck = async () => {
        try {
            const response = await apiClient.get(`http://localhost:8080/book/list/hostid?hostid=${user.username}`);
            if (response.data) {
                setBookings(response.data);
                alert("조회 완료");
            }
        } catch (error) {
            console.error(error);
            alert("조회 중 오류가 발생했습니다.");
        }
    };

    const handleReportSubmit = async (booking) => {
        if (!reportType || !reportComment) {
            alert("신고 사유와 내용을 모두 입력해주세요.");
            return;
        }

        const now = new Date().toISOString();

        try {
            await apiClient.post("http://localhost:8080/report/save", {
                accomid: booking.accomid,
                bookid: booking.id,
                username: booking.username,
                type: reportType,
                comment: reportComment,
                createdAt: now,
            });

            alert("신고가 접수되었습니다.");
            setReportTargetId(null);  // 모달 닫기
            setReportType('');
            setReportComment('');
        } catch (error) {
            console.error(error);
            alert("신고 접수 중 오류가 발생했습니다.");
        }
    };

    return (
        <>
            <h2 className={"login-form__title"}>호스트 예약 내역</h2>
            <button onClick={handleCheck}>조회하기</button>
            <ul>
                {bookings.length > 0 ? (
                    bookings.map((booking, index) => (
                        <li key={index} style={{marginBottom: '1rem'}}>
                            예약번호: {booking.id} / 숙소명: {booking.address}의 {booking.type} / 예약자: {booking.username}
                            <button onClick={() => setReportTargetId(booking.id)}>신고하기</button>

                            {reportTargetId === booking.id && (
                                <div style={{marginTop: '0.5rem', border: '1px solid #ccc', padding: '0.5rem'}}>
                                    <label>
                                        사유:
                                        <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
                                            <option value="">선택하세요</option>
                                            <option value="무단 취소">무단 취소</option>
                                            <option value="폭언/비매너">폭언/비매너</option>
                                            <option value="기물 파손">기물 파손</option>
                                            <option value="기타">기타</option>
                                        </select>
                                    </label>
                                    <br/>
                                    <label>
                                        상세 내용:
                                        <br/>
                                        <textarea value={reportComment}
                                                  onChange={(e) => setReportComment(e.target.value)} rows={4}
                                                  cols={50}/>
                                    </label>
                                    <br/>
                                    <button onClick={() => handleReportSubmit(booking)}>제출</button>
                                    <button onClick={() => setReportTargetId(null)}>취소</button>
                                </div>
                            )}
                        </li>
                    ))
                ) : (
                    <li>예약 내역이 없습니다.</li>
                )}
            </ul>
        </>
    );
}