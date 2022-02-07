import { ListAllSurveysController } from './ListAllSurveysController'

import { ListAllSurveys } from '../../../../domain/usecases/ListAllSurveys'
import { Survey } from '../../../../domain/entities/Survey'

describe('ListAllSurveysController', () => {
    test('should call ListAllSurveys whit correct values', async () => {
        class ListAllSurveysStub implements ListAllSurveys {
            async listAll(): Promise<Survey[]> {
                const surveys: Survey[] = [
                    {
                        id: 'anyId',
                        question: 'anyQuestion',
                        answers: [{
                            image: 'anyImage',
                            answer: 'anyAnswer'
                        }],
                        date: new Date(),
                        didAnswer: true

                    }
                ]

                return await Promise.resolve(surveys)
            }
        }

        const listAllSurveysStub = new ListAllSurveysStub()
        const sut = new ListAllSurveysController(listAllSurveysStub)

        const listAllSpy = jest.spyOn(listAllSurveysStub, 'listAll')

        await sut.handle({})

        expect(listAllSpy).toHaveBeenCalled()
    })
})
