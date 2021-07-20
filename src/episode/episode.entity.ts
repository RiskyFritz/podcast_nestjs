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
  audio_url: string;
  @Column()
  pub_date: string;
  @Column()
  duration: string;
  @Column()
  podcast_id: string;
}
