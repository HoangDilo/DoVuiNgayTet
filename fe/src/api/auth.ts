import { API_ROUTES, API_URL, HEADER } from "../constants/api.constant"

export const login = async (username: string, password: string) => {
    const res = await fetch(`${API_URL}${API_ROUTES.login}`, {
        method: 'POST',
        headers: HEADER,
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    return res;
}

export const signup = async () => {
    
}