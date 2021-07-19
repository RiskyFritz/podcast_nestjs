/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm'
import { CreateEpisodesDto } from './dto/create-episodes.dto'
import { RSS } from './rss.entity'
import { GetEpisodesFilterDto } from './dto/get-episodes-filter.dto'

@EntityRepository(RSS)
export class RSSRepository extends Repository<RSS> {
    async createEpisode(createEpisodesDto: CreateEpisodesDto): Promise<RSS> {
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

    async getMostRecentEpisode(): Promise<RSS> {
        // get the most recently created episode
        // the date will likely need to be put into the db as a date type so we can be confident in the return of this function
        const query = await this.createQueryBuilder('episodes').getOne()
        if (query) {
            return query
        }
        return null
    }
}
