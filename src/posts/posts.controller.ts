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
  // @ApiProperty({ description: '帖子的 id' })
  // id: number;
  @ApiProperty({ description: '帖子的标题' })
  title: string;
  @ApiProperty({ description: '帖子的内容' })
  content: string;
}

@Controller('posts')
@ApiTags('帖子')
export class PostsController {
  @Get('/')
  @ApiOperation({ summary: '查询帖子' })
  async index() {
    // return ['post1', 'post2'];
    return await PostModel.find();
  }

  @Post()
  @ApiOperation({ summary: '创建帖子' })
  async create(@Body() body: CreatePostDTO) {
    // console.log('body', body, typeof body.id);

    const { _id: id } = await PostModel.create({
      // id: body.id,
      title: body.title,
      content: body.content
    });

    const { title, content } = await PostModel.findById(id).exec();

    return {
      code: 200,
      success: true,
      data: {
        id,
        title,
        content
      }
    };
  }

  @Get(':id')
  @ApiOperation({ summary: '文章详情' })
  detail(@Param('id') id: string) {
    console.log(id);

    return {
      id: id,
      title: 'TITLE'
    };
  }

  @Put(':id')
  @ApiOperation({ summary: '编辑帖子' })
  update(id: string, @Body() body: CreatePostDTO) {
    console.log(body);

    return {
      success: true
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除帖子' })
  async remove(@Param('id') id: string) {
    const res = await PostModel.findByIdAndDelete(id);
    console.log(res);
    console.log(id);
    
    
    return {
      success: true
    };
  }
}
