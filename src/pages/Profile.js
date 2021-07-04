import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './Profile.css'

function Profile() {
    const [privateContent, setPrivateContent] = useState({});

    const { user } = useContext(AuthContext);
    console.log(user); // geeft { user: { username: 'string waarde', email: 'string waarde', id: 'string waarde', country: 'string waarde' }

    useEffect(() => {
        const token = localStorage.getItem('token');

        async function getPrivateContent() {
            try {
                const result = await axios.get('http://localhost:3000/660/private-content', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });

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
            <h1>Profielpagina</h1>
            <section>
                <h2>Gegevens</h2>
                {user &&
                <>
                    <p><strong>Voornaam:</strong> {user.voornaam}</p>
                    <p><strong>Achternaam:</strong> {user.achternaam}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </>
                }
                <form method="post" action="http://localhost:15425/api/users/upload/files/" encType="multipart/form-data">
                    <div>
                        <h3>Voor het huren van een elektrische MTB is een kopie van een ID bewijs vereist!</h3>
                        <label>ID kopie upload</label> <input type="file" id="file" name="file"/>
                    </div>
                    <input type="submit" value="Uploaden"/>
                </form>
            </section>

            {privateContent &&
            <section>
                <h2>Afgeschermde content voor ingelogde gebruikers</h2>
                <h4>{privateContent.title}</h4>
                <p>{privateContent.content}</p>
            </section>
            }
            <p>Terug naar de <Link to="/">Homepagina</Link></p>
            </div>
            </div>
            </>
    );
}

export default Profile;