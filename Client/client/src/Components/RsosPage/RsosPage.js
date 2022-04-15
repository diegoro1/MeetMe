import NavBar from '../Shared/NavBar';
import SidePanel from './SidePanel';
import { useState, useEffect } from 'react';

export default function RsosPage() {
    const [createNewRso, setCreateRso] = useState(false);

  return (
    <>
        <NavBar />
        <SidePanel />
        { createNewRso ? (<>hello</>):(<>YO!</>) }
    </>
  )
}
