import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEpisodesDto } from './dto/create-episodes.dto';
import { GetEpisodesFilterDto } from './dto/get-episodes-filter.dto';
import { EpisodesRepository } from './episodes.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Episodes } from './episodes.entity';

@Injectable()
export class EpisodesService {
    constructor(
        @InjectRepository(EpisodesRepository)
        private EpisodesRepository: EpisodesRepository,
      ) {}
    
      getEpisodes(filterDto: GetEpisodesFilterDto): Promise<Episodes[]> {
        return this.EpisodesRepository.getEpisodes(filterDto);
      }
    
      async getEpisodeByTitle(title: string): Promise<Episodes> {
        const found = await this.EpisodesRepository.findOne(title);
        if (!found) {
          throw new NotFoundException(`Episode with title "${title}" not found`);
        }
    
        return found;
      }
    
      createEpisode(CreateEpisodesDto: CreateEpisodesDto): Promise<Episodes> {
        return this.EpisodesRepository.createEpisode(CreateEpisodesDto);
      }
}
