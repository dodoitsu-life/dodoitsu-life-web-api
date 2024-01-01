import { Injectable } from '@nestjs/common';
import { ResponseThemeDto } from '@application/theme/dto/response-theme.dto';
import { ThemeService } from '@domain/theme/theme.service';

@Injectable()
export class ThemeApplicationService {
  constructor(private readonly themeDomainService: ThemeService) {}

  async countAllTheme(): Promise<number> {
    return this.themeDomainService.countAll();
  }

  async countCurrentOrPastTheme(): Promise<number> {
    return this.themeDomainService.countCurrentOrPast();
  }

  async findCurrentOrPastTheme(
    page: number,
    limit: number,
  ): Promise<ResponseThemeDto[]> {
    const themeList = await this.themeDomainService.findCurrentOrPast(
      page,
      limit,
    );
    const responseThemeList = await Promise.all(
      themeList.map(async (theme) => {
        return new ResponseThemeDto(theme);
      }),
    );
    return responseThemeList;
  }

  async findOneTheme(id: string): Promise<ResponseThemeDto> {
    const theme = await this.themeDomainService.findOne(id);
    return new ResponseThemeDto(theme);
  }
}
