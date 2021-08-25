import successfulIcon from '../../assets/img/successful.svg'

const CartSuccessful = () => {
  const a = 1

  return (
    <section className="cart cart--successful">
      <img src={successfulIcon} alt="Данные успешно отравлены" />
      <h2 className="cart__title">
        Спасибо за заказ! <br />
        Данные успешно отравлены.
      </h2>
    </section>
  )
}

export default CartSuccessful
