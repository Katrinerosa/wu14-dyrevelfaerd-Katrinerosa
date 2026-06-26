export const API_BASE_URL = "http://localhost:4000";

export type Asset = {
  url?: string;
};

export type ContentSection = {
  id: number | string;
  title: string;
  content: string;
  asset?: Asset;
};

export type Animal = {
  id: number | string;
  name: string;
  description: string;
  age?: number | string;
  gender?: string;
  race?: string;
  species?: string;
  assetId?: number | string;
  asset?: Asset;
};

export async function getApiData<T>(path: string): Promise<T[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/${path}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function getApiItem<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/${path}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch {
    return null;
  }
}

export function getAssetUrl(url?: string) {
  if (!url) {
    return undefined;
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `${API_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}
