import { NextApiRequest, NextApiResponse } from "next";

export class BaseRequestMiddleware {
    use(req: NextApiRequest, res: NextApiResponse, next: any) {
        let traceId = req.headers['x-trace-id'] as string;
        traceId = traceId || String(Math.random());
        req.headers['x-trace-id'] = traceId;
        next();
    }
}