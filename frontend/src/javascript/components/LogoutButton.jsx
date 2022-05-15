import { GoogleLogout } from "react-google-login";
import {useNavigate} from 'react-router-dom';

function Logout() {
    let navigate = useNavigate();

    const onSuccess = () => {
        console.log("Log out successful");
        sessionStorage.removeItem("user");
        navigate("/login")
    }

    return (
        <div id="signOutButton">
            <GoogleLogout 
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText={'Logout'}
            onLogoutSuccess={onSuccess}
            />
        </div>
    )
}

export default Logout;