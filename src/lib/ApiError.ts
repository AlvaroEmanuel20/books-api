export default class ApiError {
    readonly message: string;
    readonly status: number;

    constructor(message: string, status = 400) {
        this.message = message;
        this.status = status;
    }
}
