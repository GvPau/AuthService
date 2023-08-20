import { Request, Response } from "express";

const exampleController = (req: Request, res: Response): void => {
  res.json({ message: "This is an example route" });
};

export default exampleController;
