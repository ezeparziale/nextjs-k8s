# :zap: Next.js 16 + ValKey/Redis cache + Kubernetes

Next.js web application with 2 pods sharing cache.

## :speech_balloon: About this repo

### :whale: Docker

I created the Docker image following the example in:

```http
https://github.com/vercel/next.js/tree/canary/examples/with-docker
```

I configured the `output: "standalone"` property in `next-config.ts`.

More info at:

```http
https://nextjs.org/docs/app/getting-started/deploying#docker
```

### :card_file_box: Cache

I use `ValKey` to cache values and ensure consistency across all pods.

More info at:

```http
https://nextjs.org/docs/app/getting-started/deploying#docker
```

I added `cache-handler.mjs` and configured the `cacheHandler` property in
`next.config.ts`.

```typescript
  cacheHandler: import.meta.dirname + "/cache-handler.mjs",
  cacheMaxMemorySize: 0, // disable default in-memory caching
```

Additionally, I enabled `cacheComponents: true,` to cache the rendered components.

I followed this example and the same pages to validate the cache using `use cache`,
`cacheTag`, `cacheLife`, `updateTag` and `revalidatePath`:

More info at:

```http
https://nextjs.org/docs/app/guides/self-hosting
```

### :whale2: Kubernetes

In the `k8s` folder, there are all the `Kubernetes` manifests to create two pods with
the Next.js web application and one pod with a Redis server.

## :runner: Run

### :1st_place_medal: Option 1

Run in dev mode with `npm run dev`.

### :2nd_place_medal: Option 2

Run in Docker using Docker Compose with
`docker compose -f "compose.yaml" up -d --build`.

### :3rd_place_medal: Option 3

Run in Kubernetes:

1. Execute `docker build -t nextjs-docker .` to create the Docker image.
2. Execute `kubectl apply -f k8s/configmaps/nextjs.yaml`.
3. Execute `kubectl apply -f k8s/deployments/nextjs.yaml`.
4. Execute `kubectl apply -f k8s/deployments/redis.yaml`.
5. Execute `kubectl apply -f k8s/services/nextjs.yaml`.
6. Execute `kubectl apply -f k8s/services/redis.yaml`.
7. Access `http://localhost:3000`.

> [!NOTE] You can use this option to deploy your Docker image on your VPS.
