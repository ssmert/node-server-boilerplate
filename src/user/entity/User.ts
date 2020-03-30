import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity({ name: "tb_users" })
export class User extends BaseEntity {
    constructor(userId: string, userNm: string) {
        super();
        this.userId = userId;
        this.userNm = userNm;
        this.regDt = new Date();
    }

    @PrimaryGeneratedColumn({ name: "user_seq" })
    userSeq: bigint;

    @Column({ name: "user_id", length: 255, unique: true })
    userId: string;

    @Column({ name: "user_nm", length: 50 })
    userNm: string;

    @Column({ name: "reg_dt" })
    regDt: Date;

    modify = async (user: User) => {
        this.userNm = user.userNm;
    }
}