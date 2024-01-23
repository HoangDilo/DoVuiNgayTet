export interface ILoginResponseData {
    message: string;
}

export interface IAnswer {
    answerId: number;
    answerText: string;
    isCorrect: boolean
}

export interface IQuestion {
    questionId: number;
    questionText: string;
    answerList: [IAnswer, IAnswer, IAnswer, IAnswer]
}