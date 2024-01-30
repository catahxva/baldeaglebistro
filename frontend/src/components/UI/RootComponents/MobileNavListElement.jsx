function MobileNavListElement({ closeMobileNav, children }) {
  return <li onClick={() => closeMobileNav(false)}>{children}</li>;
}

export default MobileNavListElement;
