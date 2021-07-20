import { EntityRepository, Repository } from 'typeorm'
import { CreatePodcastDto } from './dto/create-podcast.dto'
import { Podcast } from './podcast.entity'
import { GetPodcastFilterDto } from './dto/get-podcast-filter.dto'

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
    async createPodcast(createPodcastDto: CreatePodcastDto): Promise<Podcast> {
        const podcast = this.create(createPodcastDto)

        await this.save(podcast)
        return podcast
    }
}
