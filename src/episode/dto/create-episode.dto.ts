/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateEpisodesDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  audioUrl: string;

  @IsNotEmpty()
  pubDate: string;

  @IsOptional()
  duration: string;

  @IsOptional()
  description: string;
}

