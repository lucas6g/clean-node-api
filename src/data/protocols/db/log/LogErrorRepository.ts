export interface LogErrorRepository {

  save: (stack: string) => Promise<void>

}
