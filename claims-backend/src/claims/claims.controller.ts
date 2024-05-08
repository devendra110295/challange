import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { CreateClaimDto } from './dto/createClaims.dto';
import { UpdateClaimsDto } from './dto/updateClaims.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('claims')
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query('owner') owner?: string, @Query('status') status?: string) {
    return this.claimsService.findAll(owner, status);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.claimsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body(ValidationPipe) createClaimDto: CreateClaimDto) {
    return this.claimsService.create(createClaimDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updataClaimDto: UpdateClaimsDto,
  ) {
    return this.claimsService.update(updataClaimDto, id);
  }
}
