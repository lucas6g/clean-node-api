export interface Survey {
    id: string
    question: string
    answers: SurveyAnswer[]
    date: Date
    didAnswer?: boolean
}

interface SurveyAnswer {
    image?: string
    answer: string
}
