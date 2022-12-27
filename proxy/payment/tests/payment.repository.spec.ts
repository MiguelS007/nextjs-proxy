import { PaymentRepository } from "../repositories/payment.repositoriy";

describe('PaymentRepository', () => {
    let service: PaymentRepository;

    beforeEach(() => {
        service = new PaymentRepository()
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    })

    it('should return string', async () => {
        const spy = jest.spyOn(service, 'get')
        await service.get()
        expect(spy).toHaveBeenCalled() 
    })
})