/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  @Column()
  last_build_date: string;
}
