import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl, Max } from 'class-validator';

export class CreateFavoriteDto {
  @Max(25)
  @IsNotEmpty()
  @IsString({ message: 'Must be a string!' })
  @ApiProperty({
    description: 'The name of a favorite',
  })
  name: string;

  @Max(20)
  @IsNotEmpty()
  @IsString({ message: 'Must be a string!' })
  @ApiProperty()
  type: string;

  @IsNotEmpty()
  @IsString({ message: 'Must be a string!' })
  @IsUrl()
  @ApiProperty()
  url: string;
}
