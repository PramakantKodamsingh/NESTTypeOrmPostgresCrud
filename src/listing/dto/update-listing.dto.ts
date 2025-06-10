import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateListingDto } from './create-listing.dto';

export class UpdateListingDto extends PartialType(CreateListingDto) {}
