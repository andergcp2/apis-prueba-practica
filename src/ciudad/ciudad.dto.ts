import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CiudadDto {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()
  readonly pais: string;

  @IsInt()
  @IsNotEmpty()
  readonly habitantes: number;
}
