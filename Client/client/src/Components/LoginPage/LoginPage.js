import style from "./LoginPageCSS.module.css";
import LoginForm from "./LogInForm/LoginForm";
import logo from "../../Assets/MeetMeLogo.png";

export default function LoginPage() {
  return (
    <div className={style.content}>
        <div className={style.container}>
            <div className={style.textContent}>
                <div className={style.logo}><img src={logo} alt="logo"/></div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
            </div>
            <LoginForm />
        </div>
    </div>
  )
}
