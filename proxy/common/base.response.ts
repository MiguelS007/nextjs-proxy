export interface ErrorResponse {
    message: string;
    trace?: [];
}

export class BaseResponse<T> {
    constructor(public data?: T, public errors?: ErrorResponse[]) {}

    addErrors(errors: ErrorResponse[]) {
        this.errors = this.errors || [];
        this.errors.concat(errors);
    }

    addError(error: ErrorResponse) {
      this.errors = this.errors || [];
      this.errors.push(error);
    }
}