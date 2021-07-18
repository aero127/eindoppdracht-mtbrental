import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './Profile.css'

function Profile() {
    const [privateContent, setPrivateContent] = useState({});
    const [users, setUsers] = useState([]);
    const { logout } = useContext(AuthContext);

    const { user } = useContext(AuthContext);
    console.log(user); // geeft { user: { username: 'string waarde', email: 'string waarde', id: 'string waarde', country: 'string waarde' }

    useEffect(() => {
        const token = localStorage.getItem('token');

        async function getPrivateContent() {
            try {
                const result = await axios.get('http://localhost:15425/users', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
                setUsers(result.data)
                console.log(result.data);
                setPrivateContent(result.data);
            } catch(e) {
                console.error(e);
            }
        }

        getPrivateContent();
    }, []);

    return (
        <>
            <div className="profile-page">
                <div className="profile-container">
                    {console.log(user)}
            <h1>Mijn gegevens</h1>
            {/*<section>*/}
                {user.authority === "ROLE_USER" ? (
                <>
                    <h2>Gegevens</h2>
                    <p>Welkom terug <strong>{user.username}!</strong></p>
                    <p>Volledige naam: <strong>{user.voornaam} {user.achternaam}</strong></p>
                    <p>Jouw emailadres is: <strong>{user.email}</strong></p>
                </>
                    ) : (
                        <></>
                )}
                {/*}*/}
                {user.authority === "ROLE_ADMIN" ? (
                    <>
                        <div className="userlist-container">
                        <h3>Lijst met gebruikers:</h3>
                        <ul>
                            {users.map(user => {
                                return <li>{user.username}, {user.firstName} {user.lastName}, {user.email}</li>
                            })}
                        </ul>
                        </div>
                    </>
                ) : (
                    <></>
                )}
                <form method="post" action="http://localhost:15425/api/upload/files/" encType="multipart/form-data">
                    <div>
                        <h3>Voor het huren van een elektrische MTB is een kopie van een ID bewijs vereist!</h3>
                        <label>ID kopie upload</label> <input type="file" id="file" name="file"/>
                    </div>
                    <div>
                        <label>Title</label> <input type="text" id="title" name="title"/>
                    </div>
                    <div>
                        <label>Description</label> <input type="text" id="description" name="description"/>
                    </div>
                    <input type="submit" value="Uploaden"/>
                </form>
            {/*</section>*/}

            {privateContent &&
            <section>
                {/*<h2>Afgeschermde content voor ingelogde gebruikers</h2>*/}
                {/*<h4>{privateContent.name}</h4>*/}
                {/*<p>{privateContent.content}</p>*/}
            </section>
            }
            <p>Terug naar de <Link to="/">Homepagina</Link></p>
                    <button id="logout-button" onClick={logout}>Uitloggen</button>
            </div>
            </div>
            </>
    );
}

export default Profile;