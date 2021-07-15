import { Module } from '@nestjs/common';
import { PodcastService } from './podcast.service';
import { PodcastController } from './podcast.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PodcastRepository } from './podcast.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PodcastRepository])],
  providers: [PodcastService],
  controllers: [PodcastController]
})
export class PodcastModule {}

