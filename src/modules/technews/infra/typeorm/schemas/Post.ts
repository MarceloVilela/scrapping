import {
  ObjectID,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

import PostContent from './PostContent';

@Entity('post')
class Post {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  link: string;

  @Column()
  title: string;

  @Column()
  thumb: string;

  // https://typeorm.io/#/mongodb/defining-subdocuments-embed-documents
  @Column(type => PostContent)
  contents: PostContent[];

  @CreateDateColumn()
  created_at: Date;

  @Column()
  posted_at: Date;
}

export default Post;
