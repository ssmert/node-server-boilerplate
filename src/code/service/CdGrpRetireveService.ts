import { getCustomRepository, Equal } from "typeorm";
import { CdGrp } from "../entity/CdGrp";
import { CdGrpRepository } from "../repository/CdGrpRepository";
/**
 * 코드그룹 조회 서비스
 */
export default class CdGrpRetireveService {
    /**
     * 전체 코드그룹 목록을 조회한다.
     */
    public getList = async (): Promise<CdGrp[]> => {
        return await getCustomRepository(CdGrpRepository).find();
    }

    /**
     * 특정 코드그룹을 조회한다.
     */
    public get = async (cdGrpId: string): Promise<CdGrp> => {
        return await getCustomRepository(CdGrpRepository).findOne({ cdGrpId: Equal(cdGrpId) });
    }
}