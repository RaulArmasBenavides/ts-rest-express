export interface ProductOptions {
    name: string;
    description: string;
    price:number;
    stock:number;
    creation_date?: Date;
  }
  

export class Product  {
    public id!: number;
    public name!: string;
    public description!: string;
    public price!: number;
    public stock!: number;
    public creation_date!: Date;

    constructor( options: ProductOptions ) {
    
        const { name, description, price, stock,creation_date = new Date() } = options;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.creation_date = creation_date;
      }
    static fromObject = ( object: { [key: string]: any } ): Product => {
        const { name, description, price, stock, creation_date} = object;
        const log = new Product({
            name, description, price, stock,creation_date
        });
        return log;
      }
}
