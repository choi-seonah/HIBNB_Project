import MainSearch from "./MainSearch";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import apiClient from "../util/apiInstance";
import {useEffect, useState} from "react";

export default function Recommend(){
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const [top5, setTop5] = useState([]);

    useEffect(() => {
        // 페이지 로딩 시 한 번만 실행됨
        apiClient.get("http://localhost:8080/accom/list/random5")
            .then(response => {
                console.log(response.data);
                setTop5(response.data); // 백엔드에서 받은 AccomDTO 리스트
            })
            .catch(error => {
                console.error("Random5 데이터 불러오기 실패:", error);
            });
    }, []);


    return(
        <>
            <MainSearch/>
            <h2>📊 추천 숙소 TOP 5</h2>
            <div className="top5-container">
                {top5.map((item) => (
                    <div key={item.id} className="top5-card">
                        <h3>{item.hostname}의 {item.type}</h3>
                        <img
                            src={item.imageUrls?.[0] || "/default.jpg"}
                            alt={item.hostname}
                            onClick={() => navigate(`/accom/${item.id}`)}
                        />
                        <p>주소 : {item.address}</p>
                        <p>가격 : {item.pricePerNight}/박</p>
                        <p>침실: {item.bedrooms} | 침대: {item.beds} | 욕실: {item.bathrooms}</p>
                        <p>⭐ 평점: {item.average ? item.average.toFixed(1) : "없음"}</p>
                    </div>
                ))}
            </div>
        </>
    );
}