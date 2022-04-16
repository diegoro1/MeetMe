import React from 'react'
import logo from '../../Assets/MeetMeLogo.png';
import style from './NavBar.module.css';
import { Navigate, useNavigate } from 'react-router-dom';

export default function NavBar() {
    const navigate = useNavigate();
    function goToRSOs() {
        navigate('/rsos');
    }

    return (
        <nav>
            <img onClick={goToRSOs} className={style.logo} src={logo} alt="logo"/>
        </nav>
    )
}
