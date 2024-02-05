export const API_ROUTES = {
    login: 'User/Login',
    register: 'User/Register',
    isAdmin: 'User/CheckIsAdmin',
    getQuestions: 'Question/QuestionList',
    createQuestion: 'Question/CreateQuestionAndAnswers',
    editQuestion: 'Question/EditQuestion',
    deleteQuestion: 'Question/DeleteQuestion',
    editAnswer: 'Answer/EditAnswer',
}

export const API_URL = import.meta.env.VITE_API_URL

export const HEADER = {
    "Content-Type": "application/json",
}