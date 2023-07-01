import {useAuth0} from "@auth0/auth0-react";

export default function Auth0() {
    const {loginWithRedirect, isAuthenticated, logout, user} = useAuth0()

    return (<main>
        {!isAuthenticated ? (<button
            onClick={() => loginWithRedirect()}
        >Login</button>) : (<div>
                <button
                    onClick={() => logout()}
                >Logout
                </button>
                {Object.entries(user).map((e) => <li key={e[0]}>{e[0]} : {e[1]}</li>)}
            </div>

        )}
    </main>)
}