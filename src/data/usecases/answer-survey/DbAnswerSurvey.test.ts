
import { DbAnswerSurvey } from './DbAnswerSurvey'
import { LoadSurveyByIdRepository } from '../../protocols/db/survey/LoadSurveyByIdRepository'
import { SurveyResult } from '../../../domain/entities/SurveyResult'
import { AnswerSurvey } from '../../../domain/usecases/AnswerSurvey'

const makeLoadSurveyByIdRepositoryStub = (): LoadSurveyByIdRepository => {
    class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
        async loadById(surverId: string): Promise<SurveyResult | null> {
            return await Promise.resolve({
                accountId: 'anyAccountId',
                answer: 'anyAnswer',
                date: new Date(2022, 1, 7, 14),
                id: 'anyId',
                surveyId: 'anySurveyId'
            })
        }
    }
    return new LoadSurveyByIdRepositoryStub()
}

type SutTypes = {
    sut: AnswerSurvey
    loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
}

const makeSut = (): SutTypes => {
    const loadSurveyByIdRepositoryStub = makeLoadSurveyByIdRepositoryStub()
    const sut = new DbAnswerSurvey(loadSurveyByIdRepositoryStub)

    return {
        sut,
        loadSurveyByIdRepositoryStub

    }
}

describe('DbAnswerSurvey', () => {
    test('should call LoadSurveyById whit correct id', async () => {
        const { loadSurveyByIdRepositoryStub, sut } = makeSut()

        const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')

        await sut.respond({
            surveyId: 'anySurveyId',
            accountId: 'anyAccountId',
            answer: 'anyAnswer',
            date: new Date()
        })

        expect(loadByIdSpy).toHaveBeenCalledWith('anySurveyId')
    })
    test('should returns null if LoadSurveyById returns null', async () => {
        const { loadSurveyByIdRepositoryStub, sut } = makeSut()

        jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById').mockReturnValueOnce(Promise.resolve(null))

        const surveyResult = await sut.respond({
            surveyId: 'anySurveyId',
            accountId: 'anyAccountId',
            answer: 'anyAnswer',
            date: new Date()
        })

        expect(surveyResult).toBeNull()
    })
})
