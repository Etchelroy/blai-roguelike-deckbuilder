window.CardData = {
  allCards: [
    { id: 'strike', name: 'Strike', type: 'attack', cost: 1, damage: 6, description: 'Deal 6 damage.', emoji: '⚔️', upgraded: false, upgradedVersion: { name: 'Strike+', damage: 9, description: 'Deal 9 damage.' } },
    { id: 'defend', name: 'Defend', type: 'skill', cost: 1, block: 5, description: 'Gain 5 Block.', emoji: '🛡️', upgraded: false, upgradedVersion: { name: 'Defend+', block: 8, description: 'Gain 8 Block.' } },
    { id: 'bash', name: 'Bash', type: 'attack', cost: 2, damage: 8, applyVulnerable: 2, description: 'Deal 8 damage. Apply 2 Vulnerable.', emoji: '🔨', upgraded: false, upgradedVersion: { name: 'Bash+', damage: 10, applyVulnerable: 3, description: 'Deal 10 damage. Apply 3 Vulnerable.' } },
    { id: 'cleave', name: 'Cleave', type: 'attack', cost: 1, damage: 8, hitAll: true, description: 'Deal 8 damage to ALL enemies.', emoji: '🪓', upgraded: false, upgradedVersion: { name: 'Cleave+', damage: 11, description: 'Deal 11 damage to ALL enemies.' } },
    { id: 'iron_wave', name: 'Iron Wave', type: 'attack', cost: 1, damage: 5, block: 5, description: 'Gain 5 Block. Deal 5 damage.', emoji: '🌊', upgraded: false, upgradedVersion: { name: 'Iron Wave+', damage: 7, block: 7, description: 'Gain 7 Block. Deal 7 damage.' } },
    { id: 'pommel_strike', name: 'Pommel Strike', type: 'attack', cost: 1, damage: 9, drawCards: 1, description: 'Deal 9 damage. Draw 1 card.', emoji: '👊', upgraded: false, upgradedVersion: { name: 'Pommel Strike+', damage: 10, drawCards: 2, description: 'Deal 10 damage. Draw 2 cards.' } },
    { id: 'shrug_it_off', name: 'Shrug It Off', type: 'skill', cost: 1, block: 8, drawCards: 1, description: 'Gain 8 Block. Draw 1 card.', emoji: '💪', upgraded: false, upgradedVersion: { name: 'Shrug It Off+', block: 11, description: 'Gain 11 Block. Draw 1 card.' } },
    { id: 'inflame', name: 'Inflame', type: 'power', cost: 1, applyStrength: 2, description: 'Gain 2 Strength.', emoji: '🔥', upgraded: false, upgradedVersion: { name: 'Inflame+', applyStrength: 3, description: 'Gain 3 Strength.' } },
    { id: 'poisoned_stab', name: 'Poisoned Stab', type: 'attack', cost: 1, damage: 5, applyPoison: 3, description: 'Deal 5 damage. Apply 3 Poison.', emoji: '🗡️', upgraded: false, upgradedVersion: { name: 'Poisoned Stab+', damage: 7, applyPoison: 4, description: 'Deal 7 damage. Apply 4 Poison.' } },
    { id: 'noxious_fumes', name: 'Noxious Fumes', type: 'power', cost: 1, poisonAllPerTurn: 2, description: 'At the start of your turn, apply 2 Poison to ALL enemies.', emoji: '☠️', upgraded: false, upgradedVersion: { name: 'Noxious Fumes+', poisonAllPerTurn: 3, description: 'At the start of your turn, apply 3 Poison to ALL enemies.' } },
    { id: 'body_slam', name: 'Body Slam', type: 'attack', cost: 1, damageEqualBlock: true, description: 'Deal damage equal to your Block.', emoji: '🏋️', upgraded: false, upgradedVersion: { name: 'Body Slam+', cost: 0, description: 'Deal damage equal to your Block.' } },
    { id: 'bloodletting', name: 'Bloodletting', type: 'skill', cost: 0, selfDamage: 3, gainEnergy: 2, description: 'Lose 3 HP. Gain 2 Energy.', emoji: '🩸', upgraded: false, upgradedVersion: { name: 'Bloodletting+', gainEnergy: 3, description: 'Lose 3 HP. Gain 3 Energy.' } },
    { id: 'anger', name: 'Anger', type: 'attack', cost: 0, damage: 6, addCopyToDiscard: true, description: 'Deal 6 damage. Add a copy to discard.', emoji: '😡', upgraded: false, upgradedVersion: { name: 'Anger+', damage: 8, description: 'Deal 8 damage. Add a copy to discard.' } },
    { id: 'armaments', name: 'Armaments', type: 'skill', cost: 1, block: 5, upgradeOneInHand: true, description: 'Gain 5 Block. Upgrade a card in hand.', emoji: '🔧', upgraded: false, upgradedVersion: { name: 'Armaments+', block: 5, upgradeAllInHand: true, description: 'Gain 5 Block. Upgrade ALL cards in hand.' } },
    { id: 'clothesline', name: 'Clothesline', type: 'attack', cost: 2, damage: 12, applyWeak: 2, description: 'Deal 12 damage. Apply 2 Weak.', emoji: '💥', upgraded: false, upgradedVersion: { name: 'Clothesline+', damage: 14, applyWeak: 3, description: 'Deal 14 damage. Apply 3 Weak.' } },
    { id: 'true_grit', name: 'True Grit', type: 'skill', cost: 1, block: 7, exhaustRandom: 1, description: 'Gain 7 Block. Exhaust a random card.', emoji: '🪨', upgraded: false, upgradedVersion: { name: 'True Grit+', block: 9, description: 'Gain 9 Block. Exhaust a random card.' } },
    { id: 'twin_strike', name: 'Twin Strike', type: 'attack', cost: 1, damage: 5, hits: 2, description: 'Deal 5 damage twice.', emoji: '✌️', upgraded: false, upgradedVersion: { name: 'Twin Strike+', damage: 7, description: 'Deal 7 damage twice.' } },
    { id: 'heavy_blade', name: 'Heavy Blade', type: 'attack', cost: 2, damage: 14, strengthMultiplier: 3, description: 'Deal 14 damage. Strength x3.', emoji: '⚒️', upgraded: false, upgradedVersion: { name: 'Heavy Blade+', damage: 14, strengthMultiplier: 5, description: 'Deal 14 damage. Strength x5.' } },
  ],

  getStarterDeck() {
    const deck = [];
    for (let i = 0; i < 5; i++) deck.push({ ...this.allCards.find(c => c.id === 'strike'), uid: 'strike_' + i });
    for (let i = 0; i < 4; i++) deck.push({ ...this.allCards.find(c => c.id === 'defend'), uid: 'defend_' + i });
    deck.push({ ...this.allCards.find(c => c.id === 'bash'), uid: 'bash_0' });
    return deck;
  },

  getRandomRewards(count, excludeIds) {
    const pool = this.allCards.filter(c => !excludeIds || !excludeIds.includes(c.id));
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count).map((c, i) => ({ ...c, uid: c.id + '_reward_' + Date.now() + '_' + i }));
  },

  getShopCards(count) {
    const shuffled = [...this.allCards].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count).map((c, i) => ({
      ...c, uid: c.id + '_shop_' + Date.now() + '_' + i,
      price: c.type === 'power' ? 120 : c.cost >= 2 ? 100 : 75
    }));
  },

  upgradeCard(card) {
    if (card.upgraded || !card.upgradedVersion) return card;
    const upgraded = { ...card, ...card.upgradedVersion, upgraded: true };
    return upgraded;
  },

  getEffectiveCard(card) {
    return card;
  }
};