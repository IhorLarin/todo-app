import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

export interface AuthRequest<P = ParamsDictionary> extends Request<P> {
    userId?: string;
}

export interface IdParam {
    id: string;
}
