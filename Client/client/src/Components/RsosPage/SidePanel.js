import style from './SidePanel.module.css';

export default function SidePanel() {
  return (
    <div className={style.container}>
        <h1>RSOS</h1>
        <ul className={style.rsoUl}>
            <li className={style.rsoLi}>RSOS</li>
            <li className={style.rsoLi}>Public Events</li>
            <li className={style.rsoLi}>Private Events</li>
            <li className={style.rsoLi}>RSO Events</li>
            <li className={style.rsoLi}>Universities</li>
        </ul>
        <div className={style.buttonContainer}>
            <button>Create RSO</button>
        </div>
    </div>
  )
}
