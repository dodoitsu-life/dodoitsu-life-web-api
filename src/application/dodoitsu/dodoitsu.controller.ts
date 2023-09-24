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
  Delete,
  DefaultValuePipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '@common/ApiResponse';

import { DodoitsuApplicationService } from '@application/dodoitsu/dodoitsu.service';
import { CreateDodoitsuDto } from '@application/dodoitsu/dto/create-dodoitsu.dto';
import { ResponseDodoitsuDto } from '@application/dodoitsu/dto/response-dodoitsu.dto';

import { OptionalJwtAuthGuard } from '@application/auth/guards/optional-jwt-auth.guard';

@Controller('dodoitsu')
export class DodoitsuController {
  constructor(
    private readonly dodoitsuApplicationService: DodoitsuApplicationService,
  ) {}

  @UseGuards(OptionalJwtAuthGuard)
  @Get('latest')
  @HttpCode(HttpStatus.OK)
  async findLatest(
    @Req() req,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<ApiResponse<ResponseDodoitsuDto[]>> {
    const [dodoitsuList, allCount] = await Promise.all([
      this.dodoitsuApplicationService.findLatestDodoitsu(page, limit, req.user),
      this.dodoitsuApplicationService.countAllDodoitsu(),
    ]);
    return ApiResponse.success(dodoitsuList, allCount);
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Get('popular')
  @HttpCode(HttpStatus.OK)
  async findPopular(
    @Req() req,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<ApiResponse<ResponseDodoitsuDto[]>> {
    const [dodoitsuList, allCount] = await Promise.all([
      this.dodoitsuApplicationService.findPopularDodoitsu(
        page,
        limit,
        req.user,
      ),
      this.dodoitsuApplicationService.countAllDodoitsu(),
    ]);
    return ApiResponse.success(dodoitsuList, allCount);
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Req() req,
    @Param('id') id: string,
  ): Promise<ApiResponse<ResponseDodoitsuDto | null>> {
    const dodoitsu = await this.dodoitsuApplicationService.findOneDodoitsu(
      id,
      req.user,
    );
    return ApiResponse.success(dodoitsu);
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Req() req,
    @Body() createDodoitsuDto: CreateDodoitsuDto,
  ): Promise<ApiResponse<ResponseDodoitsuDto>> {
    const dodoitsu = await this.dodoitsuApplicationService.createDodoitsu(
      createDodoitsuDto,
      req.user,
    );
    return ApiResponse.success(dodoitsu);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/like')
  async like(@Param('id') id: string, @Req() req): Promise<ApiResponse<any>> {
    await this.dodoitsuApplicationService.likeDodoitsu(id, req.user);
    return ApiResponse.success(null);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id/unlike')
  @HttpCode(HttpStatus.OK)
  async unlike(@Param('id') id: string, @Req() req): Promise<ApiResponse<any>> {
    await this.dodoitsuApplicationService.unlikeDodoitsu(id, req.user.id);
    return ApiResponse.success(null);
  }
}
