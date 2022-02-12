
import { DbAnswerSurvey } from './DbAnswerSurvey'
import { LoadSurveyByIdRepository } from '../../protocols/db/survey/LoadSurveyByIdRepository'
import { Survey } from '../../../domain/entities/Survey'
import { AnswerSurvey, AnswerSurveyModel } from '../../../domain/usecases/AnswerSurvey'
import { SurveyResult } from '../../../domain/entities/SurveyResult'
import { SaveOrUpdateSurveyRespository } from '../../protocols/db/survey/SaveOrUpdateSurveyRespository'

const makeLoadSurveyByIdRepositoryStub = (): LoadSurveyByIdRepository => {
    class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
        async loadById(surverId: string): Promise<Survey | null> {
            return await Promise.resolve({
                id: 'anyId',
                question: 'anyQuestion',
                answers: [{
                    image: 'anyImage',
                    answer: 'anyAnswer'
                }],
                date: new Date()

            })
        }
    }
    return new LoadSurveyByIdRepositoryStub()
}
const makeSaveOrUpdateSurveyResultRepositoryStub = (): SaveOrUpdateSurveyRespository => {
    class SaveOrUpdateSurveyResultRepositoryStub implements SaveOrUpdateSurveyRespository {
        async saveOrUpdate(data: AnswerSurveyModel): Promise<SurveyResult | null> {
            return await Promise.resolve({
                id: 'anyId',
                surveyId: 'anySurveyId',
                accountId: 'anyAccountId',
                answer: 'anyAnswer',
                date: new Date(2020, 4, 10, 12)
            })
        }
    }
    return new SaveOrUpdateSurveyResultRepositoryStub()
}

type SutTypes = {
    sut: AnswerSurvey
    loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
    saveOrUpdateSurveyResultRepositoryStub: SaveOrUpdateSurveyRespository
}

const makeSut = (): SutTypes => {
    const saveOrUpdateSurveyResultRepositoryStub = makeSaveOrUpdateSurveyResultRepositoryStub()
    const loadSurveyByIdRepositoryStub = makeLoadSurveyByIdRepositoryStub()
    const sut = new DbAnswerSurvey(loadSurveyByIdRepositoryStub, saveOrUpdateSurveyResultRepositoryStub)

    return {
        sut,
        loadSurveyByIdRepositoryStub,
        saveOrUpdateSurveyResultRepositoryStub

    }
}

describe('DbAnswerSurvey', () => {
    test('should call LoadSurveyByIdRepository whit correct id', async () => {
        const { loadSurveyByIdRepositoryStub, sut } = makeSut()

        const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')

        await sut.respond({
            surveyId: 'anyId',
            accountId: 'anyAccountId',
            answer: 'anyAnswer',
            date: new Date()
        })

        expect(loadByIdSpy).toHaveBeenCalledWith('anyId')
    })
    test('should returns null if LoadSurveyByIdRespository returns null', async () => {
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
    test('should trows error if  LoadSurveyByIdRepository trows error', async () => {
        const { loadSurveyByIdRepositoryStub, sut } = makeSut()

        jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById').mockImplementationOnce(() => {
            throw new Error()
        })

        await expect(
            sut.respond({
                surveyId: 'anySurveyId',
                accountId: 'anyAccountId',
                answer: 'anyAnswer',
                date: new Date()
            })
        ).rejects.toBeInstanceOf(Error)
    })
    test('should returns null if answer dont corresponds survey answers', async () => {
        const { loadSurveyByIdRepositoryStub, sut } = makeSut()

        jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById').mockReturnValueOnce(Promise.resolve({
            id: 'anyId',
            question: 'anyQuestion',
            answers: [{
                image: 'anyImage',
                answer: 'wrongAnswer'
            }],
            date: new Date()

        }))

        const surveyResult = await sut.respond({
            surveyId: 'anySurveyId',
            accountId: 'anyAccountId',
            answer: 'anyAnswer',
            date: new Date()
        })

        expect(surveyResult).toBeNull()
    })
    test('should calls SaveOrUpdateSurveyResultRepository whit correct values', async () => {
        const { sut, saveOrUpdateSurveyResultRepositoryStub } = makeSut()

        const saveOrUpdateSpy = jest.spyOn(saveOrUpdateSurveyResultRepositoryStub, 'saveOrUpdate')

        await sut.respond({
            surveyId: 'anySurveyId',
            accountId: 'anyAccountId',
            answer: 'anyAnswer',
            date: new Date(2020, 4, 10, 12)
        })

        expect(saveOrUpdateSpy).toBeCalledWith({
            surveyId: 'anySurveyId',
            accountId: 'anyAccountId',
            answer: 'anyAnswer',
            date: new Date(2020, 4, 10, 12)
        })
    })
})
