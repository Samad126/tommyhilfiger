import React, { useEffect, useState } from "react";
import "./CheckoutPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { updateCartCount } from "../../redux/productsSlice";

function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [stateVal, setStateVal] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [receiveUpdates, setReceiveUpdates] = useState(true);
  const [errors, setErrors] = useState({});
  const [showShippingMethod, setShowShippingMethod] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedItems);
  }, []);

  const subtotal = cartItems.reduce(
    (acc, curr) => acc + curr.price * curr.count * (1 - curr.discount / 100),
    0
  );
  const totalItems = cartItems.reduce((acc, curr) => acc + curr.count, 0);

  let extraDiscount = 0;
  if (subtotal >= 250) {
    extraDiscount = 0.40;
  } else if (subtotal >= 150) {
    extraDiscount = 0.30;
  } else if (subtotal >= 125) {
    extraDiscount = 0.15;
  }

  const discountAmount = subtotal * extraDiscount;
  const shipping = 0;
  const tax = 0;
  const estimatedTotal = subtotal - discountAmount + shipping + tax;
  const finalTotal = appliedPromo ? estimatedTotal - 5 : estimatedTotal;

  const handleApplyPromo = () => {
    if (promoCode.trim() !== "") {
      setAppliedPromo(true);
    } else {
      setAppliedPromo(false);
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "Please enter a first name.";
    if (!lastName.trim()) newErrors.lastName = "Please enter a last name.";
    if (!address.trim()) newErrors.address = "Please enter an address.";
    if (!city.trim()) newErrors.city = "Please enter a city.";
    if (!stateVal.trim()) newErrors.state = "Please select a state.";
    if (!zipCode.trim()) newErrors.zip = "Please enter a zip code.";
    if (!email.trim()) newErrors.email = "Please enter an email.";
    if (!phoneNumber.trim()) newErrors.phone = "Please enter a phone number.";
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (/p(\.|)?o(\.|)? box/i.test(address)) {
      newErrors.address = "Sorry, we cannot ship to P.O. Boxes at this time.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveAddress = () => {
    if (validateForm()) {
      setShowShippingMethod(true);
    }
  };

  const getInputClass = (field) => {
    return errors[field] ? "my-input my-input-error" : "my-input";
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    dispatch(updateCartCount());
  };

  return (
    <>
      <Helmet>
        <title>Checkout | Tommy Hilfiger USA</title>
      </Helmet>
      <div className="container my-4">
        <h3 className="guestTitle">Checkout As Guest <span className="orSignIn">or <a href="#">sign in</a> for faster checkout</span></h3>
        <div className="row">
          <div className="col-12 col-lg-8 mb-4 mb-lg-0">
            <h2 className="sectionTitle">Shipping To</h2>
            <p className="smallText text-muted">Sorry, we cannot ship to P.O. Boxes at this time.</p>
            <div className="row mb-3">
              <div className="col-12 col-sm-6 mb-3 mb-sm-0">
                <label>First Name*</label>
                <input
                  className={getInputClass("firstName")}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                />
                {errors.firstName && <div className="input-error-msg">{errors.firstName}</div>}
              </div>
              <div className="col-12 col-sm-6">
                <label>Last Name*</label>
                <input
                  className={getInputClass("lastName")}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                />
                {errors.lastName && <div className="input-error-msg">{errors.lastName}</div>}
              </div>
            </div>

            <div className="mb-3">
              <label>Address*</label>
              <input
                className={getInputClass("address")}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
              />
              {errors.address && <div className="input-error-msg">{errors.address}</div>}
            </div>

            <div className="mb-3">
              <label>Apartment, Suite, Etc (optional)</label>
              <input
                className="my-input"
                value={apartment}
                onChange={(e) => setApartment(e.target.value)}
                placeholder="Apartment, Suite, Etc"
              />
            </div>

            <div className="row mb-3">
              <div className="col-12 col-sm-6 mb-3 mb-sm-0">
                <label>City*</label>
                <input
                  className={getInputClass("city")}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                />
                {errors.city && <div className="input-error-msg">{errors.city}</div>}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-12 col-sm-6 mb-3 mb-sm-0">
                <label>State*</label>
                <select
                  className={getInputClass("state")}
                  value={stateVal}
                  onChange={(e) => setStateVal(e.target.value)}
                >
                  <option value="">Select State</option>
                  <option value="CA">California</option>
                  <option value="NY">New York</option>
                  <option value="TX">Texas</option>
                </select>
                {errors.state && <div className="input-error-msg">{errors.state}</div>}
              </div>
              <div className="col-12 col-sm-6">
                <label>Zip Code*</label>
                <input
                  className={getInputClass("zip")}
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="Zip Code"
                />
                {errors.zip && <div className="input-error-msg">{errors.zip}</div>}
              </div>
            </div>

            <h2 className="sectionTitle">Contact Information</h2>
            <div className="mb-3">
              <label>Email*</label>
              <input
                className={getInputClass("email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              {errors.email && <div className="input-error-msg">{errors.email}</div>}
            </div>
            <div className="mb-3">
              <label>Phone Number*</label>
              <input
                className={getInputClass("phone")}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone Number"
              />
              {errors.phone && <div className="input-error-msg">{errors.phone}</div>}
              <p className="smallText text-muted mt-1">Phone number helps ensure package delivery.</p>
            </div>

            <div className="form-check mb-3">
              <input
                type="checkbox"
                checked={receiveUpdates}
                onChange={(e) => setReceiveUpdates(e.target.checked)}
                id="updatesCheck"
              />
              <label className="smallText" htmlFor="updatesCheck">
                I would like to receive updates on the latest products and promotions via email or other channels. See <a href="#">Privacy Policy</a>, which includes our Notice of Financial Incentive and the <a href="#">Terms and Conditions</a>, for more information.
              </label>
            </div>

            <button className="btn btn-success w-100 mb-2" onClick={handleSaveAddress}>
              Save To See Shipping Options
            </button>
            <p className="smallText">By submitting my information I agree to the <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a>.</p>

            <h2 className="sectionTitle mt-4">Shipping Method</h2>
            {!showShippingMethod ? (
              <p className="smallText">Please save address above to see available shipping options.</p>
            ) : (
              <div className="mb-4">
                <p className="smallText">Orders placed by 1:00 PM ET Monday-Friday usually process the same day. Shipping price may update once the address is entered.</p>
                <button className="btn btn-light w-100 disabledBtn" disabled>
                  Continue To Payment
                </button>
              </div>
            )}
          </div>

          <div className="col-12 col-lg-4">
            <div className="p-3 orderSummaryWrapper">
              <h2 className="h5 mb-3 orderSummaryTitle">Order Summary</h2>
              <div className="d-flex justify-content-between mb-2 summaryText">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {extraDiscount > 0 && (
                <div className="mb-2 smallText" style={{ color: "#00174f" }}>
                  Extra {extraDiscount * 100}% Off {extraDiscount === 0.40 ? "$250+" : extraDiscount === 0.30 ? "$150+" : "$125+"}
                </div>
              )}
              {extraDiscount > 0 && (
                <div className="d-flex justify-content-between mb-2 summaryText">
                  <span>Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="d-flex justify-content-between mb-2 summaryText">
                <span>Standard Shipping</span>
                <span>FREE</span>
              </div>
              <div className="d-flex justify-content-between mb-2 summaryText">
                <span>Tax</span>
                <span>$0.00</span>
              </div>

              <div className="accordion mb-3" id="promoAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="promoHeading">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#promoCollapse" aria-expanded="false" aria-controls="promoCollapse">
                      Promo Code
                    </button>
                  </h2>
                  <div id="promoCollapse" className="accordion-collapse collapse" aria-labelledby="promoHeading" data-bs-parent="#promoAccordion">
                    <div className="accordion-body p-2">
                      <div className="d-flex gap-2 mb-2">
                        <input
                          type="text"
                          className="my-input"
                          placeholder="Enter Your Promo Code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                        />
                        <button
                          className="btn btn-outline-primary promoApplyBtn"
                          onClick={handleApplyPromo}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between mb-3 summaryText">
                <span>Estimated Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>

              {appliedPromo && <p className="smallText text-success">Promo Applied: -$5.00</p>}

              <p className="mb-3 smallText">
                4 interest-free payments of ${(finalTotal / 4).toFixed(2)} with Klarna. <a href="#" className="text-decoration-underline">Learn More</a><br />
                or 4 interest-free payments of ${(finalTotal / 4).toFixed(2)} with afterpay &rarr;
              </p>
            </div>

            <h2 className="h6 mt-4 bagTitle">In Your Shopping Bag <Link to={'/cart'} href="#" className="text-decoration-underline smallText">Edit</Link></h2>
            {cartItems.map((item, index) => {
              const itemSubtotal = item.price * (1 - item.discount / 100) * item.count;
              return (
                <div key={index} className="d-flex justify-content-between align-items-start py-3 border-bottom smallCartItem">
                  <img src={item.images[0]} alt={item.name} className="img-fluid cartItemThumb me-2" />
                  <div className="flex-grow-1">
                    <p className="mb-1 smallText" style={{ fontWeight: "bold" }}>{item.name}</p>
                    <p className="mb-1 smallText">{item.Colors[0]} | {item.Size[0]}</p>
                    <p className="mb-1 smallText">
                      Qty: {item.count}<br />
                      <s>${(item.price * item.count).toFixed(2)}</s> <strong>${itemSubtotal.toFixed(2)}</strong>
                    </p>
                  </div>
                  <a href="#" className="text-decoration-underline smallText" onClick={() => handleRemoveItem(item.id)}><IoClose /></a>
                </div>
              );
            })}

            <p className="smallText mt-3">Need help with your order?</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
