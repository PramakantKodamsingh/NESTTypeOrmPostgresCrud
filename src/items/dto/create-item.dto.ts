import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({example: 'John Doe', description: 'Name of the item'})
  name: string;

  @ApiProperty({ default: true })
  public: boolean;

  @ApiProperty({ example: 1, description: 'ID of the listing to associate' })
  listingId: number;
}
