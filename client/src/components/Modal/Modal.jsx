import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactDom from 'react-dom'
import { Transition } from 'react-transition-group'
import PropTypes from 'prop-types'
import Button from '../Button/Button'
import './Modal.scss'

const Modal = React.memo(
  ({
    btnText,
    btnImage,
    btnStyle,
    children,
    containerClass,
    withButton,
    active,
  }) => {
    const modalRef = useRef()
    const [open, setOpen] = useState(active)

    const handleOutsideClick = useCallback(
      e => {
        const path = e.path || (e.composedPath && e.composedPath())
        if (path[0] === modalRef.current) {
          setOpen(false)
        }
      },
      [open],
    )

    const handleClose = () => setOpen(false)
    const handleOpen = () => setOpen(true)

    useEffect(() => {
      if (open) {
        document.addEventListener('click', handleOutsideClick)
        document.body.style.paddingRight = `${
          window.innerWidth - document.body.scrollWidth
        }px`
        document.body.style.overflow = 'hidden'
      } else {
        document.removeEventListener('click', handleOutsideClick)
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''
      }
    }, [open])

    useEffect(() => {
      setOpen(active)
    }, [active])

    return (
      <>
        {withButton && (
          <Button style={btnStyle} onClick={handleOpen}>
            {btnImage || btnText}
          </Button>
        )}
        {ReactDom.createPortal(
          <Transition
            nodeRef={modalRef}
            in={open}
            timeout={500}
            mountOnEnter
            unmountOnExit>
            {state => (
              <div className="modal" ref={modalRef}>
                <div
                  className={`modal__container ${
                    containerClass || 'modal__container--default'
                  } ${state}`}>
                  {children}
                  <Button
                    style={{
                      color: '#a7a7a7',
                      padding: '0.5em 1em',
                      border: '1px solid #a7a7a7',
                    }}
                    hover={{
                      color: 'black',
                      border: '1px solid black',
                    }}
                    onClick={handleClose}>
                    Закрыть
                  </Button>
                </div>
              </div>
            )}
          </Transition>,
          document.getElementById('portal'),
        )}
      </>
    )
  },
)

Modal.propTypes = {
  active: PropTypes.bool,
  withButton: PropTypes.bool,
  btnText: PropTypes.string,
  btnImage: PropTypes.node,
  btnStyle: PropTypes.objectOf(PropTypes.string),
  children: PropTypes.node,
  containerClass: PropTypes.string,
}

Modal.defaultProps = {
  active: false,
  withButton: true,
  btnText: 'Открыть',
  btnImage: null,
  btnStyle: {},
  children: null,
  containerClass: null,
}

export default Modal
