import {useNavigate} from "react-router-dom";
import apiClient from "./util/apiInstance";
import {useState} from "react";

export default function ReConfirmPW() {
    const navigate = useNavigate();

    const [username, setUserName]=useState("");
    const [email, setEmail]=useState("");
    const [code, setCode]=useState("");
    const [emailAuthenSent, setEmailAuthenSent] = useState(false); // 인증 상태

    const handleSendEmail=async (e)=>{
        e.preventDefault();
        try{
            const response=await apiClient.get(`http://localhost:8080/email?email=${email}`);

            if(response.data){
                alert("인증번호가 이메일로 전송되었습니다.");
                setEmailAuthenSent(true);
            }
        }catch(error){
            console.error(error);
            alert("오류가 발생했습니다. 다시 시도해주세요 .");
        }
    }

    const handleexample=async (e)=>{
        e.preventDefault();
        try{
            const response=await apiClient.get("http://localhost:8080/re-confirm-pw",{
                params:{username, email, code}
            });

            if(response.data){
                alert(`인증이 완료되었습니다. 비밀번호를 재설정해주세요.`);

                const newPassword=prompt("새 비밀번호를 입력해주세요.");
                if(!newPassword){
                    alert("비밀번호가 입력되지 않았습니다.");
                    return;
                }

                try{
                    const response=await apiClient.put("http://localhost:8080/reset-pw", null, {
                        params:{
                            username,
                            password:newPassword
                        }
                    });

                    if(response.data){
                        alert("비밀번호 재설정을 완료하였습니다.");
                        navigate("/login");
                    }else{
                        alert("비밀번호 재설정에 실패하였습니다.");
                    }

                }catch(error){
                    console.error(error);
                    alert("서버 오류 발생. 다시 시도해주세요.");
                }

            }else{
                alert("인증번호가 일치하지 않거나 정보가 올바르지 않습니다.");
            }

        }catch(error){
            console.error(error);
            alert("오류가 발생했습니다. 다시 시도해주세요.");
        }
    }

    return (
        <>
            <h2>비밀번호 찾기</h2>
            <form onSubmit={handleexample}>
                <label>아이디를 입력해주세요.</label>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e)=>setUserName(e.target.value)}
                /><br/>

                <label>이메일을 입력해주세요. 입력하신 이메일로 인증번호가 전송됩니다.</label><br/>
                <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <button onClick={handleSendEmail}>인증번호 전송</button><br/>

                <label>인증번호를 입력하세요.</label>
                <input
                    type="password"
                    name="code"
                    value={code}
                    onChange={(e)=>setCode(e.target.value)}
                />

                <button type="submit" disabled={!emailAuthenSent}>인증하기</button>
                {/*<button onClick={resetPW} disabled={!emailAuthenSent}>
                    비밀번호 재설정
                </button>*/}
            </form>
        </>
    );
}