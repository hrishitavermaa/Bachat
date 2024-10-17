import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { db } from "../config/db";
import { sign } from "../utils/token";
import { SigninType, SignupType } from "../utils/types/types";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import { ErrorHandler } from "../utils/errorhandler";

const controller = {
  signup: CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const payload: SignupType = req.body;

      const response = await db.user.create({
        data: {
          name: payload.name,
          email: payload.email,
          password: payload.password,
        },
      });

      const account = await db.account.create({
        data: {
          balance: 100000,
          limit: payload.limit,
          userId: response.id,
          token: 0,
        },
      });

      if (!account) {
        const message = "Something went wrong";
        return next(new ErrorHandler(message, 500));
      }

      const token = sign(response);

      res.cookie("Token", token);

      return res.status(200).json({
        success: true,
        message: token,
      });
    }
  ),

  signin: CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const payload: SigninType = req.body;

      const response = await db.user.findUnique({
        where: { email: payload.email },
      });

      if (!response) {
        const message = "User doesn't exist";
        return next(new ErrorHandler(message, 400));
      }

      const isMatch = response.password === payload.password;

      if (!isMatch) {
        const message = "Invalid password";
        return next(new ErrorHandler(message, 400));
      }

      const token = sign(response);

      res.cookie("Token", token);

      return res.status(200).json({
        success: true,
        message: token,
      });
    }
  ),

  logout: CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      res.clearCookie("token");
      req.user = undefined;

      return res.status(200).json({
        success: true,
        message: "Logged out",
      });
    }
  ),

  delete: CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      if (!req.user) {
        res.clearCookie("token");
        const message: string = "Unauthorized";
        return next(new ErrorHandler(message, 400));
      }

      const userId = req.user.id;

      const deleteTxn = await db.transactions.deleteMany({
        where: { userId: userId },
      });
      const deleteAcc = await db.account.delete({ where: { userId: userId } });
      const deleteUser = await db.user.delete({ where: { id: userId } });

      return res.status(200).json({
        success: true,
        message: "Deleted user",
      });
    }
  ),

  fetchUser: CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      if (!req.user) {
        res.clearCookie("token");
        const message: string = "Unauthorized";
        return next(new ErrorHandler(message, 400));
      }

      const userId = req.user.id;

      const response = await db.user.findUnique({ where: { id: userId } });

      return res.status(200).json({
        success: true,
        message: response,
      });
    }
  ),
};

export default controller;
