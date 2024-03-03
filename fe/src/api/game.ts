import { API_ROUTES, API_URL } from "../constants/api.constant";

export const getRandomQuestion = async (username: string) => {
  const res = await fetch(
    `${API_URL}${API_ROUTES.getRandomQuestions}?Username=${username}`
  );
  return await res.json();
};

export const answerQuestion = async (
  username: string,
  questionId: number,
  answerId: number
) => {
  const res = await fetch(
    `${API_URL}${API_ROUTES.answerQuestion}?Username=${username}&QuestionId=${questionId}&AnswerId=${answerId}`,
    {
      method: "POST",
    }
  );
  return res;
};

export const getRandomLixi = async (username: string) => {
  const res = await fetch(`${API_URL}${API_ROUTES.randomLixi}?Username=${username}`, {
    method: 'POST'
  });
  const data = await res.json();
  return data;
}