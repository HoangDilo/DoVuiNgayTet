export interface IAnswer {
  answerId?: number;
  answerText: string;
  isCorrect: boolean;
}

export interface IQuestion {
  questionId?: number;
  questionText: string;
  answers: [IAnswer, IAnswer, IAnswer, IAnswer];
}
