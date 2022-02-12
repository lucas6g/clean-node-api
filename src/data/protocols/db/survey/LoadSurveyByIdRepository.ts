
import { Survey } from '../../../../domain/entities/Survey'

export interface LoadSurveyByIdRepository {
    loadById: (surverId: string) => Promise<Survey | null>
}
