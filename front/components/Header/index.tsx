import React from "react";
import Link from "next/link";
import { LinkItem } from "./styles";
import { AuthContext } from "../../contexts/Auth";

type HeaderItem = {
  label: string;
  href: string;
};

type Props = {
  items: HeaderItem[];
};

const Header = ({ items }: Props) => {
  return (
    <AuthContext.Consumer>
      {(auth) => {
        if (auth === null) {
          return Error("Auth context should not be null.");
        }

        return (
          <header>
            <nav>
              {items.map((item) => {
                if (
                  (item.label === "Sign Up" && !auth.user.isAuthenticated) ||
                  (item.label === "Login" && !auth.user.isAuthenticated) ||
                  (item.label !== "Sign Up" && item.label !== "Login")
                )
                  return (
                    <Link href={item.href} key={item.href}>
                      <LinkItem>{item.label}</LinkItem>
                    </Link>
                  );
              })}
            </nav>
          </header>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default Header;
