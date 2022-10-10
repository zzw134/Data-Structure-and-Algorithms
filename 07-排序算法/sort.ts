class ArrayList {
  arr: number[] = [];
  insert(num: number) {
    this.arr.push(num);
  }
  toString(): string {
    return this.arr.join("-");
  }

  swap(n1: number, n2: number) {
    const temp = this.arr[n1];
    this.arr[n1] = this.arr[n2];
    this.arr[n2] = temp;
  }

  // 冒泡排序
  bubbleSort() {
    const length = this.arr.length;
    for (let i = 0; i < length - 1; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (this.arr[j] > this.arr[j + 1]) {
          this.swap(j, j + 1);
        }
      }
    }
  }

  // 选择排序
  selectionSort() {
    const length = this.arr.length;
    for (let i = 0; i < length - 1; i++) {
      let min = i;
      for (let j = i + 1; j < length; j++) {
        if (this.arr[min] > this.arr[j]) {
          min = j;
        }
      }
      this.swap(i, min);
    }
  }

  // 插入排序
  insertionSort() {
    const length = this.arr.length;
    for (let i = 1; i < length; i++) {
      let j = i;
      let temp = this.arr[j];
      while (temp < this.arr[j - 1] && j > 0) {
        this.arr[j] = this.arr[j - 1];
        j--;
      }
      this.arr[j] = temp;
    }
  }

  // 希尔排序
  shellSort() {
    const length = this.arr.length;
    let gap = Math.floor(length / 2);
    while (true) {
      for (let i = gap; i < length; i++) {
        let j = i;
        const temp = this.arr[j];
        while (temp < this.arr[j - gap] && j > gap - 1) {
          this.arr[j] = this.arr[j - gap];
          j -= gap;
        }
        this.arr[j] = temp;
      }
      if (gap === 1) {
        return;
      }
      gap = Math.floor(gap / 2);
    }
  }

  // 快速排序
  quickSort() {
    this.#quick(0, this.arr.length - 1);
  }
  #medium(left: number, right: number) {
    let medium = Math.floor((left + right) / 2);
    if (this.arr[left] > this.arr[medium]) {
      this.swap(left, medium);
    }
    if (this.arr[medium] > this.arr[right]) {
      this.swap(medium, right);
    }
    if (this.arr[left] > this.arr[medium]) {
      this.swap(left, medium);
    }
    this.swap(medium, right - 1);
    return this.arr[right - 1];
  }
  #quick(left: number, right: number) {
    if (left >= right) {
      return;
    }
    const pivot = this.#medium(left, right);

    let i = left,
      j = right - 1;
    while (i < j) {
      while (this.arr[++i] < pivot) {}
      while (this.arr[--j] > pivot) {}
      if (i < j) {
        this.swap(i, j);
      }
    }

    this.swap(i, right - 1);
    this.#quick(left, i - 1);
    this.#quick(i + 1, right);
  }
}

const arrList = new ArrayList();
arrList.insert(23);
arrList.insert(3);
arrList.insert(13);
arrList.insert(67);
arrList.insert(1);
arrList.insert(34);
arrList.insert(56);
arrList.insert(8);
arrList.insert(744);
arrList.insert(4);
arrList.insert(30);

debugger;
arrList.quickSort();
console.log(arrList.arr);
