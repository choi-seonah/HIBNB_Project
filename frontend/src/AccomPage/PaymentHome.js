import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import '../index.css';

export default function PaymentHome(){
    const navigate = useNavigate();
    const location = useLocation();
    const [reservation, setReservation] = useState(null);

    useEffect(() => {
        if (location.state) {
            setReservation(location.state);
        } else {
            setReservation({
                accommodation: "경기 가평 펜션",
                checkIn: "2025-07-01",
                checkOut: "2025-07-03",
                guests: 2,
                price: "₩200,000",
            });
        }
    }, [location.state]);

    const handlePayment = () => {
        const prev = JSON.parse(localStorage.getItem("reservations")) || [];

        const newReservation = {
            id: Date.now(),
            accommodation: reservation.accommodation,
            reserverName: reservation.reserverName || "홍길동",
            checkIn: reservation.checkIn,
            checkOut: reservation.checkOut,
            guests: reservation.guests,
            status: "예약완료",
            address: reservation.address || "주소 정보 없음",
            description: reservation.description || "숙소 설명 없음",
            price: reservation.price,
        };

        localStorage.setItem("reservations", JSON.stringify([...prev, newReservation]));
        alert("결제가 완료되었습니다!");
        navigate("/mypage/reservations");
    };

    if (!reservation) return <p>예약 정보를 불러오는 중입니다...</p>;

    return (
        <div style={{ padding: "20px" }}>
            <h2>결제하기</h2>
            <p><strong>숙소:</strong> {reservation.accommodation}</p>
            <p><strong>체크인:</strong> {reservation.checkIn}</p>
            <p><strong>체크아웃:</strong> {reservation.checkOut}</p>
            <p><strong>인원:</strong> {reservation.guests}</p>
            <p><strong>총 금액:</strong> {reservation.price}</p>
            <button
                onClick={handlePayment}
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#FF5A5F",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    marginTop: "20px",
                }}
            >
                결제하기
            </button>
        </div>
    );
}