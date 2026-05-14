import { articleObject } from "./article.object";
import { blogObject, blogsObject } from "./blog.object";
import { cartObject } from "./cart.object";
import { collectionObject } from "./collection.object";
import { countryObject } from "./country.object";
import { customerObject } from "./customer.object";
import { marketObject } from "./market.object";
import type { LiquidObject } from "./object.types";
import { orderObject } from "./order.object";
import { pageObject } from "./page.object";
import { productObject } from "./product.object";
import { storeObject } from "./store.object";

export const liquidObjects: LiquidObject[] = [
  articleObject,
  blogObject,
  blogsObject,
  cartObject,
  collectionObject,
  countryObject,
  customerObject,
  marketObject,
  orderObject,
  pageObject,
  productObject,
  storeObject,
];
