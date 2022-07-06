import { Product } from 'src/products/entities/product.entity';
import { Tables } from 'src/table/entities/table.entity';
import { Users } from 'src/users/entities/users.entity';

export class Order {
  id?: string;
  user?: Users;
  table?: Tables;
  createdAt?: Date;
  updatedAt?: Date;
  products?: Product[];
}
