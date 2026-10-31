import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

// Used by PATCH (partial update) - all fields become optional
export class PartialUpdateProductDto extends PartialType(CreateProductDto) {}
