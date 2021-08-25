import './Information.scss'

const Information = () => (
  <div className="info__container">
    <h3 className="info__title">Информация о доставке</h3>
    <p className="info__text">
      Самовывоз возможен с&nbsp;10:00 до&nbsp;01:30 по&nbsp;адресу: <br />
      г.&nbsp;Красноярск, ул.&nbsp;Парижской&nbsp;коммуны&nbsp;31,
      цокольный&nbsp;этаж.
    </p>
    <p className="info__text info__text--yellow">
      Скидка при&nbsp;самовывозе 15% на&nbsp;любой заказ.
    </p>
    <p className="info__text">
      Вы можете выбрать удобное для&nbsp;вас время доставки при&nbsp;оформлении
      заказа.
    </p>
    <h4 className="info__subtitle">Условия доставки</h4>
    <ul className="info__list">
      <li>Доставка бесплатная.</li>
      <li>
        Минимальная сумма заказа 500&nbsp;руб. Стоимость заказа может быть
        увеличена, когда&nbsp;он сделан в&nbsp;удаленные районы города.
      </li>
    </ul>
    <p className="info__small-text">
      В случае если минимальная сумма вашего заказа не соответствует бесплатной
      доставке в&nbsp;ваш район города, то стоимость платной доставки будет
      составлять от 150 рублей, в&nbsp;зависимости от удаленности (уточняйте
      у&nbsp; оператора).
    </p>
  </div>
)

export default Information
