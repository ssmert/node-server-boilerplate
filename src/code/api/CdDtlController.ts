import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import _ from "lodash";
import HttpError from "../../core/error/HttpError";
import { CdDtl } from "../entity/CdDtl";
import CdDtlChangeService from "../service/CdDtlChangeService";
import CdDtlRetireveService from "../service/CdDtlRetireveService";

export default class CdDtlController {
    // 코드상세 조회 서비스
    private cdDtlRetireveService: CdDtlRetireveService = new CdDtlRetireveService;
    // 코드상세 변경 서비스
    private cdDtlChangeService: CdDtlChangeService = new CdDtlChangeService;

    /**
     * 전체 코드상세 목록을 조회한다.
     * 
     * @param req 요청
     * @param res 응답
     * @param next 다음함수
     */
    public getList = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        let cdDtls: CdDtl[];
        try {
            cdDtls = await this.cdDtlRetireveService.getList();

            if (_.isEmpty(cdDtls)) {
                res.status(httpStatus.NO_CONTENT);
            }
            else {
                res.status(httpStatus.OK);
            }

            res.send({ data: { cdDtls } });
        }
        catch (e) {
            next(new HttpError(httpStatus.INTERNAL_SERVER_ERROR, httpStatus.getStatusText(httpStatus.INTERNAL_SERVER_ERROR)));
            throw e;
        }

        return res;
    }

    /**
     * 특정 코드상세를 조회한다.
     * 
     * @param req 요청
     * @param res 응답
     * @param next 다음함수
     */
    public get = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        let cdDtl: CdDtl;
        try {
            cdDtl = await this.cdDtlRetireveService.get(req.params.id);

            if (_.isUndefined(cdDtl)) {
                res.status(httpStatus.NOT_FOUND);
            }
            else {
                res.status(httpStatus.OK);
            }

            res.send({ data: { cdDtl } });
        }
        catch (e) {
            next(new HttpError(httpStatus.INTERNAL_SERVER_ERROR, httpStatus.getStatusText(httpStatus.INTERNAL_SERVER_ERROR)));
            throw e;
        }

        return res;
    }

    /**
     * 신규 코드상세를 등록한다.
     * 
     * @param req 요청
     * @param res 응답
     * @param next 다음함수
     */
    public register = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            this.cdDtlChangeService.register(req.body);
        }
        catch (e) {
            next(new HttpError(httpStatus.INTERNAL_SERVER_ERROR, httpStatus.getStatusText(httpStatus.INTERNAL_SERVER_ERROR)));
            throw e;
        }
        return res.status(httpStatus.CREATED).send(httpStatus.getStatusText(res.statusCode));
    }

    /**
     * 특정 코드상세를 변경한다.
     * 
     * @param req 요청
     * @param res 응답
     * @param next 다음함수
     */
    public update = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        let cdDtl: CdDtl;
        try {
            cdDtl = await this.cdDtlRetireveService.get(req.params.id);

            if (_.isUndefined(cdDtl)) {
                res.status(httpStatus.NOT_FOUND);
            }
            else {
                await this.cdDtlChangeService.update(cdDtl, req.body);
                res.status(httpStatus.CREATED);
            }

            res.send(httpStatus.getStatusText(res.statusCode));
        }
        catch (e) {
            next(new HttpError(httpStatus.INTERNAL_SERVER_ERROR, httpStatus.getStatusText(httpStatus.INTERNAL_SERVER_ERROR)));
            throw e;
        }

        return res;
    }

    /**
     * 특정 코드상세를 삭제한다.
     * 
     * @param req 요청
     * @param res 응답
     * @param next 다음함수
     */
    public delete = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        let cdDtl: CdDtl;
        try {
            cdDtl = await this.cdDtlRetireveService.get(req.params.id);

            if (_.isUndefined(cdDtl)) {
                res.status(httpStatus.NOT_FOUND);
            }
            else {
                await this.cdDtlChangeService.delete(cdDtl);
                res.status(httpStatus.CREATED);
            }

            res.send(httpStatus.getStatusText(res.statusCode));
        }
        catch (e) {
            next(new HttpError(httpStatus.INTERNAL_SERVER_ERROR, httpStatus.getStatusText(httpStatus.INTERNAL_SERVER_ERROR)));
            throw e;
        }

        return res;
    }
}