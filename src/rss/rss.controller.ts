import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { RSSService } from './rss.service'
import { RSS } from './rss.entity'
import { CreateEpisodesDto } from './dto/create-episodes.dto'
import { GetEpisodesFilterDto } from './dto/get-episodes-filter.dto'
//import Parser from 'rss-parser';
const Parser = require('rss-parser')

@Controller('rss')
export class RSSController {
    constructor(private RSSService: RSSService) {}

    @Post()
    async parseRSS() {
        const parser = new Parser()
        // get all rss feed string from db
        let urls = ['https://feed.syntax.fm/rss'] // MOCK DATA

        const parse = async (url) => {
            try {
                // get rss json object from url
                const feed = await parser.parseURL(url)
                console.log(`PRE FILTER LENGTH: ${feed.items.length}`)
                console.log(feed.feedUrl)
                // get the most recent podcast episode
                const mostRecentEpisode = await this.RSSService.getMostRecentEpisode()
                console.log(
                    `${mostRecentEpisode?.title ?? 'EMPTY'} - ${
                        mostRecentEpisode?.pubDate ?? 'EMPTY'
                    }`,
                )
                // if the most recent episode exists filter out all episodes older than it
                if (mostRecentEpisode) {
                    feed.items = feed.items.filter(
                        (item) =>
                            new Date(item.pubDate) >
                            new Date(mostRecentEpisode.pubDate),
                    )
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
                            this.RSSService.createEpisode(episodeObject)
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

        // iterate through urls and parse
        for (let url of urls) {
            try {
                await parse(url)
            } catch (err) {
                console.error(err)
            }
        }

        return
    }

    // Should not be open to the public
    @Post()
    createEpisode(@Body() CreateEpisodesDto: CreateEpisodesDto): Promise<RSS> {
        return this.RSSService.createEpisode(CreateEpisodesDto)
    }
}
function getEpisodeById() {
    throw new Error('Function not implemented.')
}
