import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';

import { Dodoitsu } from '@domain/dodoitsu/dodoitsu.entity';
import { DodoitsuLike } from '@domain/dodoitsu/dodoitsu-like.entity';
import { User } from '@domain/user/user.entity';
import { Theme } from '@domain/theme/theme.entity';

@Injectable()
export class DodoitsuSeedService {
  constructor(
    @InjectRepository(Dodoitsu)
    private dodoitsuRepository: Repository<Dodoitsu>,
    @InjectRepository(DodoitsuLike)
    private dodoitsuLikeRepository: Repository<DodoitsuLike>,
    @InjectRepository(Theme)
    private themeRepository: Repository<Theme>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async run() {
    await generateDodoitsus({
      dodoitsuRepository: this.dodoitsuRepository,
      themeRepository: this.themeRepository,
      userRepository: this.userRepository,
    });

    await generateDodoitsuLikes({
      dodoitsuRepository: this.dodoitsuRepository,
      userRepository: this.userRepository,
      dodoitsuLikeRepository: this.dodoitsuLikeRepository,
    });
  }

  delete() {
    return Promise.all([
      this.dodoitsuLikeRepository.delete({}),
      this.dodoitsuRepository.delete({}),
    ]);
  }
}

type GenerateDodoitsusArgs = {
  dodoitsuRepository: Repository<Dodoitsu>;
  themeRepository: Repository<Theme>;
  userRepository: Repository<User>;
};

type GenerateDodoitsuLikesArgs = {
  dodoitsuRepository: Repository<Dodoitsu>;
  dodoitsuLikeRepository: Repository<DodoitsuLike>;
  userRepository: Repository<User>;
};

const generateDodoitsus = async (args: GenerateDodoitsusArgs) => {
  const { dodoitsuRepository, themeRepository, userRepository } = args;

  const now = new Date();

  // 1年前の日付を生成
  const oneYearAgo = new Date(now);
  oneYearAgo.setFullYear(now.getFullYear() - 1);

  // 1か月前の日付を生成
  const oneMonthAgo = new Date(now);
  oneMonthAgo.setMonth(now.getMonth() - 1);

  // 1日前の日付を生成
  const oneDayAgo = new Date(now);
  oneDayAgo.setDate(now.getDate() - 1);

  const [themes, users] = await Promise.all([
    themeRepository.find(),
    userRepository.find(),
  ]);

  // 受付中のお題
  const activeTheme = themes.find(
    (theme) => theme.title === '現在進行中のテーマ',
  );
  // 受付が終了しているお題
  const closeTheme = themes.find((theme) => theme.title === '過去のテーマ');

  // 投稿を行うユーザー
  const postedUser = users[0];

  const dodoitsus = [
    createDodoitsu(
      '過去のお題に関連付けられた都々逸（authorあり）',
      closeTheme,
      now,
      postedUser,
    ),
    createDodoitsu(
      '現在進行中のお題に関連付けられた都々逸（authorあり）',
      activeTheme,
      now,
      postedUser,
    ),
    createDodoitsu(
      'お題に関連付けられていない都々逸（authorあり）',
      null,
      now,
      postedUser,
    ),
    createDodoitsu(
      '一日前に投稿された都々逸（authorあり）',
      null,
      oneDayAgo,
      postedUser,
    ),
    createDodoitsu(
      '一か月前に投稿された都々逸（authorあり）',
      null,
      oneMonthAgo,
      postedUser,
    ),
    createDodoitsu(
      '一年前に投稿された都々逸（authorあり）',
      null,
      oneYearAgo,
      postedUser,
    ),
    createDodoitsu(
      '過去のお題に関連付けられた都々逸（author無し）',
      closeTheme,
      now,
    ),
    createDodoitsu(
      '現在進行中のお題に関連付けられた都々逸（author無し）',
      activeTheme,
      now,
    ),
    createDodoitsu('お題に関連付けられていない都々逸（author無し）', null, now),
    createDodoitsu('一日前に投稿された都々逸（author無し）', null, oneDayAgo),
    createDodoitsu(
      '一か月前に投稿された都々逸（author無し）',
      null,
      oneMonthAgo,
    ),
    createDodoitsu('一年前に投稿された都々逸（author無し）', null, oneYearAgo),
  ];

  await dodoitsuRepository.save(dodoitsus);
};

const createDodoitsu = (
  content: string,
  theme: Theme,
  createdAt: Date,
  author?: User,
): Dodoitsu => {
  return {
    id: randomUUID(),
    content,
    description: '',
    theme,
    author,
    createdAt,
  };
};

const generateDodoitsuLikes = async (args: GenerateDodoitsuLikesArgs) => {
  const { dodoitsuRepository, userRepository, dodoitsuLikeRepository } = args;
  const users = await userRepository.find();
  const now = new Date();

  // いいねを受けるユーザー
  const postedUser = users[0];

  // いいねを行うユーザー
  const [likedUser1, likedUser2, likedUser3] = [users[1], users[2], users[3]];

  console.log(likedUser1, likedUser2, likedUser3);

  // いいねを受ける都々逸
  const dodoitsus = [
    createDodoitsu('3件のいいねを受ける都々逸', null, now, postedUser),
    createDodoitsu('2件のいいねを受ける都々逸', null, now, postedUser),
    createDodoitsu('1件のいいねを受ける都々逸', null, now, postedUser),
  ];

  const dodoitsuData = await dodoitsuRepository.save(dodoitsus);

  const threeLikedDodoitsu = dodoitsuData.find(
    (dodoitsu) => dodoitsu.content === '3件のいいねを受ける都々逸',
  );
  const twoLikedDodoitsu = dodoitsuData.find(
    (dodoitsu) => dodoitsu.content === '2件のいいねを受ける都々逸',
  );
  const oneLikedDodoitsu = dodoitsuData.find(
    (dodoitsu) => dodoitsu.content === '1件のいいねを受ける都々逸',
  );

  const dodoitsuLikes = [
    createDodoitsuLike(0, likedUser1, threeLikedDodoitsu, now),
    createDodoitsuLike(1, likedUser2, threeLikedDodoitsu, now),
    createDodoitsuLike(2, likedUser3, threeLikedDodoitsu, now),
    createDodoitsuLike(3, likedUser1, twoLikedDodoitsu, now),
    createDodoitsuLike(4, likedUser2, twoLikedDodoitsu, now),
    createDodoitsuLike(5, likedUser1, oneLikedDodoitsu, now),
  ];

  await dodoitsuLikeRepository.save(dodoitsuLikes);
};

const createDodoitsuLike = (id, user, dodoitsu, createdAt): DodoitsuLike => {
  return {
    id,
    user,
    dodoitsu,
    createdAt,
  };
};
