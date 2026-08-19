[19/08, 9:02 am] MUMMY 💝: {
  "name": "creem-expo-sdk",
  "version": "1.0.0",
  "main": "src/index.ts",
  "dependencies": {
    "expo-web-browser": "~13.0.0"
  }
}
[19/08, 9:02 am] MUMMY 💝: import { useState } from 'react';
import * as WebBrowser from 'expo-web-browser';

export function useCreem(apiKey: string) {
  const [loading, setLoading] = useState(false);

  const checkout = async (productId: string, successUrl: string) => {
    setLoading(true);
    try {
      const response = await fetch('https://api.creem.io/v1/checkouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
        body: JSON.stringify({ product_id: productId, success_url: successUrl }),
      });
      const data = await response.json();
      await WebBrowser.openAuthSessionAsync(data.url, successUrl);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return { checkout, loading };
}
