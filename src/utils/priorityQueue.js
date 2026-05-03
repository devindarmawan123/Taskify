export class MaxHeap {
  constructor() {
    this.heap = [];
  }

  isMoreUrgent(taskA, taskB) {
    // 1. Status Selesai
    if (taskA.isCompleted !== taskB.isCompleted) return !taskA.isCompleted; 

    const hasDeadlineA = Boolean(taskA.deadline);
    const hasDeadlineB = Boolean(taskB.deadline);

    // 2. Kalau KEDUANYA punya deadline
    if (hasDeadlineA && hasDeadlineB) {
      const dateA = new Date(taskA.deadline).setHours(0,0,0,0);
      const dateB = new Date(taskB.deadline).setHours(0,0,0,0);
      
      if (dateA !== dateB) return dateA < dateB; // Tanggal lebih awal naik
      if (taskA.priority !== taskB.priority) return taskA.priority > taskB.priority; // Prioritas tinggi naik
      return new Date(taskA.deadline).getTime() < new Date(taskB.deadline).getTime(); // Jam lebih awal naik
    }

    // 3. Kalau cuma SALAH SATU yang punya deadline (yang punya deadline naik)
    if (hasDeadlineA && !hasDeadlineB) return true;
    if (!hasDeadlineA && hasDeadlineB) return false;

    // 4. Kalau KEDUANYA TANPA deadline, langsung adu prioritas
    if (taskA.priority !== taskB.priority) return taskA.priority > taskB.priority;
    return taskA.id < taskB.id;
  }

  insert(task) {
    this.heap.push(task);
    this.bubbleUp(this.heap.length - 1);
  }

  bubbleUp(index) {
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this.isMoreUrgent(this.heap[parentIndex], this.heap[index])) break;
      [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
      index = parentIndex;
    }
  }

  extractMax() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.sinkDown(0);
    return max;
  }

  sinkDown(index) {
    const length = this.heap.length;
    const element = this.heap[index];
    while (true) {
      let leftChildIdx = 2 * index + 1;
      let rightChildIdx = 2 * index + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.heap[leftChildIdx];
        if (this.isMoreUrgent(leftChild, element)) swap = leftChildIdx;
      }
      if (rightChildIdx < length) {
        rightChild = this.heap[rightChildIdx];
        if (
          (swap === null && this.isMoreUrgent(rightChild, element)) ||
          (swap !== null && this.isMoreUrgent(rightChild, leftChild))
        ) {
          swap = rightChildIdx;
        }
      }
      if (swap === null) break;
      this.heap[index] = this.heap[swap];
      this.heap[swap] = element;
      index = swap;
    }
  }

  removeById(id) {
    const index = this.heap.findIndex(t => t.id === id);
    if (index === -1) return;
    if (index === this.heap.length - 1) {
      this.heap.pop();
      return;
    }
    this.heap[index] = this.heap.pop();
    const parentIndex = Math.floor((index - 1) / 2);
    if (index > 0 && this.isMoreUrgent(this.heap[index], this.heap[parentIndex])) {
      this.bubbleUp(index);
    } else {
      this.sinkDown(index);
    }
  }

  updateTask(id, updatedData) {
    this.removeById(id);
    this.insert(updatedData);
  }

  getSorted() {
    const tempHeap = new MaxHeap();
    tempHeap.heap = [...this.heap]; 
    const sorted = [];
    while(tempHeap.heap.length > 0) {
      sorted.push(tempHeap.extractMax());
    }
    return sorted;
  }
}