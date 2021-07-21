import { EntityRepository, Repository } from 'typeorm'
import { Podcast } from './podcast.entity'
import { GetPodcastFilterDto } from './dto/get-podcast-filter.dto'
import { CreatePodcastDto } from 'src/rss/dto/create-podcast.dto'
import { Episode } from 'src/episode/episode.entity'

@EntityRepository(Podcast)
export class PodcastRepository extends Repository<Podcast> {
    async getPodcasts(podcastDto: GetPodcastFilterDto): Promise<Podcast[]> {
        const { search } = podcastDto

        const query = this.createQueryBuilder('podcast')

        if (search) {
            query.andWhere(
                'LOWER(podcast.title) LIKE LOWER(:search) OR LOWER(podcast.description) LIKE LOWER(:search)',
                { search: `%${search}%` },
            )
        }
        const podcasts = await query.getMany()
        return podcasts
    }

    async getPodcastById(id: string): Promise<Podcast> {
        const podcast = await this.findOne({ id })
        return podcast
    }

    async createPodcast(createPodcastDto: CreatePodcastDto): Promise<Podcast> {
        const podcast = this.create(createPodcastDto)

        await this.save(podcast)
        return podcast
    }
}

@EntityRepository(Episode)
export class PodcastEpisodeRepository extends Repository<Episode> {
    async getEpisodesByPodcastIdAndPaginate(
        podcastId: string,
        page: number,
        pageSize: number,
    ): Promise<Episode[]> {
        const query = this.createQueryBuilder(
            'episode',
        ).where('episode.podcast_id = :podcastId', { podcastId })
        query.orderBy('episode.pub_date', 'DESC')
        query.skip((page - 1) * pageSize)
        query.take(pageSize)
        const episodes = await query.getMany()
        return episodes
    }
}
