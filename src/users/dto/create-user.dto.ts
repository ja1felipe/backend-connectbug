import { User } from '@/users/entities/user.entity';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateUserDto extends OmitType(User, [
  'created_at',
  'id',
  'updated_at',
]) {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}
