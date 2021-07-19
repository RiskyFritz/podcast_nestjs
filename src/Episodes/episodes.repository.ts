/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm'
import { CreateEpisodesDto } from './dto/create-episodes.dto'
import { Episodes } from './episodes.entity'
import { GetEpisodesFilterDto } from './dto/get-episodes-filter.dto'

@EntityRepository(Episodes)
export class EpisodesRepository extends Repository<Episodes> {
    async getEpisodes(episodesDto: GetEpisodesFilterDto): Promise<Episodes[]> {
        const { search } = episodesDto

        const query = this.createQueryBuilder('episodes')

        if (search) {
            query.andWhere(
                'LOWER(episodes.title) LIKE LOWER(:search) OR LOWER(episodes.description) LIKE LOWER(:search)',
                { search: `%${search}%` },
            )
        }
        const episodes = await query.getMany()
        return episodes
    }
    async createEpisode(
        createEpisodesDto: CreateEpisodesDto,
    ): Promise<Episodes> {
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

    async getMostRecentEpisode(): Promise<Episodes> {
        // get the most recently created episode
        // the date will likely need to be put into the db as a date type so we can be confident in the return of this function
        const query = await this.createQueryBuilder('episodes').getOne()
        if (query) {
            return query
        }
        return null
    }
}
