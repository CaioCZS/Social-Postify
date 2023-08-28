import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
} from 'class-validator';

export class CreatePublicationDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  mediaId: number;
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  postId: number;
  @IsNotEmpty()
  @IsString()
  @IsDateString()
  date: Date;
}
