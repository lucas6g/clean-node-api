import { Survey } from '../../../domain/entities/Survey'
import { ListAllSurveys } from '../../../domain/usecases/ListAllSurveys'
import { LoadAllSurveysRepository } from '../../protocols/db/survey/LoadAllSurveysRepository'

export class DbListAllSurveys implements ListAllSurveys {
    private readonly loadAllSurveysRepository: LoadAllSurveysRepository

    constructor(loadAllSurveysRepository: LoadAllSurveysRepository) {
        this.loadAllSurveysRepository = loadAllSurveysRepository
    }

    async listAll(): Promise<Survey[]> {
        const surveys = await this.loadAllSurveysRepository.loadAll()

        return surveys
    }
}
