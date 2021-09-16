import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { useFormik } from 'formik'
import * as yup from 'yup'
import classNames from 'classnames'
import { useDebouncedCallback } from 'use-debounce'
import TextMaskCustom from '../Form/TextMaskCustom'

import {
  clearCart,
  checkPromocode,
  activatePromocode,
  setTypePickup,
} from '../../redux/actions/cart'

import Button from '../Button/Button'
import Modal from '../Modal/Modal'
import DeliveryInfo from '../Modal/ModalBody/DeliveryInfo'
import CartItem from '../CartItem/CartItem'
import CartSlider from '../CartSlider/CartSlider'

import deliveryIcon from '../../assets/img/delivery-icon.svg'
import storeIcon from '../../assets/img/storefront-icon.svg'
import timeIcon from '../../assets/img/time-icon.svg'
import specificTimeIcon from '../../assets/img/specific-time-icon.svg'
import moneyIcon from '../../assets/img/money-icon.svg'
import creditCardIcon from '../../assets/img/credit-card-icon.svg'

const phoneRegExp =
  // eslint-disable-next-line no-useless-escape
  /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10,11}$/

function calculate({
  startTime = moment().add(60 - (moment().minute() % 15), 'm'),
  endTime,
}) {
  const timeStops = []

  while (startTime <= endTime) {
    // eslint-disable-next-line new-cap
    timeStops.push(new moment(startTime).format('HH:mm'))
    startTime.add(15, 'm')
  }

  return timeStops
}

const validationSchema1 = yup.object({
  name: yup
    .string()
    .min(2, 'Имя')
    .max(50, 'Имя')
    .typeError('Имя')
    .required('Введите имя'),
  phone: yup
    .string()
    .matches(phoneRegExp, 'Проверьте корректность введенного номера')
    .required('Введите номер телефона'),
  address: yup.string().required('Введите адрес доставки'),
  apartment: yup
    .number()
    .typeError('Введите кв/офис')
    .required('Введите кв/офис')
    .integer('Введите кв/офис'),
})

const validationSchema2 = yup.object({
  name: yup
    .string()
    .min(2, 'Имя')
    .max(50, 'Имя')
    .typeError('Имя')
    .required('Введите имя'),
  phone: yup
    .string()
    .matches(phoneRegExp, 'Проверьте корректность введенного номера')
    .required('Введите номер телефона'),
})

const useStyles = makeStyles(theme => ({
  divider: {
    margin: theme.spacing(2, 0),
  },
  formControl: {
    margin: theme.spacing(2),
    marginRight: 0,
    marginLeft: 0,
    width: '100%',
  },
  formTimeControl: {
    margin: 0,
    width: '100%',
  },
  select: {
    width: '100%',
  },
  textInput: {
    width: '100%',

    input: {
      width: '100%',
    },
  },
}))

const ITEM_HEIGHT = 48

const menuProps = {
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left',
  },
  style: {
    maxHeight: ITEM_HEIGHT * 6,
  },
  variant: 'menu',
}

let timeArray = calculate({ endTime: moment().endOf('day') })
let initialTime = timeArray[0]

const CartOrder = ({
  cartItems,
  totalPrice,
  totalPriceWithDiscount,
  handleSubmit: setSubmited,
}) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const cart = useSelector(state => state.cart)
  const [wayToGet, setWayToGet] = useState('Доставка')
  const [deliveryDay, setDeliveryDay] = useState('Сегодня')
  const [deliveryTime, setDeliveryTime] = useState('Ближайшее время')

  useEffect(() => {
    dispatch(setTypePickup(false))
    dispatch(activatePromocode(false))
  }, [])

  const formik = useFormik({
    initialValues: {
      delivery: 'Доставка',
      name: '',
      phone: '',
      address: '',
      apartment: '',
      promocode: '',
      entranceCode: '',
      entrance: '',
      floor: '',
      comment: '',
      day: 'Сегодня',
      time: 'Ближайшее время',
      specificTime: initialTime,
      payment: 'Наличными при получении',
    },
    validationSchema:
      wayToGet === 'Доставка' ? validationSchema1 : validationSchema2,
    onSubmit: (values, actions) => {
      values.order = cart
      fetch('/api/mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(values, null, 2),
      })
      setSubmited(true)
      dispatch(clearCart())
      actions.resetForm()
    },
  })

  const handleWayToGet = e => {
    setWayToGet(e.target.value)

    if (e.target.value === 'Самовывоз') dispatch(setTypePickup(true))
    if (e.target.value === 'Доставка') dispatch(setTypePickup(false))

    formik.setFieldValue('delivery', e.target.value)
  }
  const handleDeliveryDay = e => {
    setDeliveryDay(e.target.value)
    formik.setFieldValue('day', e.target.value)
    if (e.target.value === 'Сегодня') {
      timeArray = calculate({ endTime: moment().endOf('day') })
      initialTime = timeArray[0]
      formik.setFieldValue('specificTime', initialTime)
    }
    if (e.target.value === 'Завтра') {
      timeArray = calculate({
        startTime: moment().startOf('day'),
        endTime: moment().endOf('day'),
      })
      initialTime = timeArray[0]
      formik.setFieldValue('specificTime', initialTime)
    }
  }
  const handleDeliveryTime = e => {
    setDeliveryTime(e.target.value)
    formik.setFieldValue('time', e.target.value)
  }
  const handleSpecificTime = e => {
    if (deliveryTime === 'Ближайшее время') {
      formik.setFieldValue('specificTime', '')
    }
    if (deliveryTime === 'Определенное время') {
      formik.setFieldValue('specificTime', e.target.value)
    }
  }
  const handleChangePromocode = useDebouncedCallback(value => {
    dispatch(checkPromocode(value))
  }, 250)

  useEffect(() => {
    if (
      !cart.promoCodeIsValid &&
      !cart.promoCodeLoading &&
      formik.values.promocode.length > 0
    ) {
      formik.setFieldError('promocode', 'Промокод недействителен')
    }
  }, [formik.values.promocode, cart.promoCodeLoading])

  return (
    <section className="cart">
      <Grid className="cart__container" container>
        <Grid className="cart__column" item md={6} sm={8} xs={12}>
          <h2 className="cart__title">Оформление заказа</h2>
          <form onSubmit={formik.handleSubmit}>
            <FormControl className={classes.formControl}>
              <div className="select-container">
                {formik.values.delivery === 'Доставка' && (
                  <img src={deliveryIcon} alt="Доставка" />
                )}
                {formik.values.delivery === 'Самовывоз' && (
                  <img src={storeIcon} alt="Самовывоз" />
                )}
                <div>
                  <Select
                    value={formik.values.delivery}
                    name="delivery"
                    className={classes.select}
                    MenuProps={menuProps}
                    id="delivery"
                    onChange={handleWayToGet}>
                    <MenuItem value="Доставка">Доставка</MenuItem>
                    <MenuItem value="Самовывоз">
                      Самовывоз / скидка 15 %
                    </MenuItem>
                  </Select>
                </div>
              </div>
            </FormControl>

            <TextField
              label="Имя"
              name="name"
              className={classes.textInput}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />

            <TextField
              label="Телефон"
              margin="normal"
              className={classes.textInput}
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="phone"
              id="phone-input"
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              InputProps={{
                inputComponent: TextMaskCustom,
              }}
            />

            {formik.values.delivery === 'Доставка' && (
              <>
                <TextField
                  label="Адрес доставки"
                  name="address"
                  margin="normal"
                  className={classes.textInput}
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.address && Boolean(formik.errors.address)
                  }
                  helperText={formik.touched.address && formik.errors.address}
                />

                <Grid container spacing={1}>
                  <Grid item xs={3}>
                    <TextField
                      label="Кв/офис"
                      name="apartment"
                      value={formik.values.apartment}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.apartment &&
                        Boolean(formik.errors.apartment)
                      }
                      helperText={
                        formik.touched.apartment && formik.errors.apartment
                      }
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Домофон"
                      name="entranceCode"
                      value={formik.values.entranceCode}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Подъезд"
                      name="entrance"
                      value={formik.values.entrance}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Этаж"
                      name="floor"
                      value={formik.values.floor}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                </Grid>
              </>
            )}

            <TextField
              label="Комментарий"
              name="comment"
              helperText="Укажите дополнительную
              информацию или пожелания к заказу"
              margin="normal"
              className={classes.textInput}
              value={formik.values.comment}
              onChange={formik.handleChange}
            />

            <TextField
              label="Промокод"
              id="promocode"
              name="promocode"
              margin="normal"
              className={classes.textInput}
              value={formik.values.promocode}
              onChange={e => {
                formik.handleChange(e)
                handleChangePromocode(e.target.value)
              }}
              error={!cart.promoCodeIsValid && Boolean(formik.errors.promocode)}
              helperText={!cart.promoCodeIsValid && formik.errors.promocode}
            />

            <FormControl className={classes.formControl}>
              <div className="select-container">
                {formik.values.time === 'Ближайшее время' && (
                  <img src={timeIcon} alt="Ближайшее время" />
                )}
                {formik.values.time === 'Определенное время' && (
                  <img src={specificTimeIcon} alt="Определенное время" />
                )}
                <div>
                  <InputLabel id="label-time" htmlFor="select-time" />
                  <Select
                    className={classes.select}
                    labelId="label-time"
                    name="time"
                    id="select-time"
                    MenuProps={menuProps}
                    value={formik.values.time}
                    onChange={handleDeliveryTime}>
                    <MenuItem value="Ближайшее время">
                      Заказ на ближайшее время
                    </MenuItem>
                    <MenuItem value="Определенное время">
                      Заказ на определенное время
                    </MenuItem>
                  </Select>
                </div>
              </div>
            </FormControl>

            {formik.values.time === 'Определенное время' && (
              <div className="delivery-time">
                <p className="delivery-time__info">
                  Укажите желаемое время самовывоза{' '}
                  <b>в вашем часовом поясе (Asia/Krasnoyarsk)</b>
                </p>
                <Grid container spacing={2} alignItems="flex-start">
                  <Grid item xs={5}>
                    <div className="delivery-time__buttons">
                      <Button
                        value="Сегодня"
                        className={classNames('button', {
                          active: deliveryDay === 'Сегодня',
                        })}
                        onClick={handleDeliveryDay}>
                        Сегодня
                      </Button>
                      <Button
                        value="Завтра"
                        className={classNames({
                          active: deliveryDay === 'Завтра',
                        })}
                        onClick={handleDeliveryDay}>
                        Завтра
                      </Button>
                    </div>
                  </Grid>
                  <Grid item xs={7}>
                    <FormControl className={classes.formTimeControl}>
                      <Select
                        className={classes.select}
                        labelId="label-specific-time"
                        name="specificTime"
                        id="select-specific-time"
                        MenuProps={menuProps}
                        value={formik.values.specificTime}
                        onChange={handleSpecificTime}>
                        {timeArray.map(time => (
                          <MenuItem key={time} value={time}>
                            {time}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </div>
            )}

            <FormControl className={classes.formControl}>
              <div className="select-container">
                {formik.values.payment === 'Наличными при получении' && (
                  <img src={moneyIcon} alt="Оплата наличными при получении" />
                )}
                {formik.values.payment === 'Картой при получении' && (
                  <img src={creditCardIcon} alt="Оплата картой при получении" />
                )}
                <div>
                  <Select
                    className={classes.select}
                    id="select-payment"
                    name="payment"
                    MenuProps={menuProps}
                    value={formik.values.payment}
                    onChange={formik.handleChange}>
                    <MenuItem value="Наличными при получении">
                      Оплата наличными при получении
                    </MenuItem>
                    <MenuItem value="Картой при получении">
                      Оплата картой при получении
                    </MenuItem>
                  </Select>
                </div>
              </div>
            </FormControl>

            <Grid item xs={12}>
              <div className="cart__prompt">
                <p>
                  Ознакомьтесь с{' '}
                  <Modal
                    btnText="информацией о доставке"
                    btnStyle={{
                      display: 'inline-block',
                      padding: '0px',
                      fontSize: '14px',
                    }}>
                    <DeliveryInfo />
                  </Modal>{' '}
                  перед совершением заказа
                </p>
              </div>
            </Grid>

            <Grid container justifyContent="center">
              <Button
                type="submit"
                className="cart__submit"
                style={{
                  padding: '0.8em 2em',
                  color: 'white',
                  border: '1px solid #1e1e1e',
                  backgroundColor: '#1e1e1e',
                  borderRadius: '6px',
                }}
                hover={{
                  backgroundColor: 'white',
                  color: 'black',
                }}>
                Заказать
              </Button>
            </Grid>
          </form>
        </Grid>
        <Grid className="cart__column" item md={6} sm={8} xs={12}>
          <h2 className="cart__title">Ваш заказ</h2>
          <div className="order">
            <ul className="order__list">
              {Object.keys(cartItems).map(id => (
                <CartItem key={id} id={id} />
              ))}
            </ul>
            <p className="order__cost">
              Стоимость заказа: {totalPrice.toLocaleString('ru-RU')} ₽
            </p>
            <b className="order__payment">
              К оплате: {totalPriceWithDiscount.toLocaleString('ru-RU')} ₽
            </b>
          </div>
          <div className="cart__slider">
            <h2 className="cart__title">Рекомендуем к&nbsp;вашему заказу</h2>
            <CartSlider />
          </div>
        </Grid>
      </Grid>
    </section>
  )
}

CartOrder.propTypes = {
  cartItems: PropTypes.objectOf(PropTypes.object).isRequired,
  totalPrice: PropTypes.number.isRequired,
  totalPriceWithDiscount: PropTypes.number.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default CartOrder
