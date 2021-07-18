/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Episodes {
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
