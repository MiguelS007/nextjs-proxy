export class BadRequestException extends Error {
  private statusCode: number;
  constructor(private objectOrError?: string | object | any) {
    super()
    Object.setPrototypeOf(this, BadRequestException.prototype);
    this.createBody();
  };

  private createBody() {
    this.statusCode = 400;

    return {
      error: this.objectOrError,
      errorMessage: this.message,
      status: this.statusCode
    }
  }
}