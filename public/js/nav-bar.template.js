let navBarTemplate = `<div class="logo">
        <h1 button class="dropbtn">MUNCHIES</h1>
        <i class="material-icons" id="icon">menu</i>
      </div>
      <ul class="nav-items">
        <li class="nav-item">
          <a class="nav-link" href="/">ABOUT</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="./menu">MENU</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/special-events">SPECIAL EVENTS</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/reserve">RESERVATION</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/catering">CATERING</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/cart">CART</a>
        </li>
      </ul>`;

let footerTemplate = `<div class="address-wrapper">
        <div class="footer-logo">
          <h1>MUNCHIES</h1>
        </div>
        <div class="location-wrapper">
          <h2>LOCATION</h2>
          <div class="location-details">
            <p>111 Sample Street</p>
            <p>Philadelphia, PA 19111</p>
            <p>215.123.1234</p>
            <p>munchies@gmail.com</p>
          </div>
          <ul class="social-media-items">
            <li class="social-media-item">
              <a class="social-media-link" href="#"
                ><i class="fab fa-facebook-f"></i
              ></a>
            </li>
            <li class="social-media-item">
              <a class="social-media-link" href="#"
                ><i class="fab fa-instagram"></i
              ></a>
            </li>
            <li class="social-media-item">
              <a class="social-media-link" href="#"
                ><i class="fab fa-twitter"></i
              ></a>
            </li>
          </ul>
        </div>
        <div class="hoursOfOperation">
          <h2 id="hours">HOURS</h2>
          <table>
            <tbody>
              <tr>
                <td style="text-align: left">Tuesday-Thursday</td>
                <td style="text-align: right">9am</td>
                <td style="text-align: right">-</td>
                <td style="text-align: right">10pm</td>
              </tr>
              <tr>
                <td style="text-align: left">Friday</td>
                <td style="text-align: right">9am</td>
                <td style="text-align: right">-</td>
                <td style="text-align: right">12pm</td>
              </tr>
              <tr>
                <td style="text-align: left">Saturday</td>
                <td style="text-align: right">10am</td>
                <td style="text-align: right">-</td>
                <td style="text-align: right">12pm</td>
              </tr>
              <tr>
                <td style="text-align: left">Sunday</td>
                <td style="text-align: right">10am</td>
                <td style="text-align: right">-</td>
                <td style="text-align: right">9pm</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="sign-up-wrapper">
          <h2>KEEP IN TOUCH</h2>
          <form action="">
            <label for=""
              >Enter email and sign up for promotions and other discounts</label
            >
            <br />
            <input type="text" class="form-input" placeholder="Enter email" />
            <br />
            <button class="sign-up-btn">Sign Up</button>
          </form>
        </div>
      </div>
      <hr />
      <ul class="credits">
        <li class="credit-item"><a class="credit-link" href="">Nicholas</a></li>
        <li class="credit-item">
          <a 
            class="credit-link" 
            href="https://rebeacca.github.io/finalProfile/"
            target="_blank"
          >
            Rebeacca
          </a>
        </li>
        <li class="credit-item">
          <a
            class="credit-link"
            href="https://minkyaw.herokuapp.com/"
            target="_blank"
          >
            Min
          </a>
        </li>
      </ul>`;
document.querySelector(".nav-bar").innerHTML = navBarTemplate;
document.querySelector(".footer-container").innerHTML = footerTemplate;
