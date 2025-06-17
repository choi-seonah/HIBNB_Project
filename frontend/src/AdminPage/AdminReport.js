import React, { useEffect, useState } from 'react';
import apiClient from "../util/apiInstance";
import '../index.css';

const AdminReportPage = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    // 신고 목록 불러오기
    const fetchReports = async () => {
        try {
            const res = await apiClient.get('/report/findall', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            console.log('report : ', res.data);
            setReports(res.data);
        } catch (err) {
            alert('신고 목록을 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const updateStatus = async (reportid, status) => {
        try {
            const query = new URLSearchParams({ reportid, status }).toString();
            const res = await apiClient.put(`/report/updatestatus?${query}`, null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });

            console.log('state response : ', res.data);
            alert('상태가 변경되었습니다.');
            fetchReports();
        } catch (err) {
            console.error('에러 발생:', err);
            alert('상태 변경에 실패했습니다.');
        }
    };


    if (loading) return <div>로딩 중...</div>;

    return (
        <div>
            <h2>관리자 신고 목록</h2>
            <table border="1" cellPadding="5">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>숙소ID</th>
                    <th>예약ID</th>
                    <th>신고자</th>
                    <th>유형</th>
                    <th>내용</th>
                    <th>생성일</th>
                    <th>상태</th>
                    <th>상태 변경</th>
                </tr>
                </thead>
                <tbody>
                {reports.map(r => (
                    <tr key={r.id}>
                        <td>{r.id}</td>
                        <td>{r.accomid}</td>
                        <td>{r.bookid}</td>
                        <td>{r.username}</td>
                        <td>{r.type}</td>
                        <td>{r.comment}</td>
                        <td>{new Date(r.createdAt).toLocaleString()}</td>
                        <td>{r.status || 'PENDING'}</td>
                        <td>
                            <select
                                value={r.status || 'PENDING'}
                                onChange={(e) => updateStatus(r.id, e.target.value)}
                            >
                                <option value="PENDING">대기</option>
                                <option value="APPROVED">승인</option>
                                <option value="REJECTED">거부</option>
                            </select>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminReportPage;
