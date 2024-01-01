import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '@common/ApiResponse';
import { ResponseThemeDto } from './dto/response-theme.dto';
import { ThemeApplicationService } from '@application/theme/theme.service';

@Controller('theme')
export class ThemeController {
  constructor(
    private readonly themeApplicationService: ThemeApplicationService,
  ) {}

  @ApiOperation({
    description: '現在日時がStartDate以降であるデータと件数を取得する',
  })
  @ApiTags('theme')
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
  @Get()
  @HttpCode(HttpStatus.OK)
  async findCurrentOrPastTheme(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<ApiResponse<ResponseThemeDto[]>> {
    const [themeList, allCount] = await Promise.all([
      this.themeApplicationService.findCurrentOrPastTheme(page, limit),
      this.themeApplicationService.countCurrentOrPastTheme(),
    ]);
    return ApiResponse.success(themeList, allCount);
  }

  @ApiOperation({
    description: 'IDから、テーマを一件取得する',
  })
  @ApiTags('theme')
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id') id: string,
  ): Promise<ApiResponse<ResponseThemeDto>> {
    const theme = await this.themeApplicationService.findOneTheme(id);
    return ApiResponse.success(theme);
  }
}
