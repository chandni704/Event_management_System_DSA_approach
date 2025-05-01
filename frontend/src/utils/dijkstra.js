export function dijkstra(graph, start) {
    const distances = {};
    const visited = new Set();
  
    // Initialize distances
    for (const node in graph) {
      distances[node] = Infinity;
    }
    distances[start] = 0;
  
    const pq = [[0, start]];
  
    while (pq.length) {
      const [currentDistance, currentNode] = pq.shift();
      if (visited.has(currentNode)) continue;
      visited.add(currentNode);
  
      const neighbors = graph[currentNode] || {};
      for (const neighbor in neighbors) {
        const distance = currentDistance + neighbors[neighbor];
        if (distance < distances[neighbor]) {
          distances[neighbor] = distance;
          pq.push([distance, neighbor]);
        }
      }
  
      pq.sort((a, b) => a[0] - b[0]);
    }
  
    return distances;
  }
  