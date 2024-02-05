import { API_ROUTES, API_URL, HEADER } from "../constants/api.constant";
import { IQuestion } from "../type/admin";

export const isAdmin = async (username: string) => {
  const res = await fetch(`${API_URL}${API_ROUTES.isAdmin}?username=${username}`);
  return res.status === 200;
}

export const getAllQuestion = async () => {
  const res = await fetch(`${API_URL}${API_ROUTES.getQuestions}`);
  const data = await res.json();
  return data;
};

export const createQuestion = async (username: string, question: IQuestion) => {
  const res = await fetch(`${API_URL}${API_ROUTES.createQuestion}`, {
    method: "POST",
    headers: HEADER,
    body: JSON.stringify({
      username: username,
      ...question,
    }),
  });
  return res;
};

export const editQuestion = async (
  username: string,
  questionId: number,
  newQuestion: string
) => {
  const res = await fetch(`${API_URL}${API_ROUTES.editQuestion}`, {
    method: "PUT",
    headers: HEADER,
    body: JSON.stringify({
      username: username,
      questionId: questionId,
      questionText: newQuestion,
    }),
  });
  return res;
};

export const deleteQuestion = async (username: string, questionId: number) => {
  const res = await fetch(`${API_URL}${API_ROUTES.deleteQuestion}`, {
    method: "DELETE",
    headers: HEADER,
    body: JSON.stringify({
      username: username,
      questionId: questionId,
    }),
  });
  return res;
};

export const editAnswer = async (username: string, answerId: number, answerText: string, isCorrect: boolean) => {
  const res= await fetch(`${API_URL}${API_ROUTES.editAnswer}`, {
    method: 'PUT',
    headers: HEADER,
    body: JSON.stringify({
      username: username,
      answerId: answerId,
      answerText: answerText,
      isCorrect: isCorrect
    })
  })
  return res;
}