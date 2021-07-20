import { Injectable, NotFoundException } from '@nestjs/common'
import { CreatePodcastDto } from './dto/create-podcast.dto'
import { GetPodcastFilterDto } from './dto/get-podcast-filter.dto'
import { PodcastRepository } from './podcast.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { Podcast } from './podcast.entity'

@Injectable()
export class PodcastService {
    constructor(
        @InjectRepository(PodcastRepository)
        private podcastRepository: PodcastRepository,
    ) {}

    getPodcasts(filterDto: GetPodcastFilterDto): Promise<Podcast[]> {
        return this.podcastRepository.getPodcasts(filterDto)
    }

    async getPodcastById(id: string): Promise<Podcast> {
        const found = await this.podcastRepository.findOne(id)
        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`)
        }

        return found
    }

    createPodcast(CreatePodcastDto: CreatePodcastDto): Promise<Podcast> {
        return this.podcastRepository.createPodcast(CreatePodcastDto)
    }
}
