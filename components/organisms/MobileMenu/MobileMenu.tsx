import { Link } from "@components/atoms/Link";
import { Drawer } from "@components/molecules/Drawer";
import NavLinks from "@data/NavLinks";
import { forwardRef } from "react";

export type MobileMenuProps = {
  hidden?: boolean;
  onClose?: () => void;
};

export const MobileMenu = forwardRef<HTMLDivElement, MobileMenuProps>(
  ({ ...props }, ref) => (
    <Drawer ref={ref} position="LEFT" title="Menu" {...props}>
      <div className="py-2">
        <span className="px-4 text-lg font-bold">Navigation</span>
        <ul>
          {NavLinks.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                className="block px-4 py-2 text-sm font-medium hover:bg-neutral-200"
                onClick={props.onClose}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Drawer>
  )
);

MobileMenu.displayName = "MobileMenu";
