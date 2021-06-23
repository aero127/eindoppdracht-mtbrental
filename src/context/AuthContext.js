import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router-dom';

export const AuthContext = createContext({});

// STAPPENPLAN CONTEXT INRICHTEN (3)
// - [x] Bedenk welke data je in de context beschikbaar moet stellen
// - [x] Maak de lege functies voor login en logOut
// - [x] Maak de state aan voor de gebruikersdata en de statusdata (user => null en status => 'pending')
// - [x] Maak ook alvast een useEffect functie die de status op 'done' zet als de app gerefreshed wordt (mounting cycle)
// - [x] Zorg ervoor dat we alleen de applicatie (dus de children) laten zien als de status op 'done' staat
// - [x] Plaats de state en lege functies in het data object

function AuthContextProvider({ children }) {
    const [ authState, setAuthState ] = useState({
        user: null,
        status: 'pending',
    })

    const history = useHistory();

    function isTokenValid(jwtToken) {
        const decodedToken = jwt_decode(jwtToken);
        const expirationUnix = decodedToken.exp; // let op: dit is een UNIX timestamp

        const now = new Date().getTime(); // dit is een javascript timestamp
        const currentUnix = Math.round(now / 1000); // nu is het ook een UNIX timestamp

        // Als er nog seconden over zijn wanneer we "nu" aftrekken van de expiratiedatum is hij nog geldig
        const isTokenStillValid = expirationUnix - currentUnix > 0;

        return isTokenStillValid;
    }

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(!authState.user && token && isTokenValid(token)) {
            const decodedToken = jwt_decode(token);

            fetchUserData(token, decodedToken.sub);
        } else {
            setAuthState({
                user: null,
                status: 'done',
            });
        }

    }, []);

    // STAPPENPLAN CONTEXT LOGIN LOGICA (6)
    // 1. [x] Zorg ervoor dat de inlogfunctie uit de context de JWT token kan ontvangen
    // 2. [x] Zet de token in de local storage
    // 3. [x] Haal alle belangrijke informatie uit de token (dit is voor iedere situatie anders! Sommige backends sturen direct de gebruikersdata mee terug!)
    //    - [x] Installeer jwt-decode
    //    - [x] Importeer jwt-decode
    //    - [x] Decode de token en en haal de user id eruit (die hebben we in ons geval nodig voor de gebruikersdata)
    // 4. [x] Haal de gebruikersgegevens op
    //    - [x] Importeer axios
    //    - [x] Maak een aparte asynchrone functie (deze hebben we straks vaker nodig!)
    //    - [x] Roep die functie aan vanuit de login functie
    //    - [x] Maak een try / catch blok
    //    - [x] In de try: maak een axios GET request naar het eindpoint http://localhost:3000/600/users/${id} en stuur de token mee
    //    - [x] De data die we terugkrijgen zetten we in de state, en daarmee ook in de context (user: al die data en status: 'done')
    //    - [x] Link gebruiker door naar de profielpagina

    function login(jwtToken) {
        console.log(jwtToken)
        localStorage.setItem('token', jwtToken);
        const decodedToken = jwt_decode(jwtToken);
        console.log(decodedToken);
        const userId = decodedToken.sub;

        fetchUserData(jwtToken, userId);
    }

    async function fetchUserData(token, id) {
        try {
            const result = await axios.get(`http://localhost:3000/600/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(result);

            setAuthState({
                user: {
                    username: result.data.username,
                    email: result.data.email,
                    id: result.data.id,
                    country: result.data.country,
                    // als je ook rollen hebt, plaats je die er ook bij!
                },
                status: 'done',
            });

            history.push('/profile');
        } catch(e) {
            console.error(e);
        }
    }

    function logout() {
        console.log('logout!');
    }

    // We hebben de gebruikersdata nodig, functies voor in- en uitloggen, de status van data-ophalen en, mocht het fout gaan, errors!
    // Omdat authState onderdeel willen maken van het data object (en geen object in een object) gebruiken we de spread-operator (...)
    const data = {
        ...authState,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={data}>
            {authState.status === 'pending'
                ? <p>Loading...</p>
                : children
            }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;