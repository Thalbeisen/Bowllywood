import logoHome from './../logos/home.svg';
import logoReservation from './../logos/reserv.svg';
import logoMenu from './../logos/menu.svg';
import logoStar from './../logos/stars.svg';

const Navbar = (props, {type='primary'}) => {

    return (
        <>
        <nav class="navbar navbar-success bg-success fixed-top">
        {/* <nav class={`navbar navbar-${type} bg-dark fixed-top`}> */}
        {/* <nav class={`navbar navbar-dark bg-${type} fixed-top}`> */}

  <div class="container-fluid">
    {/* <a class="navbar-brand" href="#">Test navbar</a> */}
    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="offcanvas offcanvas-start text-bg-success" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
      <div class="offcanvas-header">
        {/* <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">Dark offcanvas</h5> */}
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#"><img src={logoHome} alt="" /></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"><img src={logoReservation} alt="" /></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"><img src={logoMenu} alt="" /></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"><img src={logoStar} alt="" /></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>
        </>
    );
}

export default Navbar;


