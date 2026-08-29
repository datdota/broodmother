import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace spectate. */
export namespace spectate {

    /** Properties of an EntityFrame. */
    interface IEntityFrame {

        /** EntityFrame serverTick */
        serverTick?: (number|null);

        /** EntityFrame gameTime */
        gameTime?: (number|null);

        /** EntityFrame gameLive */
        gameLive?: (boolean|null);

        /** EntityFrame units */
        units?: (spectate.IUnit[]|null);

        /** EntityFrame match */
        match?: (spectate.IMatchLite|null);

        /** EntityFrame players */
        players?: (spectate.IPlayerStat[]|null);

        /** EntityFrame events */
        events?: (spectate.IGameEvent[]|null);

        /** EntityFrame projectiles */
        projectiles?: (spectate.IProjectile[]|null);

        /** EntityFrame projectileDestroys */
        projectileDestroys?: (number[]|null);
    }

    /** Represents an EntityFrame. */
    class EntityFrame implements IEntityFrame {

        /**
         * Constructs a new EntityFrame.
         * @param [properties] Properties to set
         */
        constructor(properties?: spectate.IEntityFrame);

        /** EntityFrame serverTick. */
        public serverTick: number;

        /** EntityFrame gameTime. */
        public gameTime: number;

        /** EntityFrame gameLive. */
        public gameLive: boolean;

        /** EntityFrame units. */
        public units: spectate.IUnit[];

        /** EntityFrame match. */
        public match?: (spectate.IMatchLite|null);

        /** EntityFrame players. */
        public players: spectate.IPlayerStat[];

        /** EntityFrame events. */
        public events: spectate.IGameEvent[];

        /** EntityFrame projectiles. */
        public projectiles: spectate.IProjectile[];

        /** EntityFrame projectileDestroys. */
        public projectileDestroys: number[];

        /**
         * Creates a new EntityFrame instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EntityFrame instance
         */
        public static create(properties?: spectate.IEntityFrame): spectate.EntityFrame;

        /**
         * Encodes the specified EntityFrame message. Does not implicitly {@link spectate.EntityFrame.verify|verify} messages.
         * @param message EntityFrame message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: spectate.IEntityFrame, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EntityFrame message, length delimited. Does not implicitly {@link spectate.EntityFrame.verify|verify} messages.
         * @param message EntityFrame message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: spectate.IEntityFrame, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EntityFrame message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EntityFrame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): spectate.EntityFrame;

        /**
         * Decodes an EntityFrame message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EntityFrame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): spectate.EntityFrame;

        /**
         * Verifies an EntityFrame message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EntityFrame message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EntityFrame
         */
        public static fromObject(object: { [k: string]: any }): spectate.EntityFrame;

        /**
         * Creates a plain object from an EntityFrame message. Also converts values to other types if specified.
         * @param message EntityFrame
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: spectate.EntityFrame, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EntityFrame to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for EntityFrame
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Projectile. */
    interface IProjectile {

        /** Projectile handle */
        handle?: (number|null);

        /** Projectile source */
        source?: (number|null);

        /** Projectile target */
        target?: (number|null);

        /** Projectile targetX */
        targetX?: (number|null);

        /** Projectile targetY */
        targetY?: (number|null);

        /** Projectile speed */
        speed?: (number|null);

        /** Projectile isAttack */
        isAttack?: (boolean|null);

        /** Projectile linear */
        linear?: (boolean|null);

        /** Projectile originX */
        originX?: (number|null);

        /** Projectile originY */
        originY?: (number|null);

        /** Projectile velX */
        velX?: (number|null);

        /** Projectile velY */
        velY?: (number|null);

        /** Projectile distance */
        distance?: (number|null);
    }

    /** Represents a Projectile. */
    class Projectile implements IProjectile {

        /**
         * Constructs a new Projectile.
         * @param [properties] Properties to set
         */
        constructor(properties?: spectate.IProjectile);

        /** Projectile handle. */
        public handle: number;

        /** Projectile source. */
        public source: number;

        /** Projectile target. */
        public target: number;

        /** Projectile targetX. */
        public targetX: number;

        /** Projectile targetY. */
        public targetY: number;

        /** Projectile speed. */
        public speed: number;

        /** Projectile isAttack. */
        public isAttack: boolean;

        /** Projectile linear. */
        public linear: boolean;

        /** Projectile originX. */
        public originX: number;

        /** Projectile originY. */
        public originY: number;

        /** Projectile velX. */
        public velX: number;

        /** Projectile velY. */
        public velY: number;

        /** Projectile distance. */
        public distance: number;

        /**
         * Creates a new Projectile instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Projectile instance
         */
        public static create(properties?: spectate.IProjectile): spectate.Projectile;

        /**
         * Encodes the specified Projectile message. Does not implicitly {@link spectate.Projectile.verify|verify} messages.
         * @param message Projectile message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: spectate.IProjectile, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Projectile message, length delimited. Does not implicitly {@link spectate.Projectile.verify|verify} messages.
         * @param message Projectile message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: spectate.IProjectile, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Projectile message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Projectile
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): spectate.Projectile;

        /**
         * Decodes a Projectile message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Projectile
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): spectate.Projectile;

        /**
         * Verifies a Projectile message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Projectile message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Projectile
         */
        public static fromObject(object: { [k: string]: any }): spectate.Projectile;

        /**
         * Creates a plain object from a Projectile message. Also converts values to other types if specified.
         * @param message Projectile
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: spectate.Projectile, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Projectile to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Projectile
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a GameEvent. */
    interface IGameEvent {

        /** GameEvent time */
        time?: (number|null);

        /** GameEvent kind */
        kind?: (string|null);

        /** GameEvent text */
        text?: (string|null);

        /** GameEvent x */
        x?: (number|null);

        /** GameEvent y */
        y?: (number|null);
    }

    /** Represents a GameEvent. */
    class GameEvent implements IGameEvent {

        /**
         * Constructs a new GameEvent.
         * @param [properties] Properties to set
         */
        constructor(properties?: spectate.IGameEvent);

        /** GameEvent time. */
        public time: number;

        /** GameEvent kind. */
        public kind: string;

        /** GameEvent text. */
        public text: string;

        /** GameEvent x. */
        public x: number;

        /** GameEvent y. */
        public y: number;

        /**
         * Creates a new GameEvent instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GameEvent instance
         */
        public static create(properties?: spectate.IGameEvent): spectate.GameEvent;

        /**
         * Encodes the specified GameEvent message. Does not implicitly {@link spectate.GameEvent.verify|verify} messages.
         * @param message GameEvent message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: spectate.IGameEvent, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GameEvent message, length delimited. Does not implicitly {@link spectate.GameEvent.verify|verify} messages.
         * @param message GameEvent message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: spectate.IGameEvent, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GameEvent message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GameEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): spectate.GameEvent;

        /**
         * Decodes a GameEvent message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GameEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): spectate.GameEvent;

        /**
         * Verifies a GameEvent message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GameEvent message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GameEvent
         */
        public static fromObject(object: { [k: string]: any }): spectate.GameEvent;

        /**
         * Creates a plain object from a GameEvent message. Also converts values to other types if specified.
         * @param message GameEvent
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: spectate.GameEvent, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GameEvent to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GameEvent
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PlayerStat. */
    interface IPlayerStat {

        /** PlayerStat slot */
        slot?: (number|null);

        /** PlayerStat team */
        team?: (number|null);

        /** PlayerStat heroId */
        heroId?: (number|null);

        /** PlayerStat name */
        name?: (string|null);

        /** PlayerStat kills */
        kills?: (number|null);

        /** PlayerStat deaths */
        deaths?: (number|null);

        /** PlayerStat assists */
        assists?: (number|null);

        /** PlayerStat lastHits */
        lastHits?: (number|null);

        /** PlayerStat denies */
        denies?: (number|null);

        /** PlayerStat netWorth */
        netWorth?: (number|null);

        /** PlayerStat gold */
        gold?: (number|null);

        /** PlayerStat gpm */
        gpm?: (number|null);

        /** PlayerStat xpm */
        xpm?: (number|null);

        /** PlayerStat buybackCooldown */
        buybackCooldown?: (number|null);
    }

    /** Represents a PlayerStat. */
    class PlayerStat implements IPlayerStat {

        /**
         * Constructs a new PlayerStat.
         * @param [properties] Properties to set
         */
        constructor(properties?: spectate.IPlayerStat);

        /** PlayerStat slot. */
        public slot: number;

        /** PlayerStat team. */
        public team: number;

        /** PlayerStat heroId. */
        public heroId: number;

        /** PlayerStat name. */
        public name: string;

        /** PlayerStat kills. */
        public kills: number;

        /** PlayerStat deaths. */
        public deaths: number;

        /** PlayerStat assists. */
        public assists: number;

        /** PlayerStat lastHits. */
        public lastHits: number;

        /** PlayerStat denies. */
        public denies: number;

        /** PlayerStat netWorth. */
        public netWorth: number;

        /** PlayerStat gold. */
        public gold: number;

        /** PlayerStat gpm. */
        public gpm: number;

        /** PlayerStat xpm. */
        public xpm: number;

        /** PlayerStat buybackCooldown. */
        public buybackCooldown: number;

        /**
         * Creates a new PlayerStat instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PlayerStat instance
         */
        public static create(properties?: spectate.IPlayerStat): spectate.PlayerStat;

        /**
         * Encodes the specified PlayerStat message. Does not implicitly {@link spectate.PlayerStat.verify|verify} messages.
         * @param message PlayerStat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: spectate.IPlayerStat, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PlayerStat message, length delimited. Does not implicitly {@link spectate.PlayerStat.verify|verify} messages.
         * @param message PlayerStat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: spectate.IPlayerStat, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PlayerStat message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PlayerStat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): spectate.PlayerStat;

        /**
         * Decodes a PlayerStat message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PlayerStat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): spectate.PlayerStat;

        /**
         * Verifies a PlayerStat message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PlayerStat message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PlayerStat
         */
        public static fromObject(object: { [k: string]: any }): spectate.PlayerStat;

        /**
         * Creates a plain object from a PlayerStat message. Also converts values to other types if specified.
         * @param message PlayerStat
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: spectate.PlayerStat, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PlayerStat to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PlayerStat
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** UnitType enum. */
    enum UnitType {
        UNIT_UNKNOWN = 0,
        HERO = 1,
        ILLUSION = 2,
        CREEP = 3,
        NEUTRAL = 4,
        WARD_OBS = 5,
        WARD_SEN = 6,
        BUILDING = 7,
        COURIER = 8,
        ROSHAN = 9
    }

    /** Properties of an Unit. */
    interface IUnit {

        /** Unit handle */
        handle?: (number|null);

        /** Unit type */
        type?: (spectate.UnitType|null);

        /** Unit x */
        x?: (number|null);

        /** Unit y */
        y?: (number|null);

        /** Unit yaw */
        yaw?: (number|null);

        /** Unit team */
        team?: (number|null);

        /** Unit hp */
        hp?: (number|null);

        /** Unit maxHp */
        maxHp?: (number|null);

        /** Unit flags */
        flags?: (number|null);

        /** Unit heroId */
        heroId?: (number|null);

        /** Unit playerSlot */
        playerSlot?: (number|null);

        /** Unit level */
        level?: (number|null);

        /** Unit mp */
        mp?: (number|null);

        /** Unit maxMp */
        maxMp?: (number|null);

        /** Unit unitName */
        unitName?: (string|null);

        /** Unit respawnTime */
        respawnTime?: (number|null);

        /** Unit items */
        items?: (string[]|null);

        /** Unit modelScale */
        modelScale?: (number|null);

        /** Unit abilities */
        abilities?: (spectate.IAbility[]|null);

        /** Unit strength */
        strength?: (number|null);

        /** Unit agility */
        agility?: (number|null);

        /** Unit intellect */
        intellect?: (number|null);

        /** Unit moveSpeed */
        moveSpeed?: (number|null);

        /** Unit activity */
        activity?: (number|null);
    }

    /** Represents an Unit. */
    class Unit implements IUnit {

        /**
         * Constructs a new Unit.
         * @param [properties] Properties to set
         */
        constructor(properties?: spectate.IUnit);

        /** Unit handle. */
        public handle: number;

        /** Unit type. */
        public type: spectate.UnitType;

        /** Unit x. */
        public x: number;

        /** Unit y. */
        public y: number;

        /** Unit yaw. */
        public yaw: number;

        /** Unit team. */
        public team: number;

        /** Unit hp. */
        public hp: number;

        /** Unit maxHp. */
        public maxHp: number;

        /** Unit flags. */
        public flags: number;

        /** Unit heroId. */
        public heroId: number;

        /** Unit playerSlot. */
        public playerSlot: number;

        /** Unit level. */
        public level: number;

        /** Unit mp. */
        public mp: number;

        /** Unit maxMp. */
        public maxMp: number;

        /** Unit unitName. */
        public unitName: string;

        /** Unit respawnTime. */
        public respawnTime: number;

        /** Unit items. */
        public items: string[];

        /** Unit modelScale. */
        public modelScale: number;

        /** Unit abilities. */
        public abilities: spectate.IAbility[];

        /** Unit strength. */
        public strength: number;

        /** Unit agility. */
        public agility: number;

        /** Unit intellect. */
        public intellect: number;

        /** Unit moveSpeed. */
        public moveSpeed: number;

        /** Unit activity. */
        public activity: number;

        /**
         * Creates a new Unit instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Unit instance
         */
        public static create(properties?: spectate.IUnit): spectate.Unit;

        /**
         * Encodes the specified Unit message. Does not implicitly {@link spectate.Unit.verify|verify} messages.
         * @param message Unit message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: spectate.IUnit, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Unit message, length delimited. Does not implicitly {@link spectate.Unit.verify|verify} messages.
         * @param message Unit message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: spectate.IUnit, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Unit message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Unit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): spectate.Unit;

        /**
         * Decodes an Unit message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Unit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): spectate.Unit;

        /**
         * Verifies an Unit message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Unit message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Unit
         */
        public static fromObject(object: { [k: string]: any }): spectate.Unit;

        /**
         * Creates a plain object from an Unit message. Also converts values to other types if specified.
         * @param message Unit
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: spectate.Unit, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Unit to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Unit
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an Ability. */
    interface IAbility {

        /** Ability name */
        name?: (string|null);

        /** Ability level */
        level?: (number|null);

        /** Ability cooldownEnd */
        cooldownEnd?: (number|null);

        /** Ability cooldownLength */
        cooldownLength?: (number|null);
    }

    /** Represents an Ability. */
    class Ability implements IAbility {

        /**
         * Constructs a new Ability.
         * @param [properties] Properties to set
         */
        constructor(properties?: spectate.IAbility);

        /** Ability name. */
        public name: string;

        /** Ability level. */
        public level: number;

        /** Ability cooldownEnd. */
        public cooldownEnd: number;

        /** Ability cooldownLength. */
        public cooldownLength: number;

        /**
         * Creates a new Ability instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Ability instance
         */
        public static create(properties?: spectate.IAbility): spectate.Ability;

        /**
         * Encodes the specified Ability message. Does not implicitly {@link spectate.Ability.verify|verify} messages.
         * @param message Ability message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: spectate.IAbility, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Ability message, length delimited. Does not implicitly {@link spectate.Ability.verify|verify} messages.
         * @param message Ability message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: spectate.IAbility, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Ability message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Ability
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): spectate.Ability;

        /**
         * Decodes an Ability message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Ability
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): spectate.Ability;

        /**
         * Verifies an Ability message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Ability message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Ability
         */
        public static fromObject(object: { [k: string]: any }): spectate.Ability;

        /**
         * Creates a plain object from an Ability message. Also converts values to other types if specified.
         * @param message Ability
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: spectate.Ability, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Ability to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Ability
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a MatchLite. */
    interface IMatchLite {

        /** MatchLite radiantScore */
        radiantScore?: (number|null);

        /** MatchLite direScore */
        direScore?: (number|null);

        /** MatchLite dayTime */
        dayTime?: (boolean|null);
    }

    /** Represents a MatchLite. */
    class MatchLite implements IMatchLite {

        /**
         * Constructs a new MatchLite.
         * @param [properties] Properties to set
         */
        constructor(properties?: spectate.IMatchLite);

        /** MatchLite radiantScore. */
        public radiantScore: number;

        /** MatchLite direScore. */
        public direScore: number;

        /** MatchLite dayTime. */
        public dayTime: boolean;

        /**
         * Creates a new MatchLite instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MatchLite instance
         */
        public static create(properties?: spectate.IMatchLite): spectate.MatchLite;

        /**
         * Encodes the specified MatchLite message. Does not implicitly {@link spectate.MatchLite.verify|verify} messages.
         * @param message MatchLite message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: spectate.IMatchLite, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MatchLite message, length delimited. Does not implicitly {@link spectate.MatchLite.verify|verify} messages.
         * @param message MatchLite message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: spectate.IMatchLite, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MatchLite message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MatchLite
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): spectate.MatchLite;

        /**
         * Decodes a MatchLite message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MatchLite
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): spectate.MatchLite;

        /**
         * Verifies a MatchLite message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MatchLite message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MatchLite
         */
        public static fromObject(object: { [k: string]: any }): spectate.MatchLite;

        /**
         * Creates a plain object from a MatchLite message. Also converts values to other types if specified.
         * @param message MatchLite
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: spectate.MatchLite, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MatchLite to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MatchLite
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Batch. */
    interface IBatch {

        /** Batch msgs */
        msgs?: (spectate.IStreamMsg[]|null);
    }

    /** Represents a Batch. */
    class Batch implements IBatch {

        /**
         * Constructs a new Batch.
         * @param [properties] Properties to set
         */
        constructor(properties?: spectate.IBatch);

        /** Batch msgs. */
        public msgs: spectate.IStreamMsg[];

        /**
         * Creates a new Batch instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Batch instance
         */
        public static create(properties?: spectate.IBatch): spectate.Batch;

        /**
         * Encodes the specified Batch message. Does not implicitly {@link spectate.Batch.verify|verify} messages.
         * @param message Batch message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: spectate.IBatch, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Batch message, length delimited. Does not implicitly {@link spectate.Batch.verify|verify} messages.
         * @param message Batch message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: spectate.IBatch, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Batch message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Batch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): spectate.Batch;

        /**
         * Decodes a Batch message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Batch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): spectate.Batch;

        /**
         * Verifies a Batch message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Batch message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Batch
         */
        public static fromObject(object: { [k: string]: any }): spectate.Batch;

        /**
         * Creates a plain object from a Batch message. Also converts values to other types if specified.
         * @param message Batch
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: spectate.Batch, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Batch to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Batch
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a StreamMsg. */
    interface IStreamMsg {

        /** StreamMsg hello */
        hello?: (spectate.IHello|null);

        /** StreamMsg catalog */
        catalog?: (spectate.ICatalog|null);

        /** StreamMsg keyframe */
        keyframe?: (spectate.IKeyframe|null);

        /** StreamMsg delta */
        delta?: (spectate.IDelta|null);

        /** StreamMsg stats */
        stats?: (spectate.IStats|null);

        /** StreamMsg events */
        events?: (spectate.IEvents|null);

        /** StreamMsg projectiles */
        projectiles?: (spectate.IProjectiles|null);
    }

    /** Represents a StreamMsg. */
    class StreamMsg implements IStreamMsg {

        /**
         * Constructs a new StreamMsg.
         * @param [properties] Properties to set
         */
        constructor(properties?: spectate.IStreamMsg);

        /** StreamMsg hello. */
        public hello?: (spectate.IHello|null);

        /** StreamMsg catalog. */
        public catalog?: (spectate.ICatalog|null);

        /** StreamMsg keyframe. */
        public keyframe?: (spectate.IKeyframe|null);

        /** StreamMsg delta. */
        public delta?: (spectate.IDelta|null);

        /** StreamMsg stats. */
        public stats?: (spectate.IStats|null);

        /** StreamMsg events. */
        public events?: (spectate.IEvents|null);

        /** StreamMsg projectiles. */
        public projectiles?: (spectate.IProjectiles|null);

        /** StreamMsg body. */
        public body?: ("hello"|"catalog"|"keyframe"|"delta"|"stats"|"events"|"projectiles");

        /**
         * Creates a new StreamMsg instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StreamMsg instance
         */
        public static create(properties?: spectate.IStreamMsg): spectate.StreamMsg;

        /**
         * Encodes the specified StreamMsg message. Does not implicitly {@link spectate.StreamMsg.verify|verify} messages.
         * @param message StreamMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: spectate.IStreamMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StreamMsg message, length delimited. Does not implicitly {@link spectate.StreamMsg.verify|verify} messages.
         * @param message StreamMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: spectate.IStreamMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StreamMsg message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StreamMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): spectate.StreamMsg;

        /**
         * Decodes a StreamMsg message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StreamMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): spectate.StreamMsg;

        /**
         * Verifies a StreamMsg message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StreamMsg message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StreamMsg
         */
        public static fromObject(object: { [k: string]: any }): spectate.StreamMsg;

        /**
         * Creates a plain object from a StreamMsg message. Also converts values to other types if specified.
         * @param message StreamMsg
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: spectate.StreamMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StreamMsg to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for StreamMsg
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Projectiles. */
    interface IProjectiles {

        /** Projectiles spawns */
        spawns?: (spectate.IProjectile[]|null);

        /** Projectiles destroys */
        destroys?: (number[]|null);
    }

    /** Represents a Projectiles. */
    class Projectiles implements IProjectiles {

        /**
         * Constructs a new Projectiles.
         * @param [properties] Properties to set
         */
        constructor(properties?: spectate.IProjectiles);

        /** Projectiles spawns. */
        public spawns: spectate.IProjectile[];

        /** Projectiles destroys. */
        public destroys: number[];

        /**
         * Creates a new Projectiles instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Projectiles instance
         */
        public static create(properties?: spectate.IProjectiles): spectate.Projectiles;

        /**
         * Encodes the specified Projectiles message. Does not implicitly {@link spectate.Projectiles.verify|verify} messages.
         * @param message Projectiles message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: spectate.IProjectiles, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Projectiles message, length delimited. Does not implicitly {@link spectate.Projectiles.verify|verify} messages.
         * @param message Projectiles message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: spectate.IProjectiles, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Projectiles message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Projectiles
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): spectate.Projectiles;

        /**
         * Decodes a Projectiles message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Projectiles
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): spectate.Projectiles;

        /**
         * Verifies a Projectiles message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Projectiles message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Projectiles
         */
        public static fromObject(object: { [k: string]: any }): spectate.Projectiles;

        /**
         * Creates a plain object from a Projectiles message. Also converts values to other types if specified.
         * @param message Projectiles
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: spectate.Projectiles, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Projectiles to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Projectiles
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Hello. */
    interface IHello {

        /** Hello version */
        version?: (number|null);

        /** Hello tickRate */
        tickRate?: (number|null);
    }

    /** Represents a Hello. */
    class Hello implements IHello {

        /**
         * Constructs a new Hello.
         * @param [properties] Properties to set
         */
        constructor(properties?: spectate.IHello);

        /** Hello version. */
        public version: number;

        /** Hello tickRate. */
        public tickRate: number;

        /**
         * Creates a new Hello instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Hello instance
         */
        public static create(properties?: spectate.IHello): spectate.Hello;

        /**
         * Encodes the specified Hello message. Does not implicitly {@link spectate.Hello.verify|verify} messages.
         * @param message Hello message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: spectate.IHello, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Hello message, length delimited. Does not implicitly {@link spectate.Hello.verify|verify} messages.
         * @param message Hello message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: spectate.IHello, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Hello message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Hello
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): spectate.Hello;

        /**
         * Decodes a Hello message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Hello
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): spectate.Hello;

        /**
         * Verifies a Hello message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Hello message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Hello
         */
        public static fromObject(object: { [k: string]: any }): spectate.Hello;

        /**
         * Creates a plain object from a Hello message. Also converts values to other types if specified.
         * @param message Hello
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: spectate.Hello, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Hello to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Hello
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Catalog. */
    interface ICatalog {

        /** Catalog base */
        base?: (number|null);

        /** Catalog names */
        names?: (string[]|null);
    }

    /** Represents a Catalog. */
    class Catalog implements ICatalog {

        /**
         * Constructs a new Catalog.
         * @param [properties] Properties to set
         */
        constructor(properties?: spectate.ICatalog);

        /** Catalog base. */
        public base: number;

        /** Catalog names. */
        public names: string[];

        /**
         * Creates a new Catalog instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Catalog instance
         */
        public static create(properties?: spectate.ICatalog): spectate.Catalog;

        /**
         * Encodes the specified Catalog message. Does not implicitly {@link spectate.Catalog.verify|verify} messages.
         * @param message Catalog message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: spectate.ICatalog, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Catalog message, length delimited. Does not implicitly {@link spectate.Catalog.verify|verify} messages.
         * @param message Catalog message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: spectate.ICatalog, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Catalog message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Catalog
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): spectate.Catalog;

        /**
         * Decodes a Catalog message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Catalog
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): spectate.Catalog;

        /**
         * Verifies a Catalog message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Catalog message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Catalog
         */
        public static fromObject(object: { [k: string]: any }): spectate.Catalog;

        /**
         * Creates a plain object from a Catalog message. Also converts values to other types if specified.
         * @param message Catalog
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: spectate.Catalog, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Catalog to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Catalog
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an UnitIdent. */
    interface IUnitIdent {

        /** UnitIdent handle */
        handle?: (number|null);

        /** UnitIdent type */
        type?: (spectate.UnitType|null);

        /** UnitIdent team */
        team?: (number|null);

        /** UnitIdent nameId */
        nameId?: (number|null);

        /** UnitIdent heroId */
        heroId?: (number|null);

        /** UnitIdent playerSlot */
        playerSlot?: (number|null);

        /** UnitIdent modelScale */
        modelScale?: (number|null);
    }

    /** Represents an UnitIdent. */
    class UnitIdent implements IUnitIdent {

        /**
         * Constructs a new UnitIdent.
         * @param [properties] Properties to set
         */
        constructor(properties?: spectate.IUnitIdent);

        /** UnitIdent handle. */
        public handle: number;

        /** UnitIdent type. */
        public type: spectate.UnitType;

        /** UnitIdent team. */
        public team: number;

        /** UnitIdent nameId. */
        public nameId: number;

        /** UnitIdent heroId. */
        public heroId: number;

        /** UnitIdent playerSlot. */
        public playerSlot: number;

        /** UnitIdent modelScale. */
        public modelScale: number;

        /**
         * Creates a new UnitIdent instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UnitIdent instance
         */
        public static create(properties?: spectate.IUnitIdent): spectate.UnitIdent;

        /**
         * Encodes the specified UnitIdent message. Does not implicitly {@link spectate.UnitIdent.verify|verify} messages.
         * @param message UnitIdent message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: spectate.IUnitIdent, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UnitIdent message, length delimited. Does not implicitly {@link spectate.UnitIdent.verify|verify} messages.
         * @param message UnitIdent message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: spectate.IUnitIdent, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an UnitIdent message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UnitIdent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): spectate.UnitIdent;

        /**
         * Decodes an UnitIdent message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UnitIdent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): spectate.UnitIdent;

        /**
         * Verifies an UnitIdent message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an UnitIdent message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UnitIdent
         */
        public static fromObject(object: { [k: string]: any }): spectate.UnitIdent;

        /**
         * Creates a plain object from an UnitIdent message. Also converts values to other types if specified.
         * @param message UnitIdent
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: spectate.UnitIdent, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UnitIdent to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for UnitIdent
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Transforms. */
    interface ITransforms {

        /** Transforms handles */
        handles?: (number[]|null);

        /** Transforms xs */
        xs?: (number[]|null);

        /** Transforms ys */
        ys?: (number[]|null);

        /** Transforms yaws */
        yaws?: (number[]|null);

        /** Transforms hps */
        hps?: (number[]|null);

        /** Transforms maxHps */
        maxHps?: (number[]|null);

        /** Transforms mps */
        mps?: (number[]|null);

        /** Transforms flags */
        flags?: (number[]|null);

        /** Transforms activities */
        activities?: (number[]|null);
    }

    /** Represents a Transforms. */
    class Transforms implements ITransforms {

        /**
         * Constructs a new Transforms.
         * @param [properties] Properties to set
         */
        constructor(properties?: spectate.ITransforms);

        /** Transforms handles. */
        public handles: number[];

        /** Transforms xs. */
        public xs: number[];

        /** Transforms ys. */
        public ys: number[];

        /** Transforms yaws. */
        public yaws: number[];

        /** Transforms hps. */
        public hps: number[];

        /** Transforms maxHps. */
        public maxHps: number[];

        /** Transforms mps. */
        public mps: number[];

        /** Transforms flags. */
        public flags: number[];

        /** Transforms activities. */
        public activities: number[];

        /**
         * Creates a new Transforms instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Transforms instance
         */
        public static create(properties?: spectate.ITransforms): spectate.Transforms;

        /**
         * Encodes the specified Transforms message. Does not implicitly {@link spectate.Transforms.verify|verify} messages.
         * @param message Transforms message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: spectate.ITransforms, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Transforms message, length delimited. Does not implicitly {@link spectate.Transforms.verify|verify} messages.
         * @param message Transforms message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: spectate.ITransforms, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Transforms message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Transforms
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): spectate.Transforms;

        /**
         * Decodes a Transforms message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Transforms
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): spectate.Transforms;

        /**
         * Verifies a Transforms message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Transforms message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Transforms
         */
        public static fromObject(object: { [k: string]: any }): spectate.Transforms;

        /**
         * Creates a plain object from a Transforms message. Also converts values to other types if specified.
         * @param message Transforms
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: spectate.Transforms, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Transforms to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Transforms
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an UnitSlow. */
    interface IUnitSlow {

        /** UnitSlow handle */
        handle?: (number|null);

        /** UnitSlow level */
        level?: (number|null);

        /** UnitSlow maxMp */
        maxMp?: (number|null);

        /** UnitSlow respawnTime */
        respawnTime?: (number|null);

        /** UnitSlow itemIds */
        itemIds?: (number[]|null);

        /** UnitSlow abilities */
        abilities?: (spectate.IUnitAbility[]|null);

        /** UnitSlow strength */
        strength?: (number|null);

        /** UnitSlow agility */
        agility?: (number|null);

        /** UnitSlow intellect */
        intellect?: (number|null);

        /** UnitSlow moveSpeed */
        moveSpeed?: (number|null);
    }

    /** Represents an UnitSlow. */
    class UnitSlow implements IUnitSlow {

        /**
         * Constructs a new UnitSlow.
         * @param [properties] Properties to set
         */
        constructor(properties?: spectate.IUnitSlow);

        /** UnitSlow handle. */
        public handle: number;

        /** UnitSlow level. */
        public level: number;

        /** UnitSlow maxMp. */
        public maxMp: number;

        /** UnitSlow respawnTime. */
        public respawnTime: number;

        /** UnitSlow itemIds. */
        public itemIds: number[];

        /** UnitSlow abilities. */
        public abilities: spectate.IUnitAbility[];

        /** UnitSlow strength. */
        public strength: number;

        /** UnitSlow agility. */
        public agility: number;

        /** UnitSlow intellect. */
        public intellect: number;

        /** UnitSlow moveSpeed. */
        public moveSpeed: number;

        /**
         * Creates a new UnitSlow instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UnitSlow instance
         */
        public static create(properties?: spectate.IUnitSlow): spectate.UnitSlow;

        /**
         * Encodes the specified UnitSlow message. Does not implicitly {@link spectate.UnitSlow.verify|verify} messages.
         * @param message UnitSlow message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: spectate.IUnitSlow, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UnitSlow message, length delimited. Does not implicitly {@link spectate.UnitSlow.verify|verify} messages.
         * @param message UnitSlow message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: spectate.IUnitSlow, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an UnitSlow message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UnitSlow
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): spectate.UnitSlow;

        /**
         * Decodes an UnitSlow message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UnitSlow
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): spectate.UnitSlow;

        /**
         * Verifies an UnitSlow message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an UnitSlow message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UnitSlow
         */
        public static fromObject(object: { [k: string]: any }): spectate.UnitSlow;

        /**
         * Creates a plain object from an UnitSlow message. Also converts values to other types if specified.
         * @param message UnitSlow
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: spectate.UnitSlow, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UnitSlow to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for UnitSlow
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an UnitAbility. */
    interface IUnitAbility {

        /** UnitAbility nameId */
        nameId?: (number|null);

        /** UnitAbility level */
        level?: (number|null);

        /** UnitAbility cooldownEnd */
        cooldownEnd?: (number|null);

        /** UnitAbility cooldownLength */
        cooldownLength?: (number|null);
    }

    /** Represents an UnitAbility. */
    class UnitAbility implements IUnitAbility {

        /**
         * Constructs a new UnitAbility.
         * @param [properties] Properties to set
         */
        constructor(properties?: spectate.IUnitAbility);

        /** UnitAbility nameId. */
        public nameId: number;

        /** UnitAbility level. */
        public level: number;

        /** UnitAbility cooldownEnd. */
        public cooldownEnd: number;

        /** UnitAbility cooldownLength. */
        public cooldownLength: number;

        /**
         * Creates a new UnitAbility instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UnitAbility instance
         */
        public static create(properties?: spectate.IUnitAbility): spectate.UnitAbility;

        /**
         * Encodes the specified UnitAbility message. Does not implicitly {@link spectate.UnitAbility.verify|verify} messages.
         * @param message UnitAbility message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: spectate.IUnitAbility, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UnitAbility message, length delimited. Does not implicitly {@link spectate.UnitAbility.verify|verify} messages.
         * @param message UnitAbility message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: spectate.IUnitAbility, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an UnitAbility message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UnitAbility
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): spectate.UnitAbility;

        /**
         * Decodes an UnitAbility message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UnitAbility
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): spectate.UnitAbility;

        /**
         * Verifies an UnitAbility message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an UnitAbility message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UnitAbility
         */
        public static fromObject(object: { [k: string]: any }): spectate.UnitAbility;

        /**
         * Creates a plain object from an UnitAbility message. Also converts values to other types if specified.
         * @param message UnitAbility
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: spectate.UnitAbility, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UnitAbility to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for UnitAbility
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Keyframe. */
    interface IKeyframe {

        /** Keyframe serverTick */
        serverTick?: (number|null);

        /** Keyframe gameTime */
        gameTime?: (number|null);

        /** Keyframe gameLive */
        gameLive?: (boolean|null);

        /** Keyframe idents */
        idents?: (spectate.IUnitIdent[]|null);

        /** Keyframe transforms */
        transforms?: (spectate.ITransforms|null);

        /** Keyframe slow */
        slow?: (spectate.IUnitSlow[]|null);

        /** Keyframe match */
        match?: (spectate.IMatchLite|null);
    }

    /** Represents a Keyframe. */
    class Keyframe implements IKeyframe {

        /**
         * Constructs a new Keyframe.
         * @param [properties] Properties to set
         */
        constructor(properties?: spectate.IKeyframe);

        /** Keyframe serverTick. */
        public serverTick: number;

        /** Keyframe gameTime. */
        public gameTime: number;

        /** Keyframe gameLive. */
        public gameLive: boolean;

        /** Keyframe idents. */
        public idents: spectate.IUnitIdent[];

        /** Keyframe transforms. */
        public transforms?: (spectate.ITransforms|null);

        /** Keyframe slow. */
        public slow: spectate.IUnitSlow[];

        /** Keyframe match. */
        public match?: (spectate.IMatchLite|null);

        /**
         * Creates a new Keyframe instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Keyframe instance
         */
        public static create(properties?: spectate.IKeyframe): spectate.Keyframe;

        /**
         * Encodes the specified Keyframe message. Does not implicitly {@link spectate.Keyframe.verify|verify} messages.
         * @param message Keyframe message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: spectate.IKeyframe, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Keyframe message, length delimited. Does not implicitly {@link spectate.Keyframe.verify|verify} messages.
         * @param message Keyframe message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: spectate.IKeyframe, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Keyframe message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Keyframe
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): spectate.Keyframe;

        /**
         * Decodes a Keyframe message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Keyframe
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): spectate.Keyframe;

        /**
         * Verifies a Keyframe message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Keyframe message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Keyframe
         */
        public static fromObject(object: { [k: string]: any }): spectate.Keyframe;

        /**
         * Creates a plain object from a Keyframe message. Also converts values to other types if specified.
         * @param message Keyframe
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: spectate.Keyframe, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Keyframe to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Keyframe
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Delta. */
    interface IDelta {

        /** Delta serverTick */
        serverTick?: (number|null);

        /** Delta gameTime */
        gameTime?: (number|null);

        /** Delta gameLive */
        gameLive?: (boolean|null);

        /** Delta spawns */
        spawns?: (spectate.IUnitIdent[]|null);

        /** Delta transforms */
        transforms?: (spectate.ITransforms|null);

        /** Delta slow */
        slow?: (spectate.IUnitSlow[]|null);

        /** Delta despawns */
        despawns?: (number[]|null);

        /** Delta match */
        match?: (spectate.IMatchLite|null);
    }

    /** Represents a Delta. */
    class Delta implements IDelta {

        /**
         * Constructs a new Delta.
         * @param [properties] Properties to set
         */
        constructor(properties?: spectate.IDelta);

        /** Delta serverTick. */
        public serverTick: number;

        /** Delta gameTime. */
        public gameTime: number;

        /** Delta gameLive. */
        public gameLive: boolean;

        /** Delta spawns. */
        public spawns: spectate.IUnitIdent[];

        /** Delta transforms. */
        public transforms?: (spectate.ITransforms|null);

        /** Delta slow. */
        public slow: spectate.IUnitSlow[];

        /** Delta despawns. */
        public despawns: number[];

        /** Delta match. */
        public match?: (spectate.IMatchLite|null);

        /**
         * Creates a new Delta instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Delta instance
         */
        public static create(properties?: spectate.IDelta): spectate.Delta;

        /**
         * Encodes the specified Delta message. Does not implicitly {@link spectate.Delta.verify|verify} messages.
         * @param message Delta message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: spectate.IDelta, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Delta message, length delimited. Does not implicitly {@link spectate.Delta.verify|verify} messages.
         * @param message Delta message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: spectate.IDelta, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Delta message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Delta
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): spectate.Delta;

        /**
         * Decodes a Delta message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Delta
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): spectate.Delta;

        /**
         * Verifies a Delta message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Delta message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Delta
         */
        public static fromObject(object: { [k: string]: any }): spectate.Delta;

        /**
         * Creates a plain object from a Delta message. Also converts values to other types if specified.
         * @param message Delta
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: spectate.Delta, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Delta to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Delta
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Stats. */
    interface IStats {

        /** Stats players */
        players?: (spectate.IPlayerStat[]|null);
    }

    /** Represents a Stats. */
    class Stats implements IStats {

        /**
         * Constructs a new Stats.
         * @param [properties] Properties to set
         */
        constructor(properties?: spectate.IStats);

        /** Stats players. */
        public players: spectate.IPlayerStat[];

        /**
         * Creates a new Stats instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Stats instance
         */
        public static create(properties?: spectate.IStats): spectate.Stats;

        /**
         * Encodes the specified Stats message. Does not implicitly {@link spectate.Stats.verify|verify} messages.
         * @param message Stats message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: spectate.IStats, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Stats message, length delimited. Does not implicitly {@link spectate.Stats.verify|verify} messages.
         * @param message Stats message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: spectate.IStats, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Stats message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Stats
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): spectate.Stats;

        /**
         * Decodes a Stats message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Stats
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): spectate.Stats;

        /**
         * Verifies a Stats message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Stats message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Stats
         */
        public static fromObject(object: { [k: string]: any }): spectate.Stats;

        /**
         * Creates a plain object from a Stats message. Also converts values to other types if specified.
         * @param message Stats
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: spectate.Stats, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Stats to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Stats
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an Events. */
    interface IEvents {

        /** Events events */
        events?: (spectate.IGameEvent[]|null);
    }

    /** Represents an Events. */
    class Events implements IEvents {

        /**
         * Constructs a new Events.
         * @param [properties] Properties to set
         */
        constructor(properties?: spectate.IEvents);

        /** Events events. */
        public events: spectate.IGameEvent[];

        /**
         * Creates a new Events instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Events instance
         */
        public static create(properties?: spectate.IEvents): spectate.Events;

        /**
         * Encodes the specified Events message. Does not implicitly {@link spectate.Events.verify|verify} messages.
         * @param message Events message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: spectate.IEvents, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Events message, length delimited. Does not implicitly {@link spectate.Events.verify|verify} messages.
         * @param message Events message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: spectate.IEvents, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Events message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Events
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): spectate.Events;

        /**
         * Decodes an Events message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Events
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): spectate.Events;

        /**
         * Verifies an Events message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Events message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Events
         */
        public static fromObject(object: { [k: string]: any }): spectate.Events;

        /**
         * Creates a plain object from an Events message. Also converts values to other types if specified.
         * @param message Events
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: spectate.Events, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Events to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Events
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}
