import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePostDTO, PostsService } from './posts.service';

@Controller('posts')
@ApiTags('帖子')
export class PostsController {
  // 将 service 挂载到 controller 实例上，使用 service 中的方法
  constructor(private readonly postsService: PostsService) {}

  @Get('/')
  @ApiOperation({ summary: '查询帖子' })
  async index() {
    const data = await this.postsService.findAll();

    return {
      code: 200,
      success: true,
      data
    };
  }

  @Post()
  @ApiOperation({ summary: '创建帖子' })
  async create(@Body() createPostDto: CreatePostDTO) {
    const data = await this.postsService.create(createPostDto);

    return {
      code: 200,
      success: true,
      message: '发表成功',
      data
    };
  }

  @Get(':id')
  @ApiOperation({ summary: '文章详情' })
  async detail(@Param('id') queryId: string) {
    const data = await this.postsService.detail(queryId);

    return {
      code: 200,
      success: true,
      data
    };
  }

  @Put(':id')
  @ApiOperation({ summary: '编辑帖子' })
  async update(
    @Param('id') queryId: string,
    @Body() updatePostDto: CreatePostDTO
  ) {
    const data = await this.postsService.update(queryId, updatePostDto);

    return {
      code: 200,
      success: true,
      message: '更新成功',
      data
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除帖子' })
  async remove(@Param('id') id: string) {
    const data = this.postsService.remove(id);

    return {
      code: 200,
      success: true,
      message: '删除成功',
      data
    };
  }
}
