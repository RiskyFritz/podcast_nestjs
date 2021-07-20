import { Module } from '@nestjs/common'
import { EpisodesService } from './episode.service'
import { EpisodesController } from './episode.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EpisodesRepository } from './episode.repository'

@Module({
    imports: [TypeOrmModule.forFeature([EpisodesRepository])],
    providers: [EpisodesService],
    controllers: [EpisodesController],
})
export class EpisodesModule {}
