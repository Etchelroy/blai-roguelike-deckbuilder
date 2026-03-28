window.EnemyData = {
  pool: {
    normal: [
      {
        id: 'cultist', name: 'Cultist', hp: 50, emoji: '👤',
        intents: [
          { type: 'buff', action: 'buff', strength: 3, description: 'Ritual +3 STR' },
          { type: 'attack', action: 'attack', damage: 6, description: 'Attack 6' }
        ], intentPattern: 'sequential'
      },
      {
        id: 'jaw_worm', name: 'Jaw Worm', hp: 44, emoji: '🐛',
        intents: [
          { type: 'attack', action: 'attack', damage: 11, description: 'Chomp 11' },
          { type: 'defend', action: 'defend', block: 6, description: 'Block 6' },
          { type: 'attack', action: 'attack', damage: 7, description: 'Bite 7' }
        ], intentPattern: 'random'
      },
      {
        id: 'louse_red', name: 'Red Louse', hp: 30, emoji: '🪲',
        intents: [
          { type: 'attack', action: 'attack', damage: 6, description: 'Bite 6' },
          { type: 'debuff', action: 'debuff', applyWeak: 2, description: 'Weaken 2' },
          { type: 'attack', action: 'attack', damage: 6, description: 'Bite 6' }
        ], intentPattern: 'random'
      },
      {
        id: 'fungi_beast', name: 'Fungi Beast', hp: 36, emoji: '🍄',
        intents: [
          { type: 'attack', action: 'attack', damage: 6, applyPoison: 2, description: 'Spore 6+2P' },
          { type: 'defend', action: 'defend', block: 5, description: 'Block 5' }
        ], intentPattern: 'sequential'
      },
      {
        id: 'slime_s', name: 'Small Slime', hp: 20, emoji: '🟢',
        intents: [
          { type: 'attack', action: 'attack', damage: 5, description: 'Tackle 5' },
          { type: 'debuff', action: 'debuff', applyWeak: 1, description: 'Lick' }
        ], intentPattern: 'sequential'
      }
    ],
    elite: [
      {
        id: 'gremlin_nob', name: 'Gremlin Nob', hp: 110, emoji: '👹',
        intents: [
          { type: 'attack', action: 'attack', damage: 14, description: 'Skull Bash 14' },
          { type: 'buff', action: 'buff', strength: 2, description: 'Bellow +2 STR' },
          { type: 'attack', action: 'attack', damage: 16, description: 'Rush 16' }
        ], intentPattern: 'sequential'
      },
      {
        id: 'lagavulin', name: 'Lagavulin', hp: 120, emoji: '🗿',
        intents: [
          { type: 'attack', action: 'attack', damage: 18, description: 'Slam 18' },
          { type: 'debuff', action: 'debuff', applyWeak: 2, applyVulnerable: 2, description: 'Siphon' },
          { type: 'attack', action: 'attack', damage: 18, description: 'Slam 18' }
        ], intentPattern: 'sequential'
      }
    ],
    boss: [
      {
        id: 'slime_boss', name: 'Slime Boss', hp: 200, emoji: '👾',
        intents: [
          { type: 'attack', action: 'attack', damage: 20, description: 'Slam 20' },
          { type: 'debuff', action: 'debuff', applyWeak: 2, applyVulnerable: 2, description: 'Prepare' },
          { type: 'attack', action: 'attack', damage: 16, description: 'Tackle 16' },
          { type: 'buff', action: 'buff', strength: 3, description: 'Grow +3 STR' }
        ], intentPattern: 'sequential'
      },
      {
        id: 'hexaghost', name: 'Hexaghost', hp: 250, emoji: '👻',
        intents: [
          { type: 'attack', action: 'attack', damage: 6, hits: 3, description: 'Sear 6x3' },
          { type: 'buff', action: 'buff', strength: 2, description: 'Activate +2 STR' },
          { type: 'attack', action: 'attack', damage: 12, description: 'Divider 12' },
          { type: 'attack', action: 'attack', damage: 6, hits: 3, description: 'Inferno 6x3' }
        ], intentPattern: 'sequential'
      }
    ]
  },

  getEncounter(type, floor) {
    if (type === 'boss') {
      const boss = this.pool.boss[Math.floor(Math.random() * this.pool.boss.length)];
      return [this.createEnemy(boss, floor)];
    }
    if (type === 'elite') {
      const elite = this.pool.elite[Math.floor(Math.random() * this.pool.elite.length)];
      return [this.createEnemy(elite, floor)];
    }
    const count = Math.random() < 0.4 ? 2 : 1;
    const enemies = [];
    for (let i = 0; i < count; i++) {
      const e = this.pool.normal[Math.floor(Math.random() * this.pool.normal.length)];
      enemies.push(this.createEnemy(e, floor));
    }
    return enemies;
  },

  createEnemy(template, floor) {
    const hpScale = 1 + (floor - 1) * 0.08;
    const hp = Math.floor(template.hp * hpScale);
    return {
      ...template,
      uid: template.id + '_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      maxHp: hp, hp: hp, block: 0,
      statusEffects: { poison: 0, weak: 0, vulnerable: 0, strength: 0 },
      intentIndex: 0,
      currentIntent: null
    };
  }
};