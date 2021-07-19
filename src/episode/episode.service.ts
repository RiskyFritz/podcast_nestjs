import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateEpisodesDto } from './dto/create-episode.dto'
import { GetEpisodesFilterDto } from './dto/get-episodes-filter.dto'
import { EpisodesRepository } from './episode.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { Episode } from './episode.entity'

@Injectable()
export class EpisodesService {
    constructor(
        @InjectRepository(EpisodesRepository)
        private EpisodesRepository: EpisodesRepository,
    ) {}

    getEpisodes(filterDto: GetEpisodesFilterDto): Promise<Episode[]> {
        return this.EpisodesRepository.getEpisodes(filterDto)
    }

    async getEpisodeById(id: string): Promise<Episode> {
        const found = await this.EpisodesRepository.findOne(id)
        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`)
        }

        return found
    }

    createEpisode(CreateEpisodesDto: CreateEpisodesDto): Promise<Episode> {
        return this.EpisodesRepository.createEpisode(CreateEpisodesDto)
    }

    async getMostRecentEpisode(): Promise<Episode> {
        const mostRecent = await this.EpisodesRepository.getMostRecentEpisode()

        return mostRecent
    }
}
