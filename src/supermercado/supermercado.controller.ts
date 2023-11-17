import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { SupermercadoService } from './supermercado.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';
import { SupermercadoDto } from './supermercado.dto';
import { SupermercadoEntity } from './supermercado.entity';

@Controller('supermarkets')
@UseInterceptors(BusinessErrorsInterceptor)
export class SupermercadoController {
  constructor(private readonly supermarketService: SupermercadoService) {}

  @Get()
  async findAll() {
    return await this.supermarketService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.supermarketService.findOne(id);
  }

  @Post()
  async create(@Body() supermarketDto: SupermercadoDto) {
    const supermarket: SupermercadoEntity = plainToInstance(
      SupermercadoEntity,
      supermarketDto,
    );
    return await this.supermarketService.create(supermarket);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() supermarketDto: SupermercadoDto,
  ) {
    const supermarket: SupermercadoEntity = plainToInstance(
      SupermercadoEntity,
      supermarketDto,
    );
    return await this.supermarketService.update(id, supermarket);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.supermarketService.delete(id);
  }
}
