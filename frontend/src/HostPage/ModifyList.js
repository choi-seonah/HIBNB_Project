import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import apiClient from "../util/apiInstance";
import {useDispatch, useSelector} from "react-redux";
import {userAccom} from "../store";
import '../index.css';

export default function ModifyList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const usernameAccom = useSelector(state => state.accom.list);
    const username = useSelector(state => state.userInfo.userInfoList?.[0]?.username);
    const validList = Array.isArray(usernameAccom) ? usernameAccom : [];

    useEffect(() => {
        const fetchAccomList = async () => {
            try {
                const response = await apiClient.get("/accom/list/username", {
                    params: {"username": username},
                });
                console.log((response.data))
                dispatch(userAccom(response.data));
            } catch (error) {
                console.error("Failed to fetch username-list:", error);
            }
        };
        fetchAccomList();
    }, [username]);

    return (
        <div className="username-list">
            <h2 className="login-form__title">숙소 수정</h2>
            {validList.length > 0 ? (
                validList.map((item) => (
                    <div
                        className="accom-card"
                        key={item.id}
                        onClick={() => navigate(`/hosting/update/${item.id}`)}
                    >
                        <img
                            className="accom-img"
                            src={Array.isArray(item.imageUrls) && item.imageUrls.length > 0 ? item.imageUrls[0] : ""}
                            alt={item.address || "숙소 이미지"}
                        />
                        <div className="accom-card-content">
                            <h3>{item.address ? `${item.address}의 ${item.type}` : "정보 없음"}</h3>
                            <p>가격: {(item.pricePerNight || 0).toLocaleString()}원</p>
                            <p>
                                침실: {item.bedrooms || 0} | 침대: {item.beds || 0} | 욕실: {item.bathrooms || 0}
                            </p>
                            <p>최대인원: {item.maxcapacity || 0}명</p>
                        </div>
                    </div>
                ))
            ) : (<p>호스트 내역이 없습니다.</p>)}
        </div>
    );
}