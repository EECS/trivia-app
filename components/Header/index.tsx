import React from "react";
import Link from "next/link";
import { LinkItem } from './styles';

type HeaderItem = {
    label: string;
    href: string;
}

type Props = {
    items: Array<HeaderItem>
};

const Header = ({ items }: Props) => {
    return (
        <header>
            <nav>
                {items.map((item) => {
                    return (
                        <Link href={item.href}>
                            <LinkItem>{item.label}</LinkItem>
                        </Link>
                    )
                })}
            </nav>
        </header>
    )
};

export default Header;
