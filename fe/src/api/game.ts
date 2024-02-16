import { API_ROUTES, API_URL } from "../constants/api.constant"

export const getRandomQuestion = async (username: string) => {
    const res = await fetch(`${API_URL}${API_ROUTES.getRandomQuestions}?Username=${username}`)
    return await res.json()
}