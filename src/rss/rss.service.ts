import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateEpisodesDto } from './dto/create-episodes.dto'
import { GetEpisodesFilterDto } from './dto/get-episodes-filter.dto'
import { RSSRepository } from './rss.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { RSS } from './rss.entity'

@Injectable()
export class RSSService {
    constructor(
        @InjectRepository(RSSRepository)
        private RSSRepository: RSSRepository,
    ) {}

    createEpisode(CreateEpisodesDto: CreateEpisodesDto): Promise<RSS> {
        return this.RSSRepository.createEpisode(CreateEpisodesDto)
    }

    async getMostRecentEpisode(): Promise<RSS> {
        return await this.RSSRepository.getMostRecentEpisode()
    }
}
