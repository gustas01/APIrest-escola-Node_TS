export interface IErrorDB {
    message: string,
    type: string,
    path: string,
    value: string,
    origin: string,
    instance: [],
    validatorKey: string,
    validatorName: null,
    validatorArgs: []
}
