import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Grid from '@material-ui/core/Grid'
import { Divider } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import deliveryIcon from '../../assets/img/delivery-icon.svg'

const useStyles = makeStyles(theme => ({
  cartContainer: {},
  cartColumn: {
    width: '50%',

    // '&:first-child': {
    //   paddingRight: '60px',
    //   borderRight: '1px solid rgba(0,0,0,.1)',
    // },
    // '&:last-child': {
    //   paddingLeft: '60px',
    // },
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
    margin: theme.spacing(1),
    marginRight: 0,
    marginLeft: 0,
    minWidth: 120,
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

const CartOrder = () => {
  const classes = useStyles()
  const [age, setAge] = React.useState(1)

  const handleChange = event => {
    setAge(event.target.value)
  }

  return (
    <section className="cart">
      <Grid className="cart__container" container spacing={10}>
        <Grid className={classes.cartColumn}>
          <h2 className="cart__title">Оформление заказа</h2>
          <FormControl className={classes.formControl}>
            <Grid container spacing={1}>
              <Grid container alignItems="center">
                <Grid item xs={1}>
                  <img src={deliveryIcon} alt="Доставка" />
                </Grid>
                <Grid item xs={11}>
                  <Select
                    value={age}
                    className={classes.select}
                    onChange={handleChange}>
                    <MenuItem value={1}>Доставка</MenuItem>
                    <MenuItem value={2}>Самовывоз / скидка 10 %</MenuItem>
                  </Select>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <TextField label="Имя" className={classes.textInput} />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Телефон"
                  margin="normal"
                  className={classes.textInput}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Адрес доставки"
                  margin="normal"
                  className={classes.textInput}
                />
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <TextField label="Кв/офис" />
                </Grid>
                <Grid item xs={3}>
                  <TextField label="Домофон" />
                </Grid>
                <Grid item xs={3}>
                  <TextField label="Подъезд" />
                </Grid>
                <Grid item xs={3}>
                  <TextField label="Этаж" />
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Комментарий"
                  helperText="Укажите дополнительную
              информацию или пожелания к заказу"
                  margin="normal"
                  className={classes.textInput}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Промокод"
                  margin="normal"
                  className={classes.textInput}
                />
              </Grid>
            </Grid>
          </FormControl>
        </Grid>
        <Divider className={classes.divider} vertical />
        <Grid className={classes.cartColumn} item xs>
          1
        </Grid>
      </Grid>
    </section>
  )
}

export default CartOrder
