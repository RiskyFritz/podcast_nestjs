import { Module } from '@nestjs/common'
import { TasksModule } from './tasks/tasks.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { PodcastModule } from './podcast/podcast.module'
import { EpisodesModule } from './episode/episode.module'
import { RSSModule } from './rss/rss.module'

@Module({
    imports: [
        TasksModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'postgres',
            database: 'task-management',
            autoLoadEntities: true,
            synchronize: true,
        }),
        AuthModule,
        PodcastModule,
        EpisodesModule,
        RSSModule,
    ],
})
export class AppModule {}
