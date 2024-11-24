export class AsyncArrayUtils {
  static async some<T>(
    array: T[],
    predicate: (element: T) => boolean | Promise<boolean>,
  ): Promise<boolean> {
    for (const e of array) {
      if (await predicate(e)) return true;
    }
    return false;
  }

  static async forEach<T>(
    array: T[],
    callback: (element: T) => void | Promise<void>,
  ): Promise<void> {
    for (const e of array) {
      await callback(e);
    }
  }
}
