import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { CiudadSupermercadoService } from './ciudad-supermercado.service';
import { SupermercadoDto } from 'src/supermercado/supermercado.dto';
import { plainToInstance } from 'class-transformer';
import { SupermercadoEntity } from 'src/supermercado/supermercado.entity';

@Controller('cities')
@UseInterceptors(BusinessErrorsInterceptor)
export class CiudadSupermercadoController {
  constructor(
    private readonly citySupermarketService: CiudadSupermercadoService,
  ) {}

  @Post(':cityId/supermarkets/:supermarketId')
  async addSupermarketToCity(
    @Param('cityId') cityId: string,
    @Param('supermarketId') supermarketId: string,
  ) {
    return await this.citySupermarketService.addSupermarketToCity(
      cityId,
      supermarketId,
    );
  }

  @Get(':cityId/supermarkets')
  async findSupermarketsFromCity(@Param('cityId') cityId: string) {
    return await this.citySupermarketService.findSupermarketsFromCity(cityId);
  }

  @Get(':cityId/supermarkets/:supermarketId')
  async findSupermarketFromCity(
    @Param('cityId') cityId: string,
    @Param('supermarketId') supermarketId: string,
  ) {
    return await this.citySupermarketService.findSupermarketFromCity(
      cityId,
      supermarketId,
    );
  }

  @Put(':cityId/supermarkets')
  async updateSupermarketsFromCity(
    @Param('cityId') cityId: string,
    @Param('supermarkets') supermarketsDto: SupermercadoDto[],
  ) {
    const supermarkets = plainToInstance(SupermercadoEntity, supermarketsDto);
    return await this.citySupermarketService.updateSupermarketsFromCity(
      cityId,
      supermarkets,
    );
  }

  @Delete(':cityId/supermarkets/:supermarketId')
  async deleteSupermarketFromCity(
    @Param('cityId') cityId: string,
    @Param('supermarketId') supermarketId: string,
  ) {
    return await this.citySupermarketService.deleteSupermarketFromCity(
      cityId,
      supermarketId,
    );
  }
}
