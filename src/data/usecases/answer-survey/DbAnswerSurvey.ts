import { SurveyResult } from '../../../domain/entities/SurveyResult'
import { AnswerSurvey, AnswerSurveyModel } from '../../../domain/usecases/AnswerSurvey'
import { LoadSurveyByIdRepository } from '../../protocols/db/survey/LoadSurveyByIdRepository'

export class DbAnswerSurvey implements AnswerSurvey {
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
    constructor(loadSurveyByIdRepository: LoadSurveyByIdRepository) {
        this.loadSurveyByIdRepository = loadSurveyByIdRepository
    }

    async respond(data: AnswerSurveyModel): Promise<SurveyResult | null> {
        await this.loadSurveyByIdRepository.loadById(data.surveyId)

        return await Promise.resolve({
            accountId: '',
            answer: '',
            date: new Date(),
            id: '',
            surveyId: ''
        })
    }
}
