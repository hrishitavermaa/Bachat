import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import { Account, Trip } from "@prisma/client";
import { ErrorHandler } from "../utils/errorhandler";
import { db } from "../config/db";

const controller = {
  add: CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const payload: Trip = req.body;

      if (!req.user) {
        res.clearCookie("token");
        const message: string = "Unauthorized";
        return next(new ErrorHandler(message, 400));
      }

      const userId: string = req.user.id;

      const response = await db.trip.create({
        data: {
          destination: payload.destination,
          from: payload.from,
          to: payload.to,
          monthly: payload.monthly,
          amount: payload.amount,
          months: payload.months,
          userId: userId,
        },
      });

      return res.status(200).json({
        success: true,
        message: response,
      });
    }
  ),

  delete: CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      if (!req.params.id) {
        const message: string = "Bad request";
        return next(new ErrorHandler(message, 400));
      }

      if (!req.user) {
        res.clearCookie("token");
        const message: string = "Unauthorized";
        return next(new ErrorHandler(message, 400));
      }

      const requestId: string = req.params.id as string;
      const userId: string = req.user.id;

      const response = await db.trip.delete({
        where: { id: requestId },
      });

      return res.status(200).json({
        success: true,
        message: response,
      });
    }
  ),

  fetchAll: CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      if (!req.user) {
        res.clearCookie("token");
        const message: string = "Unauthorized";
        return next(new ErrorHandler(message, 400));
      }

      const userId: string = req.user.id;

      const response = await db.trip.findMany({
        where: { userId: userId },
      });

      return res.status(200).json({
        success: true,
        message: response,
      });
    }
  ),
};

export default controller;
