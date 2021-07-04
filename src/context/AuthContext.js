import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router-dom';

export const AuthContext = createContext({});


function AuthContextProvider({ children }) {
    const [ authState, setAuthState ] = useState({
        user: null,
        status: 'pending',
    })
    // const [tokenValidation, setTokenValidation] =  useState(false);

    const history = useHistory();

    function isTokenValid() {
        const jwtToken = localStorage.getItem('token');

        if(!jwtToken) return false;

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
        // if (token && isTokenValid()) {
        //     setTokenValidation(true);
        // }
        if(!authState.user && isTokenValid()) {
            const decodedToken = jwt_decode(token);

            fetchUserData(token, decodedToken.sub);
        } else {
            setAuthState({
                user: null,
                status: 'done',
            });
        }

    }, []);



    function login(jwtToken) {
        console.log(jwtToken)
        localStorage.setItem('token', jwtToken);
        const decodedToken = jwt_decode(jwtToken);
        console.log(decodedToken);
        const userId = decodedToken.sub;

        fetchUserData(jwtToken, userId);
    }

    async function fetchUserData(token, id) {
        console.log(token)
        try {
            const result = await axios.get(`http://localhost:15425/authenticated`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(result);

            setAuthState({
                user: {

                    voornaam: result.data.voornaam,
                    achternaam: result.data.achternaam,
                    email: result.data.email,
                    id: result.data.id,
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
        localStorage.removeItem("token");
        setAuthState({user: null, status: "done"});
        history.push("/");
        console.log('logout!');
    }

    // We hebben de gebruikersdata nodig, functies voor in- en uitloggen, de status van data-ophalen en, mocht het fout gaan, errors!
    // Omdat authState onderdeel willen maken van het data object (en geen object in een object) gebruiken we de spread-operator (...)
    const data = {
        ...authState,
        login: login,
        logout: logout,
        isTokenValid: isTokenValid,
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