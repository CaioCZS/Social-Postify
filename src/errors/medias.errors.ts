import { HttpException, HttpStatus } from '@nestjs/common';

export class CombinationAlradyExist extends HttpException {
  constructor() {
    super(
      'This username already exist on this social media',
      HttpStatus.CONFLICT,
    );
  }
}

export class MediaNotFound extends HttpException {
  constructor() {
    super('Media not found', HttpStatus.NOT_FOUND);
  }
}

export class MediaAlreadyPublished extends HttpException {
  constructor() {
    super('Media already had a publication', HttpStatus.FORBIDDEN);
  }
}
