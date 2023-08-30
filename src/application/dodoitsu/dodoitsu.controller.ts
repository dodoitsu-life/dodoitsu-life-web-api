import {
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
} from '@nestjs/common';
import { DodoitsuService } from '../../domain/dodoitsu/dodoitsu.service';
import { CreateDodoitsuDto } from './dto/create-dodoitsu.dto';
import { Dodoitsu } from '../../domain/dodoitsu/dodoitsu.entity';
import { ApiResponse } from '../../common/ApiResponse';

@Controller('dodoitsu')
export class DodoitsuController {
  constructor(private readonly dodoitsuService: DodoitsuService) {}

  @Get('latest')
  @HttpCode(HttpStatus.OK)
  async findLatest(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<ApiResponse<Dodoitsu[]>> {
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
  ): Promise<ApiResponse<Dodoitsu[]>> {
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
  ): Promise<ApiResponse<Dodoitsu | null>> {
    const dodoitsu = await this.dodoitsuService.findOne(id);
    return ApiResponse.success(dodoitsu);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Body() createDodoitsuDto: CreateDodoitsuDto,
  ): Promise<ApiResponse<Dodoitsu>> {
    const dodoitsu = await this.dodoitsuService.create(createDodoitsuDto);
    return ApiResponse.success(dodoitsu);
  }

  @Post(':id/like')
  @HttpCode(HttpStatus.CREATED)
  async addLike(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<ApiResponse<void>> {
    await this.dodoitsuService.increaseLike(id);
    return ApiResponse.success(null, undefined, 'Like added successfully');
  }

  @Delete(':id/like')
  @HttpCode(HttpStatus.OK)
  async removeLike(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<ApiResponse<void>> {
    await this.dodoitsuService.decreaseLike(id);
    return ApiResponse.success(null, undefined, 'Like removed successfully');
  }
}
