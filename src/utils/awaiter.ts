/**
 * Await the supplied time
 * @param waitTime 
 * @returns 
 */
export function awaiter(waitTime: number): Promise<void> {
 return new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, waitTime);
 })
}