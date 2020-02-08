import React, { useEffect, useState } from 'react';
import Link from 'next/link';

function Home() {
  return (
    <>
      <header className="flex justify-between p-6">
        <div>FeedYak</div>
        <div>
          <Link href="/app">
            <a>Sign In</a>
          </Link>
          <Link href="/signup">
            <a>Try it out now!</a>
          </Link>
        </div>
      </header>
    </>
  );
}

export default Home;
