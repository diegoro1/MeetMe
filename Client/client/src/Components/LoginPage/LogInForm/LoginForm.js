import style from './LoginForm.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function LoginForm() {
    let [schools, setSchool] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:3001/API/getUniversities')
        .then(res => {
            let current_schools = [];
            for (let index in res.data) {
                current_schools.push(res.data[index]);
                setSchool(current_schools);
                console.log(res.data[index])
            }
            console.log(current_schools);
        })
        .catch(err => console.log(err));
    }, []);
    
    const [user, setUser] = useState({
        email: 'email@email.com',
        password: 'password',
    });

    const [newUser, setNewUser] = useState({
        first_name: "",
        last_name: "",
        gender: "male",
        date_of_birth: "",
        password: "",
        email: "",
        name: "",
    });

    const [createAccount, setCreateAccount] = useState(false);

    function changeEmail(newEmail) {
        setUser(user => ({
            ...user,
            email: newEmail,
        }));
    }

    function changePassword(newPassword) {
        setUser(user => ({
            ...user,
            password: newPassword,
        }));
    }

    function changeFirstName(newName) {
        setNewUser(newUser => ({
            ...newUser,
            first_name: newName
        }));
    }

    function changeLastName(newName) {
        setNewUser(newUser => ({
            ...newUser,
            last_name: newName
        }));
    }

    function changeGender(newGender) {
        setNewUser(newUser => ({
            ...newUser,
            gender: newGender
        }));
    }

    function changeDOB(newDOB) {
        setNewUser(newUser => ({
            ...newUser,
            date_of_birth: newDOB
        }));
    }

    function changeNPassword(newPassWord) {
        setNewUser(newUser => ({
            ...newUser,
            password: newPassWord
        }));
    }

    function changeNEmail(newEmail) {
        setNewUser(newUser => ({
            ...newUser,
            email: newEmail
        }));
    }

    function changeSchool(newName) {
        setNewUser(newUser => ({
            ...newUser,
            name: newName
        }));
    }

    function submitUser() {
        fetch('http://localhost:3001/API/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        .then(res => {
          if (res.status === 200) {
            // redirect user!!!!!!!!
            console.log("correct");
          }
          else if (res.status === 500) {
            alert("User not found... 🥺");  
          }  
        })
    }

    function createNewAccount() {
        console.log(newUser);
        fetch('http://localhost:3001/API/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        })
        .then(res => {
          if (res.status === 200) {
            // redirect user!!!!!!!!
            alert("Account Created");
          }
          else if (res.status === 500) {
            alert("Sorry, we don't want you 🥺");  
          }  
        })
    }

    return (
        <div className={style.form + " shadow"}>
            {!createAccount ? (
                <>
                    <label htmlFor="">
                        <input className={style.inputText} name="email" type="text" placeholder="Email"
                        onChange={e => changeEmail(e.target.value)}/>
                    </label>
                    <label htmlFor="">
                        <input className={style.inputText} name="password" type="password" placeholder="Password"
                        onChange={e => changePassword(e.target.value)}/>
                    </label>
                    <button className={style.loginButton + " " + style.inputText} value="Login" 
                    onClick={submitUser}>Login</button>
                    <button className={style.createButton + " " + style.inputText} onClick={()=> setCreateAccount(true)}>Create Account</button>
                </>
            ) : (
                <>
                <label htmlFor="">
                    <input className={style.inputText} name="f_name" type="text" placeholder="First Name"
                    onChange={e => changeFirstName(e.target.value)}/>
                </label>
                <label htmlFor="">
                    <input className={style.inputText} name="l_name" type="text" placeholder="Last Name"
                    onChange={e => changeLastName(e.target.value)}/>
                </label>
                <label htmlFor="">
                    <select className={style.inputText} value={newUser.gender} onChange={e => changeGender(e.target.value)}>
                        <option name="Male">Male</option>
                        <option name="Female">Female</option>
                        <option name="Other">Other</option>
                    </select>
                </label>
                <label htmlFor="">
                    <input className={style.inputText} name="dob" type="text" placeholder="DOB"
                    onChange={e => changeDOB(e.target.value)}/>
                </label>
                <label htmlFor="">
                    <input className={style.inputText} name="n_password" type="password" placeholder="n_password"
                    onChange={e => changeNPassword(e.target.value)}/>
                </label>
                <label htmlFor="">
                    <input className={style.inputText} name="n_email" type="text" placeholder="n_email"
                    onChange={e => changeNEmail(e.target.value)}/>
                </label>
                <select className={style.inputText} value={newUser.name} onChange={e => changeSchool(e.target.value)}>
                        {schools.map(school => {
                            return <option name="name" key={school.university_uuid}>{school.name}</option>
                        })}
                </select>
                <button className={style.loginButton + " " + style.inputText} value="Create User" 
                    onClick={createNewAccount}>Create User</button>
                <button className={style.createButton + " " + style.inputText} onClick={() => setCreateAccount(false)}>Cancel</button>
                </>
            )}
        </div>
    )
}
