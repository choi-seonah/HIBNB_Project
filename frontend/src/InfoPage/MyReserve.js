import {useEffect, useState} from "react";
import dayjs from "dayjs";
import "../css/components.css";
import {useSelector} from "react-redux";
import apiClient from "../util/apiInstance";

export default function MyReserve() {
    const [reservations, setReservations] = useState([]);
    const [selectedReservationId, setSelectedReservationId] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const currentUser = useSelector((state) => state.userInfo.userInfoList[0]);
    console.log("🔍 currentUser:", currentUser);
    const [editForm, setEditForm] = useState({
        checkIn: "",
        checkOut: "",
        guests: 1,
    });

    const fetchReservations = async () => {
        try {
            const res = await apiClient.get("/book/list", {
                params: {username: currentUser.username}
            });
            console.log("📦 받아온 예약 데이터:", res.data);

            const formatted = res.data.map((item, index) => ({
                id: item.id || 1000 + index,
                accommodation: item.accomid,
                reserverName: item.username || "사용자",
                checkIn: item.checkindate,
                checkOut: item.checkoutdate,
                guests: item.guests || 1,
                status: item.status || "예약",
                address: item.accom?.address || "주소 없음",
                detailaddr: item.accom?.detailaddr || "",
                description: item.accom?.description || "",
                price: item.totalPrice || null,
                accom: item.accom || {},
            }));
            setReservations(formatted);
            console.log("예약하루가격", reservations[0].accom.pricePerNight);
        } catch (error) {
            console.error("예약 목록 불러오기 실패:", error);
        }
    };

    useEffect(() => {
        if (!currentUser || !currentUser.username) {
            console.log("🚫 currentUser 없음 또는 username 없음");
            return;
        }
        console.log("✅ 예약 정보 불러오기 시작:", currentUser.username);
        fetchReservations();
    }, [currentUser?.username]);

    const toggleDetails = (id) => {
        setSelectedReservationId((prevId) => (prevId === id ? null : id));
    };

    const cancelReservation = async (id) => {
        try {
            await apiClient.put("/book/cancel", {
                id: id,
                username: currentUser.username,
                accomid: reservations.find(item => item.id === id).accommodation
            });
            setReservations((prev) =>
                prev.map((res) =>
                    res.id === id ? {...res, status: "예약취소됨"} : res
                )
            );
            if (selectedReservationId === id) {
                setSelectedReservationId(null);
            }
        } catch (error) {
            console.error("예약 취소 실패:", error);
            alert("예약 취소에 실패했습니다.");
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

    const saveChanges = async (id) => {
        const checkInDate = dayjs(editForm.checkIn);
        const checkOutDate = dayjs(editForm.checkOut);

        if (!checkInDate.isValid() || !checkOutDate.isValid()) {
            alert("날짜 형식이 올바르지 않습니다.");
            return;
        }

        if (checkOutDate.isBefore(checkInDate)) {
            alert("체크아웃 날짜는 체크인 날짜 이후여야 합니다.");
            return;
        }
        const betweenDays = dayjs(editForm.checkOut).diff(dayjs(editForm.checkIn), "day");

        try {
            await apiClient.put("/book/update", {
                id,
                username: currentUser.username,
                accomid: reservations.find((r) => r.id === id).accommodation,
                checkindate: editForm.checkIn,
                checkoutdate: editForm.checkOut,
                totalPrice: betweenDays * reservations.find((r) => r.id === id).accom.pricePerNight

            });
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
            fetchReservations();
            setEditingId(null);
            setSelectedReservationId(null);
        } catch (error) {
            console.error("예약 변경 실패:", error);
            alert("예약 변경에 실패했습니다.");
        }
    };

    const handleEditChange = (e) => {
        const {name, value} = e.target;
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
                        <h3 className="reserve-title-text">{res.accommodation}</h3>
                        <p className="reserve-text">예약자: {res.reserverName}</p>
                        <p className="reserve-text">
                            체크인: {dayjs(res.checkIn).format("YYYY.MM.DD")} / 체크아웃:{" "}
                            {dayjs(res.checkOut).format("YYYY.MM.DD")}
                        </p>
                        <p className="reserve-text">인원: {res.guests}명</p>
                        <p className={`reserve-status ${res.status === "예약완료" ? "completed" : "cancelled"}`}>
                            상태: {res.status}
                        </p>
                        {res.price && <p className="reserve-text">총 금액: {res.price.toLocaleString()}원</p>}

                        <div className="reserve-buttons">
                            <button onClick={() => toggleDetails(res.id)} className="reserve-button">
                                {selectedReservationId === res.id ? "상세 닫기" : "상세 보기"}
                            </button>

                            {res.status === "예약" && (
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
                                <p>
                                    <strong>주소:</strong>{" "}
                                    {res.address} {res.detailaddr}
                                </p>
                                <p><strong>숙소 설명:</strong> {res.description || "설명 없음"}</p>

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
                                            <button onClick={() => setEditingId(null)}
                                                    className="reserve-button cancel">
                                                취소
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <p><strong>예약
                                            기간:</strong> {dayjs(res.checkIn).format("YYYY.MM.DD")} ~ {dayjs(res.checkOut).format("YYYY.MM.DD")}
                                        </p>
                                        <p><strong>인원:</strong> {res.guests}명</p>
                                        {res.price && <p><strong>금액:</strong> {res.price.toLocaleString()}원</p>}
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