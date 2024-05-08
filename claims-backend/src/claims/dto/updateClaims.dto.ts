import { PartialType } from '@nestjs/mapped-types';
import { CreateClaimDto } from './createClaims.dto';

export class UpdateClaimsDto extends PartialType(CreateClaimDto) {}
