import { HttpRequest } from '../../../protocols/HttpRequest'
import { Validation } from '../../../protocols/Validation'
import { AnswerSurveyController } from './AnswerSurveyController'

const makeFakeHttpRequest = (): HttpRequest => {
    return {
        params: {
            surveyId: 'anySurveyId'
        },
        body: {

            answer: 'anyAnswer'

        },
        accountId: 'anyAccountId'

    }
}
const makeValidationStub = (): Validation => {
    // dependencia mockada
    class ValidationStub implements Validation {
        validate(input: any): Error | null {
            return null
        }
    }
    return new ValidationStub()
}

type SutTypes = {
    sut: AnswerSurveyController
    validationStub: Validation

}
const makeSut = (): SutTypes => {
    const validationStub = makeValidationStub()

    const sut = new AnswerSurveyController(validationStub)

    return {
        sut,
        validationStub

    }
}

describe('AnswerSurveyController', () => {
    test('should call validation whit correct values', async () => {
        const { sut, validationStub } = makeSut()
        const validationSpy = jest.spyOn(validationStub, 'validate')

        const httpRequest = makeFakeHttpRequest()

        await sut.handle(httpRequest)

        expect(validationSpy).toHaveBeenCalledWith(httpRequest.body)
        expect(validationSpy).toHaveBeenCalledWith(httpRequest.params)
    })
})
