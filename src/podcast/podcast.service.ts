import { Injectable, NotFoundException } from '@nestjs/common'
import { GetPodcastFilterDto } from './dto/get-podcast-filter.dto'
import {
    PodcastEpisodeRepository,
    PodcastRepository,
} from './podcast.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { Podcast } from './podcast.entity'
import { CreatePodcastDto } from 'src/rss/dto/create-podcast.dto'
import { Episode } from 'src/episode/episode.entity'

export interface GetEpisodesResult {
    episodes: Episode[]
    podcast?: Podcast
}

@Injectable()
export class PodcastService {
    constructor(
        @InjectRepository(PodcastRepository)
        private podcastRepository: PodcastRepository,
        @InjectRepository(PodcastEpisodeRepository)
        private episodeRepository: PodcastEpisodeRepository,
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

    async getEpisodesFeed(
        podcastId: string,
        page: number,
        hasPodcast: boolean,
    ): Promise<GetEpisodesResult> {
        let podcast: Podcast
        // if has podcast is true, we need to get the podcast first
        if (!hasPodcast) {
            podcast = await this.podcastRepository.getPodcastById(podcastId)
            if (!podcast) {
                throw new NotFoundException(
                    `Podcast with ID "${podcastId}" not found`,
                )
            }
        }
        // get episodes
        const episodes = await this.episodeRepository.getEpisodesByPodcastIdAndPaginate(
            podcastId,
            page,
            10,
        )
        if (!episodes) {
            throw new NotFoundException(`Task with ID "${podcastId}" not found`)
        }
        // create result without podcast
        const result: GetEpisodesResult = {
            episodes,
        }
        // if has podcast is true, add it to result
        if (podcast) {
            result.podcast = podcast
        }

        return result
    }
}
