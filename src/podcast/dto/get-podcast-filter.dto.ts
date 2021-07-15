/* eslint-disable prettier/prettier */
import { IsOptional, IsString } from 'class-validator';

export class GetPodcastFilterDto {
  @IsOptional()
  @IsString()
  search?: string;
}
