import { Module } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { EpisodesController } from './episodes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpisodesRepository } from './episodes.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EpisodesRepository])],
  providers: [EpisodesService],
  controllers: [EpisodesController]
})
export class EpisodesModule {}

