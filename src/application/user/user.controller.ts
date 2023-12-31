import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '@common/ApiResponse';
import { ResponseUserDto } from './dto/response-user.dto';
import { UserApplicationService } from '@application/user/user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userApplicationService: UserApplicationService,
  ) {}

  @ApiOperation({
    description: 'ユーザーIDから、ユーザーデータを一件取得する',
  })
  @ApiTags('user')
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id') id: string,
  ): Promise<ApiResponse<ResponseUserDto>> {
    const user = await this.userApplicationService.findOneUser(id);
    return ApiResponse.success(user);
  }
}
