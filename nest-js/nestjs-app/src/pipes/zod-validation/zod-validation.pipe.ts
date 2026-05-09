import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ZodType } from 'zod';

@Injectable()
export class ZodValidationPipe<T extends ZodType> implements PipeTransform {
  constructor(private schema: T) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      return this.schema.parse(value);
    } catch (error: unknown) {
      throw new BadRequestException('Validation failed', metadata?.data);
      console.error('Validation failed:', error);
    }
  }
}
// @Injectable()
// export class ZodValidationPipe<Output> implements PipeTransform<
//   unknown,
//   Output
// > {
//   constructor(private readonly schema: ZodTypeAny<Output>) {}

//   transform(value: unknown, metadata: ArgumentMetadata): Output {
//     try {
//       const parsed = this.schema.parse(value) as Output;
//       return parsed;
//     } catch (error: unknown) {
//       // if (error instanceof ZodError) {
//       //   throw new BadRequestException({
//       //     message: 'Validation failed',
//       //     errors: error?.issues,
//       //   });
//       // }
//       throw new BadRequestException('Validation failed', metadata?.data);
//       console.error('Validation failed:', error);
//     }
//   }
// }
