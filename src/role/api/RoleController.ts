import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import _ from "lodash";
import HttpError from "../../core/error/HttpError";
import { Role } from "../entity/Role";
import RoleChangeService from "../service/RoleChangeService";
import RoleRetireveService from "../service/RoleRetireveService";

export default class RoleController {
    // 역할 조회 서비스
    private roleRetireveService: RoleRetireveService = new RoleRetireveService;
    // 역할 변경 서비스
    private roleChangeService: RoleChangeService = new RoleChangeService;

    /**
     * 전체 역할 목록을 조회한다.
     * 
     * @param req 요청
     * @param res 응답
     * @param next 다음함수
     */
    public getList = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        let roles: Role[];
        try {
            roles = await this.roleRetireveService.getList();

            if (_.isEmpty(roles)) {
                res.status(httpStatus.NO_CONTENT);
            }
            else {
                res.status(httpStatus.OK);
            }

            res.send({ data: { roles } });
        }
        catch (e) {
            next(new HttpError(httpStatus.INTERNAL_SERVER_ERROR, httpStatus.getStatusText(httpStatus.INTERNAL_SERVER_ERROR)));
            throw e;
        }

        return res;
    }

    /**
     * 특정 역할를 조회한다.
     * 
     * @param req 요청
     * @param res 응답
     * @param next 다음함수
     */
    public get = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        let role: Role;
        try {
            role = await this.roleRetireveService.get(req.params.id);

            if (_.isUndefined(role)) {
                res.status(httpStatus.NOT_FOUND);
            }
            else {
                res.status(httpStatus.OK);
            }

            res.send({ data: { role } });
        }
        catch (e) {
            next(new HttpError(httpStatus.INTERNAL_SERVER_ERROR, httpStatus.getStatusText(httpStatus.INTERNAL_SERVER_ERROR)));
            throw e;
        }

        return res;
    }

    /**
     * 신규 역할를 등록한다.
     * 
     * @param req 요청
     * @param res 응답
     * @param next 다음함수
     */
    public register = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            this.roleChangeService.register(req.body);
        }
        catch (e) {
            next(new HttpError(httpStatus.INTERNAL_SERVER_ERROR, httpStatus.getStatusText(httpStatus.INTERNAL_SERVER_ERROR)));
            throw e;
        }
        return res.status(httpStatus.CREATED).send(httpStatus.getStatusText(res.statusCode));
    }

    /**
     * 특정 역할를 변경한다.
     * 
     * @param req 요청
     * @param res 응답
     * @param next 다음함수
     */
    public update = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        let role: Role;
        try {
            role = await this.roleRetireveService.get(req.params.id);

            if (_.isUndefined(role)) {
                res.status(httpStatus.NOT_FOUND);
            }
            else {
                await this.roleChangeService.update(role, req.body);
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
     * 특정 역할를 삭제한다.
     * 
     * @param req 요청
     * @param res 응답
     * @param next 다음함수
     */
    public delete = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        let role: Role;
        try {
            role = await this.roleRetireveService.get(req.params.id);

            if (_.isUndefined(role)) {
                res.status(httpStatus.NOT_FOUND);
            }
            else {
                await this.roleChangeService.delete(role);
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