import styles from './DashBoard.module.css';
import { useState, useEffect, useLayoutEffect } from 'react';
import Card from './Card';
import axios from 'axios';

export default function DashBoard() {
    const [rsos, setRsos] = useState([{
        
    }]);

    useLayoutEffect(() => {
        axios.get('http://localhost:3001/API/getAllRSOs')
        .then(res => {
            let current_schools = [];
            for (let index in res.data) {
                current_schools.push({...res.data[index], members: 5});
                setRsos(current_schools);
            }
            //console.log(current_schools);
        })
        .catch(err => console.log(err));
    }, []);

    return (
    <div className={styles.container}>
        <h1>RSO's</h1>
        <h3>A collection of RSO's</h3>
        <div className={styles.cardHolder}>
        {/* {schools.map(school => {
                            return <option name="name" key={school.university_uuid}>{school.name}</option>
                        })} */}
            {
            rsos.map(rso => {
                console.log("AHHHHHHHHHHHHHHHHH" + rso.name + " " + rso.members + " " + rso.rso_uuid);
                return <Card key={rso.rso_uuid} rsoName={rso.name} rsoMembers={rso.members}/>
            })}
        </div>
    </div>
    )
}
