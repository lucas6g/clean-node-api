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
                    date: new Date(2022, 1, 7, 14),
                    didAnswer: true

                }
            ]

            return await Promise.resolve(surveys)
        }
    }
    return new ListAllSurveysStub()
}

type SutTypes = {
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
    test('should returns 200 on success', async () => {
        const { sut } = makeSut()

        const httpResponse = await sut.handle({})

        expect(httpResponse.body).toEqual([
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
        ])

        expect(httpResponse.statusCode).toBe(200)
    })
    test('should returns 204 if ListAllSurveys returns no surveys', async () => {
        const { sut, listAllSurveysStub } = makeSut()

        jest.spyOn(listAllSurveysStub, 'listAll').mockReturnValueOnce(Promise.resolve([]))
        const httpResponse = await sut.handle({})

        expect(httpResponse.statusCode).toBe(204)
        expect(httpResponse.body).toBeNull()
    })
    test('should returns 500 if ListAllSurveys trows error', async () => {
        const { sut, listAllSurveysStub } = makeSut()

        jest.spyOn(listAllSurveysStub, 'listAll').mockReturnValueOnce(Promise.reject(new Error()))

        const httpResponse = await sut.handle({})

        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toBeInstanceOf(Error)
    })
})
