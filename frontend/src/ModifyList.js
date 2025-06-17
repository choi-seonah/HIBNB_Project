import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import apiClient from "./util/apiInstance";
import {useDispatch, useSelector} from "react-redux";
import {userAccom} from "./store";

export default function ModifyList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const usernameAccom = useSelector(state => state.accom.list);
    const username = useSelector(state => state.userInfo.userInfoList[0].username);

    useEffect(() => {
        const fetchAccomList = async () => {
            try {
                const response = await apiClient.get("/accom/list/username", {
                    params: {"username": username},
                });
                dispatch(userAccom(response.data));
                console.log(response.data);
            } catch (error) {
                console.error("Failed to fetch username-list:", error);
            }
        };
        fetchAccomList();
    }, [username]);


    return (
        <div className="username-list">
            {usernameAccom.map((item) => (
                <div
                    key={item.id}
                    onClick={() => navigate(`/hosting/update/${item.id}`)}
                >
                    <img
                        src={item.imageUrls[0]}
                        alt={item.address || "숙소 이미지"}
                    />
                    <div className="accom-card-content">
                        <h3>{item.address ? `${item.address}의 ${item.type}` : "정보 없음"}</h3>
                        <p>가격: {(item.pricePerNight || 0).toLocaleString()}원</p>
                        <p>
                            침실: {item.bedrooms || 0} | 침대: {item.beds || 0} |
                            욕실: {item.bathrooms || 0}
                        </p>
                        <p>최대인원: {item.maxcapacity || 0}명</p>
                    </div>
                </div>
            ))}
        </div>
    );
}