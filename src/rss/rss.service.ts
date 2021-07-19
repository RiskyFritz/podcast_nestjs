import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateEpisodesDto } from './dto/create-episodes.dto'
import { GetEpisodesFilterDto } from './dto/get-episodes-filter.dto'
import { RSSEpisodeRepository, RSSPodcastRepository } from './rss.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { CreatePodcastDto } from './dto/create-podcast.dto'
import { Episode } from 'src/episode/episode.entity'
import { Podcast } from 'src/podcast/podcast.entity'

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
