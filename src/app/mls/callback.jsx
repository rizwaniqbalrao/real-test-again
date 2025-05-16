"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const CLIENT_ID = process.env.NEXT_PUBLIC_SPARK_CLIENT_ID || 'lab_lbk';
const CLIENT_SECRET = process.env.NEXT_PUBLIC_SPARK_CLIENT_SECRET || 'c611edc190444c2ab90abce0b8703b83';
const REDIRECT_URI = 'http://localhost:3000/mls/callback';
const TOKEN_URL = "https://sparkplatform.com/openid_connect/token";

export default function MlsCallbackPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const [loading, setLoading] = useState(!!code);
  const [error, setError] = useState(null);
  const [tokens, setTokens] = useState(null);

  useEffect(() => {
    if (!code) return;
    const fetchToken = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: REDIRECT_URI,
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
        });
        const res = await axios.post(TOKEN_URL, params, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });
        setTokens(res.data);
      } catch (err) {
        setError(
          err.response?.data?.error_description || err.message || "Failed to fetch token."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchToken();
  }, [code]);

  return (
    <div className="max-w-xl mx-auto py-16 px-4 text-center">
      <h1 className="text-2xl font-bold mb-6">MLS Authentication Callback</h1>
      {loading && (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {!loading && !error && tokens && (
        <div className="text-left bg-gray-100 p-4 rounded">
          <div className="mb-2 font-semibold">Access Token:</div>
          <div className="break-all mb-4 text-xs">{tokens.access_token}</div>
          <div className="mb-2 font-semibold">Refresh Token:</div>
          <div className="break-all mb-4 text-xs">{tokens.refresh_token}</div>
          <div className="mb-2 font-semibold">ID Token:</div>
          <div className="break-all mb-4 text-xs">{tokens.id_token}</div>
          <div className="mb-2 font-semibold">Expires In:</div>
          <div>{tokens.expires_in} seconds</div>
        </div>
      )}
      {!code && <div className="text-gray-600">No code found in URL.</div>}
    </div>
  );
} 