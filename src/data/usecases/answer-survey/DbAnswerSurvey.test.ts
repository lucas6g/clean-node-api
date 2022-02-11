
import { DbAnswerSurvey } from './DbAnswerSurvey'
import { LoadSurveyByIdRepository } from '../../protocols/db/survey/LoadSurveyByIdRepository'
import { SurveyResult } from '../../../domain/entities/SurveyResult'

describe('DbAnswerSurvey', () => {
    test('should call LoadSurveyById whit correct id', async () => {
        class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
            async loadById(surverId: string): Promise<SurveyResult | null> {
                return await Promise.resolve({
                    accountId: 'anyAccountid',
                    answer: 'anyAnswer',
                    date: new Date(2022, 1, 7, 14),
                    id: 'anyId',
                    surveyId: 'anySurveyId'
                })
            }
        }

        const loadSurveyByIdRepositoryStub = new LoadSurveyByIdRepositoryStub()
        const sut = new DbAnswerSurvey(loadSurveyByIdRepositoryStub)

        const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')

        await sut.respond({
            surveyId: 'anySurveyId',
            accountId: 'anyAccountId',
            answer: 'anyAnswer',
            date: new Date()
        })

        expect(loadByIdSpy).toHaveBeenCalledWith('anySurveyId')
    })
})
