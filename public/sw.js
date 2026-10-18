const CACHE_NAME = "hamare-nuskhe-v3";
const ASSETS_TO_PRECACHE = [
  "/",
  "/states",
  "/plants",
  "/saved",
  "/about",
  "/data/remedies.json",
  "/data/botanical-names.json",
  "/favicon.ico"
];

// Install event: Pre-cache core app shell
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_PRECACHE).catch((err) => {
        console.warn("[SW] Some assets failed to precache:", err);
      });
    })
  );
});

// Activate event: Immediately purge old caches (v1, v2, etc.) and claim clients
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[SW] Deleting stale cache:", key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event: Strict Network-First with Offline Fallback
// Ensures users always see the latest live data and remedies when connected
self.addEventListener("fetch", (event) => {
  const request = event.request;
  
  // Only handle GET requests
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // NEVER intercept Next.js internals, HMR, or RSC streaming requests
  if (
    url.pathname.startsWith("/_next/") ||
    url.searchParams.has("_rsc") ||
    request.headers.get("RSC") === "1" ||
    request.headers.get("Next-Router-State-Tree")
  ) {
    return;
  }

  // Strict Network-First Strategy:
  // 1. Always attempt live network fetch first to get the most recent data
  // 2. Cache successful responses
  // 3. Fallback to cache ONLY if network fails (offline)
  event.respondWith(
    fetch(request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(async () => {
        // Offline Fallback
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
          return cachedResponse;
        }

        // If navigating to a page offline and not in cache, fallback to root
        if (request.mode === "navigate") {
          const rootFallback = await caches.match("/");
          if (rootFallback) return rootFallback;
        }

        return new Response("Offline — No cached data available.", {
          status: 503,
          statusText: "Service Unavailable",
          headers: { "Content-Type": "text/plain" },
        });
      })
  );
});
