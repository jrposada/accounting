export class ApiError<TError> extends Error {
    constructor(
        readonly status: number,
        message?: string,
        readonly error?: TError,
    ) {
        super(message);
    }
}
