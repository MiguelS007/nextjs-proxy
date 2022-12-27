import { PaymentRepository } from "../repositories/payment.repositoriy";
import { PaymentService } from "../services/payment.service"

describe('PaymentService', () => {
    let service: PaymentService;
    let paymentRepository: PaymentRepository;

    beforeEach(() => {
        paymentRepository = {
            get: async () => "xpto",
        };

        service = new PaymentService(paymentRepository)
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    })

    it('should return string', async () => {
        expect(await service.getService()).toBe("xpto") 
    })
})