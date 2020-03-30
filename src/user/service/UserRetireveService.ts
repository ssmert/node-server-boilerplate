import { Repository, getRepository } from "typeorm";
import { User } from "../entity/User";

/**
 * 사용자 조회 서비스
 */
export default class UserRetireveService {
    /**
     * 전체 사용자 목록을 조회한다.
     */
    public getList = async (): Promise<User[]> => {
        // 사용자 레파지토리
        const userRepository: Repository<User> = getRepository(User);
        const datas: User[] = await userRepository.find();

        return datas;
    }

    /**
     * 전체 사용자 목록을 조회한다.
     */
    public get = async (userId: string): Promise<User> => {
        // 사용자 레파지토리
        const userRepository: Repository<User> = getRepository(User);
        const data: User = await userRepository.findOne({ userId });

        return data;
    }
}