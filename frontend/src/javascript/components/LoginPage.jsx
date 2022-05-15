import {GoogleLogin} from 'react-google-login'
import {useNavigate} from 'react-router-dom';

function Login() {

    let navigate = useNavigate();

    const onSuccess = (res) => {
        console.log("Login successful: ", res.profileObj)
        sessionStorage.setItem("user", res.profileObj);
        navigate("/");
    }

    const onFailure = (res) => {
        console.log("Login failed: ", res)
    }

    return (
        <div id="signInButton">
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}

export default Login;