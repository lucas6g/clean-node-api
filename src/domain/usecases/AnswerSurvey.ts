import { SurveyResult } from '../entities/SurveyResult'

export type AnswerSurveyModel = {
    surveyId: string
    accountId: string
    answer: string
    date: Date
}

export interface AnswerSurvey {

    respond: (data: AnswerSurveyModel) => Promise<SurveyResult | null>
}
