import { getCustomRepository, Equal } from "typeorm";

import { CdGrpRepository } from "../repository/CdGrpRepository";
import { CdGrp } from "../entity/CdGrp";
/**
 * 코드그룹 변경 서비스
 */
export default class CdGrpChangeService {
    /**
     * 신규 코드그룹을 등록한다.
     */
    public register = async (newCdGrp: any): Promise<void> => {
        const cdGrp: CdGrp = new CdGrp(newCdGrp.cdGrpId, newCdGrp.cdGrpNm, newCdGrp.cdDtls);

        await getCustomRepository(CdGrpRepository).save(cdGrp);
    }

    /**
     * 특정 코드그룹을 수정한다.
     */
    public update = async (cdGrp: CdGrp, updateCdGrp: any): Promise<void> => {
        await getCustomRepository(CdGrpRepository).update({ cdGrpSeq: Equal(cdGrp.cdGrpSeq) }, updateCdGrp);
    }

    /**
     * 특정 코드그룹을 삭제한다.
     */
    public delete = async (cdGrp: CdGrp): Promise<void> => {
        await getCustomRepository(CdGrpRepository).delete({ cdGrpSeq: Equal(cdGrp.cdGrpSeq) });
    }
}