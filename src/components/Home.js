import React, { useEffect, useState } from 'react';
import Link from 'next/link';

function Home() {
  return (
    <>
      <Link href="/signin">
        <a>Sign In</a>
      </Link>
      <Link href="/signup">
        <a>Try it out now!</a>
      </Link>
    </>
  );
}

export default Home;
