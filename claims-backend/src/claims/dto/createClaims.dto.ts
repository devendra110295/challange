import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';

export enum Status {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export enum PolicyType {
  PROPERTY = 'property',
  MOTOR = 'motor',
}

export class CreateClaimDto {
  @IsEnum(Status)
  'status': Status;

  @IsEmail()
  'owner': string;

  @IsString()
  @IsNotEmpty()
  'policyId': string;

  @IsInt()
  'ammount': number;

  @IsString()
  @IsNotEmpty()
  'policyHolder': string;

  @IsEnum(PolicyType)
  'policyType': PolicyType;
}
