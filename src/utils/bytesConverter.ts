/**
 * Returns the the size in Mega bytes
 * @param sizeInBites 
 * @returns 
 */
export function bytesConverter(sizeInBites: number): number {
  return sizeInBites / (1024*1024)
}