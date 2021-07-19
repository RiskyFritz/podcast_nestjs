/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Episode {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  audioUrl: string;
  @Column()
  pubDate: string;
  @Column()
  duration: string;
}

@Entity()
export class Podcast {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  image_title: string;
  @Column()
  image_url: string;
  @Column()
  image_link: string;
  @Column()
  feed_url: string;
}
