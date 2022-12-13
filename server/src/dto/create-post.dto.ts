import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
export class AddPostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsString()
  postImg: string;
}
