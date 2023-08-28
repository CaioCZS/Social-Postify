import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    await this.postsService.create(createPostDto);
    return 'Post created';
  }

  @Get()
  async findAll() {
    return await this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.postsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    await this.postsService.update(id, updatePostDto);
    return 'Post updated';
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.postsService.remove(id);
    return 'Post deleted';
  }
}
