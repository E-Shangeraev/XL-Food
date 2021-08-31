const DeliveryInfo = () => (
  <div className="modal__body">
    <h3 className="modal__title">Информация о доставке</h3>
    <p className="modal__text">
      Самовывоз возможен с&nbsp;10:00 до&nbsp;01:30 по&nbsp;адресу: <br />
      г.&nbsp;Красноярск, ул.&nbsp;Парижской&nbsp;коммуны&nbsp;31,
      цокольный&nbsp;этаж.
    </p>
    <p className="modal__text modal__text--yellow">
      Скидка при&nbsp;самовывозе 15% на&nbsp;любой заказ.
    </p>
    <p className="modal__text">
      Вы можете выбрать удобное для&nbsp;вас время доставки при&nbsp;оформлении
      заказа.
    </p>
    <h4 className="modal__subtitle">Условия доставки</h4>
    <ul className="modal__list">
      <li>Доставка бесплатная.</li>
      <li>
        Минимальная сумма заказа 500&nbsp;руб. Стоимость заказа может быть
        увеличена, когда&nbsp;он сделан в&nbsp;удаленные районы города.
      </li>
    </ul>
    <p className="modal__small-text">
      В случае если минимальная сумма вашего заказа не соответствует бесплатной
      доставке в&nbsp;ваш район города, то стоимость платной доставки будет
      составлять от 150 рублей, в&nbsp;зависимости от удаленности (уточняйте
      у&nbsp; оператора).
    </p>
  </div>
)

export default DeliveryInfo
