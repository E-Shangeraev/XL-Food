import Modal from '../Modal/Modal'
import './Footer.scss'
import iconVK from '../../assets/img/iconVK.svg'
import iconInstagram from '../../assets/img/iconInstagram.svg'
import gangLogo from '../../assets/img/gang-logo.svg'

const Footer = () => (
  <footer className="footer">
    <div className="footer__container">
      <div>
        <a className="footer__phone" href="tel:+7 (391) 263-01-77">
          +7 (391) 263-01-77
        </a>
        <ul className="footer__socials">
          <li>
            <a href="https://vk.com/xlfood" target="_blank" rel="noreferrer">
              <img src={iconVK} alt="Группа ВКонтакте" />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/xl_food"
              target="_blank"
              rel="noreferrer">
              <img src={iconInstagram} alt="Instagram" />
            </a>
          </li>
        </ul>
      </div>

      <Modal btnText="Политика конфиденциальности">
        <div className="modal__body">
          <h3 className="modal__title">Политика конфиденциальности</h3>
          <p className="modal__text">Здесь пока пусто</p>
        </div>
      </Modal>

      <p className="footer__made-by">
        <span>Разработано компанией </span>{' '}
        <a href="http://mygang.ru" target="_blank" rel="noreferrer">
          <img src={gangLogo} alt="Gang Digital Agency" />
        </a>
      </p>
    </div>
  </footer>
)

export default Footer
