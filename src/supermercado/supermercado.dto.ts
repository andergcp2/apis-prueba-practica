import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class SupermercadoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsInt()
  @IsNotEmpty()
  longitud: number;

  @IsInt()
  @IsNotEmpty()
  latitud: number;

  @IsString()
  @IsNotEmpty()
  paginaWeb: string;
}
