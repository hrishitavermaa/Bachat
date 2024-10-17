import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import { Account, Transactions } from "@prisma/client";
import { db } from "../config/db";
import { ErrorHandler } from "../utils/errorhandler";

const controller = {
  add: CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const payload: Transactions = req.body;

      if (!req.user) {
        res.clearCookie("token");
        const message: string = "Unauthorized";
        return next(new ErrorHandler(message, 400));
      }

      const userId: string = req.user.id;

      const response = await db.transactions.create({
        data: {
          title: payload.title,
          description: payload.description,
          amount: payload.amount,
          type: payload.type,
          category: payload.category,
          userId: userId,
        },
      });

      let updateAccount: Account;

      if (payload.type === "SENT") {
        updateAccount = await db.account.update({
          where: { userId: userId },
          data: { balance: { decrement: response.amount } },
        });
      } else {
        updateAccount = await db.account.update({
          where: { userId: userId },
          data: { balance: { increment: response.amount } },
        });
      }

      return res.status(200).json({
        success: true,
        message: updateAccount,
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

      const response = await db.transactions.delete({
        where: { id: requestId },
      });

      let updateAccount: Account;

      if (response.type === "RECEIVED") {
        updateAccount = await db.account.update({
          where: { userId: userId },
          data: { balance: { decrement: response.amount } },
        });
      } else {
        updateAccount = await db.account.update({
          where: { userId: userId },
          data: { balance: { increment: response.amount } },
        });
      }

      return res.status(200).json({
        success: true,
        message: updateAccount,
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

      const response = await db.transactions.findMany({
        where: { userId: userId },
        select: {
          id: true,
          title: true,
          description: true,
          amount: true,
          type: true,
          category: true,
          date: true,
        },
      });

      return res.status(200).json({
        success: true,
        message: response,
      });
    }
  ),

  fetchById: CatchAsyncError(
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

      const response = await db.transactions.findUnique({
        where: { id: requestId, userId: userId },
      });

      return res.status(200).json({
        success: true,
        message: response,
      });
    }
  ),
};

export default controller;
