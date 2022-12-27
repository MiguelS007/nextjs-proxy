import { PaymentRepository } from "../repositories/payment.repositoriy";

export class PaymentService {
   constructor (private readonly paymentRepository: PaymentRepository) {}

   // lidar com tratamentos de negócio da aplicação: Strategies, Factories, validações, Adapters...
    async getService() {
        return await this.paymentRepository.get();
    }
}