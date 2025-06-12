import { useEffect, useState } from "react";
import "./MyReserve.css";
import axios from "axios";

export default function MyReserve() {
    const [reservations, setReservations] = useState([]);
    const [selectedReservationId, setSelectedReservationId] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
        checkIn: "",
        checkOut: "",
        guests: 1,
    });

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get("/book/list", {
                    params: {
                        username: "사용자아이디",
                    },
                });

                const formatted = response.data.map((res, index) => ({
                    id: res.id || 1000 + index,
                    accommodation: res.accommodation,
                    reserverName: res.username || "사용자",
                    checkIn: res.checkIn,
                    checkOut: res.checkOut,
                    guests: res.guests || 1,
                    status: res.status || "예약완료",
                    address: res.address || "주소 미제공",
                    description: res.description || "사용자가 직접 예약한 숙소입니다.",
                    price: res.price || null,
                    imageUrl: res.imageUrl || "/default.jpg",
                }));

                setReservations(formatted);
            } catch (error) {
                console.error("예약 목록 불러오기 실패:", error);
            }
        };

        fetchReservations();
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

    const startEditing = (res) => {
        setEditingId(res.id);
        setSelectedReservationId(res.id);
        setEditForm({
            checkIn: res.checkIn,
            checkOut: res.checkOut,
            guests: res.guests,
        });
    };

    const saveChanges = (id) => {
        setReservations((prev) =>
            prev.map((res) =>
                res.id === id
                    ? {
                        ...res,
                        checkIn: editForm.checkIn,
                        checkOut: editForm.checkOut,
                        guests: editForm.guests,
                    }
                    : res
            )
        );
        setEditingId(null);
        setSelectedReservationId(null);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({
            ...prev,
            [name]: name === "guests" ? parseInt(value) : value,
        }));
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
                        {res.imageUrl && (
                            <img
                                src={res.imageUrl}
                                alt="숙소 이미지"
                                className="reserve-image"
                            />
                        )}
                        <h3 className="reserve-title-text">{res.accommodation}</h3>
                        <p className="reserve-text">예약자: {res.reserverName}</p>
                        <p className="reserve-text">체크인: {res.checkIn} / 체크아웃: {res.checkOut}</p>
                        <p className="reserve-text">인원: {res.guests}명</p>
                        <p className={`reserve-status ${res.status === "예약완료" ? "completed" : "cancelled"}`}>
                            상태: {res.status}
                        </p>
                        {res.price && <p>총 금액: {res.price}</p>}

                        <div className="reserve-buttons">
                            <button onClick={() => toggleDetails(res.id)} className="reserve-button">
                                {selectedReservationId === res.id ? "상세 닫기" : "상세 보기"}
                            </button>

                            {res.status === "예약완료" && (
                                <>
                                    <button onClick={() => cancelReservation(res.id)} className="reserve-button cancel">
                                        예약 취소
                                    </button>
                                    <button onClick={() => startEditing(res)} className="reserve-button edit">
                                        예약 변경
                                    </button>
                                </>
                            )}
                        </div>

                        {selectedReservationId === res.id && (
                            <div className="reserve-details">
                                <p><strong>주소:</strong> {res.address}</p>
                                <p><strong>숙소 설명:</strong> {res.description}</p>

                                {editingId === res.id ? (
                                    <div className="edit-form">
                                        <label className="edit-label">
                                            체크인:
                                            <input
                                                type="date"
                                                name="checkIn"
                                                value={editForm.checkIn}
                                                onChange={handleEditChange}
                                                className="edit-input"
                                            />
                                        </label>
                                        <label className="edit-label">
                                            체크아웃:
                                            <input
                                                type="date"
                                                name="checkOut"
                                                value={editForm.checkOut}
                                                onChange={handleEditChange}
                                                className="edit-input"
                                            />
                                        </label>
                                        <label className="edit-label">
                                            인원:
                                            <input
                                                type="number"
                                                name="guests"
                                                value={editForm.guests}
                                                onChange={handleEditChange}
                                                min="1"
                                                className="edit-input"
                                            />
                                        </label>
                                        <div className="reserve-buttons">
                                            <button onClick={() => saveChanges(res.id)} className="reserve-button save">
                                                변경 저장
                                            </button>
                                            <button onClick={() => setEditingId(null)} className="reserve-button cancel">
                                                취소
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <p><strong>예약 기간:</strong> {res.checkIn} ~ {res.checkOut}</p>
                                        <p><strong>인원:</strong> {res.guests}명</p>
                                        {res.price && <p><strong>금액:</strong> {res.price}</p>}
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}



