import { useState } from 'react';

function BasicInfoSignUpForm() {
  return (
    <form>
      <label>
        <span>Name</span>
        <input type="text" />
      </label>
      <label>
        <span>Email</span>
        <input type="text" />
      </label>
      <button type="submit">Next</button>
    </form>
  );
}

function PasswordSignUpForm() {
  return (
    <form>
      <label>
        <span>Password</span>
        <input type="text" />
      </label>
    </form>
  );
}

function SignUp() {
  return (
    <>
      <BasicInfoSignUpForm />
      <PasswordSignUpForm />
    </>
  );
}

export default SignUp;
