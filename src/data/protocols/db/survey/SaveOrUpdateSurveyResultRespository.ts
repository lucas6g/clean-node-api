import { SurveyResult } from '../../../../domain/entities/SurveyResult'
import { AnswerSurveyModel } from '../../../../domain/usecases/AnswerSurvey'

export interface SaveOrUpdateSurveyResultRespository {
    saveOrUpdate: (data: AnswerSurveyModel) => Promise<SurveyResult | null>
}
