import { instanceToPlain } from 'class-transformer'

export function plainBodyMapper<Input, Output>(
  instance: Input | Input[],
): Output | Output[] {
  return instanceToPlain(instance, {
    excludeExtraneousValues: true,
    exposeDefaultValues: true,
  }) as Output
}
