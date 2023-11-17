import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CiudadEntity } from '../../src/ciudad/ciudad.entity';
import { SupermercadoEntity } from '../../src/supermercado/supermercado.entity';
import { Repository } from 'typeorm';
import {
  BusinessLogicException,
  BusinessError,
} from '../../src/shared/errors/business-errors';

@Injectable()
export class CiudadSupermercadoService {
  constructor(
    @InjectRepository(CiudadEntity)
    private readonly ciudadRepository: Repository<CiudadEntity>,

    @InjectRepository(SupermercadoEntity)
    private readonly supermercadoRepository: Repository<SupermercadoEntity>,
  ) {}

  async addSupermarketToCity(
    cityId: string,
    supermarketId: string,
  ): Promise<CiudadEntity> {
    const city = await this.ciudadRepository.findOne({
      where: { id: cityId },
      relations: ['supermercados'],
    });
    if (!city)
      throw new BusinessLogicException(
        'The city with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    const supermarket = await this.supermercadoRepository.findOne({
      where: { id: supermarketId },
    });
    if (!supermarket)
      throw new BusinessLogicException(
        'The supermarket with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    city.supermercados.push(...city.supermercados, supermarket);
    return await this.ciudadRepository.save(city);
  }

  async findSupermarketsFromCity(
    cityId: string,
  ): Promise<SupermercadoEntity[]> {
    const city = await this.ciudadRepository.findOne({
      where: { id: cityId },
      relations: ['supermercados'],
    });
    if (!city)
      throw new BusinessLogicException(
        'The city with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    return city.supermercados;
  }

  async findSupermarketFromCity(
    cityId: string,
    supermarketId: string,
  ): Promise<SupermercadoEntity> {
    const city = await this.ciudadRepository.findOne({
      where: { id: cityId },
      relations: ['supermercados'],
    });
    if (!city)
      throw new BusinessLogicException(
        'The city with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    const supermarket = city.supermercados.find(
      (supermarket) => supermarket.id === supermarketId,
    );
    if (!supermarket)
      throw new BusinessLogicException(
        'The supermarket with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const citySupermarket: SupermercadoEntity = await city.supermercados.find(
      (supermarket) => supermarket.id === supermarketId,
    );
    if (!citySupermarket)
      throw new BusinessLogicException(
        'The supermarket with the given id is not associated with the city',
        BusinessError.PRECONDITION_FAILED,
      );
    return supermarket;
  }

  async updateSupermarketsFromCity(
    cityId: string,
    supermarkets: SupermercadoEntity[],
  ): Promise<CiudadEntity> {
    const city = await this.ciudadRepository.findOne({
      where: { id: cityId },
      relations: ['supermercados'],
    });
    if (!city)
      throw new BusinessLogicException(
        'The city with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    for (const supermarket of supermarkets) {
      const persistedSupermarket: SupermercadoEntity =
        await this.supermercadoRepository.findOne({
          where: { id: supermarket.id },
        });
      if (!persistedSupermarket)
        throw new BusinessLogicException(
          'The supermarket with the given id was not found',
          BusinessError.NOT_FOUND,
        );
    }
    city.supermercados = [...city.supermercados, ...supermarkets];
    return await this.ciudadRepository.save(city);
  }

  async deleteSupermarketFromCity(
    cityId: string,
    supermarketId: string,
  ): Promise<CiudadEntity> {
    const city = await this.ciudadRepository.findOne({
      where: { id: cityId },
      relations: ['supermercados'],
    });
    if (!city)
      throw new BusinessLogicException(
        'The city with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const supermarket = await this.supermercadoRepository.findOne({
      where: { id: supermarketId },
    });
    if (!supermarket)
      throw new BusinessLogicException(
        'The supermarket with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const citySupermarket: SupermercadoEntity = await city.supermercados.find(
      (supermarket) => supermarket.id === supermarketId,
    );
    if (!citySupermarket)
      throw new BusinessLogicException(
        'The supermarket with the given id is not associated with the city',
        BusinessError.PRECONDITION_FAILED,
      );
    city.supermercados = city.supermercados.filter(
      (supermarket) => supermarket.id !== supermarketId,
    );
    return await this.ciudadRepository.save(city);
  }
}
