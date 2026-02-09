import packageJson from "../../package.json"

/**
 * Returns a client info tag for Redis driver identification.
 * This helps identify the application using the Redis client in CLIENT LIST output,
 * useful for debugging and monitoring Redis connections.
 *
 * @returns A string in the format: nextjs-k8s_v{version}
 * @example
 * // Returns: "nextjs-k8s_v0.1.0"
 * getClientInfoTag()
 */
export function getClientInfoTag(): string {
  return `nextjs-k8s_v${packageJson.version}`
}
