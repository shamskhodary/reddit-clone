import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5, {
    message: 'Title field cannot be less than 8 characters',
  })
  @MaxLength(100, {
    message: 'Title field cannot be longer than 100 characters',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(700, {
    message: 'This field cannot be longer than 700 characters',
  })
  content: string;

  @IsOptional()
  postImg?: Buffer;
}
