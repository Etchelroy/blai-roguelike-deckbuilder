const CARDS = {
  strike: { id:'strike', name:'Strike', type:'attack', cost:1, damage:6, description:'Deal 6 damage.', rarity:'starter',
    upgraded:{ name:'Strike+', damage:9, description:'Deal 9 damage.' }},
  defend: { id:'defend', name:'Defend', type:'skill', cost:1, block:5, description:'Gain 5 Block.', rarity:'starter',
    upgraded:{ name:'Defend+', block:8, description:'Gain 8 Block.' }},
  bash: { id:'bash', name:'Bash', type:'attack', cost:2, damage:8, applyVulnerable:2, description:'Deal 8 damage. Apply 2 Vulnerable.', rarity:'starter',
    upgraded:{ name:'Bash+', damage:10, applyVulnerable:3, description:'Deal 10 damage. Apply 3 Vulnerable.' }},
  cleave: { id:'cleave', name:'Cleave', type:'attack', cost:1, damage:8, aoe:true, description:'Deal 8 damage to ALL enemies.', rarity:'common',
    upgraded:{ name:'Cleave+', damage:12, description:'Deal 12 damage to ALL enemies.' }},
  ironWave: { id:'ironWave', name:'Iron Wave', type:'attack', cost:1, damage:5, block:5, description:'Deal 5 damage. Gain 5 Block.', rarity:'common',
    upgraded:{ name:'Iron Wave+', damage:7, block:7, description:'Deal 7 damage. Gain 7 Block.' }},
  pommelStrike: { id:'pommelStrike', name:'Pommel Strike', type:'attack', cost:1, damage:9, draw:1, description:'Deal 9 damage. Draw 1 card.', rarity:'common',
    upgraded:{ name:'Pommel Strike+', damage:10, draw:2, description:'Deal 10 damage. Draw 2 cards.' }},
  shrugItOff: { id:'shrugItOff', name:'Shrug It Off', type:'skill', cost:1, block:8, draw:1, description:'Gain 8 Block. Draw 1 card.', rarity:'common',
    upgraded:{ name:'Shrug It Off+', block:11, description:'Gain 11 Block. Draw 1 card.' }},
  armaments: { id:'armaments', name:'Armaments', type:'skill', cost:1, block:5, upgradeHand:true, description:'Gain 5 Block. Upgrade a card in hand.', rarity:'common',
    upgraded:{ name:'Armaments+', block:5, upgradeAllHand:true, description:'Gain 5 Block. Upgrade ALL cards in hand.' }},
  bodySlam: { id:'bodySlam', name:'Body Slam', type:'attack', cost:1, bodySlam:true, description:'Deal damage equal to your Block.', rarity:'common',
    upgraded:{ name:'Body Slam+', cost:0, description:'Deal damage equal to your Block.' }},
  clothesline: { id:'clothesline', name:'Clothesline', type:'attack', cost:2, damage:12, applyWeak:2, description:'Deal 12 damage. Apply 2 Weak.', rarity:'common',
    upgraded:{ name:'Clothesline+', damage:14, applyWeak:3, description:'Deal 14 damage. Apply 3 Weak.' }},
  heavyBlade: { id:'heavyBlade', name:'Heavy Blade', type:'attack', cost:2, damage:14, heavyBlade:true, description:'Deal 14 damage. Strength is x3.', rarity:'common',
    upgraded:{ name:'Heavy Blade+', damage:14, heavyMulti:5, description:'Deal 14 damage. Strength is x5.' }},
  inflame: { id:'inflame', name:'Inflame', type:'power', cost:1, gainStrength:2, description:'Gain 2 Strength.', rarity:'uncommon',
    upgraded:{ name:'Inflame+', gainStrength:3, description:'Gain 3 Strength.' }},
  metallicize: { id:'metallicize', name:'Metallicize', type:'power', cost:1, metallicize:3, description:'At end of turn, gain 3 Block.', rarity:'uncommon',
    upgraded:{ name:'Metallicize+', metallicize:4, description:'At end of turn, gain 4 Block.' }},
  noxiousFumes: { id:'noxiousFumes', name:'Noxious Fumes', type:'power', cost:1, poisonAll:2, description:'At start of turn, apply 2 Poison to ALL enemies.', rarity:'uncommon',
    upgraded:{ name:'Noxious Fumes+', poisonAll:3, description:'At start of turn, apply 3 Poison to ALL enemies.' }},
  poisonStab: { id:'poisonStab', name:'Poison Stab', type:'attack', cost:1, damage:5, applyPoison:3, description:'Deal 5 damage. Apply 3 Poison.', rarity:'common',
    upgraded:{ name:'Poison Stab+', damage:7, applyPoison:4, description:'Deal 7 damage. Apply 4 Poison.' }},
  footwork: { id:'footwork', name:'Footwork', type:'power', cost:1, gainDex:2, description:'Gain 2 Dexterity.', rarity:'uncommon',
    upgraded:{ name:'Footwork+', gainDex:3, description:'Gain 3 Dexterity.' }},
  bludgeon: { id:'bludgeon', name:'Bludgeon', type:'attack', cost:3, damage:32, description:'Deal 32 damage.', rarity:'rare',
    upgraded:{ name:'Bludgeon+', damage:42, description:'Deal 42 damage.' }},
  offering: { id:'offering', name:'Offering', type:'skill', cost:0, losehp:6, gainEnergy:2, draw:3, description:'Lose 6 HP. Gain 2 Energy. Draw 3 cards.', rarity:'rare',
    upgraded:{ name:'Offering+', losehp:6, gainEnergy:2, draw:5, description:'Lose 6 HP. Gain 2 Energy. Draw 5 cards.' }},
  impervious: { id:'impervious', name:'Impervious', type:'skill', cost:2, block:30, exhaust:true, description:'Gain 30 Block. Exhaust.', rarity:'rare',
    upgraded:{ name:'Impervious+', block:40, description:'Gain 40 Block. Exhaust.' }},
}

export function getCard(id, isUpgraded=false) {
  const base = CARDS[id]
  if(!base) return null
  const card = { ...base, uid: Math.random().toString(36).substr(2,9), isUpgraded: false }
  if(isUpgraded && base.upgraded) {
    Object.assign(card, base.upgraded)
    card.isUpgraded = true
  }
  return card
}

export function upgradeCard(card) {
  const base = CARDS[card.id]
  if(!base || !base.upgraded || card.isUpgraded) return card
  return { ...card, ...base.upgraded, isUpgraded: true }
}

export function getStarterDeck() {
  const deck = []
  for(let i=0;i<5;i++) deck.push(getCard('strike'))
  for(let i=0;i<4;i++) deck.push(getCard('defend'))
  deck.push(getCard('bash'))
  return deck
}

export function getRandomRewardCards(count=3) {
  const pool = Object.keys(CARDS).filter(k => CARDS[k].rarity !== 'starter')
  const result = []
  const used = new Set()
  while(result.length < count && used.size < pool.length) {
    const k = pool[Math.floor(Math.random()*pool.length)]
    if(!used.has(k)){ used.add(k); result.push(getCard(k)) }
  }
  return result
}

export function getShopCards(count=5) {
  const pool = Object.keys(CARDS).filter(k => CARDS[k].rarity !== 'starter')
  const result = []
  const used = new Set()
  while(result.length < count && used.size < pool.length) {
    const k = pool[Math.floor(Math.random()*pool.length)]
    if(!used.has(k)){
      used.add(k)
      const card = getCard(k)
      card.price = card.rarity === 'rare' ? 150 : card.rarity === 'uncommon' ? 100 : 50
      result.push(card)
    }
  }
  return result
}

export default CARDS