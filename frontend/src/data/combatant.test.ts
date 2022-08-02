import { Combatant, DamageType, DEFAULT_DAMAGE_TYPE, DEFAULT_DAMAGE_REDUCTION, 
  DEFAULT_ARMOR_DIVISOR, HitLocation, DEFAULT_HIT_LOCATION,
  DEFAULT_RELOAD_TURNS, DEFAULT_AIM_TURNS
} from './combatant';

const luzer = new Combatant({
  name: "Luzer LaGoon",
  hitPoints: 1,
});

const strange = new Combatant({
  name: "Strange LaGrange",
  hitPoints: 6,
  damageReduction: 2,
  defenses: [
    { name: "Strange defense", level: 12 },
  ],
  attacks: [
    { name: "Strange attack", level: 14,  damage: { dice: 2, adds: -3, type: DamageType.spec }, 
      woundModifier: 2, armorDivisor: 3, hitLocation: HitLocation.Vitals,
      ammo: { shots: 1, reloadTurns: 4, aimTurns: 5 } }
  ]
});

const nuke = new Combatant({
  name: "Nuke LaLoosh",
  hitPoints: 12,
  defenses: [
    { name: "Club Parry",              level: 9 },
    { name: "Dodge",                   level: 8 },
    { name: "Off-hand Club Parry",     level: 7 },
    { name: "Fist Parry",              level: 7 },
    { name: "Off-hand Fist Parry",     level: 5 },
    { name: "Club 2nd Parry",          level: 5 },
    { name: "Off-hand Club 2nd Parry", level: 3 },
    { name: "Fist 2nd Parry",          level: 3 },
    { name: "Off-hand Fist 2nd Parry", level: 1 },
  ],
  attacks: [
    { name: "Punch",            level: 9,   damage: { dice: 1, adds: -2 } },
    { name: "Kick",             level: 7,   damage: { dice: 1, adds: -1 } },
    { name: "Club",             level: 13,  damage: { dice: 1, adds: +3 } },
    { name: "Baseball (2 yd)",  level: 21,  damage: { dice: 1, adds: -2 }, ammo: { shots: 1 } },
    { name: "Baseball (3 yd)",  level: 20,  damage: { dice: 1, adds: -2 }, ammo: { shots: 1 } },
    { name: "Baseball (5 yd)",  level: 19,  damage: { dice: 1, adds: -2 }, ammo: { shots: 1 } },
    { name: "Baseball (7 yd)",  level: 18,  damage: { dice: 1, adds: -2 }, ammo: { shots: 1 } },
    { name: "Baseball (10 yd)", level: 17,  damage: { dice: 1, adds: -2 }, ammo: { shots: 1 } },
    { name: "Dart",             level: 21,  damage: { dice: 1, adds: -3, type: DamageType.pim }, ammo: { shots: 1 } },
  ],
});

const bruise = new Combatant({
  name: "Bruise Cruiser",
  hitPoints: 12,
  defenses: [
    { name: "Club Parry",              level: 6 },
    { name: "Dodge",                   level: 8 },
    { name: "Off-hand Club Parry",     level: 4 },
    { name: "Fist Parry",              level: 10 },
    { name: "Off-hand Fist Parry",     level: 8 },
    { name: "Club 2nd Parry",          level: 2 },
    { name: "Off-hand Club 2nd Parry", level: 0 },
    { name: "Fist 2nd Parry",          level: 6 },
    { name: "Off-hand Fist 2nd Parry", level: 4 },
  ],
  attacks: [
    { name: "Punch",            level: 15,   damage: { dice: 1, adds: -2 } },
    { name: "Kick",             level: 13,   damage: { dice: 1, adds: -1 } },
    { name: "Club",             level: 7,    damage: { dice: 1, adds: +3 } },
  ],
});

test('sets defaults correctly', () => {
  expect(luzer.name).toBe("Luzer LaGoon");
  expect(luzer.hitPoints).toBe(1);
  expect(luzer.damageReduction).toBe(DEFAULT_DAMAGE_REDUCTION);
  expect(luzer.defenses.size).toBe(0);
  expect(luzer.attacks.size).toBe(0);

  expect(DEFAULT_DAMAGE_REDUCTION).not.toBe(2);
  expect(strange.damageReduction).toBe(2);

  expect(nuke.defenses.size).toBe(9);
  expect(nuke.defenses.get("Not a defense")).toBeUndefined();
  expect(nuke.defenses.get("Fist Parry")).toBeDefined();
  expect(nuke.defenses.get("Fist Parry")!.name).toBe("Fist Parry");
  expect(nuke.defenses.get("Fist Parry")!.level).toBe(7);

  expect(bruise.attacks.size).toBe(3);
  expect(nuke.attacks.get("Not an attack")).toBeUndefined();
  expect(nuke.attacks.get("Club")).toBeDefined();
  expect(nuke.attacks.get("Club")!.level).toBe(13);
  expect(nuke.attacks.get("Club")!.damage.dice).toBe(1);
  expect(nuke.attacks.get("Club")!.damage.adds).toBe(3);
  expect(nuke.attacks.get("Club")!.damage.type).toBe(DEFAULT_DAMAGE_TYPE);

  expect(nuke.attacks.get("Club")!.woundModifier).toBe(1);
  expect(nuke.attacks.get("Club")!.hitLocation).toBe(DEFAULT_HIT_LOCATION);
  expect(strange.attacks.get("Strange attack")!.damage.type).toBe(DamageType.spec);
  expect(strange.attacks.get("Strange attack")!.woundModifier).toBe(2);
  expect(strange.attacks.get("Strange attack")!.hitLocation).toBe(HitLocation.Vitals);

  expect(nuke.attacks.get("Club")!.armorDivisor).toBe(DEFAULT_ARMOR_DIVISOR);
  expect(DEFAULT_ARMOR_DIVISOR).not.toBe(3);
  expect(strange.attacks.get("Strange attack")!.armorDivisor).toBe(3);

  expect(nuke.attacks.get("Club")!.ammo).toBeUndefined();
  expect(nuke.attacks.get("Dart")!.ammo).toBeDefined();
  expect(nuke.attacks.get("Dart")!.ammo!.shots).toBe(1);
  expect(nuke.attacks.get("Dart")!.ammo!.reloadTurns).toBe(DEFAULT_RELOAD_TURNS);
  expect(nuke.attacks.get("Dart")!.ammo!.aimTurns).toBe(DEFAULT_AIM_TURNS);
  expect(nuke.attacks.get("Dart")!.damage.type).toBe(DamageType.pim);
  expect(strange.attacks.get("Strange attack")!.ammo!.reloadTurns).toBe(4);
  expect(strange.attacks.get("Strange attack")!.ammo!.aimTurns).toBe(5);
});

