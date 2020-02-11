import React, { useEffect, useState } from 'react';
import Link from 'next/link';

function Home() {
  return (
    <>
      <header className="p-6 border-b border-gray-300">
        <div className="flex justify-between container mx-auto">
          <div>FeedYak</div>
          <div>
            <Link href="/app">
              <a className="mr-4 border border-blue-600 p-2 rounded">Sign In</a>
            </Link>
            <Link href="/signup">
              <a className="border border-blue-600 p-2 rounded">
                Try it out now!
              </a>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}

export default Home;
