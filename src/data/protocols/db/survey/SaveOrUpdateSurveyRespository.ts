import { SurveyResult } from '../../../../domain/entities/SurveyResult'
import { AnswerSurveyModel } from '../../../../domain/usecases/AnswerSurvey'

export interface SaveOrUpdateSurveyRespository {
    saveOrUpdate: (data: AnswerSurveyModel) => Promise<SurveyResult | null>
}
