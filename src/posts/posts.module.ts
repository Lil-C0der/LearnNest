import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Post } from './post.model';
import { PostsService } from './posts.service';

// Posts 模块
@Module({
  // 注册 Post 模型
  imports: [TypegooseModule.forFeature([Post])],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
