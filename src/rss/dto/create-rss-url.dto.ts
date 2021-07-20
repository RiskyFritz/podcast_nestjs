/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRSSUrlDto {
  @IsNotEmpty()
  feed_url: string;
}

