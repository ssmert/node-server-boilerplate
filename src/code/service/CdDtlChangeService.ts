import { getCustomRepository, Equal } from "typeorm";
import { CdDtl } from "../entity/CdDtl";
import { CdDtlRepository } from "../repository/CdDtlRepository";
/**
 * 코드상세 변경 서비스
 */
export default class CdDtlChangeService {
    /**
     * 신규 코드상세를 등록한다.
     */
    public register = async (newCdDtl: any): Promise<void> => {
        const cdDtl: CdDtl = new CdDtl(newCdDtl.cdDtlId, newCdDtl.cdDtlNm, newCdDtl.cdDtlOrd);

        await getCustomRepository(CdDtlRepository).insert(cdDtl);
    }

    /**
     * 특정 코드상세를 수정한다.
     */
    public update = async (cdDtl: CdDtl, updateCdDtl: any): Promise<void> => {
        await getCustomRepository(CdDtlRepository).update({ cdDtlSeq: Equal(cdDtl.cdDtlSeq) }, updateCdDtl);
    }

    /**
     * 특정 코드상세를 삭제한다.
     */
    public delete = async (cdDtl: CdDtl): Promise<void> => {
        await getCustomRepository(CdDtlRepository).delete({ cdDtlSeq: Equal(cdDtl.cdDtlSeq) });
    }
}