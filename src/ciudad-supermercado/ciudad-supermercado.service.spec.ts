import { Test, TestingModule } from '@nestjs/testing';
import { CiudadSupermercadoService } from './ciudad-supermercado.service';
import { CiudadEntity } from '../../src/ciudad/ciudad.entity';
import { TypeOrmTestingConfig } from '../../src/shared/testing-utils/typeorm-testing-config';
import { SupermercadoEntity } from '../../src/supermercado/supermercado.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CiudadSupermercadoService', () => {
  let service: CiudadSupermercadoService;
  let cityRepository: Repository<CiudadEntity>;
  let supermarketRepository: Repository<SupermercadoEntity>;
  let supermarketList: SupermercadoEntity[];
  const numSupermarkets = 3;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [CiudadSupermercadoService],
    }).compile();

    service = module.get<CiudadSupermercadoService>(CiudadSupermercadoService);
    cityRepository = module.get<Repository<CiudadEntity>>(
      getRepositoryToken(CiudadEntity),
    );
    supermarketRepository = module.get<Repository<SupermercadoEntity>>(
      getRepositoryToken(SupermercadoEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const createNewCity = async () => {
    const city: CiudadEntity = await cityRepository.save({
      nombre: `ciudad`,
      pais: `Argentina`,
      habitantes: 1,
      supermercados: [],
    });
    return city;
  };

  const createNewSupermarket = async () => {
    const supermarket: SupermercadoEntity = await supermarketRepository.save({
      nombre: `supermercado`,
      latitud: 1,
      longitud: 1,
      paginaWeb: `paginaWeb`,
      ciudades: [],
    });
    return supermarket;
  };

  it('addSupermarketToCity should add a supermarket to a city', async () => {
    const city: CiudadEntity = await createNewCity();
    const supermarket: SupermercadoEntity = await createNewSupermarket();
    const result: CiudadEntity = await service.addSupermarketToCity(
      city.id,
      supermarket.id,
    );
    expect(result).not.toBeNull();
    expect(result.id).toEqual(city.id);
    expect(result.supermercados.length).toEqual(1);
    expect(result.supermercados[0].id).toEqual(supermarket.id);
  });

  it('addSupermarketToCity should throw an exception when the city does not exist', async () => {
    const supermarket: SupermercadoEntity = await createNewSupermarket();
    await expect(
      service.addSupermarketToCity('invalidId', supermarket.id),
    ).rejects.toHaveProperty(
      'message',
      'The city with the given id was not found',
    );
  });

  it('addSupermarketToCity should throw an exception when the supermarket does not exist', async () => {
    const city: CiudadEntity = await createNewCity();
    await expect(
      service.addSupermarketToCity(city.id, 'invalidId'),
    ).rejects.toHaveProperty(
      'message',
      'The supermarket with the given id was not found',
    );
  });

  it('findSupermarketsFromCity should return all supermarkets from a city', async () => {
    const city: CiudadEntity = await createNewCity();
    supermarketList = [];
    for (let i = 0; i < numSupermarkets; i++) {
      const supermarket: SupermercadoEntity = await createNewSupermarket();
      supermarketList.push(supermarket);
      await service.addSupermarketToCity(city.id, supermarket.id);
    }
    const result: SupermercadoEntity[] = await service.findSupermarketsFromCity(
      city.id,
    );
    expect(result).not.toBeNull();
    expect(result.length).toEqual(numSupermarkets);
  });

  it('findSupermarketsFromCity should throw an exception when the city does not exist', async () => {
    await expect(
      service.findSupermarketsFromCity('invalidId'),
    ).rejects.toHaveProperty(
      'message',
      'The city with the given id was not found',
    );
  });

  it('findSupermarketFromCity should return a supermarket from a city', async () => {
    const city: CiudadEntity = await createNewCity();
    supermarketList = [];
    for (let i = 0; i < numSupermarkets; i++) {
      const supermarket: SupermercadoEntity = await createNewSupermarket();
      supermarketList.push(supermarket);
      await service.addSupermarketToCity(city.id, supermarket.id);
    }
    const result: SupermercadoEntity = await service.findSupermarketFromCity(
      city.id,
      supermarketList[0].id,
    );
    expect(result).not.toBeNull();
    expect(result.id).toEqual(supermarketList[0].id);
  });

  it('findSupermarketFromCity should throw an exception when the city does not exist', async () => {
    await expect(
      service.findSupermarketFromCity('invalidId', supermarketList[0].id),
    ).rejects.toHaveProperty(
      'message',
      'The city with the given id was not found',
    );
  });

  it('findSupermarketFromCity should throw an exception when the supermarket does not exist', async () => {
    const city: CiudadEntity = await createNewCity();
    await expect(
      service.findSupermarketFromCity(city.id, 'invalidId'),
    ).rejects.toHaveProperty(
      'message',
      'The supermarket with the given id was not found',
    );
  });

  it('removeSupermarketFromCity should remove a supermarket from a city', async () => {
    const city: CiudadEntity = await createNewCity();
    const supermarket: SupermercadoEntity = await createNewSupermarket();
    await service.addSupermarketToCity(city.id, supermarket.id);
    const result = await service.deleteSupermarketFromCity(
      city.id,
      supermarket.id,
    );
    expect(result).not.toBeNull();
    expect(result.id).toEqual(city.id);
  });

  it('removeSupermarketFromCity should throw an exception when the city does not exist', async () => {
    const supermarket: SupermercadoEntity = await createNewSupermarket();
    await expect(
      service.deleteSupermarketFromCity('invalidId', supermarket.id),
    ).rejects.toHaveProperty(
      'message',
      'The city with the given id was not found',
    );
  });

  it('removeSupermarketFromCity should throw an exception when the supermarket does not exist', async () => {
    const city: CiudadEntity = await createNewCity();
    await expect(
      service.deleteSupermarketFromCity(city.id, 'invalidId'),
    ).rejects.toHaveProperty(
      'message',
      'The supermarket with the given id was not found',
    );
  });

  it('removeSupermarketFromCity should throw an exception when the supermarket is not in the city', async () => {
    const city: CiudadEntity = await createNewCity();
    const supermarket: SupermercadoEntity = await createNewSupermarket();
    await expect(
      service.deleteSupermarketFromCity(city.id, supermarket.id),
    ).rejects.toHaveProperty(
      'message',
      'The supermarket with the given id is not associated with the city',
    );
  });

  it('updateSupermarketFromCity should update a supermarket from a city', async () => {
    const city: CiudadEntity = await createNewCity();
    const supermarket: SupermercadoEntity = await createNewSupermarket();
    await service.addSupermarketToCity(city.id, supermarket.id);
    const result = await service.updateSupermarketsFromCity(city.id, [
      {
        id: supermarket.id,
        nombre: 'supermercadoTest',
        latitud: 10,
        longitud: 10,
        paginaWeb: 'paginaWebTest',
        ciudades: [],
      },
    ]);
    expect(result).not.toBeNull();
    expect(result.id).toEqual(city.id);
    expect(result.supermercados.length).toEqual(2);
    expect(result.supermercados[0].id).toEqual(supermarket.id);
    expect(result.supermercados[1].nombre).toEqual('supermercadoTest');
    expect(result.supermercados[1].latitud).toEqual(10);
    expect(result.supermercados[1].longitud).toEqual(10);
    expect(result.supermercados[1].paginaWeb).toEqual('paginaWebTest');
  });

  it('updateSupermarketFromCity should throw an exception when the city does not exist', async () => {
    const supermarket: SupermercadoEntity = await createNewSupermarket();
    await expect(
      service.updateSupermarketsFromCity('invalidId', [
        {
          id: supermarket.id,
          nombre: 'supermercadoTest',
          latitud: 10,
          longitud: 10,
          paginaWeb: 'paginaWebTest',
          ciudades: [],
        },
      ]),
    ).rejects.toHaveProperty(
      'message',
      'The city with the given id was not found',
    );
  });

  it('updateSupermarketFromCity should throw an exception when the supermarket does not exist', async () => {
    const city: CiudadEntity = await createNewCity();
    await expect(
      service.updateSupermarketsFromCity(city.id, [
        {
          id: 'invalidId',
          nombre: 'supermercadoTest',
          latitud: 10,
          longitud: 10,
          paginaWeb: 'paginaWebTest',
          ciudades: [],
        },
      ]),
    ).rejects.toHaveProperty(
      'message',
      'The supermarket with the given id was not found',
    );
  });
});
