import { getCustomRepository, Equal } from "typeorm";
import { User } from "../entity/User";
import { UserRepository } from "../repository/UserRepository";
/**
 * 사용자 조회 서비스
 */
export default class UserRetireveService {
    /**
     * 전체 사용자 목록을 조회한다.
     */
    public getList = async (): Promise<User[]> => {
        return await getCustomRepository(UserRepository).find();
    }

    /**
     * 특정 사용자를 조회한다.
     */
    public get = async (userId: string): Promise<User> => {
        return await getCustomRepository(UserRepository).findOne({ userId: Equal(userId) });
    }
}