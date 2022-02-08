import { Survey } from '../../../domain/entities/Survey'
import { ListAllSurveys } from '../../../domain/usecases/ListAllSurveys'
import { LoadAllSurveysRepository } from '../../protocols/db/survey/LoadAllSurveysRepository'
import { DbListAllSurveys } from './DbListAllSurveys'

const makeLoadAllSurveysRepositoryStub = (): LoadAllSurveysRepository => {
    class LoadAllSurveysRepositoryStub implements LoadAllSurveysRepository {
        async loadAll(): Promise<Survey[]> {
            const surveys: Survey[] = [
                {
                    id: 'anyId',
                    question: 'anyQuestion',
                    answers: [{
                        image: 'anyImage',
                        answer: 'anyAnswer'
                    }],
                    date: new Date(2022, 1, 7, 14),
                    didAnswer: true

                }
            ]
            return await Promise.resolve(surveys)
        }
    }
    return new LoadAllSurveysRepositoryStub()
}

interface SutTypes {
    sut: ListAllSurveys
    loadAllSurveysRepositoryStub: LoadAllSurveysRepository

}
const makeSut = (): SutTypes => {
    const loadAllSurveysRepositoryStub = makeLoadAllSurveysRepositoryStub()

    const sut = new DbListAllSurveys(loadAllSurveysRepositoryStub)

    return {
        sut,
        loadAllSurveysRepositoryStub

    }
}

describe('DbListAllSurveys', () => {
    test('should call LoadAllSurveysRepository', async () => {
        const { loadAllSurveysRepositoryStub, sut } = makeSut()

        const loadAllSpy = jest.spyOn(loadAllSurveysRepositoryStub, 'loadAll')

        await sut.listAll()

        expect(loadAllSpy).toHaveBeenCalled()
    })
})
