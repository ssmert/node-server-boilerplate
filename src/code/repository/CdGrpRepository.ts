import { EntityRepository, Repository } from "typeorm";
import { CdGrp } from "../entity/CdGrp";

@EntityRepository(CdGrp)
export class CdGrpRepository extends Repository<CdGrp> {

}