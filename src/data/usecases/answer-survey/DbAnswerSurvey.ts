import { SurveyResult } from '../../../domain/entities/SurveyResult'
import { AnswerSurvey, AnswerSurveyModel } from '../../../domain/usecases/AnswerSurvey'
import { LoadSurveyByIdRepository } from '../../protocols/db/survey/LoadSurveyByIdRepository'
import { SaveOrUpdateSurveyResultRespository } from '../../protocols/db/survey/SaveOrUpdateSurveyResultRespository'

export class DbAnswerSurvey implements AnswerSurvey {
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
    private readonly saveOrUpdateSurveyResultRespository: SaveOrUpdateSurveyResultRespository

    constructor(loadSurveyByIdRepository: LoadSurveyByIdRepository, saveOrUpdateSurveyResultRespository: SaveOrUpdateSurveyResultRespository) {
        this.loadSurveyByIdRepository = loadSurveyByIdRepository
        this.saveOrUpdateSurveyResultRespository = saveOrUpdateSurveyResultRespository
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

        const surveyResult = await this.saveOrUpdateSurveyResultRespository.saveOrUpdate(data)

        return surveyResult
    }
}
