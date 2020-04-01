import _ from "lodash";
import { Equal, getCustomRepository, In } from "typeorm";
import { Role } from "../entity/Role";
import { RoleRepository } from "../repository/RoleRepository";
/**
 * 역할 조회 서비스
 */
export default class RoleRetireveService {
    /**
     * 전체 역할 목록을 조회한다.
     */
    public getList = async (roleIds?: string[]): Promise<Role[]> => {
        return await getCustomRepository(RoleRepository).find(_.isUndefined(roleIds) ? {} : { roleId: In(roleIds) });
    }

    /**
     * 특정 역할을 조회한다.
     */
    public get = async (roleId: string): Promise<Role> => {
        return await getCustomRepository(RoleRepository).findOne({ roleId: Equal(roleId) });
    }
}