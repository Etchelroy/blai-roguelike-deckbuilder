window.CombatEngine = {
  shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },

  initCombat(playerDeck, enemies) {
    const drawPile = this.shuffle(playerDeck.map(c => ({ ...c })));
    return {
      drawPile,
      hand: [],
      discardPile: [],
      exhaustPile: [],
      enemies: enemies.map(e => ({ ...e, currentIntent: this.getNextIntent(e) })),
      energy: 3,
      maxEnergy: 3,
      turn: 1,
      log: [],
      playerPowersActive: { noxious_fumes: 0 }
    };
  },

  getNextIntent(enemy) {
    const intents = enemy.intents;
    let intent;
    if (enemy.intentPattern === 'sequential') {
      intent = intents[enemy.intentIndex % intents.length];
      enemy.intentIndex = (enemy.intentIndex + 1) % intents.length;
    } else {
      intent = intents[Math.floor(Math.random() * intents.length)];
    }
    return { ...intent };
  },

  drawCards(state, count) {
    const newState = { ...state, hand: [...state.hand], drawPile: [...state.drawPile], discardPile: [...state.discardPile] };
    for (let i = 0; i < count; i++) {
      if (newState.drawPile.length === 0) {
        if (newState.discardPile.length === 0) break;
        newState.drawPile = this.shuffle(newState.discardPile);
        newState.discardPile = [];
      }
      if (newState.drawPile.length > 0) {
        newState.hand.push(newState.drawPile.pop());
      }
    }
    return newState;
  },

  startPlayerTurn(state) {
    let s = { ...state, energy: state.maxEnergy, log: [...state.log] };
    // Reset player block is handled externally
    // Apply noxious fumes
    if (s.playerPowersActive.noxious_fumes > 0) {
      s.enemies = s.enemies.map(e => {
        const ne = { ...e, statusEffects: { ...e.statusEffects } };
        StatusEffects.applyPoison(ne, s.playerPowersActive.noxious_fumes);
        return ne;
      });
      s.log.push('Noxious Fumes applies ' + s.playerPowersActive.noxious_fumes + ' Poison to all enemies.');
    }
    s = this.drawCards(s, 


# filename: package.json
```json
{
  "name": "spire-like",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^5.0.0"
  }
}