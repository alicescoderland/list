import navbarStyles from "../Navbar/Navbar.module.css";

function Navbar() {
  return (
    <section className={navbarStyles.container}>
      <div className={navbarStyles.logo}>Music Shop</div>
    </section>
  );
}

export default Navbar;
