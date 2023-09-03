import {
  Req,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  Post,
  DefaultValuePipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse } from '@common/ApiResponse';

import { DodoitsuService } from '@domain/dodoitsu/dodoitsu.service';
import { CreateDodoitsuDto } from '@application/dodoitsu/dto/create-dodoitsu.dto';
import { ResponseDodoitsuDto } from '@application/dodoitsu/dto/response-dodoitsu.dto';

import { OptionalJwtAuthGuard } from '@application/auth/guards/optional-jwt-auth.guard';

@Controller('dodoitsu')
export class DodoitsuController {
  constructor(private readonly dodoitsuService: DodoitsuService) {}

  @Get('latest')
  @HttpCode(HttpStatus.OK)
  async findLatest(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<ApiResponse<ResponseDodoitsuDto[]>> {
    const [dodoitsuList, allCount] = await Promise.all([
      this.dodoitsuService.findLatest(page, limit),
      this.dodoitsuService.countAll(),
    ]);
    return ApiResponse.success(dodoitsuList, allCount);
  }

  @Get('popular')
  @HttpCode(HttpStatus.OK)
  async findPopular(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<ApiResponse<ResponseDodoitsuDto[]>> {
    const [dodoitsuList, allCount] = await Promise.all([
      this.dodoitsuService.findPopular(page, limit),
      this.dodoitsuService.countAll(),
    ]);
    return ApiResponse.success(dodoitsuList, allCount);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id') id: string,
  ): Promise<ApiResponse<ResponseDodoitsuDto | null>> {
    const dodoitsu = await this.dodoitsuService.findOne(id);
    return ApiResponse.success(dodoitsu);
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Req() req,
    @Body() createDodoitsuDto: CreateDodoitsuDto,
  ): Promise<ApiResponse<ResponseDodoitsuDto>> {
    const dodoitsu = await this.dodoitsuService.create(
      createDodoitsuDto,
      req.user,
    );
    return ApiResponse.success(dodoitsu);
  }
}
