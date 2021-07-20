import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { PodcastService } from './podcast.service'
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

    @Get('/:id')
    getPodcastById(@Param('id') id: string): Promise<Podcast> {
        return this.PodcastService.getPodcastById(id)
    }
}
