import { IsString, MinLength } from 'class-validator';

export class AssistantRequestDto {
  @IsString()
  @MinLength(1)
  prompt: string;
}
