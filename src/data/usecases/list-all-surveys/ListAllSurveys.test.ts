import { Survey } from '../../../domain/entities/Survey'
import { LoadAllSurveysRepository } from '../../protocols/db/survey/LoadAllSurveysRepository'
import { DbListAllSurveys } from './DbListAllSurveys'

describe('DbListAllSurveys', () => {
    test('should call LoadAllSurveysRepository', async () => {
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

        const loadAllSurveysRepositoryStub = new LoadAllSurveysRepositoryStub()

        const sut = new DbListAllSurveys(loadAllSurveysRepositoryStub)

        const loadAllSpy = jest.spyOn(loadAllSurveysRepositoryStub, 'loadAll')

        await sut.listAll()

        expect(loadAllSpy).toHaveBeenCalled()
    })
})
