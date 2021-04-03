import { Injectable } from '@nestjs/common';
import { Post as PostSchema } from './post.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePostDTO {
  // 通过 class-validator 提供的装饰器，来装饰 dto 中的字段
  @ApiProperty({ description: '帖子的标题', example: '一个帖子标题' })
  @IsNotEmpty({ message: '缺少标题' })
  title: string;
  @ApiProperty({ description: '帖子的内容', example: '一个帖子内容' })
  content: string;
}

export interface IData {
  id: string;
  content: string;
  title: string;
}

@Injectable()
export class PostsService {
  constructor(
    // 注入 Post 模型
    @InjectModel(PostSchema)
    private readonly postModel: ReturnModelType<typeof PostSchema>
  ) {}

  async findAll() {
    return (await this.postModel.find()) as IData[];
  }

  async create(createPostDto: CreatePostDTO) {
    const createdPost = new this.postModel(createPostDto);
    const { _id: id, content, title } = await createdPost.save();
    return { id, content, title } as IData;
  }

  async detail(queryId: string) {
    const { _id: id, content, title } = await this.postModel.findById(queryId);
    return { id, content, title } as IData;
  }

  async update(queryId: string, updatePostDto: CreatePostDTO) {
    await this.postModel.findByIdAndUpdate(queryId, updatePostDto);
    const { _id: id, title, content } = await this.postModel
      .findById(queryId)
      .exec();
    return { id, content, title } as IData;
  }

  async remove(id: string) {
    await this.postModel.findByIdAndDelete(id);
    const data = await this.postModel.find();
    return data as IData[];
  }
}
