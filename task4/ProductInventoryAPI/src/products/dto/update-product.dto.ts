import { CreateProductDto } from './create-product.dto';

// Used by PUT (full replacement) - all required fields stay required
export class UpdateProductDto extends CreateProductDto {}
