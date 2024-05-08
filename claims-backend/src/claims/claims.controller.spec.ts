import { Test, TestingModule } from '@nestjs/testing';
import { ClaimsController } from './claims.controller';
// import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ClaimsService } from './claims.service';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';

describe('ClaimsController', () => {
  let controller: ClaimsController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // let authGuard: JwtAuthGuard;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // let service: ClaimsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClaimsController],
      providers: [ClaimsService, JwtStrategy],
    }).compile();

    controller = module.get<ClaimsController>(ClaimsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all the claims with status 200', () => {
      const result = controller.findAll();
      expect(result).toBeDefined();
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
