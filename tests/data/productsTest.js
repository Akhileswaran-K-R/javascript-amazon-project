import { Product,Appliance,Clothing,products,loadProducts} from "../../data/products.js";

describe('Test suite: Product',() => {

  beforeAll((done) => {
    loadProducts(() => {
      done();
    });
  });

  let product;

  beforeEach(() => {
    product=new Product(products[0]);
  });

  it('has the correct properties',() => {
    expect(product.id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(product.image).toEqual('images/products/athletic-cotton-socks-6-pairs.jpg');
    expect(product.name).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
    expect(product.rating).toEqual({
      stars: 4.5,
      count: 87
    });
    expect(product.priceCents).toEqual(1090);
  });

  it('gets the url of image of star',() => {
    expect(product.getStarsUrl()).toEqual('images/ratings/rating-45.png');
  });

  it('gets the price of product',() => {
    expect(product.getPrice()).toEqual('$10.90');
  });

  it('does not display any extra info',() => {
    expect(product.extraInfoHTML()).toEqual('');
  });
});

describe('Test suite: Clothing',() =>{

  beforeAll((done) => {
    loadProducts(() => {
      done();
    });
  });

  let clothing;

  beforeEach(() => {
    clothing = new Clothing(products[2]);
  });

  it('has the properties',() => {
    expect(clothing.id).toEqual('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
    expect(clothing.image).toEqual('images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg');
    expect(clothing.name).toEqual('Adults Plain Cotton T-Shirt - 2 Pack');
    expect(clothing.rating).toEqual({
      stars: 4.5,
      count: 56
    });
    expect(clothing.priceCents).toEqual(799);
  });

  it('gets the url of image of star',() => {
    expect(clothing.getStarsUrl()).toEqual('images/ratings/rating-45.png');
  });

  it('gets the price of product',() => {
    expect(clothing.getPrice()).toEqual('$7.99');
  });

  /*it('displays a size chart link in extraInfoHTML',() => {
    expect(clothing.extraInfoHTML()).toContain('<a href="images/clothing-size-chart.png" target="_blank">');
    expect(clothing.extraInfoHTML()).toContain('Size chart');
  });*/
});

describe('Test suite: Appliance',() =>{

  beforeAll((done) => {
    loadProducts(() => {
      done();
    });
  });

  let appliance;

  beforeEach(() => {
    appliance = new Appliance(products[3]);
  });

  it('has the properties',() => {
    expect(appliance.id).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add');
    expect(appliance.image).toEqual('images/products/black-2-slot-toaster.jpg');
    expect(appliance.name).toEqual('2 Slot Toaster - Black');
    expect(appliance.rating).toEqual({
      stars: 5,
      count: 2197
    });
    expect(appliance.priceCents).toEqual(1899);
    //expect(appliance.instructionsLink).toEqual('images/appliance-instructions.png');
    //expect(appliance.warrantyLink).toEqual('images/appliance-warranty.png');
  });

  it('gets the url of image of star',() => {
    expect(appliance.getStarsUrl()).toEqual('images/ratings/rating-50.png');
  });

  it('gets the price of product',() => {
    expect(appliance.getPrice()).toEqual('$18.99');
  });

  /*it('displays a instruction and warranty link in extraInfoHTML',() => {
    expect(appliance.extraInfoHTML()).toContain('<a href="images/appliance-instructions.png" target="_blank">');
    expect(appliance.extraInfoHTML()).toContain('Instructions');

    expect(appliance.extraInfoHTML()).toContain('<a href="images/appliance-warranty.png" target="_blank">');
    expect(appliance.extraInfoHTML()).toContain('Warranty');
  });*/
});