import style from './LoginForm.module.css';

export default function LoginForm() {
  return (
    <div className={style.form + " shadow"}>
        <label htmlFor="">
            <input className={style.inputText} name="email" type="text" placeholder="Email"/>
        </label>
        <label htmlFor="">
            <input className={style.inputText} name="password" type="text" placeholder="Password"/>
        </label>
        <input className={style.loginButton + " " + style.inputText} type="submit" value="Login"/>
        <button className={style.createButton + " " + style.inputText} >Create Account</button>
    </div>
  )
}
