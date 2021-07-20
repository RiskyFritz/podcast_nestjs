/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateEpisodesDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  audio_url: string;

  @IsNotEmpty()
  pub_date: string;

  @IsNotEmpty()
  podcast_id: string;

  @IsOptional()
  duration: string;

  @IsOptional()
  description: string;
}

