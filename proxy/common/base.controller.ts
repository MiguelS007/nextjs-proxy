import { BaseResponse } from "./base.response";
import { BadRequestException } from "./error";

export class BaseController {
  protected traceId: string;
  // metodo responsável pelo tratamento de erros, respostas
  public async safeExecute(action: any, traceId: string): Promise<any> {
    try {
      this.traceId = traceId;
      this.callInitLogger();

      const data = await action();
      this.callEndLogger();

      return new BaseResponse(data);
    } catch (error: any) {
        const response = new BaseResponse();
        const statusCode = this.getStatusCode(error);
        this.callLoggerErro(error);
        const httpException = this.getErrorFlowFromStatusCode(error?.message)[statusCode];
        if (httpException) throw httpException(response);
        this.callGenericErrorFlow(response, error?.message);
    }
  }

  private callInitLogger() {
    console.debug("Start", this.traceId)
  }

  private callEndLogger() {
    console.debug("Finish", this.traceId)
  }

  private callGenericErrorFlow(response: BaseResponse<unknown>, message: any) {
    response.addError({
      message: message ?? 'Internal Server Error'
    })

    throw new Error('Internal Server Error')
  }

  private callLoggerErro(error: any) {
    console.error(error)
  }
  
  private getStatusCode(error: any) {
    return (
      error.response?.statusCode ||
      error.response?.status ||
      error.status ||
      500
    );
  }

  private getErrorFlowFromStatusCode(message?: any): any {
    return {
      ...this.loadBadRequestFlow(message),
    }
  }

  private loadBadRequestFlow(message?: any) {
    return {
      400: (response: BaseResponse<unknown>) => {
        response?.addError({
          message: message ?? 'Request has structure errors'
        });
        return new BadRequestException(response)
      }
    }
  }
}