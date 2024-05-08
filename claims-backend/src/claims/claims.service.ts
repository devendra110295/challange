import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { CreateClaimDto } from './dto/createClaims.dto';
import { UpdateClaimsDto } from './dto/updateClaims.dto';

@Injectable()
export class ClaimsService {
  findAll(owner?: string, status?: string) {
    const claims = readFileSync('./mockData/claims.json', 'utf8');
    let data = JSON.parse(claims);
    if (owner) {
      data = data.filter((claim) => claim.owner === owner);
    }
    if (status) {
      data = data.filter((claim) => claim.status === status);
    }
    return data;
  }

  findOne(id: number) {
    try {
      const claims = readFileSync('./mockData/claims.json', 'utf8');
      const data = JSON.parse(claims);
      const record = data.find((claim) => claim.id === id);
      if (!record) {
        return new NotFoundException('Invalid Claim Id.');
      }
      return record;
    } catch (ex) {
      throw new ServiceUnavailableException(
        'Something went wrong. Please try after sometime',
      );
    }
  }

  create(claim: CreateClaimDto) {
    try {
      const claims = readFileSync('./mockData/claims.json', 'utf8');
      const data = JSON.parse(claims);
      const highestId = data.sort((a, b) => Number(b.id) - Number(a.id))?.[0]
        ?.id;
      data.push({ ...claim, id: highestId + 1 });
      writeFileSync('./mockData/claims.json', JSON.stringify(data));
      return claim;
    } catch (ex) {
      if (ex.code === 'ENOENT') {
        const data = [];
        data.push(claim);
        writeFileSync('./mockData/claims.json', JSON.stringify(data));
        return claim;
      } else {
        throw ex;
      }
    }
  }

  update(updateClaimDto: UpdateClaimsDto, id: number) {
    try {
      const claims = readFileSync('./mockData/claims.json', 'utf8');
      let data = JSON.parse(claims);
      if (!data || !data.length) {
        return new NotFoundException('Invalid Claim Id.');
      }
      let record = data.find((claim) => claim.id === id);
      if (!record) {
        return new NotFoundException('Invalid Claim Id.');
      }
      record = {
        ...record,
        ...updateClaimDto,
      };
      data = data.map((claim) => {
        if (claim.id === id) {
          return record;
        }
        return claim;
      });
      writeFileSync('./mockData/claims.json', JSON.stringify(data));
      return record;
    } catch (ex) {
      throw ex;
    }
  }
}
