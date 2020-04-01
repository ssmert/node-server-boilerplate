import { getCustomRepository, Equal } from "typeorm";
import { Role } from "../entity/Role";
import { RoleRepository } from "../repository/RoleRepository";
/**
 * 역할 변경 서비스
 */
export default class RoleChangeService {
    /**
     * 신규 역할을 등록한다.
     */
    public register = async (newRole: any): Promise<void> => {
        const role: Role = new Role(newRole.roleId, newRole.roleNm, newRole.roleUseYn);

        await getCustomRepository(RoleRepository).insert(role);
    }

    /**
     * 특정 역할을 수정한다.
     */
    public update = async (role: Role, updateRole: any): Promise<void> => {
        await getCustomRepository(RoleRepository).update({ roleSeq: Equal(role.roleSeq) }, updateRole);
    }

    /**
     * 특정 역할을 삭제한다.
     */
    public delete = async (role: Role): Promise<void> => {
        await getCustomRepository(RoleRepository).delete({ roleSeq: Equal(role.roleSeq) });
    }
}