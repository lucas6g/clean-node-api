
export type CreateSurveyModel = {
    question: string
    answers: SurveyAnswer[]
    date: Date

}
export type SurveyAnswer = {
    image?: string
    answer: string

}

export interface CreateSurvey {
    create: (survey: CreateSurveyModel) => Promise<void>
}
