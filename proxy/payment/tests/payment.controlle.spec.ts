import { NextApiRequest, NextApiResponse } from "next";
import { PaymentController } from "../controllers"
import { PaymentModule } from "../payment.module";

describe('PaymentController', () => {
    let service: PaymentController;
    let module: PaymentModule;

    beforeEach(() => {
        module = new PaymentModule();
        service = module.PaymentController
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    })

    it('should return', async () => {
        const reqMock = {
            headers: {
                'x-trace-id': "xpto123"
            }
        } as unknown as NextApiRequest;
        const resMock = {
            json: (response: any) => JSON.stringify(response)
        } as unknown as NextApiResponse;

        expect(await service.getController(reqMock, resMock)).toBe(undefined) 
    })
})