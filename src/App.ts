import express, { Application, Request, Response, NextFunction } from "express";
import helmet from "helmet";
import nocache from "nocache";
import cors from "cors";
import { requestLoggerMiddleware } from "./core/middleware/HttpLoggerMiddleware";
import httpStatus from "http-status-codes";
import dotenv from 'dotenv';
dotenv.config();

// DB 연결
import DBConnection from "./core/db/DBConnection";
// 라우터
import AuthRoutes from "./core/routes/AuthRoutes";
import IndexRoutes from "./core/routes/IndexRoutes";
import UserRoutes from "./core/routes/UserRoutes";


export class App {
    private app: Application;

    constructor(private port?: number | string) {
        this.dbconn();
        this.app = express();
        this.settings();
        this.middleware();
        this.routes();
    }

    public async listen(): Promise<void> {
        await this.app.listen(this.app.get("port"));
        console.info(`Server on port ${this.app.get(`port`)}`);
    }

    private settings(): void {
        this.app.set("port", process.env.PORT || this.port || 3000);
    }

    private middleware(): void {
        // 보안 설정
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(nocache());
        // http 응답 바디 파서
        this.app.use(express.json());
        // http 요청 로그 처리
        this.app.use(requestLoggerMiddleware);
        this.app.use(this.errorHandler);
    }

    private errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
        console.log('errorHandler');
        // res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR);
        // res.send(err.message || 'Error!!');
    }

    private routes(): void {
        this.app.use(IndexRoutes);
        this.app.use("/auth", AuthRoutes);
        this.app.use("/users", UserRoutes);
    }

    private dbconn(): void {
        DBConnection.connection();
    }
}