import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class ValidationException extends BadRequestException {
  constructor(private readonly errors: ValidationError[]) {
    super();
  }

  getResponse(): string | object {
    const formattedErrors = this.errors.map((error) => {
      return { property: error.property, constraints: error.constraints };
    });

    return formattedErrors;
  }
}
