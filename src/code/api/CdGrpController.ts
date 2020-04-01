import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import _ from "lodash";
import HttpError from "../../core/error/HttpError";
import { CdGrp } from "../entity/CdGrp";
import CdGrpChangeService from "../service/CdGrpChangeService";
import CdGrpRetireveService from "../service/CdGrpRetireveService";

export default class CdGrpController {
    // 코드그룹 조회 서비스
    private userRetireveService: CdGrpRetireveService = new CdGrpRetireveService;
    // 코드그룹 변경 서비스
    private userChangeService: CdGrpChangeService = new CdGrpChangeService;

    /**
     * 전체 코드그룹 목록을 조회한다.
     * 
     * @param req 요청
     * @param res 응답
     * @param next 다음함수
     */
    public getList = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        let users: CdGrp[];
        try {
            users = await this.userRetireveService.getList();

            if (_.isEmpty(users)) {
                res.status(httpStatus.NO_CONTENT);
            }
            else {
                res.status(httpStatus.OK);
            }

            res.send({ data: { users } });
        }
        catch (e) {
            next(new HttpError(httpStatus.INTERNAL_SERVER_ERROR, httpStatus.getStatusText(httpStatus.INTERNAL_SERVER_ERROR)));
            throw e;
        }

        return res;
    }

    /**
     * 특정 코드그룹을 조회한다.
     * 
     * @param req 요청
     * @param res 응답
     * @param next 다음함수
     */
    public get = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        let user: CdGrp;
        try {
            user = await this.userRetireveService.get(req.params.id);

            if (_.isUndefined(user)) {
                res.status(httpStatus.NOT_FOUND);
            }
            else {
                res.status(httpStatus.OK);
            }

            res.send({ data: { user } });
        }
        catch (e) {
            next(new HttpError(httpStatus.INTERNAL_SERVER_ERROR, httpStatus.getStatusText(httpStatus.INTERNAL_SERVER_ERROR)));
            throw e;
        }

        return res;
    }

    /**
     * 신규 코드그룹을 등록한다.
     * 
     * @param req 요청
     * @param res 응답
     * @param next 다음함수
     */
    public register = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            this.userChangeService.register(req.body);
        }
        catch (e) {
            next(new HttpError(httpStatus.INTERNAL_SERVER_ERROR, httpStatus.getStatusText(httpStatus.INTERNAL_SERVER_ERROR)));
            throw e;
        }
        return res.status(httpStatus.CREATED).send(httpStatus.getStatusText(res.statusCode));
    }

    /**
     * 특정 코드그룹을 변경한다.
     * 
     * @param req 요청
     * @param res 응답
     * @param next 다음함수
     */
    public update = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        let user: CdGrp;
        try {
            user = await this.userRetireveService.get(req.params.id);

            if (_.isUndefined(user)) {
                res.status(httpStatus.NOT_FOUND);
            }
            else {
                await this.userChangeService.update(user, req.body);
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
     * 특정 코드그룹을 삭제한다.
     * 
     * @param req 요청
     * @param res 응답
     * @param next 다음함수
     */
    public delete = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        let user: CdGrp;
        try {
            user = await this.userRetireveService.get(req.params.id);

            if (_.isUndefined(user)) {
                res.status(httpStatus.NOT_FOUND);
            }
            else {
                await this.userChangeService.delete(user);
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