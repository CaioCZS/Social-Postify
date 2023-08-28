import { HttpException, HttpStatus } from '@nestjs/common';

export class PostNotFound extends HttpException {
  constructor() {
    super('Post not found', HttpStatus.NOT_FOUND);
  }
}
export class PostAlreadyPublished extends HttpException {
  constructor() {
    super('Post already had a publication', HttpStatus.FORBIDDEN);
  }
}
