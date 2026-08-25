import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";


function CallBackPage() {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {

        const code = searchParams.get('code')

        if (code) {
            console.log("Github gave us this code: ", code);
            navigate('/search')
        }
            
    }, [searchParams, navigate]);

    return (
        <>
            <p>Logging you in.... Please wait.</p>
        </>
    )
}

export default CallBackPage
