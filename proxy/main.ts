import { NodeRouter } from "next-connect/dist/types/node";
import { BaseRequestMiddleware } from "./common/base.request.middleware";

import { ProxyModule } from "./proxy.module";

export class Main {
  // Injetando os módulos principais e os middlewares
  constructor(
    private readonly proxyModule: ProxyModule,
    private readonly baseRequestMiddleware: BaseRequestMiddleware,  
  ) {}

  // setando as rotas para o contexto do next-connect
  public async setupRouter(router: NodeRouter) {
    return router
      .use(this.baseRequestMiddleware.use as any)
      .use(this.proxyModule.routerClone);
  }
}