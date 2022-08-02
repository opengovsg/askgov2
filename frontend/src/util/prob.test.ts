import { DieRoll, TakeDamage, Calculators } from './prob';
import {Combatant, Attack, DamageType, HitLocation} from "../data/combatant";

test('DieRoll.prob returns correct values', () => {
  expect(DieRoll.prob(0,0)).toBe(0);
  expect(DieRoll.prob(1,0)).toBe(0);
  expect(DieRoll.prob(1,1)).toBe(0.166666666666667);
  expect(DieRoll.prob(1,6)).toBe(0.166666666666667);
  expect(DieRoll.prob(1,7)).toBe(0);
  expect(DieRoll.prob(3,2)).toBe(0);
  expect(DieRoll.prob(3,3)).toBe(0.00462962962962963);
  expect(DieRoll.prob(3,10)).toBe(0.125);
  expect(DieRoll.prob(3,18)).toBe(0.00462962962962963);
  expect(DieRoll.prob(3,19)).toBe(0);
  expect(DieRoll.prob(12,11)).toBe(0);
  expect(DieRoll.prob(12,12)).toBe(4.59393657997783E-10);
  expect(DieRoll.prob(12,42)).toBe(0.0665387960957802);
  expect(DieRoll.prob(12,72)).toBe(4.59393657997783E-10);
  expect(DieRoll.prob(12,73)).toBe(0);
});

test('TakeDamage.prob returns correct values', () => {
  expect(TakeDamage.prob(10, 10)).toBe(0.259259259259259);
  expect(TakeDamage.prob(15, 10)).toBe(0.5);
  expect(TakeDamage.prob(5, 5)).toBe(0.0450102880658436);
  expect(TakeDamage.prob(4, 5)).toBe(0.0185185185185185);
  expect(TakeDamage.prob(3, 5)).toBe(0.0185185185185185);
  expect(TakeDamage.prob(0, 5)).toBe(0.0185185185185185);
  expect(TakeDamage.prob(0, 3)).toBe(0.0185185185185185);
  expect(TakeDamage.prob(0, 0)).toBe(0.0185185185185185);
  expect(TakeDamage.prob(5, 4)).toBe(0.0457818930041152);
  expect(TakeDamage.prob(5, 3)).toBe(0.0457818930041152);
  expect(TakeDamage.prob(5, 0)).toBe(0.0457818930041152);
  expect(TakeDamage.prob(16, 16)).toBe(0.109053497942387);
  expect(TakeDamage.prob(17, 17)).toBe(0.0967721193415639);
  expect(TakeDamage.prob(18, 18)).toBe(0.0967721193415639);
  expect(TakeDamage.prob(100, 100)).toBe(0.0967721193415639);
  expect(TakeDamage.prob(10)).toBe(0.5);
  expect(TakeDamage.prob(3)).toBe(0.018518518518518500);
  expect(TakeDamage.prob(4)).toBe(0.018518518518518500);
  expect(TakeDamage.prob(17)).toBe(0.995370370370370000);
  expect(TakeDamage.prob(18)).toBe(0.995370370370370000);
});

const toleranceDigits = 13;

test('Calculators.expectedDamage test 1d', () => {
  const combatant = new Combatant({ name: "Combatant", hitPoints: 0, damageReduction: 0,
    attacks: [ { name: "attack", level: 10,  damage: { dice: 1 }, woundModifier: 1, armorDivisor: 1, } ],
  });
  expect(Calculators.expectedDamage(combatant,combatant.attacks.get("attack")!,combatant,undefined, true))
      .toBeCloseTo(3.5, toleranceDigits);
});


test('Calculators.expectedDamage test 1dm1', () => {
  const combatant = new Combatant({ name: "Combatant", hitPoints: 0, damageReduction: 0,
    attacks: [ { name: "attack", level: 10,  damage: { dice: 1, adds: -1 }, woundModifier: 1, armorDivisor: 1, } ],
  });
  expect(Calculators.expectedDamage(combatant,combatant.attacks.get("attack")!,combatant,undefined, true))
      .toBeCloseTo(2.5, toleranceDigits);
});


test('Calculators.expectedDamage test 1dm2', () => {
  const combatant = new Combatant({ name: "Combatant", hitPoints: 0, damageReduction: 0,
    attacks: [ { name: "attack", level: 10,  damage: { dice: 1, adds: -2 }, woundModifier: 1, armorDivisor: 1, } ],
  });
  expect(Calculators.expectedDamage(combatant,combatant.attacks.get("attack")!,combatant,undefined, true))
      .toBeCloseTo(1.666666666666670, toleranceDigits);
});


test('Calculators.expectedDamage test 1dm3', () => {
  const combatant = new Combatant({ name: "Combatant", hitPoints: 0, damageReduction: 0,
    attacks: [ { name: "attack", level: 10,  damage: { dice: 1, adds: -3 }, woundModifier: 1, armorDivisor: 1, } ],
  });
  expect(Calculators.expectedDamage(combatant,combatant.attacks.get("attack")!,combatant,undefined, true))
      .toBeCloseTo(1.0, toleranceDigits);
});

test('Calculators.expectedDamage test 1dm3pi', () => {
  const combatant = new Combatant({ name: "Combatant", hitPoints: 0, damageReduction: 0,
    attacks: [ { name: "attack", level: 10,  damage: { dice: 1, adds: -3, type: DamageType.pi }, armorDivisor: 1, } ],
  });
  expect(Calculators.expectedDamage(combatant,combatant.attacks.get("attack")!,combatant,undefined, true))
      .toBeCloseTo(1.5, toleranceDigits);
});

test('Calculators.expectedDamage test 1dm3pim', () => {
  const combatant = new Combatant({ name: "Combatant", hitPoints: 0, damageReduction: 0,
    attacks: [ { name: "attack", level: 10,  damage: { dice: 1, adds: -3, type: DamageType.pim }, armorDivisor: 1, } ],
  });
  expect(Calculators.expectedDamage(combatant,combatant.attacks.get("attack")!,combatant,undefined, true))
      .toBeCloseTo(1, toleranceDigits);
});

test('Calculators.expectedDamage test 1dm3piSkull', () => {
  const combatant = new Combatant({ name: "Combatant", hitPoints: 0, damageReduction: 0,
    attacks: [ { name: "attack", level: 10,  damage: { dice: 1, adds: -3, type: DamageType.pi }, armorDivisor: 1, hitLocation: HitLocation.Skull, } ],
  });
  expect(Calculators.expectedDamage(combatant,combatant.attacks.get("attack")!,combatant,undefined, true))
      .toBeCloseTo(0.6666666666666666667, toleranceDigits);
});


test('Calculators.expectedDamage test 1dm4', () => {
  const combatant = new Combatant({ name: "Combatant", hitPoints: 0, damageReduction: 0,
    attacks: [ { name: "attack", level: 10,  damage: { dice: 1, adds: -4 }, woundModifier: 1, armorDivisor: 1, } ],
  });
  expect(Calculators.expectedDamage(combatant,combatant.attacks.get("attack")!,combatant,undefined, true))
      .toBeCloseTo(0.5, toleranceDigits);
});


test('Calculators.expectedDamage test 1dm5', () => {
  const combatant = new Combatant({ name: "Combatant", hitPoints: 0, damageReduction: 0,
    attacks: [ { name: "attack", level: 10,  damage: { dice: 1, adds: -5 }, woundModifier: 1, armorDivisor: 1, } ],
  });
  expect(Calculators.expectedDamage(combatant,combatant.attacks.get("attack")!,combatant,undefined, true))
      .toBeCloseTo(0.1666666666666670, toleranceDigits);
});


test('Calculators.expectedDamage test 1dm6', () => {
  const combatant = new Combatant({ name: "Combatant", hitPoints: 0, damageReduction: 0,
    attacks: [ { name: "attack", level: 10,  damage: { dice: 1, adds: -6 }, woundModifier: 1, armorDivisor: 1, } ],
  });
  expect(Calculators.expectedDamage(combatant,combatant.attacks.get("attack")!,combatant,undefined, true))
      .toBeCloseTo(0.0, toleranceDigits);
});

test('Calculators.expectedDamage test 1dm6tox', () => {
  const combatant = new Combatant({ name: "Combatant", hitPoints: 0, damageReduction: 0,
    attacks: [ { name: "attack", level: 10,  damage: { dice: 1, adds: -6, type: DamageType.tox }, woundModifier: 1, armorDivisor: 1, } ],
  });
  expect(Calculators.expectedDamage(combatant,combatant.attacks.get("attack")!,combatant,undefined, true))
      .toBeCloseTo(1.0, toleranceDigits);
});

test('Calculators.expectedDamage test 3d', () => {
  const combatant = new Combatant({ name: "Combatant", hitPoints: 0, damageReduction: 2,
    attacks: [ { name: "attack", level: 10,  damage: { dice: 3 }, woundModifier: 1, armorDivisor: 1, } ],
  });
  expect(Calculators.expectedDamage(combatant,combatant.attacks.get("attack")!,combatant,undefined, true))
      .toBeCloseTo(8.5, toleranceDigits);
});


test('Calculators.expectedDamage test 3dm6', () => {
  const combatant = new Combatant({ name: "Combatant", hitPoints: 0, damageReduction: 2,
    attacks: [ { name: "attack", level: 10,  damage: { dice: 3, adds: -6 }, woundModifier: 1, armorDivisor: 1, } ],
  });
  expect(Calculators.expectedDamage(combatant,combatant.attacks.get("attack")!,combatant,undefined, true))
      .toBeCloseTo(2.824074074074070, toleranceDigits);
});


test('Calculators.expectedDamage test 3dm1ad2', () => {
  const combatant = new Combatant({ name: "Combatant", hitPoints: 0, damageReduction: 2,
    attacks: [ { name: "attack", level: 10,  damage: { dice: 3, adds: -1 }, woundModifier: 1, armorDivisor: 2, } ],
  });
  expect(Calculators.expectedDamage(combatant,combatant.attacks.get("attack")!,combatant,undefined, true))
      .toBeCloseTo(8.5, toleranceDigits);
});


test('Calculators.expectedDamage test 3dm7ad2', () => {
  const combatant = new Combatant({ name: "Combatant", hitPoints: 0, damageReduction: 2,
    attacks: [ { name: "attack", level: 10,  damage: { dice: 3, adds: -7 }, woundModifier: 1, armorDivisor: 2, } ],
  });
  expect(Calculators.expectedDamage(combatant,combatant.attacks.get("attack")!,combatant,undefined, true))
      .toBeCloseTo(2.824074074074070, toleranceDigits);
});


test('Calculators.expectedDamage test 3dm1ad2wm1p5', () => {
  const combatant = new Combatant({ name: "Combatant", hitPoints: 0, damageReduction: 2,
    attacks: [ { name: "attack", level: 10,  damage: { dice: 3, adds: -1 }, woundModifier: 1.5, armorDivisor: 2, } ],
  });
  expect(Calculators.expectedDamage(combatant,combatant.attacks.get("attack")!,combatant,undefined, true))
      .toBeCloseTo(12.5, toleranceDigits);
});


test('Calculators.expectedDamage test 3dm7ad2wm1p5', () => {
  const combatant = new Combatant({ name: "Combatant", hitPoints: 0, damageReduction: 2,
    attacks: [ { name: "attack", level: 10,  damage: { dice: 3, adds: -7 }, woundModifier: 1.5, armorDivisor: 2, } ],
  });
  expect(Calculators.expectedDamage(combatant,combatant.attacks.get("attack")!,combatant,undefined, true))
      .toBeCloseTo(4.037037037037040, toleranceDigits);
});

test('Calculators.expectedDamage test realchance1', () => {
  const combatant = new Combatant({ name: "Combatant", hitPoints: 0, damageReduction: 2,
    attacks: [ { name: "attack", level: 10,  damage: { dice: 3 }, woundModifier: 1, armorDivisor: 2, } ],
    defenses: [ { name: "defense", level: 10 }, ],
  });
  expect(Calculators.expectedDamage(combatant,combatant.attacks.get("attack")!,combatant,combatant.defenses.get("defense")!))
      .toBeCloseTo(2.462962962962970, toleranceDigits);
});

test('Calculators.expectedDamage test realchance2', () => {
  const combatant = new Combatant({ name: "Combatant", hitPoints: 0, damageReduction: 2,
    attacks: [ { name: "attack", level: 14,  damage: { dice: 3, adds: 4 }, woundModifier: 1.5, armorDivisor: 2, } ],
    defenses: [ { name: "defense", level: 15 }, ],
  });
  expect(Calculators.expectedDamage(combatant,combatant.attacks.get("attack")!,combatant,combatant.defenses.get("defense")!))
      .toBeCloseTo(1.193415637860080, toleranceDigits);
});

test('Calculators.expectedDamage test nodef1', () => {
  const combatant = new Combatant({ name: "Combatant", hitPoints: 0, damageReduction: 2,
    attacks: [ { name: "attack", level: 13,  damage: { dice: 2, adds: -2 }, woundModifier: 1, armorDivisor: 2, } ],
  });
  expect(Calculators.expectedDamage(combatant,combatant.attacks.get("attack")!,combatant))
      .toBeCloseTo(3.375128600823050000, toleranceDigits);
});

test('Calculators.expectedDamage test nodef2', () => {
  const combatant = new Combatant({ name: "Combatant", hitPoints: 0, damageReduction: 1,
    attacks: [ { name: "attack", level: 6,  damage: { dice: 3, adds: +3 }, woundModifier: 1, armorDivisor: 0.5, } ],
  });
  expect(Calculators.expectedDamage(combatant,combatant.attacks.get("attack")!,combatant))
      .toBeCloseTo(1.064814814814820000, toleranceDigits);
});

test('Calculators.expectedAttacks test 0rt', () => {
  const attack = new Attack({ name: "attack", level: 9,  damage: { dice: 0 } });
  expect(Calculators.expectedAttacks(attack)).toBeCloseTo(1.0, toleranceDigits);
});

test('Calculators.expectedAttacks test 0rt2sh', () => {
  const attack = new Attack({ name: "attack", level: 9,  damage: { dice: 0 }, ammo: { shots: 2, reloadTurns: 0 }});
  expect(Calculators.expectedAttacks(attack)).toBeCloseTo(1.0, toleranceDigits);
});

test('Calculators.expectedAttacks test 0rt10fd', () => {
  const attack = new Attack({ name: "attack", level: 9,  damage: { dice: 0 }, fastDrawSkillLevel: 10});
  expect(Calculators.expectedAttacks(attack)).toBeCloseTo(1.0, toleranceDigits);
});

test('Calculators.expectedAttacks test 0rt10cs', () => {
  const attack = new Attack({ name: "attack", level: 9,  damage: { dice: 0 }, castSkillLevel: 10});
  expect(Calculators.expectedAttacks(attack)).toBeCloseTo(1.0, toleranceDigits);
});

test('Calculators.expectedAttacks test 1rt', () => {
  const attack = new Attack({ name: "attack", level: 9,  damage: { dice: 0 }, ammo: { shots: 1, reloadTurns: 1 }});
  expect(Calculators.expectedAttacks(attack)).toBeCloseTo(0.5, toleranceDigits);
});

test('Calculators.expectedAttacks test 1rt10fd', () => {
  const attack = new Attack({ name: "attack", level: 9,  damage: { dice: 0 }, fastDrawSkillLevel: 10, ammo: { shots: 1, reloadTurns: 1 }});
  expect(Calculators.expectedAttacks(attack)).toBeCloseTo(0.666666666666666600, toleranceDigits);
});

test('Calculators.expectedAttacks test 1rt10cs', () => {
  const attack = new Attack({ name: "attack", level: 9,  damage: { dice: 0 }, castSkillLevel: 10, ammo: { shots: 1, reloadTurns: 1 }});
  expect(Calculators.expectedAttacks(attack)).toBeCloseTo(0.333333333333333300, toleranceDigits);
});

test('Calculators.expectedAttacks test 2rt', () => {
  const attack = new Attack({ name: "attack", level: 9,  damage: { dice: 0 }, ammo: { shots: 1, reloadTurns: 2 }});
  expect(Calculators.expectedAttacks(attack)).toBeCloseTo(0.333333333333333300, toleranceDigits);
});

test('Calculators.expectedAttacks test 2rt10fd', () => {
  const attack = new Attack({ name: "attack", level: 9,  damage: { dice: 0 }, fastDrawSkillLevel: 10, ammo: { shots: 1, reloadTurns: 2 }});
  expect(Calculators.expectedAttacks(attack)).toBeCloseTo(0.5, toleranceDigits);
});

test('Calculators.expectedAttacks test 2rt10cs', () => {
  const attack = new Attack({ name: "attack", level: 9,  damage: { dice: 0 }, castSkillLevel: 10, ammo: { shots: 1, reloadTurns: 2 }});
  expect(Calculators.expectedAttacks(attack)).toBeCloseTo(0.2, toleranceDigits);
});

test('Calculators.expectedAttacks test 2rt3fd', () => {
  const attack = new Attack({ name: "attack", level: 9,  damage: { dice: 0 }, fastDrawSkillLevel: 3, ammo: { shots: 1, reloadTurns: 2 }});
  expect(Calculators.expectedAttacks(attack)).toBeCloseTo(0.337500000000000000, toleranceDigits);
});

test('Calculators.expectedAttacks test 2rt3cs', () => {
  const attack = new Attack({ name: "attack", level: 9,  damage: { dice: 0 }, castSkillLevel: 3, ammo: { shots: 1, reloadTurns: 2 }});
  expect(Calculators.expectedAttacks(attack)).toBeCloseTo(0.009174311926605510, toleranceDigits);
});

test('Calculators.expectedAttacks test 2rt4fd', () => {
  const attack = new Attack({ name: "attack", level: 9,  damage: { dice: 0 }, fastDrawSkillLevel: 4, ammo: { shots: 1, reloadTurns: 2 }});
  expect(Calculators.expectedAttacks(attack)).toBeCloseTo(0.337500000000000000, toleranceDigits);
});

test('Calculators.expectedAttacks test 2rt4cs', () => {
  const attack = new Attack({ name: "attack", level: 9,  damage: { dice: 0 }, castSkillLevel: 4, ammo: { shots: 1, reloadTurns: 2 }});
  expect(Calculators.expectedAttacks(attack)).toBeCloseTo(0.009174311926605510, toleranceDigits);
});

test('Calculators.expectedAttacks test 2rt17fd', () => {
  const attack = new Attack({ name: "attack", level: 9,  damage: { dice: 0 }, fastDrawSkillLevel: 17, ammo: { shots: 1, reloadTurns: 2 }});
  expect(Calculators.expectedAttacks(attack)).toBeCloseTo(0.990825688073394000, toleranceDigits);
});

test('Calculators.expectedAttacks test 2rt17cs', () => {
  const attack = new Attack({ name: "attack", level: 9,  damage: { dice: 0 }, castSkillLevel: 17, ammo: { shots: 1, reloadTurns: 2 }});
  expect(Calculators.expectedAttacks(attack)).toBeCloseTo(0.332302936630603000, toleranceDigits);
});

test('Calculators.expectedAttacks test 2rt18fd', () => {
  const attack = new Attack({ name: "attack", level: 9,  damage: { dice: 0 }, fastDrawSkillLevel: 18, ammo: { shots: 1, reloadTurns: 2 }});
  expect(Calculators.expectedAttacks(attack)).toBeCloseTo(0.990825688073394000, toleranceDigits);
});

test('Calculators.expectedAttacks test 2rt18cs', () => {
  const attack = new Attack({ name: "attack", level: 9,  damage: { dice: 0 }, castSkillLevel: 18, ammo: { shots: 1, reloadTurns: 2 }});
  expect(Calculators.expectedAttacks(attack)).toBeCloseTo(0.332302936630603000, toleranceDigits);
});

test('Calculators.expectedAttacks test 1rt1atu', () => {
  const attack = new Attack({ name: "attack", level: 9,  damage: { dice: 0 }, ammo: { shots: 1, reloadTurns: 1, aimTurns:1 }});
  expect(Calculators.expectedAttacks(attack)).toBeCloseTo(0.333333333333333300, toleranceDigits);
});

test('Calculators.expectedAttacks test 1rt1atu10fd', () => {
  const attack = new Attack({ name: "attack", level: 9,  damage: { dice: 0 }, fastDrawSkillLevel: 10, ammo: { shots: 1, reloadTurns: 1, aimTurns:1 }});
  expect(Calculators.expectedAttacks(attack)).toBeCloseTo(0.4, toleranceDigits);
});

test('Calculators.expectedAttacks test 1rt1atu10cs', () => {
  const attack = new Attack({ name: "attack", level: 9,  damage: { dice: 0 }, castSkillLevel: 10, ammo: { shots: 1, reloadTurns: 1, aimTurns:1 }});
  expect(Calculators.expectedAttacks(attack)).toBeCloseTo(0.25, toleranceDigits);
});


