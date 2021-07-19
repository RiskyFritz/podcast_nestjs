import { Module } from '@nestjs/common'
import { RSSService } from './rss.service'
import { RSSController } from './rss.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RSSRepository } from './rss.repository'

@Module({
    imports: [TypeOrmModule.forFeature([RSSRepository])],
    providers: [RSSService],
    controllers: [RSSController],
})
export class RSSModule {}
