import { BaseEntity, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export default class CustomBaseEntity extends BaseEntity {
    // 등록자
    @Column({ name: "reg_id", length: 100, nullable: true })
    regId: string;

    // 등록자명
    @Column({ name: "reg_nm", length: 50, nullable: true })
    regNm: string;

    // 등록일시
    @CreateDateColumn({ name: "reg_dt", type: "datetime" })
    regDt: Date;

    // 변경자
    @Column({ name: "chg_id", length: 100, nullable: true })
    chgId: string;

    // 변경자명
    @Column({ name: "chg_nm", length: 50, nullable: true })
    chgNm: string;

    // 변경일시
    @UpdateDateColumn({ name: "chg_dt", type: "datetime" })
    chgDt: Date;
}