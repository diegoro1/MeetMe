import NavBar from '../Shared/NavBar';
import SidePanel from './SidePanel';
import CreateRSOForm from './CreateRSOForm';
import { useState, useEffect } from 'react';
import style from './RsosPage.module.css';

export default function RsosPage() {
    const [createNewRso, setCreateRso] = useState(false);

  return (
    <>
        <NavBar />
        <div className={style.midContainer}>
            <SidePanel setCreateRso={setCreateRso} />
            { createNewRso ? (<CreateRSOForm setCreateRso={setCreateRso}/>):(<p>YO!</p>) }
        </div>
    </>
  )
}
