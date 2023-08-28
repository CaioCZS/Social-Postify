import { HttpException, HttpStatus } from '@nestjs/common';

export function isIdGreaterThanZero(id: number) {
  if (id <= 0) {
    throw new HttpException('Id must be grater than 0', HttpStatus.BAD_REQUEST);
  }
}
