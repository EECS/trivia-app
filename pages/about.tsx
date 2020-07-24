import React from "react";
import Link from "next/link";
import Layout from "../components/Layout/Layout";
import App from "../components/Quiz"

const AboutPage = () => (
  <Layout title="Quiz | Trivia App">
    <h1>Quiz</h1>
    <p>This is the quiz page</p>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
    <App />
  </Layout>
);

export default AboutPage;
