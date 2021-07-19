/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm'
import { CreateEpisodesDto } from './dto/create-episodes.dto'
import { Episode, Podcast } from './rss.entity'
import { CreatePodcastDto } from 'src/podcast/dto/create-podcast.dto'

@EntityRepository(Episode)
export class RSSEpisodeRepository extends Repository<Episode> {
    async createEpisode(
        createEpisodesDto: CreateEpisodesDto,
    ): Promise<Episode> {
        const {
            title,
            description,
            audioUrl,
            pubDate,
            duration,
        } = createEpisodesDto

        const episode = this.create({
            title,
            description,
            audioUrl,
            pubDate,
            duration,
        })

        await this.save(episode)
        return episode
    }

    async getMostRecentEpisode(): Promise<Episode> {
        // get the most recently created episode
        // the date will likely need to be put into the db as a date type so we can be confident in the return of this function
        const query = await this.createQueryBuilder('episode').getOne()
        if (query) {
            return query
        }
        return null
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
