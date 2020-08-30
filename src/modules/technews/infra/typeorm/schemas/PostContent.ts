import { Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

export enum ContentType {
  TEXT = 'text',
  TEXT_HIGHLIGHTED = 'text-highlighted',
  IMAGE = 'image',
  VIDEO = 'video',
}

@Entity('postContent')
class PostContent {
  @ObjectIdColumn()
  id: ObjectID;

  // https://typeorm.io/#/entities/enum-column-type
  @Column({
    // type: 'enum',
    // enum: ContentType,
    // default: ContentType.TEXT,
  })
  @Column()
  type: string;

  @Column()
  value: string;
}

export default PostContent;
