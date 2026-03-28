window.EventData = {
  events: [
    {
      id: 'shrine',
      title: '🏛️ Ancient Shrine',
      description: 'You come across a weathered shrine emanating a faint golden light. Ancient runes cover its surface.',
      choices: [
        { text: 'Pray at the shrine (Heal 15 HP)', effect: { heal: 15 } },
        { text: 'Offer gold (Lose 30 gold, gain random card)', effect: { gold: -30, addRandomCard: true } },
        { text: 'Leave', effect: {} }
      ]
    },
    {
      id: 'merchant',
      title: '🧙 Wandering Merchant',
      description: 'A cloaked figure beckons from the shadows, jangling a pouch of coins.',
      choices: [
        { text: 'Buy a potion (Lose 50 gold, Heal 25 HP)', effect: { gold: -50, heal: 25 } },
        { text: 'Trade HP for gold (Lose 10 HP, Gain 80 gold)', effect: { damage: 10, gold: 80 } },
        { text: 'Ignore', effect: {} }
      ]
    },
    {
      id: 'treasure',
      title: '💎 Abandoned Chest',
      description: 'A dusty chest sits in the corner of an otherwise empty chamber. It could be trapped...',
      choices: [
        { text: 'Open it (50% chance: Gain 100 gold or Lose 15 HP)', effect: { gamble: { good: { gold: 100 }, bad: { damage: 15 } } } },
        { text: 'Leave it alone', effect: {} }
      ]
    },
    {
      id: 'fountain',
      title: '⛲ Cursed Fountain',
      description: 'Dark water bubbles from a stone fountain. The water smells sweet but looks oily.',
      choices: [
        { text: 'Drink deeply (Heal 30 HP, gain 1 random curse... just kidding, gain 15 gold)', effect: { heal: 30, gold: 15 } },
        { text: 'Wash your weapon (Upgrade a random card)', effect: { upgradeRandom: true } },
        { text: 'Walk away', effect: {} }
      ]
    }
  ],

  getRandomEvent() {
    return this.events[Math.floor(Math.random() * this.events.length)];
  }
};