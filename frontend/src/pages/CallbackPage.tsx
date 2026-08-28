import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";


function CallBackPage() {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {

        const code = searchParams.get('code')

        async function loginWithFastAPI() {
            
            if (code) {

                const response = await fetch("http://localhost:8000/users/auth/github", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ code: code })
                });

                const data = await response.json()

                if (data.access_token) {
                    localStorage.setItem("token", data.access_token);
                    console.log("Token Saved");

                    navigate("/search")
                } else {
                    console.error("Login Failed", data)
                }

            }

        }

        loginWithFastAPI();
            
    }, [searchParams, navigate]);

    return (
        <>
            <p>Logging you in.... Please wait.</p>
        </>
    )
}

export default CallBackPage
