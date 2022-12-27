import { createRouter } from "next-connect";
import { BaseRequestMiddleware } from "proxy/common/base.request.middleware";
import { Main } from "../../proxy/main";
import { ProxyModule } from "../../proxy/proxy.module";

const router = createRouter();

const main = new Main(
  new ProxyModule(
    router, 
  ), 
  new BaseRequestMiddleware()
);
main.setupRouter(router);

export default router.handler();