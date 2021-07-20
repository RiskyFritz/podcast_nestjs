/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm'
import { CreateEpisodesDto } from './dto/create-episodes.dto'
import { Episode } from 'src/episode/episode.entity'
import { Podcast } from 'src/podcast/podcast.entity'
import { RSSUrl } from './rss.entity'
import { CreateRSSUrlDto } from './dto/create-rss-url.dto'
import { CreatePodcastDto } from './dto/create-podcast.dto'

@EntityRepository(Episode)
export class RSSEpisodeRepository extends Repository<Episode> {
    async createEpisode(
        createEpisodesDto: CreateEpisodesDto,
    ): Promise<Episode> {
        const episode = this.create(createEpisodesDto)

        await this.save(episode)
        return episode
    }
}

@EntityRepository(Podcast)
export class RSSPodcastRepository extends Repository<Podcast> {
    async createPodcast(createPodcastDto: CreatePodcastDto): Promise<Podcast> {
        const podcast = this.create(createPodcastDto)

        await this.save(podcast)
        return podcast
    }

    async getPodcastByFeedUrl(feed_url: string): Promise<Podcast> {
        const query = await this.createQueryBuilder('podcasts')
            .where('feed_url = :feed_url', { feed_url: feed_url })
            .getOne()
        if (query) {
            return query
        }
        return null
    }
}

@EntityRepository(RSSUrl)
export class RSSUrlRepository extends Repository<RSSUrl> {
    async createRSSUrl(createRSSUrlDto: CreateRSSUrlDto): Promise<RSSUrl> {
        const rssUrl = this.create(createRSSUrlDto)

        await this.save(rssUrl)
        return rssUrl
    }

    async getAllRSSUrls(): Promise<RSSUrl[]> {
        const query = await this.createQueryBuilder('rss_urls').getMany()
        if (query) {
            return query
        }
        return []
    }
}
