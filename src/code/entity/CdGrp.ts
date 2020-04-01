import { BeforeUpdate, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import CustomBaseEntity from "../../core/infrastructure/CustomBaseEntity";
import { CdDtl } from "./CdDtl";

@Entity({ name: "tb_code_group" })
export class CdGrp extends CustomBaseEntity {
    /**
     * 생성자
     * 
     * @param cdGrpId 코드그룹 아이디
     * @param cdGrpNm 코드그룹명 
     * @param cdDtls 코드상세목록 
     */
    constructor(cdGrpId: string, cdGrpNm: string, cdDtls: CdDtl[]) {
        super();
        this.cdGrpId = cdGrpId;
        this.cdGrpNm = cdGrpNm;
        this.cdDtls = cdDtls;
    }

    // 코드그룹 일련번호
    @PrimaryGeneratedColumn({ name: "cd_grp_seq", type: "bigint" })
    cdGrpSeq: number;

    // 코드그룹 아이디
    @Column({ name: "cd_grp_id", length: 100, unique: true })
    cdGrpId: string;

    // 코드그룹명
    @Column({ name: "cd_grp_nm", length: 50 })
    cdGrpNm: string;

    // 코드상세목록
    @OneToMany(() => CdDtl, cdDtl => cdDtl.cdGrp, { eager: true, cascade: true })
    cdDtls: CdDtl[];

    ////////////////////////////////////////////////////////////////

    /**
     * 엔티티가 변경 되기 전 호출된다.
     */
    @BeforeUpdate()
    beforeUpdate = async (cdGrp: CdGrp): Promise<void> => {
        await this.modifyCdGrp(cdGrp);
    }

    /**
     * 코드그룹을 변경한다.
     * 
     * @param cdGrp 변경할 코드그룹 정보
     */
    modifyCdGrp = async (cdGrp: CdGrp): Promise<void> => {
        this.cdGrpId = cdGrp.cdGrpId;
        this.cdGrpNm = cdGrp.cdGrpNm;
        this.cdDtls = cdGrp.cdDtls;
    }
}