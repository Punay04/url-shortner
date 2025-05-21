"use client";
import React, { useState } from 'react';
import { Link, Copy, Check } from 'lucide-react';

const URLShorten = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [shortenedURL, setShortenedURL] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Add API call to shorten URL
    setLoading(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortenedURL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="ml-64 p-8 h-full bg-black animate-fadeIn">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-300 mb-4">
          URL Shortener
        </h1>
        <p className="text-gray-500 text-xl mb-12">Transform your long URLs into short, memorable links</p>

        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 
                    hover:border-green-500/50 transition-all duration-300 shadow-xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-green-500/10 rounded-xl text-green-500">
              <Link size={28} />
            </div>
            <div>
              <h2 className="text-gray-300 font-semibold text-2xl">Create Short URL</h2>
              <p className="text-gray-500">Enter your long URL below to generate a shortened version</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/your-long-url"
                className="w-full bg-black/50 border-2 border-gray-800 rounded-xl p-5 
                         text-gray-300 placeholder-gray-600 focus:outline-none 
                         focus:border-green-500/50 transition-all text-lg"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-black font-semibold py-5 px-6 
                     rounded-xl hover:bg-green-400 transition-all disabled:opacity-50
                     text-lg shadow-lg shadow-green-500/20 hover:shadow-green-500/30"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-t-2 border-black rounded-full animate-spin" />
                  <span>Shortening...</span>
                </div>
              ) : (
                'Generate Short URL'
              )}
            </button>
          </form>

          {shortenedURL && (
            <div className="mt-8 p-6 bg-green-500/5 border border-green-500/20 rounded-xl 
                          backdrop-blur-sm animate-fadeIn">
              <p className="text-gray-400 mb-3 text-sm uppercase tracking-wider font-medium">Your shortened URL</p>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={shortenedURL}
                  readOnly
                  className="flex-1 bg-black/70 border border-gray-800 rounded-xl p-4 
                           text-green-500 font-mono text-lg select-all"
                />
                <button
                  onClick={handleCopy}
                  className="px-6 py-4 bg-green-500/10 text-green-500 rounded-xl 
                           hover:bg-green-500/20 transition-all flex items-center gap-2
                           font-medium"
                >
                  {copied ? (
                    <>
                      <Check size={20} />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={20} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default URLShorten;