import { BeforeUpdate, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import CustomBaseEntity from "../../core/infrastructure/CustomBaseEntity";
import { CdGrp } from "./CdGrp";

@Entity({ name: "tb_code_detail" })
export class CdDtl extends CustomBaseEntity {
    /**
     * 생성자
     * 
     * @param cdDtlId 코드상세 식별자
     * @param cdDtlNm 코드상세명 
     * @param cdDtlOrd 코드상세순서 
     */
    constructor(cdDtlId: string, cdDtlNm: string, cdDtlOrd: number) {
        super();
        this.cdDtlId = cdDtlId;
        this.cdDtlNm = cdDtlNm;
        this.cdDtlOrd = cdDtlOrd;
    }

    // 코드상세 일련번호
    @PrimaryGeneratedColumn({ name: "cd_dtl_seq", type: "bigint" })
    cdDtlSeq: number;

    // 코드상세 식별자
    @Column({ name: "cd_dtl_id", length: 100, unique: true })
    cdDtlId: string;

    // 코드상세명
    @Column({ name: "cd_dtl_nm", length: 50 })
    cdDtlNm: string;

    // 코드상세순서
    @Column({ name: "cd_dtl_ord", type: "int" })
    cdDtlOrd: number;

    @ManyToOne(() => CdGrp, cdGrp => cdGrp.cdDtls, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: "cd_grp_seq" })
    cdGrp: CdGrp;

    ////////////////////////////////////////////////////////////////

    /**
     * 엔티티가 변경 되기 전 호출된다.
     */
    @BeforeUpdate()
    beforeUpdate = async (cdDtl: CdDtl): Promise<void> => {
        await this.modifyCdDtl(cdDtl);
    }

    /**
     * 코드상세를 변경한다.
     * 
     * @param cdDtl 변경할 코드상세 정보
     */
    modifyCdDtl = async (cdDtl: CdDtl): Promise<void> => {
        this.cdDtlId = cdDtl.cdDtlId;
        this.cdDtlNm = cdDtl.cdDtlNm;
        this.cdDtlOrd = cdDtl.cdDtlOrd;
    }
}