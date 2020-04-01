import { getCustomRepository, Equal } from "typeorm";
import { CdDtl } from "../entity/CdDtl";
import { CdDtlRepository } from "../repository/CdDtlRepository";
/**
 * 코드상세 조회 서비스
 */
export default class CdDtlRetireveService {
    /**
     * 전체 코드상세 목록을 조회한다.
     */
    public getList = async (): Promise<CdDtl[]> => {
        return await getCustomRepository(CdDtlRepository).find();
    }

    /**
     * 특정 코드상세를 조회한다.
     */
    public get = async (cdDtlId: string): Promise<CdDtl> => {
        return await getCustomRepository(CdDtlRepository).findOne({ cdDtlId: Equal(cdDtlId) });
    }
}