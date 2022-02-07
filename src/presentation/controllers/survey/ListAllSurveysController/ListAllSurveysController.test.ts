import { ListAllSurveysController } from './ListAllSurveysController'

import { ListAllSurveys } from '../../../../domain/usecases/ListAllSurveys'
import { Survey } from '../../../../domain/entities/Survey'

const makeListAllSurveysStub = (): ListAllSurveys => {
    // dependencia mockada

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
    return new ListAllSurveysStub()
}

interface SutTypes {
    sut: ListAllSurveysController
    listAllSurveysStub: ListAllSurveys

}

const makeSut = (): SutTypes => {
    const listAllSurveysStub = makeListAllSurveysStub()
    const sut = new ListAllSurveysController(listAllSurveysStub)
    return {
        sut,
        listAllSurveysStub

    }
}

describe('ListAllSurveysController', () => {
    test('should call ListAllSurveys correcly', async () => {
        const { listAllSurveysStub, sut } = makeSut()

        const listAllSpy = jest.spyOn(listAllSurveysStub, 'listAll')

        await sut.handle({})

        expect(listAllSpy).toHaveBeenCalled()
    })
})
