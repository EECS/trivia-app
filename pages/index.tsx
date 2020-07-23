import React from "react";
import Link from "next/link";
import Layout from "../components/Layout/Layout";

const IndexPage = () => (
  <Layout title="Home | Trivia App">
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/about">
        <a>Quiz</a>
      </Link>
    </p>
  </Layout>
);

export default IndexPage;
