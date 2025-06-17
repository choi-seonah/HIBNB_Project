import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useDispatch} from "react-redux";

// export default function HibnbReserve(){
//     const navigate = useNavigate();
//
//
//     const [reservationInfo, setReservationInfo] = useState({
//
//         checkIn: "2025-07-15",
//         checkOut: "2025-07-17",
//         guests: 3,
//         price: "165000",
//     });
//
//     const handleReserve = () =>{
//         navigate("/payment", {state: reservationInfo});
//     };
//
//     return(
//         <div>
//             <h1>확인 및 결제</h1>
//             <hr/>
//             <p><strong>체크인:</strong> {reservationInfo.checkIn}</p>
//             <p><strong>체크아웃:</strong> {reservationInfo.checkOut}</p>
//             <p><strong>인원:</strong> {reservationInfo.guests}</p>
//             <p><strong>총 금액:</strong> {reservationInfo.price}</p>
//             <button onClick={handleReserve}>예약하기</button>
//         </div>
//     )
// }