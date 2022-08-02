export enum DamageType {
    aff  = 1,
    burn = 2,
    cor  = 3,
    cr   = 4,
    cut  = 5,
    fat  = 6,
    imp  = 7,
    pim  = 8,
    pi   = 9,
    pip  = 10,
    pipp = 11,
    spec = 12,
    tox  = 13,
}

export enum HitLocation {
    Torso    = 1,
    Vitals   = 2,
    Skull    = 3,
    Eye      = 4,
    Face     = 5,
    Neck     = 6,
    Groin    = 7,
    ArmLeg   = 8,
    HandFoot = 9,
}

export const DEFAULT_DAMAGE_TYPE: number = DamageType.cr;
export const DEFAULT_DAMAGE_REDUCTION: number = 0;
export const DEFAULT_ARMOR_DIVISOR: number = 1;
export const DEFAULT_RELOAD_TURNS: number = 1;
export const DEFAULT_AIM_TURNS: number = 0;
export const DEFAULT_HIT_LOCATION: number = HitLocation.Torso;

export class ImmutableMap<K,V,P> {
    readonly #map: Map<K,V>;
    constructor(getKey?: (p:P) => K, newValue?: (p:P) => V,  props?: Array<P>) {
        this.#map = new Map();
        if (getKey && newValue && props) {
            props.forEach(p => {
                const key = getKey(p);
                if (this.#map.has(key)) {
                    throw new Error(`Attempt to create ImmutableMap with duplicate key '${key}'.`);
                } else {
                    this.#map.set(key, newValue(p));
                }
            });
        }
    }
    get size(): number { return this.#map.size; }
    get(k: K): V | undefined { return this.#map.get(k); }
    [Symbol.iterator](): IterableIterator<[K,V]> { return this.#map[Symbol.iterator](); }
    keys():IterableIterator<K> { return this.#map.keys(); }
    values():IterableIterator<V> { return this.#map.values(); }
}

export interface CombatantProps {
    name: string;
    hitPoints: number;
    damageReduction?: number;
    defenses?: Array<DefenseProps>;
    attacks?: Array<AttackProps>;
}

export class Combatant {
    readonly name: string;
    readonly hitPoints: number;
    readonly damageReduction: number;
    readonly defenses: ImmutableMap<string, Defense, DefenseProps>;
    readonly attacks: ImmutableMap<string, Attack, AttackProps>;
    constructor(props: CombatantProps) {
        this.name = props.name;
        this.hitPoints = props.hitPoints;
        this.damageReduction = props.damageReduction !== undefined ? props.damageReduction : DEFAULT_DAMAGE_REDUCTION;
        if (props.defenses) {
            this.defenses = new ImmutableMap(p => p.name, p => new Defense(p), props.defenses)
        } else {
            this.defenses = new ImmutableMap()
        }
        if (props.attacks) {
            this.attacks = new ImmutableMap(p => p.name, p => new Attack(p), props.attacks)
        } else {
            this.attacks = new ImmutableMap()
        }
    }
}

export interface DefenseProps {
    name: string;
    level: number;
}

export class Defense {
    readonly name: string;
    readonly level: number;
    constructor(props: DefenseProps) {
        this.name = props.name;
        this.level = props.level;
    }
}

export interface AttackProps {
    name: string;
    level: number;
    damage: DamageProps;
    woundModifier?: number;
    armorDivisor?: number;
    hitLocation?: HitLocation;
    ammo?: AmmoProps;
    castSkillLevel?: number;
    fastDrawSkillLevel?: number;

}

export class Attack {
    readonly name: string;
    readonly level: number;
    readonly damage: Damage;
    readonly woundModifier;
    readonly armorDivisor;
    readonly hitLocation: HitLocation;
    readonly ammo?: Ammo;
    readonly castSkillLevel?: number;
    readonly fastDrawSkillLevel?: number;
    constructor(props: AttackProps) {
        this.name = props.name;
        this.level = props.level;
        this.damage = new Damage(props.damage);
        if (props.woundModifier === undefined) {
            switch (this.damage.type) {
                case DamageType.pim: this.woundModifier = 0.5; break;
                case DamageType.cut: case DamageType.pip: this.woundModifier = 1.5; break;
                case DamageType.imp: case DamageType.pipp: this.woundModifier = 2.0; break;
                default: this.woundModifier = 1.0;
            }
        } else {
            this.woundModifier = props.woundModifier;
        }
        this.armorDivisor = props.armorDivisor !== undefined ? props.armorDivisor : DEFAULT_ARMOR_DIVISOR;
        if (props.hitLocation === undefined) {
            this.hitLocation = DEFAULT_HIT_LOCATION;
        } else {
            this.hitLocation = props.hitLocation;
        }

        this.ammo = props.ammo !== undefined ? new Ammo(props.ammo) : undefined;
        this.castSkillLevel = props.castSkillLevel;
        this.fastDrawSkillLevel = props.fastDrawSkillLevel;
    }
}

export interface DamageProps {
    dice: number;
    adds?: number;
    type?: DamageType;
}

export class Damage {
    readonly dice: number;
    readonly adds: number;
    readonly type: DamageType;
    constructor(props: DamageProps) {
        this.dice = props.dice;
        this.adds = props.adds === undefined ? 0 : props.adds;
        if (props.type === undefined) {
            this.type = DEFAULT_DAMAGE_TYPE;
        } else {
            this.type = props.type;
        }
    }
}

export interface AmmoProps {
    shots: number;
    reloadTurns?: number;
    aimTurns?: number;
}

export class Ammo {
    readonly shots: number;
    readonly reloadTurns: number;
    readonly aimTurns: number;
    constructor(props: AmmoProps) {
        this.shots = props.shots;
        this.reloadTurns = props.reloadTurns !== undefined ? props.reloadTurns : DEFAULT_RELOAD_TURNS;
        this.aimTurns = props.aimTurns !== undefined ? props.aimTurns : DEFAULT_AIM_TURNS;
    }
}

export const combatants: readonly Combatant[] = [
    new Combatant({
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
            { name: "Dart",             level: 21,  damage: { dice: 1, adds: -3 }, ammo: { shots: 1 } },
        ],
    }),
    // TODO: Fix The Natural (currently a copy of Nuke LaLoosh)
    new Combatant({
        name: "The Natural",
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
            { name: "Dart",             level: 21,  damage: { dice: 1, adds: -3 }, ammo: { shots: 1 } },
        ],
    }),
    // TODO: Fix Willy Mays Hayes (currently a copy of Nuke LaLoosh)
    new Combatant({
        name: "Willy Mays Hayes",
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
            { name: "Dart",             level: 21,  damage: { dice: 1, adds: -3 }, ammo: { shots: 1 } },
        ],
    }),
    new Combatant({
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
    }),
    // TODO: Fix Smashface (currently a copy of Bruise Cruiser)
    new Combatant({
        name: "Smashface",
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
    }),
    // TODO: Fix Chonkular Dude (currently a copy of Bruise Cruiser)
    new Combatant({
        name: "Chonkular Dude",
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
    }),
]