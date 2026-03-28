export function shuffle(arr) {
  const a = [...arr]
  for(let i=a.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]]
  }
  return a
}

export function initCombat(deck, enemies) {
  const drawPile = shuffle(deck.map(c=>({...c, uid:Math.random().toString(36).substr(2,9)})))
  return {
    drawPile,
    hand: [],
    discardPile: [],
    exhaustPile: [],
    enemies: enemies.map(e=>({...e})),
    energy: 3,
    maxEnergy: 3,
    turn: 1,
    playerBlock: 0,
    playerStrength: 0,
    playerDexterity: 0,
    playerMetallicize: 0,
    playerNoxiousFumes: 0,
    playerStatusEffects: { weak:0, vulnerable:0 },
    log: [],
  }
}

export function drawCards(state, count=5) {
  const s = {...state, drawPile:[...state.drawPile], hand:[...state.hand], discardPile:[...state.discardPile]}
  for(let i=0;i<count;i++) {
    if(s.drawPile.length===0) {
      if(s.discardPile.length===0) break
      s.drawPile = shuffle(s.discardPile)
      s.discardPile = []
    }
    s.hand.push(s.drawPile.pop())
  }
  return s
}

export function calcDamage(baseDmg, strength, isWeak, targetVulnerable) {
  let d = baseDmg + strength
  if(isWeak) d = Math.floor(d * 0.75)
  if(targetVulnerable) d = Math.floor(d * 1.5)
  return Math.max(0, d)
}

export function calcBlock(baseBlock, dexterity) {
  return Math.max(0, baseBlock + dexterity)
}

export function applyDamageToTarget(target, damage) {
  let remaining = damage
  const newBlock = Math.max(0, target.block - remaining)
  remaining = Math.max(0, remaining - target.block)
  const newHp = Math.max(0, (target.hp || target.currentHp) - remaining)
  return { ...target, block: newBlock, hp: newHp }
}

export function playCard(state, cardUid, targetEnemyUid, playerHp) {
  const s = {...state, hand:[...state.hand], discardPile:[...state.discardPile], exhaustPile:[...state.exhaustPile], enemies:state.enemies.map(e=>({...e, statusEffects:{...e.statusEffects}})), log:[...state.log]}
  const cardIdx = s.hand.findIndex(c=>c.uid===cardUid)
  if(cardIdx===-1) return { state:s, playerHp, extraDraw:0 }
  const card = s.hand[cardIdx]
  if(card.cost > s.energy) return { state:s, playerHp, extraDraw:0 }
  
  s.energy -= card.cost
  s.hand.splice(cardIdx, 1)
  
  let extraDraw = 0
  let pHp = playerHp
  
  // Block
  if(card.block) {
    const blk = card.bodySlam ? 0 : calcBlock(card.block, s.playerDexterity)
    s.playerBlock += blk
    s.log.push(`Gained ${blk} Block`)
  }
  
  // Damage
  if(card.damage || card.bodySlam) {
    const isWeak = s.playerStatusEffects.weak > 0
    let baseDmg = card.bodySlam ? s.playerBlock : card.damage
    let str = s.playerStrength
    if(card.heavyBlade) str *= (card.heavyMulti || 3)
    
    const targets = card.aoe ? s.enemies : s.enemies.filter(e=>e.uid===targetEnemyUid)
    for(let i=0;i<s.enemies.length;i++) {
      if(targets.find(t=>t.uid===s.enemies[i].uid)) {
        const isVuln = s.enemies[i].statusEffects.vulnerable > 0
        const dmg = calcDamage(baseDmg, str, isWeak, isVuln)
        s.enemies[i] = applyDamageToTarget(s.enemies[i], dmg)
        s.log.push(`Dealt ${dmg} damage to ${s.enemies[i].name}`)
      }
    }
  }
  
  // Status effects on enemies
  const target = s.enemies.find(e=>e.uid===targetEnemyUid)
  if(card.applyPoison && target) { target.statusEffects.poison += card.applyPoison; s.log.push(`Applied ${card.applyPoison} Poison`) }
  if(card.applyWeak && target) { target.statusEffects.weak += card.applyWeak; s.log.push(`Applied ${card.applyWeak} Weak`) }
  if(card.applyVulnerable && target) { target.statusEffects.vulnerable += card.applyVulnerable; s.log.push(`Applied ${card.applyVulnerable} Vulnerable`) }
  
  // Powers
  if(card.gainStrength) { s.playerStrength += card.gainStrength; s.log.push(`Gained ${card.gainStrength} Strength`) }
  if(card.gainDex) { s.playerDexterity += card.gainDex; s.log.push(`Gained ${card.gainDex} Dexterity`) }
  if(card.metallicize) { s.playerMetallicize += card.metallicize; s.log.push(`Metallicize ${card.metallicize}`) }
  if(card.poisonAll) { s.playerNoxiousFumes += card.poisonAll; s.log.push(`Noxious Fumes ${card.poisonAll}`) }
  
  // Draw
  if(card.draw) extraDraw = card.draw
  
  // Energy gain
  if(card.gainEnergy) s.energy += card.gainEnergy
  
  // HP loss
  if(card.losehp) pHp = Math.max(1, pHp - card.losehp)
  
  // Exhaust or discard
  if(card.exhaust) s.exhaustPile.push(card)
  else s.discardPile.push(card)
  
  // Remove dead enemies
  s.enemies = s.enemies.filter(e=>e.hp>0)
  
  return { state:s, playerHp:pHp, extraDraw }
}

export function enemyTurn(state, playerHp, playerMaxHp) {
  const s = {...state, enemies:state.enemies.map(e=>({...e, statusEffects:{...e.statusEffects}})), log:[...state.log]}
  let pHp = playerHp
  
  // Noxious fumes
  if(s.playerNoxiousFumes > 0) {
    for(let i=0;i<s.enemies.length;i++) {
      s.enemies[i].statusEffects.poison += s.playerNoxiousFumes
      s.log.push(`Noxious Fumes applied ${s.playerNoxiousFumes} Poison to ${s.enemies[i].name}`)
    }
  }
  
  // Metallicize
  if(s.playerMetallicize > 0) {
    s.playerBlock += s.playerMetallicize
    s.log.push(`Metallicize gained ${s.playerMetallicize} Block`)
  }
  
  for(let i=0;i<s.enemies.length;i++) {
    const e = s.enemies[i]
    const move = e.pattern[e.patternIndex % e.pattern.length]
    
    // Enemy block resets
    e.block = 0
    
    if(move.damage) {
      const isWeak = e.statusEffects.weak > 0
      const isVuln = s.playerStatusEffects.vulnerable > 0
      let dmg = move.damage + (e.strength || 0)
      if(isWeak) dmg = Math.floor(dmg * 0.75)
      if(isVuln) dmg = Math.floor(dmg * 1.5)
      dmg = Math.max(0, dmg)
      
      const blocked = Math.min(s.playerBlock, dmg)
      s.playerBlock -= blocked
      pHp -= (dmg - blocked)
      s.log.push(`${e.name} dealt ${dmg} damage (${blocked} blocked)`)
    }
    if(move.block) { e.block += move.block; s.log.push(`${e.name} gained ${move.block} Block`) }
    if(move.gainStrength) { e.strength = (e.strength||0) + move.gainStrength; s.log.push(`${e.name} gained ${move.gainStrength} Strength`) }
    if(move.applyWeak) { s.playerStatusEffects.weak += move.applyWeak }
    if(move.applyVulnerable) { s.playerStatusEffects.vulnerable += move.applyVulnerable }
    if(move.applyPoison) { s.playerStatusEffects.poison = (s.playerStatusEffects.poison||0) + move.applyPoison }
    
    e.patternIndex = (e.patternIndex + 1) % e.pattern.length
  }
  
  // Poison on enemies
  for(let i=0;i<s.enemies.length;i++) {
    const e = s.enemies[i]
    if(e.statusEffects.poison > 0) {
      const pdmg = e.statusEffects.poison
      e.hp = Math.max(0, e.hp - pdmg)
      s.log.push(`${e.name} took ${pdmg} Poison damage`)
      e.statusEffects.poison -= 1
    }
    if(e.statusEffects.weak > 0) e.statusEffects.weak--
    if(e.statusEffects.vulnerable > 0) e.statusEffects.vulnerable--
  }
  
  s.enemies = s.enemies.filter(e=>e.hp>0)
  
  // Player status tick
  if(s.playerStatusEffects.weak > 0) s.playerStatusEffects.weak--
  if(s.playerStatusEffects.vulnerable > 0) s.playerStatusEffects.vulnerable--
  
  // Player poison
  if(s.playerStatusEffects.poison > 0) {
    pHp -= s.playerStatusEffects.poison
    s.log.push(`You took ${s.playerStatusEffects.poison} Poison damage`)
    s.playerStatusEffects.poison--
  }
  
  return { state:s, playerHp:pHp }
}

export function startNewTurn(state) {
  const s = {...state}
  s.energy = s.maxEnergy
  s.playerBlock = 0
  s.turn += 1
  // Discard hand
  s.discardPile = [...s.discardPile, ...s.hand]
  s.hand = []
  return drawCards(s, 5)
}