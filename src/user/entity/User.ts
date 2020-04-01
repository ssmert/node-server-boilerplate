import { BeforeUpdate, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import CustomBaseEntity from "../../core/infrastructure/CustomBaseEntity";
import { Role } from "../../role/entity/Role";

@Entity({ name: "tb_user" })
export class User extends CustomBaseEntity {
    /**
     * 생성자
     * 
     * @param userId 사용자 아이디
     * @param userNm 사용자명 
     * @param userPwd 비밀번호 
     * @param userPhone 연락처 
     * @param userDiv 사용자구분 
     * @param userUseYn 사용여부 
     * @param roles 역할목록 
     */
    constructor(userId: string, userNm: string, userPwd: string, userPhone: string, userDiv: string, userUseYn: string, roles: Role[]) {
        super();
        this.userId = userId;
        this.userNm = userNm;
        this.userPwd = userPwd;
        this.userPhone = userPhone;
        this.userDiv = userDiv;
        this.userUseYn = userUseYn;
        this.roles = roles;
    }

    // 사용자 일련번호
    @PrimaryGeneratedColumn({ name: "user_seq", type: "bigint" })
    userSeq: number;

    // 사용자 아이디
    @Column({ name: "user_id", length: 100, unique: true })
    userId: string;

    // 사용자명
    @Column({ name: "user_nm", length: 50 })
    userNm: string;

    // 비밀번호
    @Column({ name: "user_pwd", length: 100 })
    userPwd: string;

    // 연락처
    @Column({ name: "user_phone", length: 20 })
    userPhone: string;

    // 사용자구분
    @Column({ name: "user_div", length: 36 })
    userDiv: string;

    // 사용여부
    @Column("char", { name: "user_use_yn", length: 1 })
    userUseYn: string;

    // 역할목록
    @ManyToMany(() => Role, { eager: true })
    @JoinTable({ name: "tb_user_role", joinColumn: { name: "user_seq" }, inverseJoinColumn: { name: "role_seq" } })
    roles: Role[];

    ////////////////////////////////////////////////////////////////

    /**
     * 엔티티가 변경 되기 전 호출된다.
     */
    @BeforeUpdate()
    beforeUpdate = async (user: User): Promise<void> => {
        await this.modifyUser(user);
    }

    /**
     * 사용자를 변경한다.
     * 
     * @param user 변경할 사용자 정보
     */
    modifyUser = async (user: User): Promise<void> => {
        this.userId = user.userId;
        this.userNm = user.userNm;
        this.userPwd = user.userPwd;
        this.userPhone = user.userPhone;
        this.userDiv = user.userDiv;
        this.userUseYn = user.userUseYn;
        this.roles = user.roles;
    }
}