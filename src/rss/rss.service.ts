import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateEpisodesDto } from './dto/create-episodes.dto'
import { GetEpisodesFilterDto } from './dto/get-episodes-filter.dto'
import { RSSEpisodeRepository, RSSPodcastRepository } from './rss.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { Episode, Podcast } from './rss.entity'
import { CreatePodcastDto } from './dto/create-podcast.dto'

@Injectable()
export class RSSService {
    constructor(
        @InjectRepository(RSSPodcastRepository)
        @InjectRepository(RSSEpisodeRepository)
        private RSSPodcastRepository: RSSPodcastRepository,
        private RSSEpisodeRepository: RSSEpisodeRepository,
    ) {}

    createEpisode(CreateEpisodesDto: CreateEpisodesDto): Promise<Episode> {
        return this.RSSEpisodeRepository.createEpisode(CreateEpisodesDto)
    }

    async getMostRecentEpisode(): Promise<Episode> {
        return await this.RSSEpisodeRepository.getMostRecentEpisode()
    }

    createPodcast(CreatePodcastDto: CreatePodcastDto): Promise<Podcast> {
        return this.RSSPodcastRepository.createPodcast(CreatePodcastDto)
    }

    async getPodcastByFeedUrl(feed_url: string): Promise<Podcast> {
        return await this.RSSPodcastRepository.getPodcastByFeedUrl(feed_url)
    }
}
