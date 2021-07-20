import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { EpisodesService } from './episode.service'
import { Episode } from './episode.entity'
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
}
