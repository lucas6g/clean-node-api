

export interface VerifyPermition {

    verify: (accountId: string, role: string) => Promise<boolean>
}
