import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router-dom';

export const AuthContext = createContext({});


function AuthContextProvider({ children }) {
    const [ authState, setAuthState ] = useState({
        user: null,
        status: 'pending',
        upload: null,
    })

    const history = useHistory();

    function isTokenValid() {
        const jwtToken = localStorage.getItem('token');

        if(!jwtToken) return false;

        const decodedToken = jwt_decode(jwtToken);
        const expirationUnix = decodedToken.exp;

        const now = new Date().getTime();
        const currentUnix = Math.round(now / 1000);

        const isTokenStillValid = expirationUnix - currentUnix > 0;

        return isTokenStillValid;
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!authState.user && isTokenValid()) {
            const decodedToken = jwt_decode(token);

            fetchUserData(token, decodedToken.sub);
        } else {
            setAuthState({
                user: null,
                status: 'done',
                upload: null
            });
        }

    }, []);



    function login(jwtToken) {
        localStorage.setItem('token', jwtToken);
        const decodedToken = jwt_decode(jwtToken);
        const userId = decodedToken.sub;

        fetchUserData(jwtToken, userId);
    }

    async function fetchUserData(token, id) {
        try {
            const result = await axios.get(`http://localhost:15425/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });

            setAuthState({
                user: {

                    username: result.data.username,
                    voornaam: result.data.firstName,
                    achternaam: result.data.lastName,
                    email: result.data.email,
                    authority: result.data.authorities[0].authority,
                },
                status: 'done',
                upload: result.data.identification,
            });

            history.push('/profile');
        } catch(e) {
            console.error(e);
        }
    }

    function logout() {
        localStorage.removeItem("token");
        setAuthState({user: null, status: "done", upload: null});
        history.push("/");
    }


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