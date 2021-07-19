/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class CreatePodcastDto {
  @IsNotEmpty()
  title: string;
  
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  imageLink: string;

  @IsNotEmpty()
  imageUrl: string;

  @IsNotEmpty()
  imageTitle: string;

  @IsNotEmpty()
  feedUrl: string;
}

