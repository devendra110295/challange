import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClaimsModule } from './claims/claims.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ClaimsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
