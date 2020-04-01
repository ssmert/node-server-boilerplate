import { getCustomRepository, Equal } from "typeorm";
import { Role } from "../../role/entity/Role";
import RoleRetireveService from "../../role/service/RoleRetireveService";
import { User } from "../entity/User";
import { UserRepository } from "../repository/UserRepository";
/**
 * 사용자 변경 서비스
 */
export default class UserChangeService {
    // 역할 조회 서비스
    private roleRetireveService: RoleRetireveService = new RoleRetireveService;

    /**
     * 신규 사용자를 등록한다.
     */
    public register = async (newUser: any): Promise<void> => {
        const userRoles: Role[] = await this.roleRetireveService.getList(newUser.rolIds);
        const user: User = new User(newUser.userId, newUser.userNm, newUser.userPwd, newUser.userPhone, newUser.userDiv, newUser.userUseYn, userRoles);

        await getCustomRepository(UserRepository).save(user);
    }

    /**
     * 특정 사용자를 수정한다.
     */
    public update = async (user: User, updateUser: any): Promise<void> => {
        await getCustomRepository(UserRepository).update({ userSeq: Equal(user.userSeq) }, updateUser);
    }

    /**
     * 특정 사용자를 삭제한다.
     */
    public delete = async (user: User): Promise<void> => {
        await getCustomRepository(UserRepository).delete({ userSeq: Equal(user.userSeq) });
    }
}