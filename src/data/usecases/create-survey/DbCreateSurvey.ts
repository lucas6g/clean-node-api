import { CreateSurvey, CreateSurveyModel } from "../../../domain/usecases/CreateSurvey";
import { SaveSurveyRepository } from "../../protocols/db/survey/SaveSurveyRepository";

export class DbCreateSurvey implements CreateSurvey {

    private readonly saveSurveyRepository: SaveSurveyRepository


    constructor(saveSurveyRepository: SaveSurveyRepository) {
        this.saveSurveyRepository = saveSurveyRepository

    }

    async create(surveyData: CreateSurveyModel): Promise<void> {

        await this.saveSurveyRepository.save(surveyData)

    }
}