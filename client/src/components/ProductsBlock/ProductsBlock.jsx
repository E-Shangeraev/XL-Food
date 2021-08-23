import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import fetchProducts from '../../redux/actions/products'
import Product from '../Product/Product'
import './ProductsBlock.scss'

const AWS_URL = 'https://malakhov-xlfood.s3.eu-central-1.amazonaws.com/'

const ProductsBlock = ({ id, title }) => {
  const dispatch = useDispatch()
  const { items: productsItems, isLoaded } = useSelector(
    ({ products }) => products,
  )

  useEffect(() => {
    dispatch(fetchProducts(id))
  }, [])

  return (
    <section className="products" id={id}>
      <h2 className="title">{title}</h2>
      <ul className="products__list">
        {isLoaded &&
          productsItems.map(product => (
            <Product
              name={product.name}
              composition={product.composition}
              price={product.cost}
              image={`${AWS_URL}${product.uploadedFile.path[0]}`}
            />
          ))}
      </ul>
    </section>
  )
}

ProductsBlock.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string.isRequired,
}

ProductsBlock.defaultProps = {
  id: null,
}

export default ProductsBlock
