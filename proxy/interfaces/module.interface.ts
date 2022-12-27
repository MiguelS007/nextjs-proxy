import { NodeRouter } from "next-connect/dist/types/node";

export interface IModule {
  buildRoutes(router?: NodeRouter): Promise<void>;
}