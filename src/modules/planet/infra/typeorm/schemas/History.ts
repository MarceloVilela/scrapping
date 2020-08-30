import {
  ObjectID,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity('planethistory')
class History {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ unique: true })
  sourceLink: string;

  @Column()
  labels: string[];

  @Column()
  page: number;

  @Column()
  posted_at: Date;
  // new Date() ... "11th January 2019, 21:47"

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default History;
