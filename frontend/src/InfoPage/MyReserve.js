import { useState, useEffect } from "react";
import '../index.css';

export default function MyReserve() {
    const defaultReservations = [
        {
            id: 1,
            accommodation: "경기 가평군 캠핑장",
            reserverName: "최장박",
            checkIn: "2025-06-20",
            checkOut: "2025-07-20",
            guests: 2,
            status: "예약완료",
            address: "경기도 가평군 123-45",
            description: "숲 속에 위치한 자연 친화적인 캠핑장으로 바비큐 시설과 편의시설 완비",
        },
        {
            id: 2,
            accommodation: "부산 해운대 바다뷰 숙소",
            reserverName: "이영희",
            checkIn: "2025-07-01",
            checkOut: "2025-07-03",
            guests: 1,
            status: "예약취소됨",
            address: "부산 해운대구 우동 678-90",
            description: "바다 바로 앞 위치, 해운대 해수욕장 도보 1분 거리",
        },
        {
            id: 3,
            accommodation: "제주 한달살기 민박집",
            reserverName: "최장박",
            checkIn: "2025-08-10",
            checkOut: "2025-09-10",
            guests: 1,
            status: "예약완료",
            address: "제주도 서귀포시 111-22",
            description: "조용한 마을 속 아늑한 민박, 편안한 숙소 제공",
        },
    ];

    const [reservations, setReservations] = useState(defaultReservations);
    const [selectedReservationId, setSelectedReservationId] = useState(null);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("reservations")) || [];
        const formatted = stored.map((res, index) => ({
            id: 1000 + index,
            accommodation: res.accommodation,
            reserverName: "사용자",
            checkIn: res.checkIn,
            checkOut: res.checkOut,
            guests: res.guests || 1,
            status: "예약완료",
            address: "주소 미제공",
            description: "사용자가 직접 예약한 숙소입니다.",
            price: res.price || null,
            userAdded: true,
        }));
        setReservations((prev) => [...prev, ...formatted]);
    }, []);

    const toggleDetails = (id) => {
        setSelectedReservationId((prevId) => (prevId === id ? null : id));
    };

    const cancelReservation = (id) => {
        setReservations((prev) =>
            prev.map((res) =>
                res.id === id ? { ...res, status: "예약취소됨" } : res
            )
        );
        if (selectedReservationId === id) {
            setSelectedReservationId(null);
        }
    };

    return (
        <div className="reserve-container">
            <h2 className="reserve-title">예약 정보</h2>

            {reservations.length === 0 ? (
                <p className="no-reservations">예약 내역이 없습니다.</p>
            ) : (
                reservations.map((res) => (
                    <div
                        key={res.id}
                        className={`reserve-card ${selectedReservationId === res.id ? "selected" : ""}`}
                    >
                        <h3 className="reserve-title-text">{res.accommodation}</h3>
                        <p className="reserve-text">예약자: {res.reserverName}</p>
                        <p className="reserve-text">체크인: {res.checkIn} / 체크아웃: {res.checkOut}</p>
                        <p className="reserve-text">인원: {res.guests}명</p>
                        <p className={`reserve-status ${res.status === "예약완료" ? "completed" : "cancelled"}`}>
                            상태: {res.status}
                        </p>
                        {res.price && <p>총 금액: {res.price}</p>}

                        <div className="reserve-buttons">
                            <button
                                onClick={() => toggleDetails(res.id)}
                                className="reserve-button"
                            >
                                {selectedReservationId === res.id ? "상세 닫기" : "상세 보기"}
                            </button>

                            {!res.userAdded && res.status === "예약완료" && (
                                <button
                                    onClick={() => cancelReservation(res.id)}
                                    className="reserve-button cancel"
                                >
                                    예약 취소
                                </button>
                            )}
                        </div>

                        {selectedReservationId === res.id && (
                            <div className="reserve-details">
                                <p><strong>주소:</strong> {res.address}</p>
                                <p><strong>숙소 설명:</strong> {res.description}</p>
                                <p><strong>예약 기간:</strong> {res.checkIn} ~ {res.checkOut}</p>
                                <p><strong>인원:</strong> {res.guests}명</p>
                                {res.price && <p><strong>금액:</strong> {res.price}</p>}
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}


