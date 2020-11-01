import React from "react";
// import ReactDOM from "react-dom"
import Layout from "../components/Layout";
import { SignUp } from "../components/SignUp/SignUp";

const SignUpPage = () => (
  <Layout title="Sign Up | Trivia App">
      <div>
          <SignUp />
      </div>
  </Layout>
);

export default SignUpPage;
