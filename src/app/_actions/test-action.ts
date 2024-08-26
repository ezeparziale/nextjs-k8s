import { unstable_cache } from "next/cache"

export const getProduct = unstable_cache(
  async (id) => {
    console.log(`GetProduct ${id}`)
    return id * 2
  },
  ["productU"],
  {
    tags: ["productU"],
  },
)

export const getDate = unstable_cache(
  async () => {
    console.log(`getDate`)
    return new Date().getTime()
  },
  ["getDate"],
  {
    tags: ["getDate"],
  },
)
