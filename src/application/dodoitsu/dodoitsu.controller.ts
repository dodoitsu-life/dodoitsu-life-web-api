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
import { ApiOperation, ApiTags, ApiQuery } from '@nestjs/swagger';
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

  @ApiOperation({
    description: '都々逸を投稿日順に一覧取得する',
  })
  @ApiTags('dodoitsu')
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'themeId',
    required: false,
    type: Number,
  })
  @UseGuards(OptionalJwtAuthGuard)
  @Get('latest')
  @HttpCode(HttpStatus.OK)
  async findLatest(
    @Req() req,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('themeId', new DefaultValuePipe(undefined)) themeId: number,
  ): Promise<ApiResponse<ResponseDodoitsuDto[]>> {
    const [dodoitsuList, allCount] = await Promise.all([
      this.dodoitsuApplicationService.findLatestDodoitsu(
        page,
        limit,
        req.user,
        themeId,
      ),
      this.dodoitsuApplicationService.countAllDodoitsu(),
    ]);
    return ApiResponse.success(dodoitsuList, allCount);
  }

  @ApiOperation({
    description: '都々逸をいいね順に一覧取得する',
  })
  @ApiTags('dodoitsu')
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'themeId',
    required: false,
    type: String,
  })
  @UseGuards(OptionalJwtAuthGuard)
  @Get('popular')
  @HttpCode(HttpStatus.OK)
  async findPopular(
    @Req() req,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('themeId', new DefaultValuePipe(undefined)) themeId: string,
  ): Promise<ApiResponse<ResponseDodoitsuDto[]>> {
    const [dodoitsuList, allCount] = await Promise.all([
      this.dodoitsuApplicationService.findPopularDodoitsu(
        page,
        limit,
        req.user,
        themeId,
      ),
      this.dodoitsuApplicationService.countAllDodoitsu(),
    ]);
    return ApiResponse.success(dodoitsuList, allCount);
  }

  @ApiOperation({
    description: 'IDから、都々逸を一件取得する',
  })
  @ApiTags('dodoitsu')
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

  @ApiOperation({
    description: 'テーマIDから、都々逸を一覧取得する',
  })
  @ApiTags('dodoitsu')
  @ApiQuery({
    name: 'themeId',
    required: false,
    type: String,
  })
  @UseGuards(OptionalJwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Req() req,
    @Body() createDodoitsuDto: CreateDodoitsuDto,
    @Query('themeId', new DefaultValuePipe(undefined)) themeId: string,
  ): Promise<ApiResponse<ResponseDodoitsuDto>> {
    const dodoitsu = await this.dodoitsuApplicationService.createDodoitsu(
      createDodoitsuDto,
      req.user,
      themeId,
    );
    return ApiResponse.success(dodoitsu);
  }

  @ApiOperation({
    description: '都々逸をいいねする',
  })
  @ApiTags('dodoitsu')
  @UseGuards(AuthGuard('jwt'))
  @Post(':id/like')
  async like(@Param('id') id: string, @Req() req): Promise<ApiResponse<any>> {
    await this.dodoitsuApplicationService.likeDodoitsu(id, req.user);
    return ApiResponse.success(null);
  }

  @ApiOperation({
    description: '都々逸のいいねを削除する',
  })
  @ApiTags('dodoitsu')
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id/unlike')
  @HttpCode(HttpStatus.OK)
  async unlike(@Param('id') id: string, @Req() req): Promise<ApiResponse<any>> {
    await this.dodoitsuApplicationService.unlikeDodoitsu(id, req.user.id);
    return ApiResponse.success(null);
  }

  @ApiOperation({
    description: 'ユーザーIDから、ユーザーが投稿した都々逸を一覧取得する',
  })
  @ApiTags('dodoitsu')
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
  })
  @UseGuards(OptionalJwtAuthGuard)
  @Get('user/:userId')
  @HttpCode(HttpStatus.OK)
  async findByUserId(
    @Param('userId') userId: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<ApiResponse<ResponseDodoitsuDto[]>> {
    const [dodoitsuList, allCount] = await Promise.all([
      this.dodoitsuApplicationService.findDodoitsuByUserId(userId, page, limit),
      this.dodoitsuApplicationService.countDodoitsuByUserId(userId),
    ]);
    return ApiResponse.success(dodoitsuList, allCount);
  }

  @ApiOperation({
    description: 'ユーザーIDから、ユーザーがいいねしている都々逸を一覧取得する',
  })
  @ApiTags('dodoitsu')
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
  })
  @UseGuards(OptionalJwtAuthGuard)
  @Get('user/:userId/liked')
  @HttpCode(HttpStatus.OK)
  async findLikedByUserId(
    @Param('userId') userId: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<ApiResponse<ResponseDodoitsuDto[]>> {
    const [dodoitsuList, allCount] = await Promise.all([
      this.dodoitsuApplicationService.findLikedDodoitsuByUserId(
        userId,
        page,
        limit,
      ),
      this.dodoitsuApplicationService.countLikedDodoitsuByUserId(userId),
    ]);
    return ApiResponse.success(dodoitsuList, allCount);
  }
}
