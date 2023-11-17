import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupermercadoEntity } from './supermercado.entity';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';

@Injectable()
export class SupermercadoService {
  constructor(
    @InjectRepository(SupermercadoEntity)
    private readonly supermercadoRepository: Repository<SupermercadoEntity>,
  ) {}

  async findAll(): Promise<SupermercadoEntity[]> {
    return await this.supermercadoRepository.find({
      relations: ['ciudades'],
    });
  }

  async findOne(id: string): Promise<SupermercadoEntity> {
    const supermarket = await this.supermercadoRepository.findOne({
      where: { id },
      relations: ['ciudades'],
    });
    if (!supermarket)
      throw new BusinessLogicException(
        'The supermarket with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    return supermarket;
  }

  async create(supermarket: SupermercadoEntity): Promise<SupermercadoEntity> {
    if (supermarket.nombre.length <= 10)
      throw new BusinessLogicException(
        'The name must have more than 10 characters',
        BusinessError.BAD_REQUEST,
      );
    return await this.supermercadoRepository.save(supermarket);
  }

  async update(
    id: string,
    supermarket: SupermercadoEntity,
  ): Promise<SupermercadoEntity> {
    if (supermarket.nombre.length <= 10)
      throw new BusinessLogicException(
        'The name must have more than 10 characters',
        BusinessError.BAD_REQUEST,
      );
    const persistedSupermarket = await this.supermercadoRepository.findOne({
      where: { id },
    });
    if (!persistedSupermarket)
      throw new BusinessLogicException(
        'The supermarket with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    return await this.supermercadoRepository.save({
      ...persistedSupermarket,
      ...supermarket,
    });
  }

  async delete(id: string): Promise<void> {
    const persistedSupermarket = await this.supermercadoRepository.findOne({
      where: { id },
    });
    if (!persistedSupermarket)
      throw new BusinessLogicException(
        'The supermarket with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    await this.supermercadoRepository.delete(id);
  }
}
