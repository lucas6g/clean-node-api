import { Survey } from '../entities/Survey'

export interface ListAllSurveys {

    listAll: () => Promise<Survey[]>
}
