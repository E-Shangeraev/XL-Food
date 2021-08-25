import Modal from '../Modal/Modal'
import Information from '../Information/Information'
import './Footer.scss'
import iconVK from '../../assets/img/iconVK.svg'
import iconInstagram from '../../assets/img/iconInstagram.svg'
import gangLogo from '../../assets/img/gang-logo.svg'

const Footer = () => (
  <footer className="footer">
    <div className="footer__container">
      <div>
        <a className="footer__phone" href="tel:+7-999-999-99-99">
          +7-999-999-99-99
        </a>
        <ul className="footer__socials">
          <li>
            <a href="/">
              <img src={iconVK} alt="Группа ВКонтакте" />
            </a>
          </li>
          <li>
            <a href="/">
              <img src={iconInstagram} alt="Instagram" />
            </a>
          </li>
        </ul>
      </div>

      <Modal btnText="Политика конфиденциальности" containerClass="info">
        <Information />
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
