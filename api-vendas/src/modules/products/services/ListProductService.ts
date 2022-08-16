import { getCustomRepository } from 'typeorm';
import Product from '../entities/product';
import { ProductRepository } from '../repository/productRepository';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository);

    const products = productsRepository.find();

    return products;
  }
}

export default ListProductService;
