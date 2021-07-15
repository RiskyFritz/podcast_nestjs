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
  imageTitle: string;
  @Column()
  imageUrl: string;
  @Column()
  imageLink: string;
}
