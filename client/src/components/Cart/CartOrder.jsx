import React, { useState } from 'react'
import moment from 'moment-timezone'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import Grid from '@material-ui/core/Grid'
import { Divider } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import { useFormik } from 'formik'
import * as yup from 'yup'
import classNames from 'classnames'
import Button from '../Button/Button'
import Modal from '../Modal/Modal'
import Promotions from '../Modal/ModalBody/Promotions'
import deliveryIcon from '../../assets/img/delivery-icon.svg'
import clocksIcon from '../../assets/img/clocks-icon.svg'
import moneyIcon from '../../assets/img/money-icon.svg'

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

const validationSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Имя')
    .max(50, 'Имя')
    .typeError('Имя')
    .required('Введите имя'),
  phone: yup
    .string('Введите номер телефона')
    .matches(phoneRegExp, 'Проверьте корректность введенного номера')
    .required('Введите номер телефона'),
  address: yup
    .string('Введите адрес доставки')
    .required('Введите адрес доставки'),
  apartment: yup
    .number()
    .typeError('Введите кв/офис')
    .required('Введите кв/офис')
    .integer('Введите кв/офис'),
  // specificTime: yup.date(),
})

const useStyles = makeStyles(theme => ({
  cartContainer: {},
  cartColumn: {
    width: '50%',
  },
  root: {
    '&.Mui-focused fieldset': {
      borderColor: 'green',
    },
  },
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

const CartOrder = () => {
  const classes = useStyles()
  const [deliveryDay, setDeliveryDay] = useState('Сегодня')
  const [deliveryTime, setDeliveryTime] = useState('Ближайшее время')

  const formik = useFormik({
    initialValues: {
      delivery: 'Доставка',
      name: '',
      phone: '',
      address: '',
      apartment: '',
      entranceCode: '',
      entrance: '',
      floor: '',
      comment: '',
      promocode: '',
      day: 'Сегодня',
      time: 'Ближайшее время',
      specificTime: initialTime,
      payment: 'Наличными при получении',
    },
    validationSchema,
    onSubmit: values => {
      console.log(JSON.stringify(values, null, 2))
    },
  })

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

  return (
    <section className="cart">
      <Grid className="cart__container" container spacing={10}>
        <Grid className={classes.cartColumn}>
          <h2 className="cart__title">Оформление заказа</h2>
          <form onSubmit={formik.handleSubmit}>
            <FormControl className={classes.formControl}>
              <Grid container alignItems="flex-end">
                <Grid item xs={1}>
                  <img src={deliveryIcon} alt="Доставка" />
                </Grid>
                <Grid item xs={11}>
                  <Select
                    value={formik.values.delivery}
                    name="delivery"
                    className={classes.select}
                    MenuProps={menuProps}
                    id="delivery"
                    onChange={formik.handleChange}>
                    <MenuItem value="Доставка">Доставка</MenuItem>
                    <MenuItem value="Самовывоз">
                      Самовывоз / скидка 10 %
                    </MenuItem>
                  </Select>
                </Grid>
              </Grid>
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
              name="phone"
              margin="normal"
              className={classes.textInput}
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
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

                <Grid container spacing={2}>
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
              name="promocode"
              margin="normal"
              className={classes.textInput}
              value={formik.values.promocode}
              onChange={formik.handleChange}
            />

            <FormControl className={classes.formControl}>
              <Grid container alignItems="flex-end">
                <Grid item xs={1}>
                  <img src={clocksIcon} alt="Заказ" />
                </Grid>
                <Grid item xs={11}>
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
                </Grid>
              </Grid>
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
              <Grid container alignItems="center">
                <Grid item xs={1}>
                  {formik.values.payment === 'Наличными при получении' && (
                    <img src={moneyIcon} alt="Оплата наличными при получении" />
                  )}
                  {formik.values.payment === 'Картой при получении' && (
                    <img src={clocksIcon} alt="Оплата картой при получении" />
                  )}
                </Grid>
                <Grid item xs={11}>
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
                </Grid>
              </Grid>
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
                    <Promotions />
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
        <Divider orientation="vertical" flexItem />
        <Grid className={classes.cartColumn} item xs>
          1
        </Grid>
      </Grid>
    </section>
  )
}

export default CartOrder
