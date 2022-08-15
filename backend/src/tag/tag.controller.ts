import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common'
import { TagService } from './tag.service'

@Controller({ path: 'tag', version: '1' })
export class TagController {
  constructor(private readonly tagService: TagService) {}

  // @Post()
  // create(@Body() createTagDto: CreateTagDto) {
  //   return this.tagService.create(createTagDto)
  // }
  //
  @Get()
  findAll(@Query('tag') tagQuery?: string | string[]) {
    if (tagQuery !== undefined) {
      return this.tagService.tagQueryToTags(tagQuery)
    }
    return this.tagService.findMany({})
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.tagService.findOne(+id)
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
  //   return this.tagService.update(+id, updateTagDto)
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.tagService.remove(+id)
  // }
}
