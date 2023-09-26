import { Injectable } from '@nestjs/common';
import { ResponseUserDto } from '@application/user/dto/response-user.dto';
import { UserService } from '@domain/user/user.service';

@Injectable()
export class UserApplicationService {
  constructor(private readonly userDomainService: UserService) {}

  async findOneUser(id: string): Promise<ResponseUserDto> {
    const user = await this.userDomainService.findOne({ id });
    return new ResponseUserDto(user);
  }
}
