import { Link } from "react-router-dom"
import tommyBig from "../assets/tommyBig.webp"
import desktopLogo from "../assets/desktopLogo.svg"
import { RiTwitterXLine } from "react-icons/ri";
import { FaFacebookF, FaInstagram, FaPinterest, FaYoutube } from "react-icons/fa";
import AccordionSection from "./Homepage/AccordionSection";

function Footer() {
  return (
    <footer>
      <div>
        <div>
          <img src={tommyBig} alt="Hilfiger Club Logo" />
          <div>
            <input type="text" />
            <button></button>
            <input type="checkbox" id="joinNow" />
            <label htmlFor="joinNow">
              By clicking the Join Now button, I agree to the Terms and Conditions and to receive updates on the latest products and promotions via email or other channels. See Privacy Policy, which includes our Notice of Financial Incentive, for more information.
            </label>
          </div>
        </div>
        <div id="accordionSection">
          <AccordionSection />
        </div>
      </div>
      <div>
        <div>
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
        <div>
          <img src={desktopLogo} alt="tommy logo" />
          <div>
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