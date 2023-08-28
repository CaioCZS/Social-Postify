import { HttpException, HttpStatus } from '@nestjs/common';

export class PublicationNotFound extends HttpException {
  constructor() {
    super('Publication not found', HttpStatus.NOT_FOUND);
  }
}

export class PublicationAlreadyPublished extends HttpException {
  constructor() {
    super(
      'You are not alowed to edit an publication that already being published',
      HttpStatus.FORBIDDEN,
    );
  }
}
