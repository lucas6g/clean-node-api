import { Validation } from '../../../protocols/Validation'
import { AnswerSurveyController } from './AnswerSurveyController'

describe('AnswerSurveyController', () => {
    test('should call validation whit correct values', async () => {
        class ValidationStub implements Validation {
            validate(input: any): Error | null {
                return null
            }
        }
        const validationStub = new ValidationStub()

        const sut = new AnswerSurveyController(validationStub)

        const validationSpy = jest.spyOn(validationStub, 'validate')

        const httpRequest = {
            params: {
                surveyId: 'anySurveyId'
            },
            body: {

                answer: 'anyAnswer'

            },
            accountId: 'anyAccountId'

        }
        await sut.handle(httpRequest)

        expect(validationSpy).toHaveBeenCalledWith(httpRequest.body)
        expect(validationSpy).toHaveBeenCalledWith(httpRequest.params)
    })
})
