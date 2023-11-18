import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { CiudadDto } from './ciudad.dto';
import { CiudadEntity } from './ciudad.entity';
import { plainToInstance } from 'class-transformer';

@Controller('cities')
@UseInterceptors(BusinessErrorsInterceptor)
export class CiudadController {
  constructor(private readonly cityService: CiudadService) {}

  @Get()
  async findAll() {
    return await this.cityService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.cityService.findOne(id);
  }

  @Post()
  async create(@Body() cityDto: CiudadDto) {
    const city: CiudadEntity = plainToInstance(CiudadEntity, cityDto);
    return await this.cityService.create(city);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() cityDto: CiudadDto) {
    const city: CiudadEntity = plainToInstance(CiudadEntity, cityDto);
    return await this.cityService.update(id, city);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    return await this.cityService.delete(id);
  }
}
