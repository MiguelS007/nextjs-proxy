import { NodeRouter } from "next-connect/dist/types/node";
import { IModule } from "./interfaces";
import { PaymentModule } from "./payment/payment.module";

export class ProxyModule {
  protected proxyModule: ProxyModule;
  protected paymentModule: PaymentModule;
  protected modules: IModule[];
  constructor(
    private router: NodeRouter,
  ) {
    this.router = router.clone();
    this.moduleFactory();
    this.buildRoutes();
  }


  // metodo que gerencia a injecao de dependencias fabricando os modulos do proxy
  private moduleFactory() {
    this.modules = [
      this.paymentModule = new PaymentModule()
    ]
  }

  // método responsável por construir as rotas do proxy para disponibilizar ao contexto da Main
  private async buildRoutes() {
   this.modules.map(async module => await module.buildRoutes(this.router))
  }

  // assessor que disponibiliza as rotas construídas para o cliente Main
  get routerClone() {
    return this.router;
  }
}
