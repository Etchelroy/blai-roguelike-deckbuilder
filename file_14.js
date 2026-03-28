const EVENTS = [
  {
    id:'shrine',
    title:'Ancient Shrine',
    description:'A glowing shrine hums with power. Do you pray?',
    choices:[
      { text:'Pray (Gain 10 Max HP)', effect:{ maxHp:10 }},
      { text:'Smash it (Gain 50 Gold)', effect:{ gold:50 }},
      { text:'Leave', effect:{} },
    ]
  },
  {
    id:'merchant',
    title:'Wandering Merchant',
    description:'A hooded figure offers a trade.',
    choices:[
      { text:'Trade 30 HP for 100 Gold', effect:{ hp:-30, gold:100 }},
      { text:'Trade 50 Gold for 15 HP', effect:{ gold:-50, hp:15 }},
      { text:'Decline', effect:{} },
    ]
  },
  {
    id:'fountain',
    title:'Healing Fountain',
    description:'Crystal clear water flows from a stone fountain.',
    choices:[
      { text:'Drink (Heal 20 HP)', effect:{ hp:20 }},
      { text:'Bathe (Remove a random curse... you have none)', effect:{} },
      { text:'Move on', effect:{} },
    ]
  },
]

export function getRandomEvent() {
  return EVENTS[Math.floor(Math.random()*EVENTS.length)]
}

export default EVENTS