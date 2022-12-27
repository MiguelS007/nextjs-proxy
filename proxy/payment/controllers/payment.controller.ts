import { NextApiRequest, NextApiResponse } from "next";

import { BaseController } from "../../common"
import { PaymentService } from "../services/payment.service"

export class PaymentController extends BaseController {
    // injetamos a dependecia do provider da camada de serviço
    // todos os controladores extenderão da common BaseController
    constructor(private readonly paymentService: PaymentService) {
      super()
    }

    // método de entrada
    public async getController(req: NextApiRequest, res: NextApiResponse) {
      // traceId incluso dentro de req.headers no middleware base.request
      const traceId = req.headers['x-trace-id'] as string;
      // safeExecute é um método extendido de BaseController responsável pelo 
      // tratamento de respostas de erro e sucesso
      const response = await this.safeExecute(
        async () => 
          await this.paymentService.getService(),
          traceId
      )
      res.json(response)
    };
}