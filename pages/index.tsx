import React from "react";
// import ReactDOM from "react-dom"
import Link from "next/link";
import Layout from "../components/Layout";
import Header from "../components/Header";

const IndexPage = () => (
  <Layout title="Home | Trivia App">
    <Link href="/about">
      <a>Quiz</a>
    </Link>

  </Layout>
);

export default IndexPage;
