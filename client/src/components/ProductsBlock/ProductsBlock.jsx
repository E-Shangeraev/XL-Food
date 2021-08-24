import { v4 as uuidv4 } from 'uuid'
import PropTypes from 'prop-types'
import Product from '../Product/Product'
import './ProductsBlock.scss'

const AWS_URL = 'https://malakhov-xlfood.s3.eu-central-1.amazonaws.com/'

const ProductsBlock = ({ id, title, items }) => (
  <section className="products" id={id}>
    <h2 className="title">{title}</h2>
    <ul className="products__list">
      {items.map(product => (
        <Product
          key={uuidv4()}
          name={product.name}
          weight={product.weight}
          composition={product.composition}
          price={product.cost}
          image={`${AWS_URL}${product.uploadedFile.path[0]}`}
        />
      ))}
    </ul>
  </section>
)

ProductsBlock.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
}

ProductsBlock.defaultProps = {
  id: null,
  items: [],
}

export default ProductsBlock
