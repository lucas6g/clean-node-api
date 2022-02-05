import { CreateSurveyModel } from '../../../../domain/usecases/CreateSurvey'

export interface SaveSurveyRepository {
    save: (survey: CreateSurveyModel) => Promise<void>
}
