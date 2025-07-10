import "../css/LoginCard.css"
import GoogleLoginButton from './GoogleLoginButton'
export const LoginCard = ({onLogin}) => {
    return (
        <div className='login-wrap-screen'>
            <div className='glass-card'>
                <GoogleLoginButton onLogin={onLogin} />
            </div>
        </div>
    )
}
