import _ from "lodash";
import { getRepository, Repository } from "typeorm";
import { User } from "../entity/User";
/**
 * 사용자 변경 서비스
 */
export default class UserChangeService {
    /**
     * 신규 사용자를 등록한다.
     */
    public register = async (newUser: any): Promise<void> => {
        // 사용자 레파지토리
        const userRepository: Repository<User> = getRepository(User);
        const user: User = new User(newUser.userId, newUser.userNm);
        userRepository.save(user);
    }

    /**
     * 특정 사용자를 수정한다.
     */
    public update = async (user: User, updateUser: any): Promise<void> => {
        // 사용자 레파지토리
        const userRepository: Repository<User> = getRepository(User);
        await user.modify(updateUser);
        userRepository.save(user);
    }

    /**
     * 특정 사용자를 삭제한다.
     */
    public delete = async (user: User): Promise<void> => {
        // 사용자 레파지토리
        const userRepository: Repository<User> = getRepository(User);
        userRepository.delete(user);
    }
}