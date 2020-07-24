import React from "react";
// import ReactDOM from "react-dom"
import Link from "next/link";
import Header from "../components/Header";

// @TODO define prop types
type Props = {
    // items: array;
};

const Header = ({ items }) => {
  const foo = 'bar';
    return (
        <nav>
            {items.map((item) => {
                return (
                    <Link href={item.href}>
                        <a>{item.label}</a>
                    </Link>
                )
            })}
        </nav>
    )
};

export default Header;
