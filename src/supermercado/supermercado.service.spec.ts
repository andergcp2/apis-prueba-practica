import { Test, TestingModule } from '@nestjs/testing';
import { SupermercadoService } from './supermercado.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../../src/shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { SupermercadoEntity } from './supermercado.entity';

describe('SupermercadoService', () => {
  let service: SupermercadoService;
  let repository: Repository<SupermercadoEntity>;
  let supermarketList: SupermercadoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [SupermercadoService],
    }).compile();

    service = module.get<SupermercadoService>(SupermercadoService);
    repository = module.get<Repository<SupermercadoEntity>>(
      getRepositoryToken(SupermercadoEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    supermarketList = [];
    for (let i = 0; i < 9; i++) {
      const supermarket: SupermercadoEntity = await repository.save({
        nombre: `supermercado${i}`,
        latitud: i,
        longitud: i,
        paginaWeb: `paginaWeb${i}`,
        ciudades: [],
      });
      supermarketList.push(supermarket);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all supermarkets', async () => {
    const supermarkets: SupermercadoEntity[] = await service.findAll();
    expect(supermarkets).not.toBeNull();
    expect(supermarkets.length).toEqual(supermarketList.length);
  });

  it('findOne should return a supermarket by id', async () => {
    const supermarket: SupermercadoEntity = await service.findOne(
      supermarketList[0].id,
    );
    expect(supermarket).not.toBeNull();
    expect(supermarket.id).toEqual(supermarketList[0].id);
    expect(supermarket.nombre).toEqual(supermarketList[0].nombre);
    expect(supermarket.latitud).toEqual(supermarketList[0].latitud);
    expect(supermarket.longitud).toEqual(supermarketList[0].longitud);
    expect(supermarket.paginaWeb).toEqual(supermarketList[0].paginaWeb);
  });

  it('findOne should throw an exception when the supermarket does not exist', async () => {
    await expect(service.findOne('invalidId')).rejects.toHaveProperty(
      'message',
      'The supermarket with the given id was not found',
    );
  });

  it('create should create a supermarket', async () => {
    const supermarket: SupermercadoEntity = await service.create({
      id: '',
      nombre: 'supermercadoTest',
      latitud: 10,
      longitud: 10,
      paginaWeb: 'paginaWebTest',
      ciudades: [],
    });
    expect(supermarket).not.toBeNull();
    expect(supermarket.nombre).toEqual('supermercadoTest');
    expect(supermarket.latitud).toEqual(10);
    expect(supermarket.longitud).toEqual(10);
    expect(supermarket.paginaWeb).toEqual('paginaWebTest');
  });

  it('create should throw an exception when the name has less than 10 characters', async () => {
    await expect(
      service.create({
        id: '',
        nombre: 'super',
        latitud: 10,
        longitud: 10,
        paginaWeb: 'paginaWebTest',
        ciudades: [],
      }),
    ).rejects.toHaveProperty(
      'message',
      'The name must have more than 10 characters',
    );
  });

  it('update should update a supermarket', async () => {
    const supermarket: SupermercadoEntity = await service.update(
      supermarketList[0].id,
      {
        id: supermarketList[0].id,
        nombre: 'supermercadoTest',
        latitud: 10,
        longitud: 10,
        paginaWeb: 'paginaWebTest',
        ciudades: [],
      },
    );
    expect(supermarket).not.toBeNull();
    expect(supermarket.id).toEqual(supermarketList[0].id);
    expect(supermarket.nombre).toEqual('supermercadoTest');
    expect(supermarket.latitud).toEqual(10);
    expect(supermarket.longitud).toEqual(10);
    expect(supermarket.paginaWeb).toEqual('paginaWebTest');
  });

  it('update should throw an exception when the name has less than 10 characters', async () => {
    await expect(
      service.update(supermarketList[0].id, {
        id: supermarketList[0].id,
        nombre: 'super',
        latitud: 10,
        longitud: 10,
        paginaWeb: 'paginaWebTest',
        ciudades: [],
      }),
    ).rejects.toHaveProperty(
      'message',
      'The name must have more than 10 characters',
    );
  });

  it('update should throw an exception when the supermarket does not exist', async () => {
    await expect(
      service.update('invalidId', {
        id: 'invalidId',
        nombre: 'supermercadoTest',
        latitud: 10,
        longitud: 10,
        paginaWeb: 'paginaWebTest',
        ciudades: [],
      }),
    ).rejects.toHaveProperty(
      'message',
      'The supermarket with the given id was not found',
    );
  });

  it('delete should delete a supermarket', async () => {
    await service.delete(supermarketList[0].id);
    await expect(service.findOne(supermarketList[0].id)).rejects.toHaveProperty(
      'message',
      'The supermarket with the given id was not found',
    );
  });

  it('delete should throw an exception when the supermarket does not exist', async () => {
    await service.delete(supermarketList[0].id);
    await expect(service.findOne(supermarketList[0].id)).rejects.toHaveProperty(
      'message',
      'The supermarket with the given id was not found',
    );
  });
});
