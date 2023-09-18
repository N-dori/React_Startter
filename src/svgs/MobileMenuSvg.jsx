import { MobileSvg } from "./MobileSvg";

export  function MobileMenuSvg({isActive,toggelMobileMenu}) {
  return (
<div className={isActive?"mobile-menu-svg active":"mobile-menu-svg " } onClick={toggelMobileMenu}>
<span></span>
</div>
  )
}
