import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { Episodes } from './episodes.entity';
import { CreateEpisodesDto } from './dto/create-episodes.dto';
import { GetEpisodesFilterDto } from './dto/get-episodes-filter.dto';
//import Parser from 'rss-parser';
const Parser = require('rss-parser');

@Controller('episodes')
export class EpisodesController {
  constructor(private EpisodesService: EpisodesService) {}

  @Get()
  getEpisodes(@Query() filterDto: GetEpisodesFilterDto): Promise<Episodes[]> {
    return this.EpisodesService.getEpisodes(filterDto);
  }

  @Get('/:id')
  getEpisodeById(@Param('id') id: string): Promise<Episodes> {
    return this.EpisodesService.getEpisodeById(id);
  }

  @Post('/rss')
  parseRSS() {
    const parser = new Parser();

    let url = 'https://feed.syntax.fm/rss';

    const parse = async () => {
      try {
        // get rss json object from url
        const feed = await parser.parseURL(url);
        // find podcast info
        feed.items.forEach(item => {
          let description: string,
          audioUrl: string,
          pubDate: string,
          duration: string,
          title: string;
          const episodeObject = {
            description: item.itunes.subtitle,
            audioUrl: item.link,
            pubDate: String(item.pubDate),
            duration: String(item.itunes.duration),
            title: item.title,
          }
          try {
            this.EpisodesService.createEpisode(episodeObject);
            return item.title;
          } catch(err) {
            console.error(err);
          }
        })
        // check if new items are available

        // add all new items that are valid
        // create new item info
        // set new item info
        // return dom node
        return feed;
      } catch (err) {
        console.error(err);
      }
    };

    parse();
  }

    

  @Post()
  createEpisode(@Body() CreateEpisodesDto: CreateEpisodesDto): Promise<Episodes> {
    return this.EpisodesService.createEpisode(CreateEpisodesDto);
  }
}
function getEpisodeById() {
  throw new Error('Function not implemented.');
}
