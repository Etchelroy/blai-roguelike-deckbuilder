const ENEMIES = {
  slime: { id:'slime', name:'Slime', hp:30, emoji:'🟢',
    pattern: [
      { type:'attack', damage:8, intent:'⚔️ 8' },
      { type:'defend', block:5, intent:'🛡️ 5' },
      { type:'attack', damage:5, applyWeak:1, intent:'⚔️ 5 + Weak' },
    ]},
  cultist: { id:'cultist', name:'Cultist', hp:50, emoji:'👤',
    pattern: [
      { type:'buff', gainStrength:3, intent:'💪 +3 Str' },
      { type:'attack', damage:6, intent:'⚔️ 6' },
      { type:'attack', damage:6, intent:'⚔️ 6' },
    ]},
  jawWorm: { id:'jawWorm', name:'Jaw Worm', hp:44, emoji:'🐛',
    pattern: [
      { type:'attack', damage:11, intent:'⚔️ 11' },
      { type:'attack_defend', damage:7, block:5, intent:'⚔️ 7 + 🛡️ 5' },
      { type:'defend', block:6, gainStrength:1, intent:'🛡️ 6 + 💪' },
    ]},
  fungus: { id:'fungus', name:'Fungus Beast', hp:40, emoji:'🍄',
    pattern: [
      { type:'attack', damage:6, applyPoison:3, intent:'⚔️ 6 + ☠️ 3' },
      { type:'defend', block:8, intent:'🛡️ 8' },
      { type:'attack', damage:10, intent:'⚔️ 10' },
    ]},
  // elites
  eliteKnight: { id:'eliteKnight', name:'Knight', hp:80, emoji:'⚔️', isElite:true,
    pattern: [
      { type:'attack', damage:15, intent:'⚔️ 15' },
      { type:'buff', gainStrength:3, block:10, intent:'💪 +3 Str + 🛡️ 10' },
      { type:'attack', damage:12, applyVulnerable:2, intent:'⚔️ 12 + Vuln 2' },
    ]},
  eliteSentry: { id:'eliteSentry', name:'Sentry', hp:70, emoji:'🗿', isElite:true,
    pattern: [
      { type:'attack', damage:10, intent:'⚔️ 10' },
      { type:'defend', block:12, intent:'🛡️ 12' },
      { type:'attack', damage:8, applyWeak:2, intent:'⚔️ 8 + Weak 2' },
      { type:'attack', damage:14, intent:'⚔️ 14' },
    ]},
  // boss
  boss: { id:'boss', name:'The Corrupted', hp:200, emoji:'👹', isBoss:true,
    pattern: [
      { type:'attack', damage:20, intent:'⚔️ 20' },
      { type:'buff', gainStrength:4, block:15, intent:'💪 +4 Str + 🛡️ 15' },
      { type:'attack', damage:12, applyPoison:4, applyVulnerable:2, intent:'⚔️ 12 + ☠️ 4 + Vuln 2' },
      { type:'attack', damage:30, intent:'⚔️ 30' },
      { type:'defend', block:20, intent:'🛡️ 20' },
    ]},
}

export function getEnemy(id) {
  const base = ENEMIES[id]
  if(!base) return null
  return {
    ...base,
    maxHp: base.hp,
    block: 0,
    strength: 0,
    statusEffects: { poison:0, weak:0, vulnerable:0 },
    patternIndex: 0,
    uid: Math.random().toString(36).substr(2,9),
  }
}

export function getRandomEnemies(count=1) {
  const pool = ['slime','cultist','jawWorm','fungus']
  const result = []
  for(let i=0;i<count;i++) result.push(getEnemy(pool[Math.floor(Math.random()*pool.length)]))
  return result
}

export function getEliteEnemy() {
  const pool = ['eliteKnight','eliteSentry']
  return [getEnemy(pool[Math.floor(Math.random()*pool.length)])]
}

export function getBoss() {
  return [getEnemy('boss')]
}

export default ENEMIES