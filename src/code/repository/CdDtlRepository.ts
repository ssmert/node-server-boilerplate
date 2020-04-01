import { EntityRepository, Repository } from "typeorm";
import { CdDtl } from "../entity/CdDtl";

@EntityRepository(CdDtl)
export class CdDtlRepository extends Repository<CdDtl> {
}