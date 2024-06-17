import "../css/contact.css";
import arrow from "../resources/contact_page/arrow_icon.png";
import right_img from "../resources/contact_page/right_img.png";

export const ContactPage = () => {
  return (
    <div className="contact-container jumbotron centered">
      <div className="containerOnHome">
        <form action="https://api.web3forms.com/submit" method="POST" className="contact-left">
          <div className="contact-left-title">
            <h2>Contactați-ne!</h2>
            <hr />
          </div>
          <input type="hidden" name="access_key" value="a112292d-57a1-44ea-95a2-fbe5c325ef20" />
          <input type="text" name="name" placeholder="Numele Dumneavoastră" className="contact-inputs" required />
          <input type="text" name="email" placeholder="Emailul Dumneavoastră" className="contact-inputs" required />
          <textarea name="message" placeholder="Mesajul Dumneavoastră" className="contact-inputs" required></textarea>
          <button type="submit" className="contact-btn">Trimiteți <img src={arrow} alt="arrow image" /></button>
        </form>
      </div>

      <div className="contact-right">
        <img src={right_img} alt="imagine formular" />
        <div className="contact-container-bot">
          <form action="/main" method="get">
            <button id="contact-back-btn" ><img src={arrow} alt="arrow image" /> Înapoi</button>
          </form>
        </div>
      </div>
    </div>
  );
};