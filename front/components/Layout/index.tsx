import React, { ReactNode } from "react";
import Head from "next/head";
import Header from "../Header";
import { HEADER_ITEMS } from "../Header/constants";
import { AuthProvider } from "../../contexts/Auth";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <AuthProvider>
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header items={HEADER_ITEMS} />
      {children}
      <footer>
        <hr />
        <span>I'm here to stay (Footer)</span>
      </footer>
    </div>
  </AuthProvider>
);

export default Layout;
