/* eslint-disable react/button-has-type */
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './Button.scss'

const Button = ({
  outlined,
  primary,
  secondary,
  type,
  disabled,
  children,
  onClick,
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={classNames('button', {
      'button--outlined': outlined,
      'button--primary': primary,
      'button--secondary': secondary,
    })}>
    {children}
  </button>
)

Button.propTypes = {
  outlined: PropTypes.bool,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func,
}

Button.defaultProps = {
  outlined: false,
  primary: false,
  secondary: false,
  type: 'button',
  disabled: false,
  children: null,
  onClick: () => {},
}

export default Button
