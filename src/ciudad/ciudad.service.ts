import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CiudadEntity } from './ciudad.entity';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { countries } from '../shared/data/countries';

@Injectable()
export class CiudadService {
  constructor(
    @InjectRepository(CiudadEntity)
    private readonly ciudadRepository: Repository<CiudadEntity>,
  ) {}

  async findAll(): Promise<CiudadEntity[]> {
    return await this.ciudadRepository.find({ relations: ['supermercados'] });
  }

  async findOne(id: string): Promise<CiudadEntity> {
    const ciudad = await this.ciudadRepository.findOne({
      where: { id },
      relations: ['supermercados'],
    });
    if (!ciudad)
      throw new BusinessLogicException(
        'The city with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return ciudad;
  }

  async create(ciudad: CiudadEntity): Promise<CiudadEntity> {
    const isValidCountry = countries.includes(ciudad.pais.toLowerCase());
    if (!isValidCountry)
      throw new BusinessLogicException(
        'The country is not valid',
        BusinessError.BAD_REQUEST,
      );
    return await this.ciudadRepository.save(ciudad);
  }

  async update(id: string, ciudad: CiudadEntity): Promise<CiudadEntity> {
    const isValidCountry = countries.includes(ciudad.pais.toLowerCase());
    if (!isValidCountry)
      throw new BusinessLogicException(
        'The country is not valid',
        BusinessError.BAD_REQUEST,
      );
    const persistedCity = await this.ciudadRepository.findOne({
      where: { id },
    });
    if (!persistedCity)
      throw new BusinessLogicException(
        'The city with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return await this.ciudadRepository.save({ ...persistedCity, ...ciudad });
  }

  async delete(id: string): Promise<void> {
    const persistedCity = await this.ciudadRepository.findOne({
      where: { id },
    });
    if (!persistedCity)
      throw new BusinessLogicException(
        'The city with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    await this.ciudadRepository.delete(persistedCity);
  }
}
