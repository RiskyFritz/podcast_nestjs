import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateEpisodesDto } from './dto/create-episodes.dto'
import { GetEpisodesFilterDto } from './dto/get-episodes-filter.dto'
import { EpisodesRepository } from './episodes.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { Episodes } from './episodes.entity'

@Injectable()
export class EpisodesService {
    constructor(
        @InjectRepository(EpisodesRepository)
        private EpisodesRepository: EpisodesRepository,
    ) {}

    getEpisodes(filterDto: GetEpisodesFilterDto): Promise<Episodes[]> {
        return this.EpisodesRepository.getEpisodes(filterDto)
    }

    async getEpisodeById(id: string): Promise<Episodes> {
        const found = await this.EpisodesRepository.findOne(id)
        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`)
        }

        return found
    }

    createEpisode(CreateEpisodesDto: CreateEpisodesDto): Promise<Episodes> {
        return this.EpisodesRepository.createEpisode(CreateEpisodesDto)
    }

    async getMostRecentEpisode(): Promise<Episodes> {
        const mostRecent = await this.EpisodesRepository.getMostRecentEpisode()

        return mostRecent
    }
}
