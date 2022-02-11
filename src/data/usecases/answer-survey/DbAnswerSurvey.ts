import { SurveyResult } from '../../../domain/entities/SurveyResult'
import { AnswerSurvey, AnswerSurveyModel } from '../../../domain/usecases/AnswerSurvey'
import { LoadSurveyByIdRepository } from '../../protocols/db/survey/LoadSurveyByIdRepository'

export class DbAnswerSurvey implements AnswerSurvey {
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
    constructor(loadSurveyByIdRepository: LoadSurveyByIdRepository) {
        this.loadSurveyByIdRepository = loadSurveyByIdRepository
    }

    async respond(data: AnswerSurveyModel): Promise<SurveyResult | null> {
        const surveyResult = await this.loadSurveyByIdRepository.loadById(data.surveyId)
        if (!surveyResult) {
            return null
        }

        return await Promise.resolve({
            accountId: '',
            answer: '',
            date: new Date(),
            id: '',
            surveyId: ''
        })
    }
}
