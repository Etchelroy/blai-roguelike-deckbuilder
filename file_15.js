export function generateMap(floors=15) {
  const map = []
  const nodesPerFloor = [1,3,4,4,3,4,4,3,4,4,3,4,3,2,1]
  
  for(let f=0;f<floors;f++) {
    const count = nodesPerFloor[f] || 3
    const floor = []
    for(let n=0;n<count;n++) {
      let type
      if(f===0) type='combat'
      else if(f===floors-1) type='boss'
      else if(f===floors-2) type='rest'
      else if(f===7) type='rest'
      else {
        const r = Math.random()
        if(f===4||f===10) type = r<0.5?'elite':'combat'
        else if(r<0.45) type='combat'
        else if(r<0.6) type='event'
        else if(r<0.75) type='elite'
        else if(r<0.85) type='shop'
        else type='rest'
      }
      floor.push({ id:`${f}-${n}`, floor:f, index:n, type, connections:[], visited:false })
    }
    map.push(floor)
  }
  
  // Connect floors
  for(let f=0;f<floors-1;f++) {
    const curr = map[f], next = map[f+1]
    // Ensure every node has at least one connection
    for(const node of curr) {
      const targetIdx = Math.min(node.index, next.length-1)
      if(!node.connections.includes(next[targetIdx].id))
        node.connections.push(next[targetIdx].id)
      // Add some branching
      if(Math.random()>0.4 && targetIdx+1<next.length)
        node.connections.push(next[targetIdx+1].id)
      if(Math.random()>0.6 && targetIdx-1>=0)
        node.connections.push(next[targetIdx-1].id)
    }
    // Ensure every next node is reachable
    for(const node of next) {
      const hasParent = curr.some(c=>c.connections.includes(node.id))
      if(!hasParent) {
        const p = curr[Math.floor(Math.random()*curr.length)]
        p.connections.push(node.id)
      }
    }
  }
  
  return map
}

export function getNodeEmoji(type) {
  switch(type) {
    case 'combat': return '⚔️'
    case 'elite': return '💀'
    case 'boss': return '👹'
    case 'rest': return '🔥'
    case 'shop': return '🛒'
    case 'event': return '❓'
    default: return '?'
  }
}