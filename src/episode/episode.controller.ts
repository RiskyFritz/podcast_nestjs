import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { EpisodesService } from './episode.service'
import { Episode } from './episode.entity'
import { CreateEpisodesDto } from './dto/create-episode.dto'
import { GetEpisodesFilterDto } from './dto/get-episodes-filter.dto'
//import Parser from 'rss-parser';
const Parser = require('rss-parser')

@Controller('episode')
export class EpisodesController {
    constructor(private EpisodesService: EpisodesService) {}

    @Get()
    getEpisodes(@Query() filterDto: GetEpisodesFilterDto): Promise<Episode[]> {
        return this.EpisodesService.getEpisodes(filterDto)
    }

    @Get('/:id')
    getEpisodeById(@Param('id') id: string): Promise<Episode> {
        return this.EpisodesService.getEpisodeById(id)
    }

    @Post('/rss')
    parseRSS() {
        const parser = new Parser()
        // get all rss feed string from db
        let url = 'https://feed.syntax.fm/rss' // MOCK DATA

        const parse = async () => {
            try {
                // get rss json object from url
                const feed = await parser.parseURL(url)
                console.log(`PRE FILTER LENGTH: ${feed.items.length}`)
                // get the most recent podcast episode
                const mostRecentEpisode = await this.EpisodesService.getMostRecentEpisode()
                console.log(
                    `${mostRecentEpisode?.title ?? 'EMPTY'} - ${
                        mostRecentEpisode?.pubDate ?? 'EMPTY'
                    }`,
                )
                // if the most recent episode exists filter out all episodes older than it
                if (mostRecentEpisode) {
                    feed.items = feed.items.filter((item) => {
                        return (
                            new Date(item.pubDate) >
                            new Date(mostRecentEpisode.pubDate)
                        )
                    })
                }
                console.log(`POST FILTER LENGTH: ${feed.items.length}`)
                // filter through items if they are not already in the database
                if (feed.items.length > 0) {
                    // find podcast info
                    feed.items.forEach((item) => {
                        // create new item info
                        const episodeObject = {
                            description: item.content,
                            audioUrl: item.link,
                            pubDate: String(item.pubDate),
                            duration: String(item.itunes.duration),
                            title: item.title,
                        }
                        try {
                            // set new item info
                            this.EpisodesService.createEpisode(episodeObject)
                            return
                        } catch (err) {
                            console.error(err)
                        }
                    })
                }
                return feed
            } catch (err) {
                console.error(err)
            }
        }

        parse()
    }

    // Should not be open to the public
    @Post()
    createEpisode(
        @Body() CreateEpisodesDto: CreateEpisodesDto,
    ): Promise<Episode> {
        return this.EpisodesService.createEpisode(CreateEpisodesDto)
    }
}
function getEpisodeById() {
    throw new Error('Function not implemented.')
}
