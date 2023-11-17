import { Test, TestingModule } from '@nestjs/testing';
import { CiudadService } from './ciudad.service';
import { Repository, getRepository } from 'typeorm';
import { CiudadEntity } from './ciudad.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CiudadService', () => {
  let service: CiudadService;
  let repository: Repository<CiudadEntity>;
  let cityList: CiudadEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [CiudadService],
    }).compile();

    service = module.get<CiudadService>(CiudadService);
    repository = module.get<Repository<CiudadEntity>>(
      getRepositoryToken(CiudadEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    cityList = [];
    for (let i = 0; i < 9; i++) {
      const city: CiudadEntity = await repository.save({
        nombre: `ciudad${i}`,
        pais: `Argentina`,
        habitantes: i,
        supermercados: [],
      });
      cityList.push(city);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all cities', async () => {
    const cities: CiudadEntity[] = await service.findAll();
    expect(cities).not.toBeNull();
    expect(cities.length).toEqual(cityList.length);
  });

  it('findOne should return a city by id', async () => {
    const city: CiudadEntity = await service.findOne(cityList[0].id);
    expect(city).not.toBeNull();
    expect(city.id).toEqual(cityList[0].id);
    expect(city.nombre).toEqual(cityList[0].nombre);
    expect(city.pais).toEqual(cityList[0].pais);
    expect(city.habitantes).toEqual(cityList[0].habitantes);
  });

  it('findOne should throw an exception when the city does not exist', async () => {
    await expect(service.findOne('invalidId')).rejects.toHaveProperty(
      'message',
      'The city with the given id was not found',
    );
  });

  it('create should create a city', async () => {
    const city: CiudadEntity = await service.create({
      id: 'id10',
      nombre: 'ciudad10',
      pais: 'Argentina',
      habitantes: 10,
      supermercados: [],
    });
    expect(city).not.toBeNull();
    expect(city.id).toBeDefined();
    expect(city.nombre).toEqual('ciudad10');
    expect(city.pais).toEqual('Argentina');
    expect(city.habitantes).toEqual(10);
  });

  it('create should throw an exception when the country is not valid', async () => {
    await expect(
      service.create({
        id: 'id10',
        nombre: 'ciudad10',
        pais: 'invalidCountry',
        habitantes: 10,
        supermercados: [],
      }),
    ).rejects.toHaveProperty('message', 'The country is not valid');
  });

  it('update should update a city', async () => {
    const city: CiudadEntity = await service.update(cityList[0].id, {
      id: cityList[0].id,
      nombre: 'ciudad10',
      pais: 'Argentina',
      habitantes: 10,
      supermercados: [],
    });
    expect(city).not.toBeNull();
    expect(city.id).toEqual(cityList[0].id);
    expect(city.nombre).toEqual('ciudad10');
    expect(city.pais).toEqual('Argentina');
    expect(city.habitantes).toEqual(10);
  });

  it('update should throw an exception when the country is not valid', async () => {
    await expect(
      service.update(cityList[0].id, {
        id: cityList[0].id,
        nombre: 'ciudad10',
        pais: 'invalidCountry',
        habitantes: 10,
        supermercados: [],
      }),
    ).rejects.toHaveProperty('message', 'The country is not valid');
  });

  it('update should throw an exception when the city does not exist', async () => {
    await expect(
      service.update('invalidId', {
        id: 'invalidId',
        nombre: 'ciudad10',
        pais: 'Argentina',
        habitantes: 10,
        supermercados: [],
      }),
    ).rejects.toHaveProperty(
      'message',
      'The city with the given id was not found',
    );
  });

  it('delete should delete a city', async () => {
    const entity: CiudadEntity = cityList[0];
    await service.delete(entity.id);
    await expect(service.findOne(entity.id)).rejects.toHaveProperty(
      'message',
      'The city with the given id was not found',
    );
  });

  it('delete should throw an exception when the city does not exist', async () => {
    await expect(service.delete('invalidId')).rejects.toHaveProperty(
      'message',
      'The city with the given id was not found',
    );
  });
});
