import { ApiProperty } from '@nestjs/swagger';

export class CreateListingDto {
  @ApiProperty({ example: 'Flash Sale 2025', description: 'Title of the listing' })
  title: string;
}
