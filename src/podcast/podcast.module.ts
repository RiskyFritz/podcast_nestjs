import { Module } from '@nestjs/common'
import { PodcastService } from './podcast.service'
import { PodcastController } from './podcast.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import {
    PodcastEpisodeRepository,
    PodcastRepository,
} from './podcast.repository'

@Module({
    imports: [
        TypeOrmModule.forFeature([PodcastRepository, PodcastEpisodeRepository]),
    ],
    providers: [PodcastService],
    controllers: [PodcastController],
})
export class PodcastModule {}
