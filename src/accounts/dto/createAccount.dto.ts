import { ApiProperty } from '@nestjs/swagger';
export class CreateAccountDTO {
  @ApiProperty({
    description: 'Fullname of user',
    type: String,
    required: true,
  })
  readonly fullname: string;
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly password: string;
}
