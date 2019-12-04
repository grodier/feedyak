import { useState } from 'react';

function EmailSignInForm() {
  return (
    <form>
      <label>
        <span>Email</span>
        <input type="text" />
      </label>
      <button type="submit">Next</button>
    </form>
  );
}

function PasswordSignInForm() {
  return (
    <form>
      <label>
        <span>Password</span>
        <input type="text" />
      </label>
    </form>
  );
}

function SignIn() {
  return (
    <>
      <EmailSignInForm />
      <PasswordSignInForm />
    </>
  );
}

export default SignIn;
