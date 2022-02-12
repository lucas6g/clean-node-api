import { SurveyResult } from '../../../domain/entities/SurveyResult'
import { AnswerSurvey, AnswerSurveyModel } from '../../../domain/usecases/AnswerSurvey'
import { LoadSurveyByIdRepository } from '../../protocols/db/survey/LoadSurveyByIdRepository'
import { SaveOrUpdateSurveyRespository } from '../../protocols/db/survey/SaveOrUpdateSurveyRespository'

export class DbAnswerSurvey implements AnswerSurvey {
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
    private readonly saveOrUpdateSurveyRespository: SaveOrUpdateSurveyRespository

    constructor(loadSurveyByIdRepository: LoadSurveyByIdRepository, saveOrUpdateSurveyRespository: SaveOrUpdateSurveyRespository) {
        this.loadSurveyByIdRepository = loadSurveyByIdRepository
        this.saveOrUpdateSurveyRespository = saveOrUpdateSurveyRespository
    }

    async respond(data: AnswerSurveyModel): Promise<SurveyResult | null> {
        const survey = await this.loadSurveyByIdRepository.loadById(data.surveyId)
        if (!survey) {
            return null
        }

        const hasAnswer = survey.answers.find((answer) => {
            return answer.answer === data.answer
        })

        if (!hasAnswer) {
            return null
        }

        const surveyResult = await this.saveOrUpdateSurveyRespository.saveOrUpdate(data)

        return surveyResult
    }
}
