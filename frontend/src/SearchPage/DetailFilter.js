import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {resetFilters, setFilters, setAccom} from "../store";
import '../index.css';

export default function DetailFilter() {
    const dispatch = useDispatch();
    const filters = useSelector((state) => state.search.filters);
    const searchResults = useSelector((state) => state.search.searchResults);
    const [isBoxOpen, setIsBoxOpen] = useState(false);
    const typeOptions = ["아파트", "펜션", "오피스텔", "원룸", "게스트하우스", "빌라", "리조트"];

    const handleFilterChange = (filterName, value) => {
        if (filterName === "type") {
            dispatch(setFilters({type: value}));
        } else {
            dispatch(setFilters({[filterName]: Number(value)}));
        }
    };

    const handleApplyFilters = () => {
        if (searchResults) {
            const filtered = searchResults.filter((item) => {
                return (
                    (!filters.type || item.type === filters.type) &&
                    (!filters.bedrooms || item.bedrooms >= filters.bedrooms) &&
                    (!filters.beds || item.beds >= filters.beds) &&
                    (!filters.bathrooms || item.bathrooms >= filters.bathrooms) &&
                    (!filters.maxcapacity || item.maxcapacity >= filters.maxcapacity)
                );
            });
            dispatch(setAccom(filtered));
        }
        setIsBoxOpen(false);
    };

    const handleResetFilters = () => {
        dispatch(resetFilters());
        dispatch(setAccom(searchResults));
    };

    return (
        <>

            <div className="detail-filter">


                    <div className="filter-allSection">

                        <div className="filter-section-type">
                            <h4 className={"filter-section-title"}>숙소 유형</h4>
                            {typeOptions.map((type) => (
                                <label key={type}>
                                    <input
                                        type="checkbox"
                                        value={type}
                                        checked={filters.type === type}
                                        className={"filter-section-type-input"}
                                        onChange={(e) => handleFilterChange("type", e.target.value)}
                                    />
                                    {type}<br/>
                                </label>
                            ))}
                        </div>

                        <div className="filter-section">
                            <h4 className={"filter-section-title"}>침실 방 개수</h4>
                            <input
                                type="number"
                                value={filters.bedrooms}
                                min="0"
                                className={"filter-section-input"}
                                onChange={(e) => handleFilterChange("bedrooms", Number(e.target.value))}
                            />
                        </div>
                        <div className="filter-section">
                            <h4 className={"filter-section-title"}>침대 개수</h4>
                            <input
                                type="number"
                                value={filters.beds}
                                min="0"
                                className={"filter-section-input"}
                                onChange={(e) => handleFilterChange("beds", Number(e.target.value))}
                            />
                        </div>
                        <div className="filter-section">
                            <h4 className={"filter-section-title"}>욕실 개수</h4>
                            <input
                                type="number"
                                value={filters.bathrooms}
                                min="0"
                                className={"filter-section-input"}
                                onChange={(e) => handleFilterChange("bathrooms", Number(e.target.value))}
                            />
                        </div>
                        <div className="filter-section">
                            <h4 className={"filter-section-title"}>최대 수용 인원</h4>
                            <input
                                type="number"
                                value={filters.maxcapacity}
                                min="1"
                                className={"filter-section-input"}
                                onChange={(e) => handleFilterChange("maxcapacity", Number(e.target.value))}
                            />
                        </div>
                        <div>
                            <button className="filter-buttons" onClick={handleApplyFilters}>적용</button>
                            <button className="filter-buttons" onClick={handleResetFilters}>초기화</button>
                        </div>
                    </div>

            </div>
        </>
    );
}