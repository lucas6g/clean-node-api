import { HttpRequest } from "../../../protocols/HttpRequest"
import { Validation } from "../../../protocols/Validation"
import { CreateSurveyController } from './CreateSurveyController'
import { CreateSurvey, CreateSurveyModel } from '../../../../domain/usecases/CreateSurvey'


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

const makeSurveyStub = () => {
    class CreateSurveyStub implements CreateSurvey {
        async create(survey: CreateSurveyModel): Promise<void> {
            return Promise.resolve()
        }
    }
    return new CreateSurveyStub()
}

interface SutTypes {
    sut: CreateSurveyController
    createSurveyStub: CreateSurvey
    validationStub: Validation

}
const makeSut = (): SutTypes => {

    const validationStub = makeValidationStub()
    const createSurveyStub = makeSurveyStub()

    const sut = new CreateSurveyController(validationStub, createSurveyStub)

    return {
        sut,
        validationStub,
        createSurveyStub

    }
}





describe('CreateSurvey Controller', () => {
    test('should  call Validation whit correct values', async () => {
        const { sut, validationStub } = makeSut()

        const httpRequest = makeFakeHttpRequest()

        const validationSpy = jest.spyOn(validationStub, 'validate')

        await sut.handle(httpRequest)

        expect(validationSpy).toHaveBeenCalledWith(httpRequest.body)
    })
    test('should return 400 if Validation fails', async () => {
        const { sut, validationStub } = makeSut()

        const httpRequest = makeFakeHttpRequest()

        jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())

        const httpResponse = await sut.handle(httpRequest)



        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new Error())
    })
    test('should call  CreateSurvey whit correct values', async () => {
        const { sut, createSurveyStub } = makeSut()

        const httpRequest = makeFakeHttpRequest()

        const createSurveySpy = jest.spyOn(createSurveyStub, 'create')

        await sut.handle(httpRequest)



        expect(createSurveySpy).toHaveBeenCalledWith({
            question: 'anyQuestion',
            answers: [{
                image: 'anyImage',
                answer: 'anyAnswer'
            }]
        })

    })
    test('should return 500 if  CreateSurvey trows error ', async () => {
        const { sut, createSurveyStub } = makeSut()

        const httpRequest = makeFakeHttpRequest()

        jest.spyOn(createSurveyStub, 'create').mockReturnValueOnce(Promise.reject(new Error()))

        const httpResponse = await sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toBeInstanceOf(Error)




    })
    test('should return 500 if  CreateSurvey trows error ', async () => {
        const { sut, createSurveyStub } = makeSut()

        const httpRequest = makeFakeHttpRequest()

        jest.spyOn(createSurveyStub, 'create').mockReturnValueOnce(Promise.reject(new Error()))

        const httpResponse = await sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toBeInstanceOf(Error)




    })
    test('should return 204 on success', async () => {
        const { sut } = makeSut()

        const httpRequest = makeFakeHttpRequest()


        const httpResponse = await sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(204)





    })

})
