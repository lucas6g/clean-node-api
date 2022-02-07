
export interface CreateSurveyModel {
    question: string
    answers: SurveyAnswer[]
    date: Date

}
export interface SurveyAnswer {
    image?: string
    answer: string

}

export interface CreateSurvey {
    create: (survey: CreateSurveyModel) => Promise<void>
}
