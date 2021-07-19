/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class CreatePodcastDto {
  @IsNotEmpty()
  title: string;
  
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  image_link: string;

  @IsNotEmpty()
  image_url: string;

  @IsNotEmpty()
  image_title: string;

  @IsNotEmpty()
  feed_url: string;
}

