import { Request, Response } from "express";

export default abstract class BaseController {
  protected abstract execute(_req: Request, _res: Response): Promise<void | any>;
  public static jsonResponse(res: Response, code: number, message: string): void {
    res.status(code).json({ message });
  }

  public ok<T>(res: Response, dto?: T): Response<any, Record<string, any>> {
    if (dto) {
      res.type("application/json");
      return res.status(200).json(dto);
    } else {
      return res.sendStatus(200);
    }
  }

  public created(res: Response): void {
    res.sendStatus(201);
  }

  public clientError(res: Response, message?: string): void {
    return BaseController.jsonResponse(res, 400, message || "Unauthorized");
  }

  public unauthorized(res: Response, message?: string): void {
    return BaseController.jsonResponse(res, 401, message || "Unauthorized");
  }

  public paymentRequired(res: Response, message?: string): void {
    return BaseController.jsonResponse(res, 402, message || "Payment required");
  }

  public forbidden(res: Response, message?: string): void {
    return BaseController.jsonResponse(res, 403, message || "Forbidden");
  }

  public notFound(res: Response, message?: string): void {
    return BaseController.jsonResponse(res, 404, message || "Not found");
  }

  public conflict(res: Response, message?: string): void {
    return BaseController.jsonResponse(res, 409, message || "Conflict");
  }

  public tooMany(res: Response, message?: string): void {
    return BaseController.jsonResponse(res, 429, message || "Too many requests");
  }

  public fail(res: Response, error: Error | string): Response<any, Record<string, any>> {
    return res.status(500).json({
      message: error.toString(),
    });
  }

  public serviceUnavailable(
    res: Response,
    error: Error | string,
  ): Response<any, Record<string, any>> {
    return res.status(503).json({
      message: error.toString(),
    });
  }
}
