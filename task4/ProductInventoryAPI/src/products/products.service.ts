import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Products } from './entities/products.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PartialUpdateProductDto } from './dto/partial-update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productsRepo: Repository<Products>,
  ) {}

  // helper: find by id or throw 404
  private async getOrFail(id: number): Promise<Products> {
    const product = await this.productsRepo.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async create(dto: CreateProductDto) {
    const product = this.productsRepo.create(dto);
    const saved = await this.productsRepo.save(product);
    return { message: 'Product created successfully', data: saved };
  }

  async findAll() {
    const products = await this.productsRepo.find({
      order: { createdAt: 'DESC' },
    });
    return {
      message: 'Products fetched successfully',
      count: products.length,
      data: products,
    };
  }

  async findOne(id: number) {
    const product = await this.getOrFail(id);
    return { message: 'Product fetched successfully', data: product };
  }

  // PATCH - partial update
  async update(id: number, dto: PartialUpdateProductDto) {
    await this.getOrFail(id);
    await this.productsRepo.update(id, dto);
    const updated = await this.getOrFail(id);
    return { message: 'Product updated successfully', data: updated };
  }

  // PUT - full replacement (optional fields reset to defaults if omitted)
  async replace(id: number, dto: UpdateProductDto) {
    await this.getOrFail(id);
    await this.productsRepo.update(id, {
      name: dto.name,
      description: dto.description ?? null,
      price: dto.price,
      stock: dto.stock ?? 0,
      category: dto.category,
      isActive: dto.isActive ?? true,
    });
    const updated = await this.getOrFail(id);
    return { message: 'Product replaced successfully', data: updated };
  }

  async remove(id: number) {
    await this.getOrFail(id);
    await this.productsRepo.delete(id);
    return { message: 'Product deleted successfully', id };
  }

  async findByCategory(category: string) {
    const products = await this.productsRepo.find({
      where: { category },
      order: { createdAt: 'DESC' },
    });
    return {
      message: `Products in category "${category}" fetched successfully`,
      count: products.length,
      data: products,
    };
  }

  async search(keyword: string) {
    const term = (keyword ?? '').trim();
    const products = await this.productsRepo.find({
      where: { name: ILike(`%${term}%`) },
      order: { createdAt: 'DESC' },
    });
    return {
      message: `Search results for "${term}"`,
      count: products.length,
      data: products,
    };
  }

  async toggleActive(id: number) {
    const product = await this.getOrFail(id);
    product.isActive = !product.isActive;
    const saved = await this.productsRepo.save(product);
    return {
      message: `Product is now ${saved.isActive ? 'active' : 'inactive'}`,
      data: saved,
    };
  }
}
