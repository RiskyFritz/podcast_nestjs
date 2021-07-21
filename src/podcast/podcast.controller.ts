import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { GetEpisodesResult, PodcastService } from './podcast.service'
import { Podcast } from './podcast.entity'
import { GetPodcastFilterDto } from './dto/get-podcast-filter.dto'
// import Parser from 'rss-parser';
const Parser = require('rss-parser')

@Controller('podcast')
export class PodcastController {
    constructor(private PodcastService: PodcastService) {}

    @Get()
    getPodcasts(@Query() filterDto: GetPodcastFilterDto): Promise<Podcast[]> {
        return this.PodcastService.getPodcasts(filterDto)
    }

    @Get('/:podcastId')
    getPodcastById(
        @Param('podcastId') podcastId: string,
        @Query('hasPodcast') hasPodcast: string | boolean,
        @Query('page') page: string | number,
    ): Promise<GetEpisodesResult> {
        // set types of parameters
        hasPodcast = hasPodcast === 'true' || hasPodcast === true
        page = Number(page) || 1

        console.log({ podcastId, hasPodcast, page })
        return this.PodcastService.getEpisodesFeed(podcastId, page, hasPodcast)
    }
}
