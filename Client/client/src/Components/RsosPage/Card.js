import styles from './Card.module.css';
import backg from "../../Assets/ucf-2022.jpeg";
import { useState } from 'react';

export default function Card(props) {
    const [memberCount, setMemberCount] = useState(5);
    let name = props.rsoName;
    let isActive = memberCount > 4 ? "Active" : "Not Active";
    let buttonText = memberCount > 4 ? "Leave RSO" : "Join RSO"


    function decrementMember() {
        setMemberCount(memberCount - 1);
    }

    function increment() {
        setMemberCount(memberCount + 1);
    }

    return (
        <div className={styles.card}>
            <div className={styles.topCard}>

            </div>
            <div className={styles.bottomCard}>
                <h3 className={styles.title}>{name}</h3>
                <div className={styles.info}>
                    <div>{memberCount}</div>
                    <div>{isActive}</div>
                </div>
                <div className={styles.buttonContainer}>
                    <button onClick={memberCount > 4 ? decrementMember : increment}>{ buttonText }</button>
                </div>
            </div>
        </div>
    )
}
