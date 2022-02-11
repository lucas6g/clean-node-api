
import { SurveyResult } from '../../../../domain/entities/SurveyResult'

export interface LoadSurveyByIdRepository {
    loadById: (surverId: string) => Promise<SurveyResult | null>
}
