"use client";

import React from 'react';

const CLIENT_ID = 'lab_lbk';
const REDIRECT_URI = 'http://localhost:3000/mls/callback';
const AUTH_URL = `https://sparkplatform.com/openid/authorize?client_id=${encodeURIComponent(CLIENT_ID)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=openid`;

export default function MlsListingsPage() {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4 text-center">
      <h1 className="text-2xl font-bold mb-6">MLS Listings</h1>
      <p className="mb-8">To view MLS listings, connect your Spark MLS account.</p>
      <a
        href={AUTH_URL}
        className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
      >
        Connect to Spark MLS
      </a>
    </div>
  );
} 