import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PodcastService } from './podcast.service';
import { Podcast } from './podcast.entity';
import { CreatePodcastDto } from './dto/create-podcast.dto';
import { GetPodcastFilterDto } from './dto/get-podcast-filter.dto';
// import Parser from 'rss-parser';
const Parser = require('rss-parser');

@Controller('podcast')
export class PodcastController {
  constructor(private PodcastService: PodcastService) {}

  @Get()
  getPodcasts(@Query() filterDto: GetPodcastFilterDto): Promise<Podcast[]> {
    return this.PodcastService.getPodcasts(filterDto);
  }

  @Get('/:id')
  getPodcastById(@Param('id') id: string): Promise<Podcast> {
    return this.PodcastService.getPodcastById(id);
  }

  @Post('/rss')
  parseRSS() {
    const parser = new Parser();

    let url = 'https://feed.syntax.fm/rss';

    const parse = async () => {
      try {
        // get rss json object from url
        const json = await parser.parseURL(url);
        // find podcast info
        let description: string,
          imageLink: string,
          imageUrl: string,
          imageTitle: string,
          title: string;
        // set podcast info
        const podcastObject = {
        description: json.description,
        imageLink: json.image.link,
        imageUrl: json.image.url,
        imageTitle: json.image.title,
        title: json.title,
        }
        // find db item info

        // zbd createpodcast({pass in object})
        this.PodcastService.createPodcast(podcastObject);
        // check if new items are available

        // add all new items that are valid
        // create new item info
        // set new item info
        // return dom node
        return json;
      } catch (err) {
        console.error(err);
      }
    };
    parse();
  }

  @Post()
  createPodcast(@Body() CreatePodcastDto: CreatePodcastDto): Promise<Podcast> {
    return this.PodcastService.createPodcast(CreatePodcastDto);
  }
}
function getPodcastById() {
  throw new Error('Function not implemented.');
}
