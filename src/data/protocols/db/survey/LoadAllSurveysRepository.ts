import { Survey } from '../../../../domain/entities/Survey'

export interface LoadAllSurveysRepository {
    loadAll: () => Promise<Survey[]>
}
