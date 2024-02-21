import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS =[
  {
    id:'p1',
    price:6,
    title: 'my first react',
    description:'redux toolkit'
  },
  {
    id:'p2',
    price:8,
    title: 'my second react',
    description:'redux toolkit'
  },
  {
    id:'p3',
    price:10,
    title: 'my third react',
    description:'redux toolkit'
  }
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {/* <ProductItem
          title='Test'
          price={6}
          description='This is a first product - amazing!'
        /> */}
        {DUMMY_PRODUCTS.map((product)=>{
          return(
             <ProductItem
           key={product.id}
           id= {product.id}
           title={product.title}
           price={product.price}
           description={product.description}
           />
          )
        })}
      </ul>
    </section>
  );
};

export default Products;
