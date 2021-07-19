import { Module } from '@nestjs/common'
import { RSSService } from './rss.service'
import { RSSController } from './rss.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import {
    RSSEpisodeRepository,
    RSSPodcastRepository,
    RSSUrlRepository,
} from './rss.repository'

@Module({
    imports: [
        TypeOrmModule.forFeature([
            RSSPodcastRepository,
            RSSEpisodeRepository,
            RSSUrlRepository,
        ]),
    ],
    providers: [RSSService],
    controllers: [RSSController],
})
export class RSSModule {}
