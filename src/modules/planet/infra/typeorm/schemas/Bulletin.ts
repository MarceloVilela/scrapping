import {
  ObjectID,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

import Content from './Content';

@Entity('planet')
class Bulletin {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ unique: true })
  sourceLink: string;
  // "http://planetsuzy.org/showpost.php?s=6afd77fd3199a1484ea2875a2aa873a0&p=17722199&postcount=352"

  @Column()
  title: string;
  // "Jenna Haze - Full Streams Ahead"

  @Column()
  images: string[];
  // [
  // "https://images2.imgbox.com/fa/46/uG12A9yG_o.jpg",
  // "https://ist5-2.filesor.com/pimpandhost.com/1/4/9/7/149762/6/W/v/w/6Wvwy/JennHaz_FSA_1080p_s.jpg",
  // "http://thumbs2.imagebam.com/ff/a5/33/b22f921089643324.jpg"
  // ]

  @Column()
  links: string[];
  // [
  // "https://rapidgator.net/file/9fd5608fd8c7a05fcd3d94ae4045a18a/JennHaz_FSA_1080p.mp4.html",
  // "https://filejoker.net/1viqhvb9crby",
  // ]

  // https://typeorm.io/#/mongodb/defining-subdocuments-embed-documents
  @Column(type => Content)
  contents: Content[];
  // [
  // {"id": "0352"},
  // {"text": "1280x720 11:27 249 MB mp4"}
  // ]

  @Column()
  labels: string[];
  // "jennahaze@planetsuzy/hd"

  @Column()
  posted_at: Date;
  // new Date() ... "11th January 2019, 21:47"

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Bulletin;
