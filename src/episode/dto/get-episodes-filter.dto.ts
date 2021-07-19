/* eslint-disable prettier/prettier */
import { IsOptional, IsString } from 'class-validator';

export class GetEpisodesFilterDto {
  @IsOptional()
  @IsString()
  search?: string;
}
