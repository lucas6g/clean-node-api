import { HttpRequest } from "../../../protocols/HttpRequest"
import { Validation } from "../../../protocols/Validation"
import { CreateSurveyController } from './CreateSurveyController'


const makeFakeHttpRequest = (): HttpRequest => {
    return {
        body: {
            question: 'anyQuestion',
            answers: [{
                image: 'anyImage',
                answer: 'anyAnswer'
            }]
        }
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

interface SutTypes {
    sut: CreateSurveyController

    validationStub: Validation

}
const makeSut = (): SutTypes => {

    const validationStub = makeValidationStub()

    const sut = new CreateSurveyController(validationStub)

    return {
        sut,
        validationStub,

    }
}


describe('CreateSurvey Controller', () => {
    test('should call call Validation whit correct values', async () => {
        const { sut, validationStub } = makeSut()

        const httpRequest = makeFakeHttpRequest()

        const validationSpy = jest.spyOn(validationStub, 'validate')

        await sut.handle(httpRequest)

        expect(validationSpy).toHaveBeenCalledWith(httpRequest.body)
    })

})
