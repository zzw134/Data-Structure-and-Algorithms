class Graph {
  vertices: any[] = [];
  edgesMap: Map<any, any> = new Map();

  addVertex(v: any) {
    this.vertices.push(v);
    this.edgesMap.set(v, []);
  }

  addEdge(v: any, e: any) {
    this.edgesMap.get(v)?.push(e);
    this.edgesMap.get(e)?.push(v);
  }

  toString(): string {
    let result = "";
    this.vertices.forEach((v: any) => {
      result += JSON.stringify(v) + "->";
      this.edgesMap.get(v).forEach((e: any) => {
        result += JSON.stringify(e) + " ";
      });
      result += "\n";
    });
    return result;
  }

  // 遍历时，白色代表还没有访问过该顶点，灰色代表访问过该顶点但是还没有探索完相邻边上的顶点，
  // 黑色代表，该点已经访问过了而且也已经探索完它其他相邻边上的点了
  // 初始化颜色，给每个顶点初始化为白色
  initializeColor() {
    const colors = new Map();
    this.vertices.forEach((v: any) => {
      colors.set(v, "white");
    });
    return colors;
  }

  // 广度优先搜索
  bfs(v: any, handler: (v: any) => any) {
    const colors = this.initializeColor();
    const queue: any[] = [v];
    while (queue.length !== 0) {
      const shiftV = queue.shift();
      colors.set(shiftV, "gray");
      this.edgesMap.get(shiftV).forEach((e: any) => {
        if (colors.get(e) === "white") {
          colors.set(e, "gray");
          queue.push(e);
        }
      });
      colors.set(shiftV, "black");
      handler && handler(shiftV);
    }
  }

  // 深度优先搜索
  dfs(v: any, handler: (v: any) => any) {
    const colors = this.initializeColor();
    this.#dfsRecursive(v, colors, handler);
  }

  #dfsRecursive(v: any, colors: Map<any, any>, handler: (v: any) => any) {
    colors.set(v, "gray");
    handler && handler(v);
    this.edgesMap.get(v).forEach((e: any) => {
      if (colors.get(e) === "white") {
        this.#dfsRecursive(e, colors, handler);
      }
    });
    colors.set(v, "black");
  }
}

const graph = new Graph();
// 添加顶点
var myVertices = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
for (var i = 0; i < myVertices.length; i++) {
  graph.addVertex(myVertices[i]);
}

// 添加边
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("A", "D");
graph.addEdge("C", "D");
graph.addEdge("C", "G");
graph.addEdge("D", "G");
graph.addEdge("D", "H");
graph.addEdge("B", "E");
graph.addEdge("B", "F");
graph.addEdge("E", "I");

console.log(graph.toString());

const arr1: any[] = [];
graph.bfs("A", (v) => {
  arr1.push(v);
});
console.log(arr1.join(" -> "));

const arr2: any[] = [];
graph.dfs("A", (v) => {
  arr2.push(v);
});
console.log(arr2.join(" -> "));

export default {};
