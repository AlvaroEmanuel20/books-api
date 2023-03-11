export default class ApiError extends Error {
    readonly status: number;

    constructor(msg: string, status = 400) {
        super();
        this.message = msg;
        this.status = status;
    }
}
