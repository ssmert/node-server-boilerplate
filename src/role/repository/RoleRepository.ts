import { EntityRepository, Repository } from "typeorm";
import { Role } from "../entity/Role";

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {
}