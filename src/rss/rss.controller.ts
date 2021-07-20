import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { RSSService } from './rss.service'
//import Parser from 'rss-parser';
const Parser = require('rss-parser')

@Controller('rss')
export class RSSController {
    constructor(private RSSService: RSSService) {}

    @Post('feedurl')
    async createRSS(@Body('url') url: string) {
        console.log(url)
        if (!url) return
        try {
            const feed = await this.RSSService.createRSSUrl({ feed_url: url })
            return feed
        } catch (err) {
            console.error(err)
        }
    }

    @Post()
    async parseRSS() {
        const parser = new Parser()

        const parse = async (url) => {
            console.log(`FEED URL: ${url}`)
            try {
                // get rss json object from url
                const feed = await parser.parseURL(url)
                // get podcast by feed url
                let podcast = await this.RSSService.getPodcastByFeedUrl(url)
                // if podcast does not exist then create it
                if (!podcast) {
                    console.log(Object.keys(feed))
                    console.log(`CREATE NEW PODCAST: ${url}`)
                    const podcastObj = {
                        title: feed.title,
                        description: feed.description,
                        image_link: feed.image.link,
                        image_url: feed.image.url,
                        image_title: feed.image.title,
                        feed_url: feed.feedUrl,
                        last_build_date: feed.lastBuildDate,
                    }
                    podcast = await this.RSSService.createPodcast(podcastObj)
                }
                console.log(`PRE FILTER LENGTH: ${feed.items.length}`)
                console.log(feed.feedUrl)
                // get the most recent podcast episode
                const lastBuildDate = podcast.last_build_date
                // if the most recent episode exists filter out all episodes older than it
                if (lastBuildDate) {
                    feed.items = feed.items.filter(
                        (item) =>
                            new Date(item.pubDate) > new Date(lastBuildDate),
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
                            audio_url: item.link,
                            pub_date: String(item.pubDate),
                            duration: String(item.itunes.duration),
                            title: item.title,
                            podcast_id: podcast.id,
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

        // get all rss feed string from db
        let urls = await (await this.RSSService.getAllRSSUrls()).map((item) => {
            return item.feed_url
        })
        console.log(`ALL FEED URLS:`, urls)
        if (urls.length === 0) return
        // iterate through urls and parse
        for (let url of urls) {
            try {
                await parse(url)
            } catch (err) {
                console.error(err)
            }
        }
    }
}
