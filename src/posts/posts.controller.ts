import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query
} from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { PostModel } from './post.model';

class CreatePostDTO {
  @ApiProperty({ description: '帖子的标题', example: '一个帖子标题' })
  title: string;
  @ApiProperty({ description: '帖子的内容', example: '一个帖子内容' })
  content: string;
}

@Controller('posts')
@ApiTags('帖子')
export class PostsController {
  @Get('/')
  @ApiOperation({ summary: '查询帖子' })
  async index() {
    return await PostModel.find();
  }

  @Post()
  @ApiOperation({ summary: '创建帖子' })
  async create(@Body() createPostDto: CreatePostDTO) {
    const { _id: id } = await PostModel.create({
      title: createPostDto.title,
      content: createPostDto.content
    });

    const { title, content } = await PostModel.findById(id).exec();

    return {
      code: 200,
      success: true,
      msg: '发表成功',
      data: {
        id,
        title,
        content
      }
    };
  }

  @Get(':id')
  @ApiOperation({ summary: '文章详情' })
  async detail(@Param('id') queryId: string) {
    const { _id: id, content, title } = await PostModel.findById(queryId);

    return {
      code: 200,
      success: true,
      data: {
        id,
        content,
        title
      }
    };
  }

  @Put(':id')
  @ApiOperation({ summary: '编辑帖子' })
  async update(
    @Param('id') queryId: string,
    @Body() updatePostDTO: CreatePostDTO
  ) {
    await PostModel.findByIdAndUpdate(queryId, updatePostDTO);
    const { _id: id, title, content } = await PostModel.findById(
      queryId
    ).exec();

    return {
      code: 200,
      success: true,
      msg: '更新成功',
      data: {
        id,
        title,
        content
      }
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除帖子' })
  async remove(@Param('id') id: string) {
    await PostModel.findByIdAndDelete(id);

    return {
      code: 200,
      success: true,
      msg: '删除成功'
    };
  }
}
