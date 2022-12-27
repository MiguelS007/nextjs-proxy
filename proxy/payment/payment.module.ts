import { NodeRouter } from "next-connect/dist/types/node";
import { IModule } from "proxy/interfaces";
import { PaymentController } from "./controllers";
import { PaymentRepository } from "./repositories/payment.repositoriy";
import { PaymentService } from "./services/payment.service";

export class PaymentModule implements IModule {
    private paymentController: PaymentController;
    constructor() {
        this.controllerFactory();
    }

    private one<T>(make: () => T): () => T {
        let instance: T;
        return () => instance || (instance = make())
    }

    private controllerFactory() {
        const paymentRepositry = this.one(() => new PaymentRepository())();
        const paymentService = this.one(() => new PaymentService(paymentRepositry))();
        const paymentController = this.one(() => new PaymentController(paymentService))();
        this.paymentController = paymentController;
    }

    public async buildRoutes(router: NodeRouter) {
        router
          .get(
            "/api/v2/payment", 
          this.paymentController
            .getController
            .bind(this.paymentController) as any
        )
    }

    get PaymentController() {
        return this.paymentController;
    }
}