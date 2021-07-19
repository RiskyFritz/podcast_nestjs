/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm'
import { CreateEpisodesDto } from './dto/create-episode.dto'
import { Episode } from './episode.entity'
import { GetEpisodesFilterDto } from './dto/get-episodes-filter.dto'

@EntityRepository(Episode)
export class EpisodesRepository extends Repository<Episode> {
    async getEpisodes(episodesDto: GetEpisodesFilterDto): Promise<Episode[]> {
        const { search } = episodesDto

        const query = this.createQueryBuilder('episode')

        if (search) {
            query.andWhere(
                'LOWER(episode.title) LIKE LOWER(:search) OR LOWER(episode.description) LIKE LOWER(:search)',
                { search: `%${search}%` },
            )
        }
        const episodes = await query.getMany()
        return episodes
    }
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
