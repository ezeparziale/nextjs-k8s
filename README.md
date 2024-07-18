# :zap: Next.js 14 + Redis cache + Kubernetes

Next.js web application with 2 pods sharing cache on redis

## :speech_balloon: About this repo

### :whale: Docker

I created the docker image following the example in: 

```http
https://github.com/vercel/next.js/tree/canary/examples/with-docker
```

I configured `output: "standalone"` property in `next-config.js`

More info in:

```http
https://nextjs.org/docs/app/building-your-application/deploying#docker-image
```

### :card_file_box: Cache

I use `Redis` to cached values and ensure consistency across all pods.

I installed `@neshca/cache-handler` using `npm i -D @neshca/cache-handler`:

```http
https://caching-tools.github.io/next-shared-cache
```

Adding `cache-handler.mjs` and configured `cacheHandler` property in `next.config.mjs`

I following this example and the same pages to validate the cache using `revalidateTag` and `revalidatePath`:

```http
https://github.com/vercel/next.js/tree/canary/examples/cache-handler-redis
```

More info in:

```http
https://nextjs.org/docs/app/building-your-application/deploying#caching-and-isr
```

### :camera_flash: Image optimization

I installed `sharp` using `npm install sharp`

More info in:

```http
https://nextjs.org/docs/app/building-your-application/deploying#image-optimization
```

### :whale2: Kubernetes

In the `k8s` folder, there are all the `Kubernetes` manifests to create two pods with the Next.js web application and one pod with a Redis server.


## :runner: Run

### :1st_place_medal: Option 1

Run dev mode with `npm run dev`

### :2nd_place_medal: Option 2

Run in `Docker` using Docker compose with `docker compose -f "compose.yaml" up -d --build`

### :3rd_place_medal: Option 3

Run in `Kubernetes`:

1. Execute `docker build -t nextjs-docker .` to create Docker image

2. Execute `kubectl apply -f k8s\configmaps\nextjs.yaml`

3. Execute `kubectl apply -f k8s\deployments\nextjs.yaml`

4. Execute `kubectl apply -f k8s\deployments\redis.yaml`

5. Execute `kubectl apply -f k8s\services\nextjs.yaml`

6. Execute `kubectl apply -f k8s\services\redis.yaml`

7. Access to `http://localhost:3000`