import { Link } from "react-router-dom"
import tommyBig from "../../assets/tommyBig.webp"
import tommyLittle from "../../assets/tommyLittle.webp"
import desktopLogo from "../../assets/desktoplogo.svg"
import footerHilfigerLogo from "../../assets/footerHilfigerLogo.svg"
import { RiTwitterXLine } from "react-icons/ri";
import { FaFacebookF, FaInstagram, FaPinterest, FaYoutube } from "react-icons/fa";
import AccordionSection from "../Homepage/AccordionSection";

import "./footer.css"

function Footer() {
  return (
    <footer>
      <div>
        <div id="footerTop">
          <div id="imgJoinWrapper">
            <div id="imgJoin" className="d-flex align-items-start justify-content-center">
              <img src={footerHilfigerLogo} alt="tommy logo" />
              <div id="joinContent" className="d-flex align-items-start position-relative mb-5">
                <h4>JOIN</h4>
                <picture>
                  <source srcSet={tommyLittle} media="(max-width: 767px)" />
                  <source srcSet={tommyBig} media="(min-width: 768px)" />
                  <img src={tommyLittle} alt="join club img" />
                </picture>
                <p>Treat yourself to first dibs on sitewide holiday savings and exclusive offers when you join The Hilfiger Club.</p>
              </div>
            </div>
            <p>Treat yourself to first dibs on sitewide holiday savings and exclusive offers when you join The Hilfiger Club.</p>
          </div>
          <div id="joinInputSubmit">
            <div id="inputSection">
              <input type="email" placeholder="Your Email" />
              <button>Join Now</button>
            </div>
            <div className="d-flex align-items-start gap-2 checkboxField">
              <input type="checkbox" id="agreeCheckbox" />
              <label htmlFor="agreeCheckbox">
                By clicking the Join Now button, I agree to the Terms and Conditions and to receive updates on the latest products and promotions via email or other channels. See Privacy Policy, which includes our Notice of Financial Incentive, for more information.
              </label>
            </div>
          </div>
        </div>
        <div id="accordionSection">
          <AccordionSection />
        </div>
      </div>
      <div>
        <div id="footLinks" className="footLinksMobile">
          <RiTwitterXLine />
          <FaFacebookF />
          <FaInstagram />
          <FaPinterest />
          <FaYoutube />
        </div>
        <div id="desktopFooterList" className="pe-5">
          <div>
            <Link>Help & Support</Link>
            <Link>Customer Service</Link>
            <Link>Order Status</Link>
            <Link>Shipping</Link>
            <Link>Klarna</Link>
            <Link>Promotions & Discounts</Link>
            <Link>Group Discounts</Link>
            <Link>E-Gift Cards</Link>
            <Link>Store Directory</Link>
          </div>
          <div>
            <Link>About Tommy Hilfiger</Link>
            <Link>Tommy Stories</Link>
            <Link>People's Place Program</Link>
            <Link>Sustainability</Link>
            <Link>Press</Link>
            <Link>Black Friday</Link>
          </div>
          <div>
            <Link>Join Us</Link>
            <Link>The Hilfiger Club</Link>
            <Link>Careers</Link>
            <Link>Affiliate Program</Link>
          </div>
          <div>
            <Link>Contact Us</Link>
            <Link>Store Locator</Link>
            <Link>Chat</Link>
            <div id="footLinks">
              <RiTwitterXLine />
              <FaFacebookF />
              <FaInstagram />
              <FaPinterest />
              <FaYoutube />
            </div>
          </div>
        </div>
        <div id="bottomLinks">
          <img src={desktopLogo} alt="tommy logo" />
          <div className="d-flex flex-wrap">
            <Link>Terms & Conditions</Link>
            <Link>Privacy Policy</Link>
            <Link>Privacy Commitment</Link>
            <Link>Interest Based Ads</Link>
            <Link>Do Not Sell or Share My Personal Information</Link>
            <Link>PVH Corp. Joint Modern Slavery Act Statement</Link>
            <Link>Brand Protection</Link>
            <Link>Accessibility</Link>
          </div>
        </div>
        <p>Web ID: 463934703</p>
        <p>{new Date().getFullYear()} Tommy Hilfiger licensing, LLC. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer