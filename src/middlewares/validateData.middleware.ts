import { z, ZodObject } from "zod";

export const validateDataMiddleware = (schema: ZodObject<any, any>) => {
  return (req: any, res: any, next: any) => {
    const { error } = schema.safeParse(req.body);

    if (error) {
      const message = error.errors.map((error) => error.message).join(",");
      res.status(400).json({ success: false, message, data: null });
    } else {
      next();
    }
  };
};
