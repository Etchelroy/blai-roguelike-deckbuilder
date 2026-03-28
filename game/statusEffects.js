window.StatusEffects = {
  applyPoison(target, amount) {
    target.statusEffects.poison = (target.statusEffects.poison || 0) + amount;
  },
  applyWeak(target, amount) {
    target.statusEffects.weak = (target.statusEffects.weak || 0) + amount;
  },
  applyVulnerable(target, amount) {
    target.statusEffects.vulnerable = (target.statusEffects.vulnerable || 0) + amount;
  },
  applyStrength(target, amount) {
    target.statusEffects.strength = (target.statusEffects.strength || 0) + amount;
  },

  tickPoison(target) {
    if (target.statusEffects.poison > 0) {
      const dmg = target.statusEffects.poison;
      target.hp -= dmg;
      target.statusEffects.poison -= 1;
      return dmg;
    }
    return 0;
  },

  tickDebuffs(target) {
    if (target.statusEffects.weak > 0) target.statusEffects.weak -= 1;
    if (target.statusEffects.vulnerable > 0) target.statusEffects.vulnerable -= 1;
  },

  calculateDamage(baseDamage, attacker, defender) {
    let dmg = baseDamage + (attacker.statusEffects?.strength || 0);
    if (attacker.statusEffects?.weak > 0) dmg = Math.floor(dmg * 0.75);
    if (defender.statusEffects?.vulnerable > 0) dmg = Math.floor(dmg * 1.5);
    return Math.max(0, dmg);
  },

  applyDamageToTarget(target, damage) {
    let remaining = damage;
    if (target.block > 0) {
      if (target.block >= remaining) {
        target.block -= remaining;
        remaining = 0;
      } else {
        remaining -= target.block;
        target.block = 0;
      }
    }
    target.hp -= remaining;
    return remaining;
  }
};