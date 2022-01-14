import { CreateSurvey, CreateSurveyModel } from "../../../domain/usecases/CreateSurvey"
import { SaveSurveyRepository } from "../../protocols/db/survey/SaveSurveyRepository"
import { DbCreateSurvey } from './DbCreateSurvey'


const makeFakeSurvey = (): CreateSurveyModel => {
    return {

        question: 'anyQuestion',
        answers: [{
            image: 'anyImage',
            answer: 'anyAnswer'
        }]

    }
}
const makeSaveSurveyRepositoryStub = () => {
    class SaveSurveyRepositoryStub implements SaveSurveyRepository {
        async save(survey: CreateSurveyModel): Promise<void> {
            return await Promise.resolve()
        }
    }
    return new SaveSurveyRepositoryStub()
}

interface SutTypes {
    sut: CreateSurvey
    saveSurveyRepositoryStub: SaveSurveyRepository


}
const makeSut = (): SutTypes => {

    const saveSurveyRepositoryStub = makeSaveSurveyRepositoryStub()


    const sut = new DbCreateSurvey(saveSurveyRepositoryStub)

    return {
        sut,
        saveSurveyRepositoryStub

    }
}

describe('DbCreateSurvey', () => {

    test('should call SaveSurveyRepository whit correct values', async () => {
        const { sut, saveSurveyRepositoryStub } = makeSut()


        const fakeSurvey = makeFakeSurvey()

        const saveSpy = jest.spyOn(saveSurveyRepositoryStub, 'save')

        await sut.create(fakeSurvey)


        expect(saveSpy).toHaveBeenCalledWith(fakeSurvey)


    })


})
