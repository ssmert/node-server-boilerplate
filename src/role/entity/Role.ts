import { BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import CustomBaseEntity from "../../core/infrastructure/CustomBaseEntity";

@Entity({ name: "tb_role" })
export class Role extends CustomBaseEntity {
    /**
     * 생성자
     * 
     * @param roleId 역할 식별자
     * @param roleNm 역할명 
     * @param roleUseYn 사용여부 
     */
    constructor(roleId: string, roleNm: string, roleUseYn: string) {
        super();
        this.roleId = roleId;
        this.roleNm = roleNm;
        this.roleUseYn = roleUseYn;
    }

    // 역할 일련번호
    @PrimaryGeneratedColumn({ name: "role_seq", type: "bigint" })
    roleSeq: number;

    // 역할 식별자
    @Column({ name: "role_id", length: 100, unique: true })
    roleId: string;

    // 역할명
    @Column({ name: "role_nm", length: 50 })
    roleNm: string;

    // 사용여부
    @Column("char", { name: "role_use_yn", length: 1 })
    roleUseYn: string;

    ////////////////////////////////////////////////////////////////

    /**
     * 엔티티가 변경 되기 전 호출된다.
     */
    @BeforeUpdate()
    beforeUpdate = async (role: Role): Promise<void> => {
        await this.modifyRole(role);
    }

    /**
     * 역할을 변경한다.
     * 
     * @param role 변경할 역할 정보
     */
    modifyRole = async (role: Role): Promise<void> => {
        this.roleId = role.roleId;
        this.roleNm = role.roleNm;
        this.roleUseYn = role.roleUseYn;
    }
}