/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RSSUrl {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true })
  feed_url: string;
}
