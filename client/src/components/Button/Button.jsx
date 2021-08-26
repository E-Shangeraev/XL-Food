/* eslint-disable react/button-has-type */
import { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './Button.scss'

const Button = ({
  type,
  hover,
  disabled,
  children,
  className,
  value,
  onClick,
  style,
}) => {
  const [mouseOver, setMouseOver] = useState(false)

  const onHover = () => setMouseOver(true)
  const onLeave = () => setMouseOver(false)

  return (
    <button
      type={type}
      onClick={onClick}
      style={mouseOver ? { ...style, ...hover } : { ...style }}
      onMouseOver={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      disabled={disabled}
      className={classNames('button', className)}
      value={value}>
      {children}
    </button>
  )
}

Button.propTypes = {
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.string),
  hover: PropTypes.objectOf(PropTypes.string),
  type: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node,
  onClick: PropTypes.func,
}

Button.defaultProps = {
  className: '',
  style: {},
  hover: null,
  type: 'button',
  disabled: false,
  value: null,
  children: null,
  onClick: () => {},
}

export default Button
