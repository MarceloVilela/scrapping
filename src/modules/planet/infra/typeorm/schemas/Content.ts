import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity('content')
class BulletinContent {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  key: string;

  @Column()
  value: string;
}

export default BulletinContent;
