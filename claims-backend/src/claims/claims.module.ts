import { Module } from '@nestjs/common';
import { ClaimsController } from './claims.controller';
import { ClaimsService } from './claims.service';
// import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';

@Module({
  imports: [],
  controllers: [ClaimsController],
  providers: [ClaimsService, JwtStrategy],
})
export class ClaimsModule {}
