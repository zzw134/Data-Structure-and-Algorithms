// 拉链法
class HashTable {
  #storage: [string, any][][] = [];
  #count: number = 0;
  #limit: number = 8;

  // 获取hashCode(也就是storage的index)的方法
  #hashFunc(key: string, limit: number): number {
    let hashCode = 0;
    for (let i = 0; i < key.length; i++) {
      hashCode = 37 * hashCode + key.charCodeAt(i);
    }

    hashCode = hashCode % limit;
    return hashCode;
  }

  // 判断是否为质数
  #isPrime(num: number): boolean {
    for (let i = 2; i <= Math.floor(Math.sqrt(num)); i++) {
      if (num % 2 === 0) {
        return false;
      }
    }
    return true;
  }

  // 获取质数limit
  #getPrime(limit: number): number {
    return this.#isPrime(limit) ? limit : this.#getPrime(++limit);
  }

  // 扩容/缩容
  #resize(newLimit: number) {
    const oldStorage = this.#storage;
    this.#storage = [];
    this.#count = 0;
    this.#limit = this.#getPrime(newLimit);
    for (let i = 0; i < oldStorage.length; i++) {
      const bucket = oldStorage[i];
      if (!bucket) {
        continue;
      }
      for (let j = 0; i < bucket.length; j++) {
        const [key, value] = bucket[j];
        this.put(key, value);
      }
    }
  }

  // 插入/更新操作
  put(key: string, value: any) {
    const index = this.#hashFunc(key, this.#limit);
    let bucket: any[] = this.#storage[index];
    if (!bucket) {
      bucket = [];
      this.#storage[index] = bucket;
    }

    // 判断是否是更新操作
    let update = false;
    for (let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i];
      if (tuple[0] === key) {
        tuple[1] = value;
        update = true;
        break;
      }
    }
    // 不是更新操作
    if (!update) {
      bucket.push([key, value]);
      this.#count++;

      // 如果loadFactor(count / limit) > 0.75，说明要扩容了
      if (this.#count > this.#limit * 0.75) {
        this.#resize(this.#limit * 2);
      }
    }
  }

  // 获取操作
  get(key: string): any {
    const index = this.#hashFunc(key, this.#limit);
    const bucket = this.#storage[index];
    if (!bucket) {
      return null;
    }

    for (let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i];
      if (tuple[0] === key) {
        return tuple[1];
      }
    }

    return null;
  }

  // 删除操作
  remove(key: string): any {
    const index = this.#hashFunc(key, this.#limit);
    const bucket = this.#storage[index];

    if (!bucket) {
      return null;
    }
    for (let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i];

      if (tuple[0] === key) {
        bucket.splice(i, 1);
        this.#count--;

        // 如果loadFactor(count / limit) < 0.25，说明要缩容了
        if (this.#limit > 8 && this.#count < this.#limit * 0.25) {
          this.#resize(Math.floor(this.#limit / 2));
        }
        return tuple[1];
      }
    }

    return null;
  }

  isEmpty(): boolean {
    return this.#count === 0;
  }

  size(): number {
    return this.#count;
  }
}

const ht = new HashTable();
console.log(ht.isEmpty());
console.log(ht.size());

ht.put("abc", 111);
console.log(ht.get("abc"));
ht.put("abc", 222);
ht.put("bcd", 222);
console.log(ht.get("abc"));
console.log(ht.size());
console.log(ht.isEmpty());
ht.remove("abc");
console.log(ht.get("abc"));

console.log(ht.size());
