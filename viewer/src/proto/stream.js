/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const spectate = $root.spectate = (() => {

    /**
     * Namespace spectate.
     * @exports spectate
     * @namespace
     */
    const spectate = {};

    spectate.EntityFrame = (function() {

        /**
         * Properties of an EntityFrame.
         * @memberof spectate
         * @interface IEntityFrame
         * @property {number|null} [serverTick] EntityFrame serverTick
         * @property {number|null} [gameTime] EntityFrame gameTime
         * @property {boolean|null} [gameLive] EntityFrame gameLive
         * @property {Array.<spectate.IUnit>|null} [units] EntityFrame units
         * @property {spectate.IMatchLite|null} [match] EntityFrame match
         * @property {Array.<spectate.IPlayerStat>|null} [players] EntityFrame players
         * @property {Array.<spectate.IGameEvent>|null} [events] EntityFrame events
         * @property {Array.<spectate.IProjectile>|null} [projectiles] EntityFrame projectiles
         * @property {Array.<number>|null} [projectileDestroys] EntityFrame projectileDestroys
         */

        /**
         * Constructs a new EntityFrame.
         * @memberof spectate
         * @classdesc Represents an EntityFrame.
         * @implements IEntityFrame
         * @constructor
         * @param {spectate.IEntityFrame=} [properties] Properties to set
         */
        function EntityFrame(properties) {
            this.units = [];
            this.players = [];
            this.events = [];
            this.projectiles = [];
            this.projectileDestroys = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EntityFrame serverTick.
         * @member {number} serverTick
         * @memberof spectate.EntityFrame
         * @instance
         */
        EntityFrame.prototype.serverTick = 0;

        /**
         * EntityFrame gameTime.
         * @member {number} gameTime
         * @memberof spectate.EntityFrame
         * @instance
         */
        EntityFrame.prototype.gameTime = 0;

        /**
         * EntityFrame gameLive.
         * @member {boolean} gameLive
         * @memberof spectate.EntityFrame
         * @instance
         */
        EntityFrame.prototype.gameLive = false;

        /**
         * EntityFrame units.
         * @member {Array.<spectate.IUnit>} units
         * @memberof spectate.EntityFrame
         * @instance
         */
        EntityFrame.prototype.units = $util.emptyArray;

        /**
         * EntityFrame match.
         * @member {spectate.IMatchLite|null|undefined} match
         * @memberof spectate.EntityFrame
         * @instance
         */
        EntityFrame.prototype.match = null;

        /**
         * EntityFrame players.
         * @member {Array.<spectate.IPlayerStat>} players
         * @memberof spectate.EntityFrame
         * @instance
         */
        EntityFrame.prototype.players = $util.emptyArray;

        /**
         * EntityFrame events.
         * @member {Array.<spectate.IGameEvent>} events
         * @memberof spectate.EntityFrame
         * @instance
         */
        EntityFrame.prototype.events = $util.emptyArray;

        /**
         * EntityFrame projectiles.
         * @member {Array.<spectate.IProjectile>} projectiles
         * @memberof spectate.EntityFrame
         * @instance
         */
        EntityFrame.prototype.projectiles = $util.emptyArray;

        /**
         * EntityFrame projectileDestroys.
         * @member {Array.<number>} projectileDestroys
         * @memberof spectate.EntityFrame
         * @instance
         */
        EntityFrame.prototype.projectileDestroys = $util.emptyArray;

        /**
         * Creates a new EntityFrame instance using the specified properties.
         * @function create
         * @memberof spectate.EntityFrame
         * @static
         * @param {spectate.IEntityFrame=} [properties] Properties to set
         * @returns {spectate.EntityFrame} EntityFrame instance
         */
        EntityFrame.create = function create(properties) {
            return new EntityFrame(properties);
        };

        /**
         * Encodes the specified EntityFrame message. Does not implicitly {@link spectate.EntityFrame.verify|verify} messages.
         * @function encode
         * @memberof spectate.EntityFrame
         * @static
         * @param {spectate.IEntityFrame} message EntityFrame message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EntityFrame.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.serverTick != null && Object.hasOwnProperty.call(message, "serverTick"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.serverTick);
            if (message.gameTime != null && Object.hasOwnProperty.call(message, "gameTime"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.gameTime);
            if (message.gameLive != null && Object.hasOwnProperty.call(message, "gameLive"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.gameLive);
            if (message.units != null && message.units.length)
                for (let i = 0; i < message.units.length; ++i)
                    $root.spectate.Unit.encode(message.units[i], writer.uint32(/* id 4, wireType 2 =*/34).fork(), q + 1).ldelim();
            if (message.match != null && Object.hasOwnProperty.call(message, "match"))
                $root.spectate.MatchLite.encode(message.match, writer.uint32(/* id 5, wireType 2 =*/42).fork(), q + 1).ldelim();
            if (message.players != null && message.players.length)
                for (let i = 0; i < message.players.length; ++i)
                    $root.spectate.PlayerStat.encode(message.players[i], writer.uint32(/* id 6, wireType 2 =*/50).fork(), q + 1).ldelim();
            if (message.events != null && message.events.length)
                for (let i = 0; i < message.events.length; ++i)
                    $root.spectate.GameEvent.encode(message.events[i], writer.uint32(/* id 7, wireType 2 =*/58).fork(), q + 1).ldelim();
            if (message.projectiles != null && message.projectiles.length)
                for (let i = 0; i < message.projectiles.length; ++i)
                    $root.spectate.Projectile.encode(message.projectiles[i], writer.uint32(/* id 8, wireType 2 =*/66).fork(), q + 1).ldelim();
            if (message.projectileDestroys != null && message.projectileDestroys.length) {
                writer.uint32(/* id 9, wireType 2 =*/74).fork();
                for (let i = 0; i < message.projectileDestroys.length; ++i)
                    writer.uint32(message.projectileDestroys[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified EntityFrame message, length delimited. Does not implicitly {@link spectate.EntityFrame.verify|verify} messages.
         * @function encodeDelimited
         * @memberof spectate.EntityFrame
         * @static
         * @param {spectate.IEntityFrame} message EntityFrame message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EntityFrame.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an EntityFrame message from the specified reader or buffer.
         * @function decode
         * @memberof spectate.EntityFrame
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {spectate.EntityFrame} EntityFrame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EntityFrame.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.spectate.EntityFrame();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.serverTick = reader.uint32();
                        break;
                    }
                case 2: {
                        message.gameTime = reader.int32();
                        break;
                    }
                case 3: {
                        message.gameLive = reader.bool();
                        break;
                    }
                case 4: {
                        if (!(message.units && message.units.length))
                            message.units = [];
                        message.units.push($root.spectate.Unit.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 5: {
                        message.match = $root.spectate.MatchLite.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 6: {
                        if (!(message.players && message.players.length))
                            message.players = [];
                        message.players.push($root.spectate.PlayerStat.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 7: {
                        if (!(message.events && message.events.length))
                            message.events = [];
                        message.events.push($root.spectate.GameEvent.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 8: {
                        if (!(message.projectiles && message.projectiles.length))
                            message.projectiles = [];
                        message.projectiles.push($root.spectate.Projectile.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 9: {
                        if (!(message.projectileDestroys && message.projectileDestroys.length))
                            message.projectileDestroys = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.projectileDestroys.push(reader.uint32());
                        } else
                            message.projectileDestroys.push(reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an EntityFrame message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof spectate.EntityFrame
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {spectate.EntityFrame} EntityFrame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EntityFrame.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EntityFrame message.
         * @function verify
         * @memberof spectate.EntityFrame
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EntityFrame.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.serverTick != null && Object.hasOwnProperty.call(message, "serverTick"))
                if (!$util.isInteger(message.serverTick))
                    return "serverTick: integer expected";
            if (message.gameTime != null && Object.hasOwnProperty.call(message, "gameTime"))
                if (!$util.isInteger(message.gameTime))
                    return "gameTime: integer expected";
            if (message.gameLive != null && Object.hasOwnProperty.call(message, "gameLive"))
                if (typeof message.gameLive !== "boolean")
                    return "gameLive: boolean expected";
            if (message.units != null && Object.hasOwnProperty.call(message, "units")) {
                if (!Array.isArray(message.units))
                    return "units: array expected";
                for (let i = 0; i < message.units.length; ++i) {
                    let error = $root.spectate.Unit.verify(message.units[i], long + 1);
                    if (error)
                        return "units." + error;
                }
            }
            if (message.match != null && Object.hasOwnProperty.call(message, "match")) {
                let error = $root.spectate.MatchLite.verify(message.match, long + 1);
                if (error)
                    return "match." + error;
            }
            if (message.players != null && Object.hasOwnProperty.call(message, "players")) {
                if (!Array.isArray(message.players))
                    return "players: array expected";
                for (let i = 0; i < message.players.length; ++i) {
                    let error = $root.spectate.PlayerStat.verify(message.players[i], long + 1);
                    if (error)
                        return "players." + error;
                }
            }
            if (message.events != null && Object.hasOwnProperty.call(message, "events")) {
                if (!Array.isArray(message.events))
                    return "events: array expected";
                for (let i = 0; i < message.events.length; ++i) {
                    let error = $root.spectate.GameEvent.verify(message.events[i], long + 1);
                    if (error)
                        return "events." + error;
                }
            }
            if (message.projectiles != null && Object.hasOwnProperty.call(message, "projectiles")) {
                if (!Array.isArray(message.projectiles))
                    return "projectiles: array expected";
                for (let i = 0; i < message.projectiles.length; ++i) {
                    let error = $root.spectate.Projectile.verify(message.projectiles[i], long + 1);
                    if (error)
                        return "projectiles." + error;
                }
            }
            if (message.projectileDestroys != null && Object.hasOwnProperty.call(message, "projectileDestroys")) {
                if (!Array.isArray(message.projectileDestroys))
                    return "projectileDestroys: array expected";
                for (let i = 0; i < message.projectileDestroys.length; ++i)
                    if (!$util.isInteger(message.projectileDestroys[i]))
                        return "projectileDestroys: integer[] expected";
            }
            return null;
        };

        /**
         * Creates an EntityFrame message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof spectate.EntityFrame
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {spectate.EntityFrame} EntityFrame
         */
        EntityFrame.fromObject = function fromObject(object, long) {
            if (object instanceof $root.spectate.EntityFrame)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".spectate.EntityFrame: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.spectate.EntityFrame();
            if (object.serverTick != null)
                message.serverTick = object.serverTick >>> 0;
            if (object.gameTime != null)
                message.gameTime = object.gameTime | 0;
            if (object.gameLive != null)
                message.gameLive = Boolean(object.gameLive);
            if (object.units) {
                if (!Array.isArray(object.units))
                    throw TypeError(".spectate.EntityFrame.units: array expected");
                message.units = [];
                for (let i = 0; i < object.units.length; ++i) {
                    if (!$util.isObject(object.units[i]))
                        throw TypeError(".spectate.EntityFrame.units: object expected");
                    message.units[i] = $root.spectate.Unit.fromObject(object.units[i], long + 1);
                }
            }
            if (object.match != null) {
                if (!$util.isObject(object.match))
                    throw TypeError(".spectate.EntityFrame.match: object expected");
                message.match = $root.spectate.MatchLite.fromObject(object.match, long + 1);
            }
            if (object.players) {
                if (!Array.isArray(object.players))
                    throw TypeError(".spectate.EntityFrame.players: array expected");
                message.players = [];
                for (let i = 0; i < object.players.length; ++i) {
                    if (!$util.isObject(object.players[i]))
                        throw TypeError(".spectate.EntityFrame.players: object expected");
                    message.players[i] = $root.spectate.PlayerStat.fromObject(object.players[i], long + 1);
                }
            }
            if (object.events) {
                if (!Array.isArray(object.events))
                    throw TypeError(".spectate.EntityFrame.events: array expected");
                message.events = [];
                for (let i = 0; i < object.events.length; ++i) {
                    if (!$util.isObject(object.events[i]))
                        throw TypeError(".spectate.EntityFrame.events: object expected");
                    message.events[i] = $root.spectate.GameEvent.fromObject(object.events[i], long + 1);
                }
            }
            if (object.projectiles) {
                if (!Array.isArray(object.projectiles))
                    throw TypeError(".spectate.EntityFrame.projectiles: array expected");
                message.projectiles = [];
                for (let i = 0; i < object.projectiles.length; ++i) {
                    if (!$util.isObject(object.projectiles[i]))
                        throw TypeError(".spectate.EntityFrame.projectiles: object expected");
                    message.projectiles[i] = $root.spectate.Projectile.fromObject(object.projectiles[i], long + 1);
                }
            }
            if (object.projectileDestroys) {
                if (!Array.isArray(object.projectileDestroys))
                    throw TypeError(".spectate.EntityFrame.projectileDestroys: array expected");
                message.projectileDestroys = [];
                for (let i = 0; i < object.projectileDestroys.length; ++i)
                    message.projectileDestroys[i] = object.projectileDestroys[i] >>> 0;
            }
            return message;
        };

        /**
         * Creates a plain object from an EntityFrame message. Also converts values to other types if specified.
         * @function toObject
         * @memberof spectate.EntityFrame
         * @static
         * @param {spectate.EntityFrame} message EntityFrame
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EntityFrame.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults) {
                object.units = [];
                object.players = [];
                object.events = [];
                object.projectiles = [];
                object.projectileDestroys = [];
            }
            if (options.defaults) {
                object.serverTick = 0;
                object.gameTime = 0;
                object.gameLive = false;
                object.match = null;
            }
            if (message.serverTick != null && Object.hasOwnProperty.call(message, "serverTick"))
                object.serverTick = message.serverTick;
            if (message.gameTime != null && Object.hasOwnProperty.call(message, "gameTime"))
                object.gameTime = message.gameTime;
            if (message.gameLive != null && Object.hasOwnProperty.call(message, "gameLive"))
                object.gameLive = message.gameLive;
            if (message.units && message.units.length) {
                object.units = [];
                for (let j = 0; j < message.units.length; ++j)
                    object.units[j] = $root.spectate.Unit.toObject(message.units[j], options, q + 1);
            }
            if (message.match != null && Object.hasOwnProperty.call(message, "match"))
                object.match = $root.spectate.MatchLite.toObject(message.match, options, q + 1);
            if (message.players && message.players.length) {
                object.players = [];
                for (let j = 0; j < message.players.length; ++j)
                    object.players[j] = $root.spectate.PlayerStat.toObject(message.players[j], options, q + 1);
            }
            if (message.events && message.events.length) {
                object.events = [];
                for (let j = 0; j < message.events.length; ++j)
                    object.events[j] = $root.spectate.GameEvent.toObject(message.events[j], options, q + 1);
            }
            if (message.projectiles && message.projectiles.length) {
                object.projectiles = [];
                for (let j = 0; j < message.projectiles.length; ++j)
                    object.projectiles[j] = $root.spectate.Projectile.toObject(message.projectiles[j], options, q + 1);
            }
            if (message.projectileDestroys && message.projectileDestroys.length) {
                object.projectileDestroys = [];
                for (let j = 0; j < message.projectileDestroys.length; ++j)
                    object.projectileDestroys[j] = message.projectileDestroys[j];
            }
            return object;
        };

        /**
         * Converts this EntityFrame to JSON.
         * @function toJSON
         * @memberof spectate.EntityFrame
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EntityFrame.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for EntityFrame
         * @function getTypeUrl
         * @memberof spectate.EntityFrame
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        EntityFrame.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/spectate.EntityFrame";
        };

        return EntityFrame;
    })();

    spectate.Projectile = (function() {

        /**
         * Properties of a Projectile.
         * @memberof spectate
         * @interface IProjectile
         * @property {number|null} [handle] Projectile handle
         * @property {number|null} [source] Projectile source
         * @property {number|null} [target] Projectile target
         * @property {number|null} [targetX] Projectile targetX
         * @property {number|null} [targetY] Projectile targetY
         * @property {number|null} [speed] Projectile speed
         * @property {boolean|null} [isAttack] Projectile isAttack
         * @property {boolean|null} [linear] Projectile linear
         * @property {number|null} [originX] Projectile originX
         * @property {number|null} [originY] Projectile originY
         * @property {number|null} [velX] Projectile velX
         * @property {number|null} [velY] Projectile velY
         * @property {number|null} [distance] Projectile distance
         */

        /**
         * Constructs a new Projectile.
         * @memberof spectate
         * @classdesc Represents a Projectile.
         * @implements IProjectile
         * @constructor
         * @param {spectate.IProjectile=} [properties] Properties to set
         */
        function Projectile(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Projectile handle.
         * @member {number} handle
         * @memberof spectate.Projectile
         * @instance
         */
        Projectile.prototype.handle = 0;

        /**
         * Projectile source.
         * @member {number} source
         * @memberof spectate.Projectile
         * @instance
         */
        Projectile.prototype.source = 0;

        /**
         * Projectile target.
         * @member {number} target
         * @memberof spectate.Projectile
         * @instance
         */
        Projectile.prototype.target = 0;

        /**
         * Projectile targetX.
         * @member {number} targetX
         * @memberof spectate.Projectile
         * @instance
         */
        Projectile.prototype.targetX = 0;

        /**
         * Projectile targetY.
         * @member {number} targetY
         * @memberof spectate.Projectile
         * @instance
         */
        Projectile.prototype.targetY = 0;

        /**
         * Projectile speed.
         * @member {number} speed
         * @memberof spectate.Projectile
         * @instance
         */
        Projectile.prototype.speed = 0;

        /**
         * Projectile isAttack.
         * @member {boolean} isAttack
         * @memberof spectate.Projectile
         * @instance
         */
        Projectile.prototype.isAttack = false;

        /**
         * Projectile linear.
         * @member {boolean} linear
         * @memberof spectate.Projectile
         * @instance
         */
        Projectile.prototype.linear = false;

        /**
         * Projectile originX.
         * @member {number} originX
         * @memberof spectate.Projectile
         * @instance
         */
        Projectile.prototype.originX = 0;

        /**
         * Projectile originY.
         * @member {number} originY
         * @memberof spectate.Projectile
         * @instance
         */
        Projectile.prototype.originY = 0;

        /**
         * Projectile velX.
         * @member {number} velX
         * @memberof spectate.Projectile
         * @instance
         */
        Projectile.prototype.velX = 0;

        /**
         * Projectile velY.
         * @member {number} velY
         * @memberof spectate.Projectile
         * @instance
         */
        Projectile.prototype.velY = 0;

        /**
         * Projectile distance.
         * @member {number} distance
         * @memberof spectate.Projectile
         * @instance
         */
        Projectile.prototype.distance = 0;

        /**
         * Creates a new Projectile instance using the specified properties.
         * @function create
         * @memberof spectate.Projectile
         * @static
         * @param {spectate.IProjectile=} [properties] Properties to set
         * @returns {spectate.Projectile} Projectile instance
         */
        Projectile.create = function create(properties) {
            return new Projectile(properties);
        };

        /**
         * Encodes the specified Projectile message. Does not implicitly {@link spectate.Projectile.verify|verify} messages.
         * @function encode
         * @memberof spectate.Projectile
         * @static
         * @param {spectate.IProjectile} message Projectile message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Projectile.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.handle != null && Object.hasOwnProperty.call(message, "handle"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.handle);
            if (message.source != null && Object.hasOwnProperty.call(message, "source"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.source);
            if (message.target != null && Object.hasOwnProperty.call(message, "target"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.target);
            if (message.targetX != null && Object.hasOwnProperty.call(message, "targetX"))
                writer.uint32(/* id 4, wireType 0 =*/32).sint32(message.targetX);
            if (message.targetY != null && Object.hasOwnProperty.call(message, "targetY"))
                writer.uint32(/* id 5, wireType 0 =*/40).sint32(message.targetY);
            if (message.speed != null && Object.hasOwnProperty.call(message, "speed"))
                writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.speed);
            if (message.isAttack != null && Object.hasOwnProperty.call(message, "isAttack"))
                writer.uint32(/* id 7, wireType 0 =*/56).bool(message.isAttack);
            if (message.linear != null && Object.hasOwnProperty.call(message, "linear"))
                writer.uint32(/* id 8, wireType 0 =*/64).bool(message.linear);
            if (message.originX != null && Object.hasOwnProperty.call(message, "originX"))
                writer.uint32(/* id 9, wireType 0 =*/72).sint32(message.originX);
            if (message.originY != null && Object.hasOwnProperty.call(message, "originY"))
                writer.uint32(/* id 10, wireType 0 =*/80).sint32(message.originY);
            if (message.velX != null && Object.hasOwnProperty.call(message, "velX"))
                writer.uint32(/* id 11, wireType 0 =*/88).sint32(message.velX);
            if (message.velY != null && Object.hasOwnProperty.call(message, "velY"))
                writer.uint32(/* id 12, wireType 0 =*/96).sint32(message.velY);
            if (message.distance != null && Object.hasOwnProperty.call(message, "distance"))
                writer.uint32(/* id 13, wireType 0 =*/104).uint32(message.distance);
            return writer;
        };

        /**
         * Encodes the specified Projectile message, length delimited. Does not implicitly {@link spectate.Projectile.verify|verify} messages.
         * @function encodeDelimited
         * @memberof spectate.Projectile
         * @static
         * @param {spectate.IProjectile} message Projectile message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Projectile.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a Projectile message from the specified reader or buffer.
         * @function decode
         * @memberof spectate.Projectile
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {spectate.Projectile} Projectile
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Projectile.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.spectate.Projectile();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.handle = reader.uint32();
                        break;
                    }
                case 2: {
                        message.source = reader.uint32();
                        break;
                    }
                case 3: {
                        message.target = reader.uint32();
                        break;
                    }
                case 4: {
                        message.targetX = reader.sint32();
                        break;
                    }
                case 5: {
                        message.targetY = reader.sint32();
                        break;
                    }
                case 6: {
                        message.speed = reader.uint32();
                        break;
                    }
                case 7: {
                        message.isAttack = reader.bool();
                        break;
                    }
                case 8: {
                        message.linear = reader.bool();
                        break;
                    }
                case 9: {
                        message.originX = reader.sint32();
                        break;
                    }
                case 10: {
                        message.originY = reader.sint32();
                        break;
                    }
                case 11: {
                        message.velX = reader.sint32();
                        break;
                    }
                case 12: {
                        message.velY = reader.sint32();
                        break;
                    }
                case 13: {
                        message.distance = reader.uint32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Projectile message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof spectate.Projectile
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {spectate.Projectile} Projectile
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Projectile.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Projectile message.
         * @function verify
         * @memberof spectate.Projectile
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Projectile.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.handle != null && Object.hasOwnProperty.call(message, "handle"))
                if (!$util.isInteger(message.handle))
                    return "handle: integer expected";
            if (message.source != null && Object.hasOwnProperty.call(message, "source"))
                if (!$util.isInteger(message.source))
                    return "source: integer expected";
            if (message.target != null && Object.hasOwnProperty.call(message, "target"))
                if (!$util.isInteger(message.target))
                    return "target: integer expected";
            if (message.targetX != null && Object.hasOwnProperty.call(message, "targetX"))
                if (!$util.isInteger(message.targetX))
                    return "targetX: integer expected";
            if (message.targetY != null && Object.hasOwnProperty.call(message, "targetY"))
                if (!$util.isInteger(message.targetY))
                    return "targetY: integer expected";
            if (message.speed != null && Object.hasOwnProperty.call(message, "speed"))
                if (!$util.isInteger(message.speed))
                    return "speed: integer expected";
            if (message.isAttack != null && Object.hasOwnProperty.call(message, "isAttack"))
                if (typeof message.isAttack !== "boolean")
                    return "isAttack: boolean expected";
            if (message.linear != null && Object.hasOwnProperty.call(message, "linear"))
                if (typeof message.linear !== "boolean")
                    return "linear: boolean expected";
            if (message.originX != null && Object.hasOwnProperty.call(message, "originX"))
                if (!$util.isInteger(message.originX))
                    return "originX: integer expected";
            if (message.originY != null && Object.hasOwnProperty.call(message, "originY"))
                if (!$util.isInteger(message.originY))
                    return "originY: integer expected";
            if (message.velX != null && Object.hasOwnProperty.call(message, "velX"))
                if (!$util.isInteger(message.velX))
                    return "velX: integer expected";
            if (message.velY != null && Object.hasOwnProperty.call(message, "velY"))
                if (!$util.isInteger(message.velY))
                    return "velY: integer expected";
            if (message.distance != null && Object.hasOwnProperty.call(message, "distance"))
                if (!$util.isInteger(message.distance))
                    return "distance: integer expected";
            return null;
        };

        /**
         * Creates a Projectile message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof spectate.Projectile
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {spectate.Projectile} Projectile
         */
        Projectile.fromObject = function fromObject(object, long) {
            if (object instanceof $root.spectate.Projectile)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".spectate.Projectile: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.spectate.Projectile();
            if (object.handle != null)
                message.handle = object.handle >>> 0;
            if (object.source != null)
                message.source = object.source >>> 0;
            if (object.target != null)
                message.target = object.target >>> 0;
            if (object.targetX != null)
                message.targetX = object.targetX | 0;
            if (object.targetY != null)
                message.targetY = object.targetY | 0;
            if (object.speed != null)
                message.speed = object.speed >>> 0;
            if (object.isAttack != null)
                message.isAttack = Boolean(object.isAttack);
            if (object.linear != null)
                message.linear = Boolean(object.linear);
            if (object.originX != null)
                message.originX = object.originX | 0;
            if (object.originY != null)
                message.originY = object.originY | 0;
            if (object.velX != null)
                message.velX = object.velX | 0;
            if (object.velY != null)
                message.velY = object.velY | 0;
            if (object.distance != null)
                message.distance = object.distance >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a Projectile message. Also converts values to other types if specified.
         * @function toObject
         * @memberof spectate.Projectile
         * @static
         * @param {spectate.Projectile} message Projectile
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Projectile.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.handle = 0;
                object.source = 0;
                object.target = 0;
                object.targetX = 0;
                object.targetY = 0;
                object.speed = 0;
                object.isAttack = false;
                object.linear = false;
                object.originX = 0;
                object.originY = 0;
                object.velX = 0;
                object.velY = 0;
                object.distance = 0;
            }
            if (message.handle != null && Object.hasOwnProperty.call(message, "handle"))
                object.handle = message.handle;
            if (message.source != null && Object.hasOwnProperty.call(message, "source"))
                object.source = message.source;
            if (message.target != null && Object.hasOwnProperty.call(message, "target"))
                object.target = message.target;
            if (message.targetX != null && Object.hasOwnProperty.call(message, "targetX"))
                object.targetX = message.targetX;
            if (message.targetY != null && Object.hasOwnProperty.call(message, "targetY"))
                object.targetY = message.targetY;
            if (message.speed != null && Object.hasOwnProperty.call(message, "speed"))
                object.speed = message.speed;
            if (message.isAttack != null && Object.hasOwnProperty.call(message, "isAttack"))
                object.isAttack = message.isAttack;
            if (message.linear != null && Object.hasOwnProperty.call(message, "linear"))
                object.linear = message.linear;
            if (message.originX != null && Object.hasOwnProperty.call(message, "originX"))
                object.originX = message.originX;
            if (message.originY != null && Object.hasOwnProperty.call(message, "originY"))
                object.originY = message.originY;
            if (message.velX != null && Object.hasOwnProperty.call(message, "velX"))
                object.velX = message.velX;
            if (message.velY != null && Object.hasOwnProperty.call(message, "velY"))
                object.velY = message.velY;
            if (message.distance != null && Object.hasOwnProperty.call(message, "distance"))
                object.distance = message.distance;
            return object;
        };

        /**
         * Converts this Projectile to JSON.
         * @function toJSON
         * @memberof spectate.Projectile
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Projectile.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Projectile
         * @function getTypeUrl
         * @memberof spectate.Projectile
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Projectile.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/spectate.Projectile";
        };

        return Projectile;
    })();

    spectate.GameEvent = (function() {

        /**
         * Properties of a GameEvent.
         * @memberof spectate
         * @interface IGameEvent
         * @property {number|null} [time] GameEvent time
         * @property {string|null} [kind] GameEvent kind
         * @property {string|null} [text] GameEvent text
         * @property {number|null} [x] GameEvent x
         * @property {number|null} [y] GameEvent y
         */

        /**
         * Constructs a new GameEvent.
         * @memberof spectate
         * @classdesc Represents a GameEvent.
         * @implements IGameEvent
         * @constructor
         * @param {spectate.IGameEvent=} [properties] Properties to set
         */
        function GameEvent(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameEvent time.
         * @member {number} time
         * @memberof spectate.GameEvent
         * @instance
         */
        GameEvent.prototype.time = 0;

        /**
         * GameEvent kind.
         * @member {string} kind
         * @memberof spectate.GameEvent
         * @instance
         */
        GameEvent.prototype.kind = "";

        /**
         * GameEvent text.
         * @member {string} text
         * @memberof spectate.GameEvent
         * @instance
         */
        GameEvent.prototype.text = "";

        /**
         * GameEvent x.
         * @member {number} x
         * @memberof spectate.GameEvent
         * @instance
         */
        GameEvent.prototype.x = 0;

        /**
         * GameEvent y.
         * @member {number} y
         * @memberof spectate.GameEvent
         * @instance
         */
        GameEvent.prototype.y = 0;

        /**
         * Creates a new GameEvent instance using the specified properties.
         * @function create
         * @memberof spectate.GameEvent
         * @static
         * @param {spectate.IGameEvent=} [properties] Properties to set
         * @returns {spectate.GameEvent} GameEvent instance
         */
        GameEvent.create = function create(properties) {
            return new GameEvent(properties);
        };

        /**
         * Encodes the specified GameEvent message. Does not implicitly {@link spectate.GameEvent.verify|verify} messages.
         * @function encode
         * @memberof spectate.GameEvent
         * @static
         * @param {spectate.IGameEvent} message GameEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameEvent.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.time != null && Object.hasOwnProperty.call(message, "time"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.time);
            if (message.kind != null && Object.hasOwnProperty.call(message, "kind"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.kind);
            if (message.text != null && Object.hasOwnProperty.call(message, "text"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.text);
            if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                writer.uint32(/* id 4, wireType 0 =*/32).sint32(message.x);
            if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                writer.uint32(/* id 5, wireType 0 =*/40).sint32(message.y);
            return writer;
        };

        /**
         * Encodes the specified GameEvent message, length delimited. Does not implicitly {@link spectate.GameEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof spectate.GameEvent
         * @static
         * @param {spectate.IGameEvent} message GameEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a GameEvent message from the specified reader or buffer.
         * @function decode
         * @memberof spectate.GameEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {spectate.GameEvent} GameEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameEvent.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.spectate.GameEvent();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.time = reader.int32();
                        break;
                    }
                case 2: {
                        message.kind = reader.string();
                        break;
                    }
                case 3: {
                        message.text = reader.string();
                        break;
                    }
                case 4: {
                        message.x = reader.sint32();
                        break;
                    }
                case 5: {
                        message.y = reader.sint32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GameEvent message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof spectate.GameEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {spectate.GameEvent} GameEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameEvent.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameEvent message.
         * @function verify
         * @memberof spectate.GameEvent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameEvent.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.time != null && Object.hasOwnProperty.call(message, "time"))
                if (!$util.isInteger(message.time))
                    return "time: integer expected";
            if (message.kind != null && Object.hasOwnProperty.call(message, "kind"))
                if (!$util.isString(message.kind))
                    return "kind: string expected";
            if (message.text != null && Object.hasOwnProperty.call(message, "text"))
                if (!$util.isString(message.text))
                    return "text: string expected";
            if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                if (!$util.isInteger(message.x))
                    return "x: integer expected";
            if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                if (!$util.isInteger(message.y))
                    return "y: integer expected";
            return null;
        };

        /**
         * Creates a GameEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof spectate.GameEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {spectate.GameEvent} GameEvent
         */
        GameEvent.fromObject = function fromObject(object, long) {
            if (object instanceof $root.spectate.GameEvent)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".spectate.GameEvent: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.spectate.GameEvent();
            if (object.time != null)
                message.time = object.time | 0;
            if (object.kind != null)
                message.kind = String(object.kind);
            if (object.text != null)
                message.text = String(object.text);
            if (object.x != null)
                message.x = object.x | 0;
            if (object.y != null)
                message.y = object.y | 0;
            return message;
        };

        /**
         * Creates a plain object from a GameEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof spectate.GameEvent
         * @static
         * @param {spectate.GameEvent} message GameEvent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameEvent.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.time = 0;
                object.kind = "";
                object.text = "";
                object.x = 0;
                object.y = 0;
            }
            if (message.time != null && Object.hasOwnProperty.call(message, "time"))
                object.time = message.time;
            if (message.kind != null && Object.hasOwnProperty.call(message, "kind"))
                object.kind = message.kind;
            if (message.text != null && Object.hasOwnProperty.call(message, "text"))
                object.text = message.text;
            if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                object.x = message.x;
            if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                object.y = message.y;
            return object;
        };

        /**
         * Converts this GameEvent to JSON.
         * @function toJSON
         * @memberof spectate.GameEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GameEvent
         * @function getTypeUrl
         * @memberof spectate.GameEvent
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GameEvent.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/spectate.GameEvent";
        };

        return GameEvent;
    })();

    spectate.PlayerStat = (function() {

        /**
         * Properties of a PlayerStat.
         * @memberof spectate
         * @interface IPlayerStat
         * @property {number|null} [slot] PlayerStat slot
         * @property {number|null} [team] PlayerStat team
         * @property {number|null} [heroId] PlayerStat heroId
         * @property {string|null} [name] PlayerStat name
         * @property {number|null} [kills] PlayerStat kills
         * @property {number|null} [deaths] PlayerStat deaths
         * @property {number|null} [assists] PlayerStat assists
         * @property {number|null} [lastHits] PlayerStat lastHits
         * @property {number|null} [denies] PlayerStat denies
         * @property {number|null} [netWorth] PlayerStat netWorth
         * @property {number|null} [gold] PlayerStat gold
         * @property {number|null} [gpm] PlayerStat gpm
         * @property {number|null} [xpm] PlayerStat xpm
         * @property {number|null} [buybackCooldown] PlayerStat buybackCooldown
         */

        /**
         * Constructs a new PlayerStat.
         * @memberof spectate
         * @classdesc Represents a PlayerStat.
         * @implements IPlayerStat
         * @constructor
         * @param {spectate.IPlayerStat=} [properties] Properties to set
         */
        function PlayerStat(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerStat slot.
         * @member {number} slot
         * @memberof spectate.PlayerStat
         * @instance
         */
        PlayerStat.prototype.slot = 0;

        /**
         * PlayerStat team.
         * @member {number} team
         * @memberof spectate.PlayerStat
         * @instance
         */
        PlayerStat.prototype.team = 0;

        /**
         * PlayerStat heroId.
         * @member {number} heroId
         * @memberof spectate.PlayerStat
         * @instance
         */
        PlayerStat.prototype.heroId = 0;

        /**
         * PlayerStat name.
         * @member {string} name
         * @memberof spectate.PlayerStat
         * @instance
         */
        PlayerStat.prototype.name = "";

        /**
         * PlayerStat kills.
         * @member {number} kills
         * @memberof spectate.PlayerStat
         * @instance
         */
        PlayerStat.prototype.kills = 0;

        /**
         * PlayerStat deaths.
         * @member {number} deaths
         * @memberof spectate.PlayerStat
         * @instance
         */
        PlayerStat.prototype.deaths = 0;

        /**
         * PlayerStat assists.
         * @member {number} assists
         * @memberof spectate.PlayerStat
         * @instance
         */
        PlayerStat.prototype.assists = 0;

        /**
         * PlayerStat lastHits.
         * @member {number} lastHits
         * @memberof spectate.PlayerStat
         * @instance
         */
        PlayerStat.prototype.lastHits = 0;

        /**
         * PlayerStat denies.
         * @member {number} denies
         * @memberof spectate.PlayerStat
         * @instance
         */
        PlayerStat.prototype.denies = 0;

        /**
         * PlayerStat netWorth.
         * @member {number} netWorth
         * @memberof spectate.PlayerStat
         * @instance
         */
        PlayerStat.prototype.netWorth = 0;

        /**
         * PlayerStat gold.
         * @member {number} gold
         * @memberof spectate.PlayerStat
         * @instance
         */
        PlayerStat.prototype.gold = 0;

        /**
         * PlayerStat gpm.
         * @member {number} gpm
         * @memberof spectate.PlayerStat
         * @instance
         */
        PlayerStat.prototype.gpm = 0;

        /**
         * PlayerStat xpm.
         * @member {number} xpm
         * @memberof spectate.PlayerStat
         * @instance
         */
        PlayerStat.prototype.xpm = 0;

        /**
         * PlayerStat buybackCooldown.
         * @member {number} buybackCooldown
         * @memberof spectate.PlayerStat
         * @instance
         */
        PlayerStat.prototype.buybackCooldown = 0;

        /**
         * Creates a new PlayerStat instance using the specified properties.
         * @function create
         * @memberof spectate.PlayerStat
         * @static
         * @param {spectate.IPlayerStat=} [properties] Properties to set
         * @returns {spectate.PlayerStat} PlayerStat instance
         */
        PlayerStat.create = function create(properties) {
            return new PlayerStat(properties);
        };

        /**
         * Encodes the specified PlayerStat message. Does not implicitly {@link spectate.PlayerStat.verify|verify} messages.
         * @function encode
         * @memberof spectate.PlayerStat
         * @static
         * @param {spectate.IPlayerStat} message PlayerStat message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerStat.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.slot != null && Object.hasOwnProperty.call(message, "slot"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.slot);
            if (message.team != null && Object.hasOwnProperty.call(message, "team"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.team);
            if (message.heroId != null && Object.hasOwnProperty.call(message, "heroId"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.heroId);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.name);
            if (message.kills != null && Object.hasOwnProperty.call(message, "kills"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.kills);
            if (message.deaths != null && Object.hasOwnProperty.call(message, "deaths"))
                writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.deaths);
            if (message.assists != null && Object.hasOwnProperty.call(message, "assists"))
                writer.uint32(/* id 7, wireType 0 =*/56).uint32(message.assists);
            if (message.lastHits != null && Object.hasOwnProperty.call(message, "lastHits"))
                writer.uint32(/* id 8, wireType 0 =*/64).uint32(message.lastHits);
            if (message.denies != null && Object.hasOwnProperty.call(message, "denies"))
                writer.uint32(/* id 9, wireType 0 =*/72).uint32(message.denies);
            if (message.netWorth != null && Object.hasOwnProperty.call(message, "netWorth"))
                writer.uint32(/* id 10, wireType 0 =*/80).uint32(message.netWorth);
            if (message.gold != null && Object.hasOwnProperty.call(message, "gold"))
                writer.uint32(/* id 11, wireType 0 =*/88).uint32(message.gold);
            if (message.gpm != null && Object.hasOwnProperty.call(message, "gpm"))
                writer.uint32(/* id 12, wireType 0 =*/96).uint32(message.gpm);
            if (message.xpm != null && Object.hasOwnProperty.call(message, "xpm"))
                writer.uint32(/* id 13, wireType 0 =*/104).uint32(message.xpm);
            if (message.buybackCooldown != null && Object.hasOwnProperty.call(message, "buybackCooldown"))
                writer.uint32(/* id 14, wireType 0 =*/112).uint32(message.buybackCooldown);
            return writer;
        };

        /**
         * Encodes the specified PlayerStat message, length delimited. Does not implicitly {@link spectate.PlayerStat.verify|verify} messages.
         * @function encodeDelimited
         * @memberof spectate.PlayerStat
         * @static
         * @param {spectate.IPlayerStat} message PlayerStat message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerStat.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a PlayerStat message from the specified reader or buffer.
         * @function decode
         * @memberof spectate.PlayerStat
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {spectate.PlayerStat} PlayerStat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerStat.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.spectate.PlayerStat();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.slot = reader.uint32();
                        break;
                    }
                case 2: {
                        message.team = reader.uint32();
                        break;
                    }
                case 3: {
                        message.heroId = reader.uint32();
                        break;
                    }
                case 4: {
                        message.name = reader.string();
                        break;
                    }
                case 5: {
                        message.kills = reader.uint32();
                        break;
                    }
                case 6: {
                        message.deaths = reader.uint32();
                        break;
                    }
                case 7: {
                        message.assists = reader.uint32();
                        break;
                    }
                case 8: {
                        message.lastHits = reader.uint32();
                        break;
                    }
                case 9: {
                        message.denies = reader.uint32();
                        break;
                    }
                case 10: {
                        message.netWorth = reader.uint32();
                        break;
                    }
                case 11: {
                        message.gold = reader.uint32();
                        break;
                    }
                case 12: {
                        message.gpm = reader.uint32();
                        break;
                    }
                case 13: {
                        message.xpm = reader.uint32();
                        break;
                    }
                case 14: {
                        message.buybackCooldown = reader.uint32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerStat message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof spectate.PlayerStat
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {spectate.PlayerStat} PlayerStat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerStat.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerStat message.
         * @function verify
         * @memberof spectate.PlayerStat
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerStat.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.slot != null && Object.hasOwnProperty.call(message, "slot"))
                if (!$util.isInteger(message.slot))
                    return "slot: integer expected";
            if (message.team != null && Object.hasOwnProperty.call(message, "team"))
                if (!$util.isInteger(message.team))
                    return "team: integer expected";
            if (message.heroId != null && Object.hasOwnProperty.call(message, "heroId"))
                if (!$util.isInteger(message.heroId))
                    return "heroId: integer expected";
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.kills != null && Object.hasOwnProperty.call(message, "kills"))
                if (!$util.isInteger(message.kills))
                    return "kills: integer expected";
            if (message.deaths != null && Object.hasOwnProperty.call(message, "deaths"))
                if (!$util.isInteger(message.deaths))
                    return "deaths: integer expected";
            if (message.assists != null && Object.hasOwnProperty.call(message, "assists"))
                if (!$util.isInteger(message.assists))
                    return "assists: integer expected";
            if (message.lastHits != null && Object.hasOwnProperty.call(message, "lastHits"))
                if (!$util.isInteger(message.lastHits))
                    return "lastHits: integer expected";
            if (message.denies != null && Object.hasOwnProperty.call(message, "denies"))
                if (!$util.isInteger(message.denies))
                    return "denies: integer expected";
            if (message.netWorth != null && Object.hasOwnProperty.call(message, "netWorth"))
                if (!$util.isInteger(message.netWorth))
                    return "netWorth: integer expected";
            if (message.gold != null && Object.hasOwnProperty.call(message, "gold"))
                if (!$util.isInteger(message.gold))
                    return "gold: integer expected";
            if (message.gpm != null && Object.hasOwnProperty.call(message, "gpm"))
                if (!$util.isInteger(message.gpm))
                    return "gpm: integer expected";
            if (message.xpm != null && Object.hasOwnProperty.call(message, "xpm"))
                if (!$util.isInteger(message.xpm))
                    return "xpm: integer expected";
            if (message.buybackCooldown != null && Object.hasOwnProperty.call(message, "buybackCooldown"))
                if (!$util.isInteger(message.buybackCooldown))
                    return "buybackCooldown: integer expected";
            return null;
        };

        /**
         * Creates a PlayerStat message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof spectate.PlayerStat
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {spectate.PlayerStat} PlayerStat
         */
        PlayerStat.fromObject = function fromObject(object, long) {
            if (object instanceof $root.spectate.PlayerStat)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".spectate.PlayerStat: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.spectate.PlayerStat();
            if (object.slot != null)
                message.slot = object.slot >>> 0;
            if (object.team != null)
                message.team = object.team >>> 0;
            if (object.heroId != null)
                message.heroId = object.heroId >>> 0;
            if (object.name != null)
                message.name = String(object.name);
            if (object.kills != null)
                message.kills = object.kills >>> 0;
            if (object.deaths != null)
                message.deaths = object.deaths >>> 0;
            if (object.assists != null)
                message.assists = object.assists >>> 0;
            if (object.lastHits != null)
                message.lastHits = object.lastHits >>> 0;
            if (object.denies != null)
                message.denies = object.denies >>> 0;
            if (object.netWorth != null)
                message.netWorth = object.netWorth >>> 0;
            if (object.gold != null)
                message.gold = object.gold >>> 0;
            if (object.gpm != null)
                message.gpm = object.gpm >>> 0;
            if (object.xpm != null)
                message.xpm = object.xpm >>> 0;
            if (object.buybackCooldown != null)
                message.buybackCooldown = object.buybackCooldown >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a PlayerStat message. Also converts values to other types if specified.
         * @function toObject
         * @memberof spectate.PlayerStat
         * @static
         * @param {spectate.PlayerStat} message PlayerStat
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerStat.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.slot = 0;
                object.team = 0;
                object.heroId = 0;
                object.name = "";
                object.kills = 0;
                object.deaths = 0;
                object.assists = 0;
                object.lastHits = 0;
                object.denies = 0;
                object.netWorth = 0;
                object.gold = 0;
                object.gpm = 0;
                object.xpm = 0;
                object.buybackCooldown = 0;
            }
            if (message.slot != null && Object.hasOwnProperty.call(message, "slot"))
                object.slot = message.slot;
            if (message.team != null && Object.hasOwnProperty.call(message, "team"))
                object.team = message.team;
            if (message.heroId != null && Object.hasOwnProperty.call(message, "heroId"))
                object.heroId = message.heroId;
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                object.name = message.name;
            if (message.kills != null && Object.hasOwnProperty.call(message, "kills"))
                object.kills = message.kills;
            if (message.deaths != null && Object.hasOwnProperty.call(message, "deaths"))
                object.deaths = message.deaths;
            if (message.assists != null && Object.hasOwnProperty.call(message, "assists"))
                object.assists = message.assists;
            if (message.lastHits != null && Object.hasOwnProperty.call(message, "lastHits"))
                object.lastHits = message.lastHits;
            if (message.denies != null && Object.hasOwnProperty.call(message, "denies"))
                object.denies = message.denies;
            if (message.netWorth != null && Object.hasOwnProperty.call(message, "netWorth"))
                object.netWorth = message.netWorth;
            if (message.gold != null && Object.hasOwnProperty.call(message, "gold"))
                object.gold = message.gold;
            if (message.gpm != null && Object.hasOwnProperty.call(message, "gpm"))
                object.gpm = message.gpm;
            if (message.xpm != null && Object.hasOwnProperty.call(message, "xpm"))
                object.xpm = message.xpm;
            if (message.buybackCooldown != null && Object.hasOwnProperty.call(message, "buybackCooldown"))
                object.buybackCooldown = message.buybackCooldown;
            return object;
        };

        /**
         * Converts this PlayerStat to JSON.
         * @function toJSON
         * @memberof spectate.PlayerStat
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerStat.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PlayerStat
         * @function getTypeUrl
         * @memberof spectate.PlayerStat
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PlayerStat.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/spectate.PlayerStat";
        };

        return PlayerStat;
    })();

    /**
     * UnitType enum.
     * @name spectate.UnitType
     * @enum {number}
     * @property {number} UNIT_UNKNOWN=0 UNIT_UNKNOWN value
     * @property {number} HERO=1 HERO value
     * @property {number} ILLUSION=2 ILLUSION value
     * @property {number} CREEP=3 CREEP value
     * @property {number} NEUTRAL=4 NEUTRAL value
     * @property {number} WARD_OBS=5 WARD_OBS value
     * @property {number} WARD_SEN=6 WARD_SEN value
     * @property {number} BUILDING=7 BUILDING value
     * @property {number} COURIER=8 COURIER value
     * @property {number} ROSHAN=9 ROSHAN value
     */
    spectate.UnitType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNIT_UNKNOWN"] = 0;
        values[valuesById[1] = "HERO"] = 1;
        values[valuesById[2] = "ILLUSION"] = 2;
        values[valuesById[3] = "CREEP"] = 3;
        values[valuesById[4] = "NEUTRAL"] = 4;
        values[valuesById[5] = "WARD_OBS"] = 5;
        values[valuesById[6] = "WARD_SEN"] = 6;
        values[valuesById[7] = "BUILDING"] = 7;
        values[valuesById[8] = "COURIER"] = 8;
        values[valuesById[9] = "ROSHAN"] = 9;
        return values;
    })();

    spectate.Unit = (function() {

        /**
         * Properties of an Unit.
         * @memberof spectate
         * @interface IUnit
         * @property {number|null} [handle] Unit handle
         * @property {spectate.UnitType|null} [type] Unit type
         * @property {number|null} [x] Unit x
         * @property {number|null} [y] Unit y
         * @property {number|null} [yaw] Unit yaw
         * @property {number|null} [team] Unit team
         * @property {number|null} [hp] Unit hp
         * @property {number|null} [maxHp] Unit maxHp
         * @property {number|null} [flags] Unit flags
         * @property {number|null} [heroId] Unit heroId
         * @property {number|null} [playerSlot] Unit playerSlot
         * @property {number|null} [level] Unit level
         * @property {number|null} [mp] Unit mp
         * @property {number|null} [maxMp] Unit maxMp
         * @property {string|null} [unitName] Unit unitName
         * @property {number|null} [respawnTime] Unit respawnTime
         * @property {Array.<string>|null} [items] Unit items
         * @property {number|null} [modelScale] Unit modelScale
         * @property {Array.<spectate.IAbility>|null} [abilities] Unit abilities
         * @property {number|null} [strength] Unit strength
         * @property {number|null} [agility] Unit agility
         * @property {number|null} [intellect] Unit intellect
         * @property {number|null} [moveSpeed] Unit moveSpeed
         * @property {number|null} [activity] Unit activity
         */

        /**
         * Constructs a new Unit.
         * @memberof spectate
         * @classdesc Represents an Unit.
         * @implements IUnit
         * @constructor
         * @param {spectate.IUnit=} [properties] Properties to set
         */
        function Unit(properties) {
            this.items = [];
            this.abilities = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Unit handle.
         * @member {number} handle
         * @memberof spectate.Unit
         * @instance
         */
        Unit.prototype.handle = 0;

        /**
         * Unit type.
         * @member {spectate.UnitType} type
         * @memberof spectate.Unit
         * @instance
         */
        Unit.prototype.type = 0;

        /**
         * Unit x.
         * @member {number} x
         * @memberof spectate.Unit
         * @instance
         */
        Unit.prototype.x = 0;

        /**
         * Unit y.
         * @member {number} y
         * @memberof spectate.Unit
         * @instance
         */
        Unit.prototype.y = 0;

        /**
         * Unit yaw.
         * @member {number} yaw
         * @memberof spectate.Unit
         * @instance
         */
        Unit.prototype.yaw = 0;

        /**
         * Unit team.
         * @member {number} team
         * @memberof spectate.Unit
         * @instance
         */
        Unit.prototype.team = 0;

        /**
         * Unit hp.
         * @member {number} hp
         * @memberof spectate.Unit
         * @instance
         */
        Unit.prototype.hp = 0;

        /**
         * Unit maxHp.
         * @member {number} maxHp
         * @memberof spectate.Unit
         * @instance
         */
        Unit.prototype.maxHp = 0;

        /**
         * Unit flags.
         * @member {number} flags
         * @memberof spectate.Unit
         * @instance
         */
        Unit.prototype.flags = 0;

        /**
         * Unit heroId.
         * @member {number} heroId
         * @memberof spectate.Unit
         * @instance
         */
        Unit.prototype.heroId = 0;

        /**
         * Unit playerSlot.
         * @member {number} playerSlot
         * @memberof spectate.Unit
         * @instance
         */
        Unit.prototype.playerSlot = 0;

        /**
         * Unit level.
         * @member {number} level
         * @memberof spectate.Unit
         * @instance
         */
        Unit.prototype.level = 0;

        /**
         * Unit mp.
         * @member {number} mp
         * @memberof spectate.Unit
         * @instance
         */
        Unit.prototype.mp = 0;

        /**
         * Unit maxMp.
         * @member {number} maxMp
         * @memberof spectate.Unit
         * @instance
         */
        Unit.prototype.maxMp = 0;

        /**
         * Unit unitName.
         * @member {string} unitName
         * @memberof spectate.Unit
         * @instance
         */
        Unit.prototype.unitName = "";

        /**
         * Unit respawnTime.
         * @member {number} respawnTime
         * @memberof spectate.Unit
         * @instance
         */
        Unit.prototype.respawnTime = 0;

        /**
         * Unit items.
         * @member {Array.<string>} items
         * @memberof spectate.Unit
         * @instance
         */
        Unit.prototype.items = $util.emptyArray;

        /**
         * Unit modelScale.
         * @member {number} modelScale
         * @memberof spectate.Unit
         * @instance
         */
        Unit.prototype.modelScale = 0;

        /**
         * Unit abilities.
         * @member {Array.<spectate.IAbility>} abilities
         * @memberof spectate.Unit
         * @instance
         */
        Unit.prototype.abilities = $util.emptyArray;

        /**
         * Unit strength.
         * @member {number} strength
         * @memberof spectate.Unit
         * @instance
         */
        Unit.prototype.strength = 0;

        /**
         * Unit agility.
         * @member {number} agility
         * @memberof spectate.Unit
         * @instance
         */
        Unit.prototype.agility = 0;

        /**
         * Unit intellect.
         * @member {number} intellect
         * @memberof spectate.Unit
         * @instance
         */
        Unit.prototype.intellect = 0;

        /**
         * Unit moveSpeed.
         * @member {number} moveSpeed
         * @memberof spectate.Unit
         * @instance
         */
        Unit.prototype.moveSpeed = 0;

        /**
         * Unit activity.
         * @member {number} activity
         * @memberof spectate.Unit
         * @instance
         */
        Unit.prototype.activity = 0;

        /**
         * Creates a new Unit instance using the specified properties.
         * @function create
         * @memberof spectate.Unit
         * @static
         * @param {spectate.IUnit=} [properties] Properties to set
         * @returns {spectate.Unit} Unit instance
         */
        Unit.create = function create(properties) {
            return new Unit(properties);
        };

        /**
         * Encodes the specified Unit message. Does not implicitly {@link spectate.Unit.verify|verify} messages.
         * @function encode
         * @memberof spectate.Unit
         * @static
         * @param {spectate.IUnit} message Unit message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Unit.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.handle != null && Object.hasOwnProperty.call(message, "handle"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.handle);
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
            if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                writer.uint32(/* id 3, wireType 0 =*/24).sint32(message.x);
            if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                writer.uint32(/* id 4, wireType 0 =*/32).sint32(message.y);
            if (message.yaw != null && Object.hasOwnProperty.call(message, "yaw"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.yaw);
            if (message.team != null && Object.hasOwnProperty.call(message, "team"))
                writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.team);
            if (message.hp != null && Object.hasOwnProperty.call(message, "hp"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.hp);
            if (message.maxHp != null && Object.hasOwnProperty.call(message, "maxHp"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.maxHp);
            if (message.flags != null && Object.hasOwnProperty.call(message, "flags"))
                writer.uint32(/* id 9, wireType 0 =*/72).uint32(message.flags);
            if (message.heroId != null && Object.hasOwnProperty.call(message, "heroId"))
                writer.uint32(/* id 10, wireType 0 =*/80).uint32(message.heroId);
            if (message.playerSlot != null && Object.hasOwnProperty.call(message, "playerSlot"))
                writer.uint32(/* id 11, wireType 0 =*/88).uint32(message.playerSlot);
            if (message.level != null && Object.hasOwnProperty.call(message, "level"))
                writer.uint32(/* id 12, wireType 0 =*/96).uint32(message.level);
            if (message.mp != null && Object.hasOwnProperty.call(message, "mp"))
                writer.uint32(/* id 13, wireType 0 =*/104).int32(message.mp);
            if (message.maxMp != null && Object.hasOwnProperty.call(message, "maxMp"))
                writer.uint32(/* id 14, wireType 0 =*/112).int32(message.maxMp);
            if (message.unitName != null && Object.hasOwnProperty.call(message, "unitName"))
                writer.uint32(/* id 15, wireType 2 =*/122).string(message.unitName);
            if (message.respawnTime != null && Object.hasOwnProperty.call(message, "respawnTime"))
                writer.uint32(/* id 16, wireType 5 =*/133).float(message.respawnTime);
            if (message.items != null && message.items.length)
                for (let i = 0; i < message.items.length; ++i)
                    writer.uint32(/* id 17, wireType 2 =*/138).string(message.items[i]);
            if (message.modelScale != null && Object.hasOwnProperty.call(message, "modelScale"))
                writer.uint32(/* id 18, wireType 5 =*/149).float(message.modelScale);
            if (message.abilities != null && message.abilities.length)
                for (let i = 0; i < message.abilities.length; ++i)
                    $root.spectate.Ability.encode(message.abilities[i], writer.uint32(/* id 19, wireType 2 =*/154).fork(), q + 1).ldelim();
            if (message.strength != null && Object.hasOwnProperty.call(message, "strength"))
                writer.uint32(/* id 20, wireType 0 =*/160).int32(message.strength);
            if (message.agility != null && Object.hasOwnProperty.call(message, "agility"))
                writer.uint32(/* id 21, wireType 0 =*/168).int32(message.agility);
            if (message.intellect != null && Object.hasOwnProperty.call(message, "intellect"))
                writer.uint32(/* id 22, wireType 0 =*/176).int32(message.intellect);
            if (message.moveSpeed != null && Object.hasOwnProperty.call(message, "moveSpeed"))
                writer.uint32(/* id 23, wireType 0 =*/184).int32(message.moveSpeed);
            if (message.activity != null && Object.hasOwnProperty.call(message, "activity"))
                writer.uint32(/* id 24, wireType 0 =*/192).uint32(message.activity);
            return writer;
        };

        /**
         * Encodes the specified Unit message, length delimited. Does not implicitly {@link spectate.Unit.verify|verify} messages.
         * @function encodeDelimited
         * @memberof spectate.Unit
         * @static
         * @param {spectate.IUnit} message Unit message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Unit.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an Unit message from the specified reader or buffer.
         * @function decode
         * @memberof spectate.Unit
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {spectate.Unit} Unit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Unit.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.spectate.Unit();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.handle = reader.uint32();
                        break;
                    }
                case 2: {
                        message.type = reader.int32();
                        break;
                    }
                case 3: {
                        message.x = reader.sint32();
                        break;
                    }
                case 4: {
                        message.y = reader.sint32();
                        break;
                    }
                case 5: {
                        message.yaw = reader.uint32();
                        break;
                    }
                case 6: {
                        message.team = reader.uint32();
                        break;
                    }
                case 7: {
                        message.hp = reader.int32();
                        break;
                    }
                case 8: {
                        message.maxHp = reader.int32();
                        break;
                    }
                case 9: {
                        message.flags = reader.uint32();
                        break;
                    }
                case 10: {
                        message.heroId = reader.uint32();
                        break;
                    }
                case 11: {
                        message.playerSlot = reader.uint32();
                        break;
                    }
                case 12: {
                        message.level = reader.uint32();
                        break;
                    }
                case 13: {
                        message.mp = reader.int32();
                        break;
                    }
                case 14: {
                        message.maxMp = reader.int32();
                        break;
                    }
                case 15: {
                        message.unitName = reader.string();
                        break;
                    }
                case 16: {
                        message.respawnTime = reader.float();
                        break;
                    }
                case 17: {
                        if (!(message.items && message.items.length))
                            message.items = [];
                        message.items.push(reader.string());
                        break;
                    }
                case 18: {
                        message.modelScale = reader.float();
                        break;
                    }
                case 19: {
                        if (!(message.abilities && message.abilities.length))
                            message.abilities = [];
                        message.abilities.push($root.spectate.Ability.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 20: {
                        message.strength = reader.int32();
                        break;
                    }
                case 21: {
                        message.agility = reader.int32();
                        break;
                    }
                case 22: {
                        message.intellect = reader.int32();
                        break;
                    }
                case 23: {
                        message.moveSpeed = reader.int32();
                        break;
                    }
                case 24: {
                        message.activity = reader.uint32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Unit message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof spectate.Unit
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {spectate.Unit} Unit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Unit.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Unit message.
         * @function verify
         * @memberof spectate.Unit
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Unit.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.handle != null && Object.hasOwnProperty.call(message, "handle"))
                if (!$util.isInteger(message.handle))
                    return "handle: integer expected";
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                    break;
                }
            if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                if (!$util.isInteger(message.x))
                    return "x: integer expected";
            if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                if (!$util.isInteger(message.y))
                    return "y: integer expected";
            if (message.yaw != null && Object.hasOwnProperty.call(message, "yaw"))
                if (!$util.isInteger(message.yaw))
                    return "yaw: integer expected";
            if (message.team != null && Object.hasOwnProperty.call(message, "team"))
                if (!$util.isInteger(message.team))
                    return "team: integer expected";
            if (message.hp != null && Object.hasOwnProperty.call(message, "hp"))
                if (!$util.isInteger(message.hp))
                    return "hp: integer expected";
            if (message.maxHp != null && Object.hasOwnProperty.call(message, "maxHp"))
                if (!$util.isInteger(message.maxHp))
                    return "maxHp: integer expected";
            if (message.flags != null && Object.hasOwnProperty.call(message, "flags"))
                if (!$util.isInteger(message.flags))
                    return "flags: integer expected";
            if (message.heroId != null && Object.hasOwnProperty.call(message, "heroId"))
                if (!$util.isInteger(message.heroId))
                    return "heroId: integer expected";
            if (message.playerSlot != null && Object.hasOwnProperty.call(message, "playerSlot"))
                if (!$util.isInteger(message.playerSlot))
                    return "playerSlot: integer expected";
            if (message.level != null && Object.hasOwnProperty.call(message, "level"))
                if (!$util.isInteger(message.level))
                    return "level: integer expected";
            if (message.mp != null && Object.hasOwnProperty.call(message, "mp"))
                if (!$util.isInteger(message.mp))
                    return "mp: integer expected";
            if (message.maxMp != null && Object.hasOwnProperty.call(message, "maxMp"))
                if (!$util.isInteger(message.maxMp))
                    return "maxMp: integer expected";
            if (message.unitName != null && Object.hasOwnProperty.call(message, "unitName"))
                if (!$util.isString(message.unitName))
                    return "unitName: string expected";
            if (message.respawnTime != null && Object.hasOwnProperty.call(message, "respawnTime"))
                if (typeof message.respawnTime !== "number")
                    return "respawnTime: number expected";
            if (message.items != null && Object.hasOwnProperty.call(message, "items")) {
                if (!Array.isArray(message.items))
                    return "items: array expected";
                for (let i = 0; i < message.items.length; ++i)
                    if (!$util.isString(message.items[i]))
                        return "items: string[] expected";
            }
            if (message.modelScale != null && Object.hasOwnProperty.call(message, "modelScale"))
                if (typeof message.modelScale !== "number")
                    return "modelScale: number expected";
            if (message.abilities != null && Object.hasOwnProperty.call(message, "abilities")) {
                if (!Array.isArray(message.abilities))
                    return "abilities: array expected";
                for (let i = 0; i < message.abilities.length; ++i) {
                    let error = $root.spectate.Ability.verify(message.abilities[i], long + 1);
                    if (error)
                        return "abilities." + error;
                }
            }
            if (message.strength != null && Object.hasOwnProperty.call(message, "strength"))
                if (!$util.isInteger(message.strength))
                    return "strength: integer expected";
            if (message.agility != null && Object.hasOwnProperty.call(message, "agility"))
                if (!$util.isInteger(message.agility))
                    return "agility: integer expected";
            if (message.intellect != null && Object.hasOwnProperty.call(message, "intellect"))
                if (!$util.isInteger(message.intellect))
                    return "intellect: integer expected";
            if (message.moveSpeed != null && Object.hasOwnProperty.call(message, "moveSpeed"))
                if (!$util.isInteger(message.moveSpeed))
                    return "moveSpeed: integer expected";
            if (message.activity != null && Object.hasOwnProperty.call(message, "activity"))
                if (!$util.isInteger(message.activity))
                    return "activity: integer expected";
            return null;
        };

        /**
         * Creates an Unit message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof spectate.Unit
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {spectate.Unit} Unit
         */
        Unit.fromObject = function fromObject(object, long) {
            if (object instanceof $root.spectate.Unit)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".spectate.Unit: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.spectate.Unit();
            if (object.handle != null)
                message.handle = object.handle >>> 0;
            switch (object.type) {
            default:
                if (typeof object.type === "number") {
                    message.type = object.type;
                    break;
                }
                break;
            case "UNIT_UNKNOWN":
            case 0:
                message.type = 0;
                break;
            case "HERO":
            case 1:
                message.type = 1;
                break;
            case "ILLUSION":
            case 2:
                message.type = 2;
                break;
            case "CREEP":
            case 3:
                message.type = 3;
                break;
            case "NEUTRAL":
            case 4:
                message.type = 4;
                break;
            case "WARD_OBS":
            case 5:
                message.type = 5;
                break;
            case "WARD_SEN":
            case 6:
                message.type = 6;
                break;
            case "BUILDING":
            case 7:
                message.type = 7;
                break;
            case "COURIER":
            case 8:
                message.type = 8;
                break;
            case "ROSHAN":
            case 9:
                message.type = 9;
                break;
            }
            if (object.x != null)
                message.x = object.x | 0;
            if (object.y != null)
                message.y = object.y | 0;
            if (object.yaw != null)
                message.yaw = object.yaw >>> 0;
            if (object.team != null)
                message.team = object.team >>> 0;
            if (object.hp != null)
                message.hp = object.hp | 0;
            if (object.maxHp != null)
                message.maxHp = object.maxHp | 0;
            if (object.flags != null)
                message.flags = object.flags >>> 0;
            if (object.heroId != null)
                message.heroId = object.heroId >>> 0;
            if (object.playerSlot != null)
                message.playerSlot = object.playerSlot >>> 0;
            if (object.level != null)
                message.level = object.level >>> 0;
            if (object.mp != null)
                message.mp = object.mp | 0;
            if (object.maxMp != null)
                message.maxMp = object.maxMp | 0;
            if (object.unitName != null)
                message.unitName = String(object.unitName);
            if (object.respawnTime != null)
                message.respawnTime = Number(object.respawnTime);
            if (object.items) {
                if (!Array.isArray(object.items))
                    throw TypeError(".spectate.Unit.items: array expected");
                message.items = [];
                for (let i = 0; i < object.items.length; ++i)
                    message.items[i] = String(object.items[i]);
            }
            if (object.modelScale != null)
                message.modelScale = Number(object.modelScale);
            if (object.abilities) {
                if (!Array.isArray(object.abilities))
                    throw TypeError(".spectate.Unit.abilities: array expected");
                message.abilities = [];
                for (let i = 0; i < object.abilities.length; ++i) {
                    if (!$util.isObject(object.abilities[i]))
                        throw TypeError(".spectate.Unit.abilities: object expected");
                    message.abilities[i] = $root.spectate.Ability.fromObject(object.abilities[i], long + 1);
                }
            }
            if (object.strength != null)
                message.strength = object.strength | 0;
            if (object.agility != null)
                message.agility = object.agility | 0;
            if (object.intellect != null)
                message.intellect = object.intellect | 0;
            if (object.moveSpeed != null)
                message.moveSpeed = object.moveSpeed | 0;
            if (object.activity != null)
                message.activity = object.activity >>> 0;
            return message;
        };

        /**
         * Creates a plain object from an Unit message. Also converts values to other types if specified.
         * @function toObject
         * @memberof spectate.Unit
         * @static
         * @param {spectate.Unit} message Unit
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Unit.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults) {
                object.items = [];
                object.abilities = [];
            }
            if (options.defaults) {
                object.handle = 0;
                object.type = options.enums === String ? "UNIT_UNKNOWN" : 0;
                object.x = 0;
                object.y = 0;
                object.yaw = 0;
                object.team = 0;
                object.hp = 0;
                object.maxHp = 0;
                object.flags = 0;
                object.heroId = 0;
                object.playerSlot = 0;
                object.level = 0;
                object.mp = 0;
                object.maxMp = 0;
                object.unitName = "";
                object.respawnTime = 0;
                object.modelScale = 0;
                object.strength = 0;
                object.agility = 0;
                object.intellect = 0;
                object.moveSpeed = 0;
                object.activity = 0;
            }
            if (message.handle != null && Object.hasOwnProperty.call(message, "handle"))
                object.handle = message.handle;
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                object.type = options.enums === String ? $root.spectate.UnitType[message.type] === undefined ? message.type : $root.spectate.UnitType[message.type] : message.type;
            if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                object.x = message.x;
            if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                object.y = message.y;
            if (message.yaw != null && Object.hasOwnProperty.call(message, "yaw"))
                object.yaw = message.yaw;
            if (message.team != null && Object.hasOwnProperty.call(message, "team"))
                object.team = message.team;
            if (message.hp != null && Object.hasOwnProperty.call(message, "hp"))
                object.hp = message.hp;
            if (message.maxHp != null && Object.hasOwnProperty.call(message, "maxHp"))
                object.maxHp = message.maxHp;
            if (message.flags != null && Object.hasOwnProperty.call(message, "flags"))
                object.flags = message.flags;
            if (message.heroId != null && Object.hasOwnProperty.call(message, "heroId"))
                object.heroId = message.heroId;
            if (message.playerSlot != null && Object.hasOwnProperty.call(message, "playerSlot"))
                object.playerSlot = message.playerSlot;
            if (message.level != null && Object.hasOwnProperty.call(message, "level"))
                object.level = message.level;
            if (message.mp != null && Object.hasOwnProperty.call(message, "mp"))
                object.mp = message.mp;
            if (message.maxMp != null && Object.hasOwnProperty.call(message, "maxMp"))
                object.maxMp = message.maxMp;
            if (message.unitName != null && Object.hasOwnProperty.call(message, "unitName"))
                object.unitName = message.unitName;
            if (message.respawnTime != null && Object.hasOwnProperty.call(message, "respawnTime"))
                object.respawnTime = options.json && !isFinite(message.respawnTime) ? String(message.respawnTime) : message.respawnTime;
            if (message.items && message.items.length) {
                object.items = [];
                for (let j = 0; j < message.items.length; ++j)
                    object.items[j] = message.items[j];
            }
            if (message.modelScale != null && Object.hasOwnProperty.call(message, "modelScale"))
                object.modelScale = options.json && !isFinite(message.modelScale) ? String(message.modelScale) : message.modelScale;
            if (message.abilities && message.abilities.length) {
                object.abilities = [];
                for (let j = 0; j < message.abilities.length; ++j)
                    object.abilities[j] = $root.spectate.Ability.toObject(message.abilities[j], options, q + 1);
            }
            if (message.strength != null && Object.hasOwnProperty.call(message, "strength"))
                object.strength = message.strength;
            if (message.agility != null && Object.hasOwnProperty.call(message, "agility"))
                object.agility = message.agility;
            if (message.intellect != null && Object.hasOwnProperty.call(message, "intellect"))
                object.intellect = message.intellect;
            if (message.moveSpeed != null && Object.hasOwnProperty.call(message, "moveSpeed"))
                object.moveSpeed = message.moveSpeed;
            if (message.activity != null && Object.hasOwnProperty.call(message, "activity"))
                object.activity = message.activity;
            return object;
        };

        /**
         * Converts this Unit to JSON.
         * @function toJSON
         * @memberof spectate.Unit
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Unit.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Unit
         * @function getTypeUrl
         * @memberof spectate.Unit
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Unit.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/spectate.Unit";
        };

        return Unit;
    })();

    spectate.Ability = (function() {

        /**
         * Properties of an Ability.
         * @memberof spectate
         * @interface IAbility
         * @property {string|null} [name] Ability name
         * @property {number|null} [level] Ability level
         * @property {number|null} [cooldownEnd] Ability cooldownEnd
         * @property {number|null} [cooldownLength] Ability cooldownLength
         */

        /**
         * Constructs a new Ability.
         * @memberof spectate
         * @classdesc Represents an Ability.
         * @implements IAbility
         * @constructor
         * @param {spectate.IAbility=} [properties] Properties to set
         */
        function Ability(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Ability name.
         * @member {string} name
         * @memberof spectate.Ability
         * @instance
         */
        Ability.prototype.name = "";

        /**
         * Ability level.
         * @member {number} level
         * @memberof spectate.Ability
         * @instance
         */
        Ability.prototype.level = 0;

        /**
         * Ability cooldownEnd.
         * @member {number} cooldownEnd
         * @memberof spectate.Ability
         * @instance
         */
        Ability.prototype.cooldownEnd = 0;

        /**
         * Ability cooldownLength.
         * @member {number} cooldownLength
         * @memberof spectate.Ability
         * @instance
         */
        Ability.prototype.cooldownLength = 0;

        /**
         * Creates a new Ability instance using the specified properties.
         * @function create
         * @memberof spectate.Ability
         * @static
         * @param {spectate.IAbility=} [properties] Properties to set
         * @returns {spectate.Ability} Ability instance
         */
        Ability.create = function create(properties) {
            return new Ability(properties);
        };

        /**
         * Encodes the specified Ability message. Does not implicitly {@link spectate.Ability.verify|verify} messages.
         * @function encode
         * @memberof spectate.Ability
         * @static
         * @param {spectate.IAbility} message Ability message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Ability.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            if (message.level != null && Object.hasOwnProperty.call(message, "level"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.level);
            if (message.cooldownEnd != null && Object.hasOwnProperty.call(message, "cooldownEnd"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.cooldownEnd);
            if (message.cooldownLength != null && Object.hasOwnProperty.call(message, "cooldownLength"))
                writer.uint32(/* id 4, wireType 5 =*/37).float(message.cooldownLength);
            return writer;
        };

        /**
         * Encodes the specified Ability message, length delimited. Does not implicitly {@link spectate.Ability.verify|verify} messages.
         * @function encodeDelimited
         * @memberof spectate.Ability
         * @static
         * @param {spectate.IAbility} message Ability message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Ability.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an Ability message from the specified reader or buffer.
         * @function decode
         * @memberof spectate.Ability
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {spectate.Ability} Ability
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Ability.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.spectate.Ability();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.name = reader.string();
                        break;
                    }
                case 2: {
                        message.level = reader.int32();
                        break;
                    }
                case 3: {
                        message.cooldownEnd = reader.float();
                        break;
                    }
                case 4: {
                        message.cooldownLength = reader.float();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Ability message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof spectate.Ability
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {spectate.Ability} Ability
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Ability.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Ability message.
         * @function verify
         * @memberof spectate.Ability
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Ability.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.level != null && Object.hasOwnProperty.call(message, "level"))
                if (!$util.isInteger(message.level))
                    return "level: integer expected";
            if (message.cooldownEnd != null && Object.hasOwnProperty.call(message, "cooldownEnd"))
                if (typeof message.cooldownEnd !== "number")
                    return "cooldownEnd: number expected";
            if (message.cooldownLength != null && Object.hasOwnProperty.call(message, "cooldownLength"))
                if (typeof message.cooldownLength !== "number")
                    return "cooldownLength: number expected";
            return null;
        };

        /**
         * Creates an Ability message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof spectate.Ability
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {spectate.Ability} Ability
         */
        Ability.fromObject = function fromObject(object, long) {
            if (object instanceof $root.spectate.Ability)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".spectate.Ability: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.spectate.Ability();
            if (object.name != null)
                message.name = String(object.name);
            if (object.level != null)
                message.level = object.level | 0;
            if (object.cooldownEnd != null)
                message.cooldownEnd = Number(object.cooldownEnd);
            if (object.cooldownLength != null)
                message.cooldownLength = Number(object.cooldownLength);
            return message;
        };

        /**
         * Creates a plain object from an Ability message. Also converts values to other types if specified.
         * @function toObject
         * @memberof spectate.Ability
         * @static
         * @param {spectate.Ability} message Ability
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Ability.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.name = "";
                object.level = 0;
                object.cooldownEnd = 0;
                object.cooldownLength = 0;
            }
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                object.name = message.name;
            if (message.level != null && Object.hasOwnProperty.call(message, "level"))
                object.level = message.level;
            if (message.cooldownEnd != null && Object.hasOwnProperty.call(message, "cooldownEnd"))
                object.cooldownEnd = options.json && !isFinite(message.cooldownEnd) ? String(message.cooldownEnd) : message.cooldownEnd;
            if (message.cooldownLength != null && Object.hasOwnProperty.call(message, "cooldownLength"))
                object.cooldownLength = options.json && !isFinite(message.cooldownLength) ? String(message.cooldownLength) : message.cooldownLength;
            return object;
        };

        /**
         * Converts this Ability to JSON.
         * @function toJSON
         * @memberof spectate.Ability
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Ability.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Ability
         * @function getTypeUrl
         * @memberof spectate.Ability
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Ability.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/spectate.Ability";
        };

        return Ability;
    })();

    spectate.MatchLite = (function() {

        /**
         * Properties of a MatchLite.
         * @memberof spectate
         * @interface IMatchLite
         * @property {number|null} [radiantScore] MatchLite radiantScore
         * @property {number|null} [direScore] MatchLite direScore
         * @property {boolean|null} [dayTime] MatchLite dayTime
         */

        /**
         * Constructs a new MatchLite.
         * @memberof spectate
         * @classdesc Represents a MatchLite.
         * @implements IMatchLite
         * @constructor
         * @param {spectate.IMatchLite=} [properties] Properties to set
         */
        function MatchLite(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MatchLite radiantScore.
         * @member {number} radiantScore
         * @memberof spectate.MatchLite
         * @instance
         */
        MatchLite.prototype.radiantScore = 0;

        /**
         * MatchLite direScore.
         * @member {number} direScore
         * @memberof spectate.MatchLite
         * @instance
         */
        MatchLite.prototype.direScore = 0;

        /**
         * MatchLite dayTime.
         * @member {boolean} dayTime
         * @memberof spectate.MatchLite
         * @instance
         */
        MatchLite.prototype.dayTime = false;

        /**
         * Creates a new MatchLite instance using the specified properties.
         * @function create
         * @memberof spectate.MatchLite
         * @static
         * @param {spectate.IMatchLite=} [properties] Properties to set
         * @returns {spectate.MatchLite} MatchLite instance
         */
        MatchLite.create = function create(properties) {
            return new MatchLite(properties);
        };

        /**
         * Encodes the specified MatchLite message. Does not implicitly {@link spectate.MatchLite.verify|verify} messages.
         * @function encode
         * @memberof spectate.MatchLite
         * @static
         * @param {spectate.IMatchLite} message MatchLite message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MatchLite.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.radiantScore != null && Object.hasOwnProperty.call(message, "radiantScore"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.radiantScore);
            if (message.direScore != null && Object.hasOwnProperty.call(message, "direScore"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.direScore);
            if (message.dayTime != null && Object.hasOwnProperty.call(message, "dayTime"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.dayTime);
            return writer;
        };

        /**
         * Encodes the specified MatchLite message, length delimited. Does not implicitly {@link spectate.MatchLite.verify|verify} messages.
         * @function encodeDelimited
         * @memberof spectate.MatchLite
         * @static
         * @param {spectate.IMatchLite} message MatchLite message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MatchLite.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a MatchLite message from the specified reader or buffer.
         * @function decode
         * @memberof spectate.MatchLite
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {spectate.MatchLite} MatchLite
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MatchLite.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.spectate.MatchLite();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.radiantScore = reader.uint32();
                        break;
                    }
                case 2: {
                        message.direScore = reader.uint32();
                        break;
                    }
                case 3: {
                        message.dayTime = reader.bool();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MatchLite message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof spectate.MatchLite
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {spectate.MatchLite} MatchLite
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MatchLite.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MatchLite message.
         * @function verify
         * @memberof spectate.MatchLite
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MatchLite.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.radiantScore != null && Object.hasOwnProperty.call(message, "radiantScore"))
                if (!$util.isInteger(message.radiantScore))
                    return "radiantScore: integer expected";
            if (message.direScore != null && Object.hasOwnProperty.call(message, "direScore"))
                if (!$util.isInteger(message.direScore))
                    return "direScore: integer expected";
            if (message.dayTime != null && Object.hasOwnProperty.call(message, "dayTime"))
                if (typeof message.dayTime !== "boolean")
                    return "dayTime: boolean expected";
            return null;
        };

        /**
         * Creates a MatchLite message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof spectate.MatchLite
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {spectate.MatchLite} MatchLite
         */
        MatchLite.fromObject = function fromObject(object, long) {
            if (object instanceof $root.spectate.MatchLite)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".spectate.MatchLite: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.spectate.MatchLite();
            if (object.radiantScore != null)
                message.radiantScore = object.radiantScore >>> 0;
            if (object.direScore != null)
                message.direScore = object.direScore >>> 0;
            if (object.dayTime != null)
                message.dayTime = Boolean(object.dayTime);
            return message;
        };

        /**
         * Creates a plain object from a MatchLite message. Also converts values to other types if specified.
         * @function toObject
         * @memberof spectate.MatchLite
         * @static
         * @param {spectate.MatchLite} message MatchLite
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MatchLite.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.radiantScore = 0;
                object.direScore = 0;
                object.dayTime = false;
            }
            if (message.radiantScore != null && Object.hasOwnProperty.call(message, "radiantScore"))
                object.radiantScore = message.radiantScore;
            if (message.direScore != null && Object.hasOwnProperty.call(message, "direScore"))
                object.direScore = message.direScore;
            if (message.dayTime != null && Object.hasOwnProperty.call(message, "dayTime"))
                object.dayTime = message.dayTime;
            return object;
        };

        /**
         * Converts this MatchLite to JSON.
         * @function toJSON
         * @memberof spectate.MatchLite
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MatchLite.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MatchLite
         * @function getTypeUrl
         * @memberof spectate.MatchLite
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MatchLite.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/spectate.MatchLite";
        };

        return MatchLite;
    })();

    spectate.Batch = (function() {

        /**
         * Properties of a Batch.
         * @memberof spectate
         * @interface IBatch
         * @property {Array.<spectate.IStreamMsg>|null} [msgs] Batch msgs
         */

        /**
         * Constructs a new Batch.
         * @memberof spectate
         * @classdesc Represents a Batch.
         * @implements IBatch
         * @constructor
         * @param {spectate.IBatch=} [properties] Properties to set
         */
        function Batch(properties) {
            this.msgs = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Batch msgs.
         * @member {Array.<spectate.IStreamMsg>} msgs
         * @memberof spectate.Batch
         * @instance
         */
        Batch.prototype.msgs = $util.emptyArray;

        /**
         * Creates a new Batch instance using the specified properties.
         * @function create
         * @memberof spectate.Batch
         * @static
         * @param {spectate.IBatch=} [properties] Properties to set
         * @returns {spectate.Batch} Batch instance
         */
        Batch.create = function create(properties) {
            return new Batch(properties);
        };

        /**
         * Encodes the specified Batch message. Does not implicitly {@link spectate.Batch.verify|verify} messages.
         * @function encode
         * @memberof spectate.Batch
         * @static
         * @param {spectate.IBatch} message Batch message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Batch.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.msgs != null && message.msgs.length)
                for (let i = 0; i < message.msgs.length; ++i)
                    $root.spectate.StreamMsg.encode(message.msgs[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Batch message, length delimited. Does not implicitly {@link spectate.Batch.verify|verify} messages.
         * @function encodeDelimited
         * @memberof spectate.Batch
         * @static
         * @param {spectate.IBatch} message Batch message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Batch.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a Batch message from the specified reader or buffer.
         * @function decode
         * @memberof spectate.Batch
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {spectate.Batch} Batch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Batch.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.spectate.Batch();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.msgs && message.msgs.length))
                            message.msgs = [];
                        message.msgs.push($root.spectate.StreamMsg.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Batch message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof spectate.Batch
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {spectate.Batch} Batch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Batch.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Batch message.
         * @function verify
         * @memberof spectate.Batch
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Batch.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.msgs != null && Object.hasOwnProperty.call(message, "msgs")) {
                if (!Array.isArray(message.msgs))
                    return "msgs: array expected";
                for (let i = 0; i < message.msgs.length; ++i) {
                    let error = $root.spectate.StreamMsg.verify(message.msgs[i], long + 1);
                    if (error)
                        return "msgs." + error;
                }
            }
            return null;
        };

        /**
         * Creates a Batch message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof spectate.Batch
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {spectate.Batch} Batch
         */
        Batch.fromObject = function fromObject(object, long) {
            if (object instanceof $root.spectate.Batch)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".spectate.Batch: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.spectate.Batch();
            if (object.msgs) {
                if (!Array.isArray(object.msgs))
                    throw TypeError(".spectate.Batch.msgs: array expected");
                message.msgs = [];
                for (let i = 0; i < object.msgs.length; ++i) {
                    if (!$util.isObject(object.msgs[i]))
                        throw TypeError(".spectate.Batch.msgs: object expected");
                    message.msgs[i] = $root.spectate.StreamMsg.fromObject(object.msgs[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a Batch message. Also converts values to other types if specified.
         * @function toObject
         * @memberof spectate.Batch
         * @static
         * @param {spectate.Batch} message Batch
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Batch.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.msgs = [];
            if (message.msgs && message.msgs.length) {
                object.msgs = [];
                for (let j = 0; j < message.msgs.length; ++j)
                    object.msgs[j] = $root.spectate.StreamMsg.toObject(message.msgs[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this Batch to JSON.
         * @function toJSON
         * @memberof spectate.Batch
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Batch.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Batch
         * @function getTypeUrl
         * @memberof spectate.Batch
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Batch.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/spectate.Batch";
        };

        return Batch;
    })();

    spectate.StreamMsg = (function() {

        /**
         * Properties of a StreamMsg.
         * @memberof spectate
         * @interface IStreamMsg
         * @property {spectate.IHello|null} [hello] StreamMsg hello
         * @property {spectate.ICatalog|null} [catalog] StreamMsg catalog
         * @property {spectate.IKeyframe|null} [keyframe] StreamMsg keyframe
         * @property {spectate.IDelta|null} [delta] StreamMsg delta
         * @property {spectate.IStats|null} [stats] StreamMsg stats
         * @property {spectate.IEvents|null} [events] StreamMsg events
         * @property {spectate.IProjectiles|null} [projectiles] StreamMsg projectiles
         */

        /**
         * Constructs a new StreamMsg.
         * @memberof spectate
         * @classdesc Represents a StreamMsg.
         * @implements IStreamMsg
         * @constructor
         * @param {spectate.IStreamMsg=} [properties] Properties to set
         */
        function StreamMsg(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * StreamMsg hello.
         * @member {spectate.IHello|null|undefined} hello
         * @memberof spectate.StreamMsg
         * @instance
         */
        StreamMsg.prototype.hello = null;

        /**
         * StreamMsg catalog.
         * @member {spectate.ICatalog|null|undefined} catalog
         * @memberof spectate.StreamMsg
         * @instance
         */
        StreamMsg.prototype.catalog = null;

        /**
         * StreamMsg keyframe.
         * @member {spectate.IKeyframe|null|undefined} keyframe
         * @memberof spectate.StreamMsg
         * @instance
         */
        StreamMsg.prototype.keyframe = null;

        /**
         * StreamMsg delta.
         * @member {spectate.IDelta|null|undefined} delta
         * @memberof spectate.StreamMsg
         * @instance
         */
        StreamMsg.prototype.delta = null;

        /**
         * StreamMsg stats.
         * @member {spectate.IStats|null|undefined} stats
         * @memberof spectate.StreamMsg
         * @instance
         */
        StreamMsg.prototype.stats = null;

        /**
         * StreamMsg events.
         * @member {spectate.IEvents|null|undefined} events
         * @memberof spectate.StreamMsg
         * @instance
         */
        StreamMsg.prototype.events = null;

        /**
         * StreamMsg projectiles.
         * @member {spectate.IProjectiles|null|undefined} projectiles
         * @memberof spectate.StreamMsg
         * @instance
         */
        StreamMsg.prototype.projectiles = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * StreamMsg body.
         * @member {"hello"|"catalog"|"keyframe"|"delta"|"stats"|"events"|"projectiles"|undefined} body
         * @memberof spectate.StreamMsg
         * @instance
         */
        Object.defineProperty(StreamMsg.prototype, "body", {
            get: $util.oneOfGetter($oneOfFields = ["hello", "catalog", "keyframe", "delta", "stats", "events", "projectiles"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new StreamMsg instance using the specified properties.
         * @function create
         * @memberof spectate.StreamMsg
         * @static
         * @param {spectate.IStreamMsg=} [properties] Properties to set
         * @returns {spectate.StreamMsg} StreamMsg instance
         */
        StreamMsg.create = function create(properties) {
            return new StreamMsg(properties);
        };

        /**
         * Encodes the specified StreamMsg message. Does not implicitly {@link spectate.StreamMsg.verify|verify} messages.
         * @function encode
         * @memberof spectate.StreamMsg
         * @static
         * @param {spectate.IStreamMsg} message StreamMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StreamMsg.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.hello != null && Object.hasOwnProperty.call(message, "hello"))
                $root.spectate.Hello.encode(message.hello, writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            if (message.catalog != null && Object.hasOwnProperty.call(message, "catalog"))
                $root.spectate.Catalog.encode(message.catalog, writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
            if (message.keyframe != null && Object.hasOwnProperty.call(message, "keyframe"))
                $root.spectate.Keyframe.encode(message.keyframe, writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
            if (message.delta != null && Object.hasOwnProperty.call(message, "delta"))
                $root.spectate.Delta.encode(message.delta, writer.uint32(/* id 4, wireType 2 =*/34).fork(), q + 1).ldelim();
            if (message.stats != null && Object.hasOwnProperty.call(message, "stats"))
                $root.spectate.Stats.encode(message.stats, writer.uint32(/* id 5, wireType 2 =*/42).fork(), q + 1).ldelim();
            if (message.events != null && Object.hasOwnProperty.call(message, "events"))
                $root.spectate.Events.encode(message.events, writer.uint32(/* id 6, wireType 2 =*/50).fork(), q + 1).ldelim();
            if (message.projectiles != null && Object.hasOwnProperty.call(message, "projectiles"))
                $root.spectate.Projectiles.encode(message.projectiles, writer.uint32(/* id 7, wireType 2 =*/58).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified StreamMsg message, length delimited. Does not implicitly {@link spectate.StreamMsg.verify|verify} messages.
         * @function encodeDelimited
         * @memberof spectate.StreamMsg
         * @static
         * @param {spectate.IStreamMsg} message StreamMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StreamMsg.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a StreamMsg message from the specified reader or buffer.
         * @function decode
         * @memberof spectate.StreamMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {spectate.StreamMsg} StreamMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StreamMsg.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.spectate.StreamMsg();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.hello = $root.spectate.Hello.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 2: {
                        message.catalog = $root.spectate.Catalog.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 3: {
                        message.keyframe = $root.spectate.Keyframe.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 4: {
                        message.delta = $root.spectate.Delta.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 5: {
                        message.stats = $root.spectate.Stats.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 6: {
                        message.events = $root.spectate.Events.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 7: {
                        message.projectiles = $root.spectate.Projectiles.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a StreamMsg message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof spectate.StreamMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {spectate.StreamMsg} StreamMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StreamMsg.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a StreamMsg message.
         * @function verify
         * @memberof spectate.StreamMsg
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        StreamMsg.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            let properties = {};
            if (message.hello != null && Object.hasOwnProperty.call(message, "hello")) {
                properties.body = 1;
                {
                    let error = $root.spectate.Hello.verify(message.hello, long + 1);
                    if (error)
                        return "hello." + error;
                }
            }
            if (message.catalog != null && Object.hasOwnProperty.call(message, "catalog")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    let error = $root.spectate.Catalog.verify(message.catalog, long + 1);
                    if (error)
                        return "catalog." + error;
                }
            }
            if (message.keyframe != null && Object.hasOwnProperty.call(message, "keyframe")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    let error = $root.spectate.Keyframe.verify(message.keyframe, long + 1);
                    if (error)
                        return "keyframe." + error;
                }
            }
            if (message.delta != null && Object.hasOwnProperty.call(message, "delta")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    let error = $root.spectate.Delta.verify(message.delta, long + 1);
                    if (error)
                        return "delta." + error;
                }
            }
            if (message.stats != null && Object.hasOwnProperty.call(message, "stats")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    let error = $root.spectate.Stats.verify(message.stats, long + 1);
                    if (error)
                        return "stats." + error;
                }
            }
            if (message.events != null && Object.hasOwnProperty.call(message, "events")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    let error = $root.spectate.Events.verify(message.events, long + 1);
                    if (error)
                        return "events." + error;
                }
            }
            if (message.projectiles != null && Object.hasOwnProperty.call(message, "projectiles")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    let error = $root.spectate.Projectiles.verify(message.projectiles, long + 1);
                    if (error)
                        return "projectiles." + error;
                }
            }
            return null;
        };

        /**
         * Creates a StreamMsg message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof spectate.StreamMsg
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {spectate.StreamMsg} StreamMsg
         */
        StreamMsg.fromObject = function fromObject(object, long) {
            if (object instanceof $root.spectate.StreamMsg)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".spectate.StreamMsg: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.spectate.StreamMsg();
            if (object.hello != null) {
                if (!$util.isObject(object.hello))
                    throw TypeError(".spectate.StreamMsg.hello: object expected");
                message.hello = $root.spectate.Hello.fromObject(object.hello, long + 1);
            }
            if (object.catalog != null) {
                if (!$util.isObject(object.catalog))
                    throw TypeError(".spectate.StreamMsg.catalog: object expected");
                message.catalog = $root.spectate.Catalog.fromObject(object.catalog, long + 1);
            }
            if (object.keyframe != null) {
                if (!$util.isObject(object.keyframe))
                    throw TypeError(".spectate.StreamMsg.keyframe: object expected");
                message.keyframe = $root.spectate.Keyframe.fromObject(object.keyframe, long + 1);
            }
            if (object.delta != null) {
                if (!$util.isObject(object.delta))
                    throw TypeError(".spectate.StreamMsg.delta: object expected");
                message.delta = $root.spectate.Delta.fromObject(object.delta, long + 1);
            }
            if (object.stats != null) {
                if (!$util.isObject(object.stats))
                    throw TypeError(".spectate.StreamMsg.stats: object expected");
                message.stats = $root.spectate.Stats.fromObject(object.stats, long + 1);
            }
            if (object.events != null) {
                if (!$util.isObject(object.events))
                    throw TypeError(".spectate.StreamMsg.events: object expected");
                message.events = $root.spectate.Events.fromObject(object.events, long + 1);
            }
            if (object.projectiles != null) {
                if (!$util.isObject(object.projectiles))
                    throw TypeError(".spectate.StreamMsg.projectiles: object expected");
                message.projectiles = $root.spectate.Projectiles.fromObject(object.projectiles, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a StreamMsg message. Also converts values to other types if specified.
         * @function toObject
         * @memberof spectate.StreamMsg
         * @static
         * @param {spectate.StreamMsg} message StreamMsg
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        StreamMsg.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (message.hello != null && Object.hasOwnProperty.call(message, "hello")) {
                object.hello = $root.spectate.Hello.toObject(message.hello, options, q + 1);
                if (options.oneofs)
                    object.body = "hello";
            }
            if (message.catalog != null && Object.hasOwnProperty.call(message, "catalog")) {
                object.catalog = $root.spectate.Catalog.toObject(message.catalog, options, q + 1);
                if (options.oneofs)
                    object.body = "catalog";
            }
            if (message.keyframe != null && Object.hasOwnProperty.call(message, "keyframe")) {
                object.keyframe = $root.spectate.Keyframe.toObject(message.keyframe, options, q + 1);
                if (options.oneofs)
                    object.body = "keyframe";
            }
            if (message.delta != null && Object.hasOwnProperty.call(message, "delta")) {
                object.delta = $root.spectate.Delta.toObject(message.delta, options, q + 1);
                if (options.oneofs)
                    object.body = "delta";
            }
            if (message.stats != null && Object.hasOwnProperty.call(message, "stats")) {
                object.stats = $root.spectate.Stats.toObject(message.stats, options, q + 1);
                if (options.oneofs)
                    object.body = "stats";
            }
            if (message.events != null && Object.hasOwnProperty.call(message, "events")) {
                object.events = $root.spectate.Events.toObject(message.events, options, q + 1);
                if (options.oneofs)
                    object.body = "events";
            }
            if (message.projectiles != null && Object.hasOwnProperty.call(message, "projectiles")) {
                object.projectiles = $root.spectate.Projectiles.toObject(message.projectiles, options, q + 1);
                if (options.oneofs)
                    object.body = "projectiles";
            }
            return object;
        };

        /**
         * Converts this StreamMsg to JSON.
         * @function toJSON
         * @memberof spectate.StreamMsg
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        StreamMsg.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for StreamMsg
         * @function getTypeUrl
         * @memberof spectate.StreamMsg
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        StreamMsg.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/spectate.StreamMsg";
        };

        return StreamMsg;
    })();

    spectate.Projectiles = (function() {

        /**
         * Properties of a Projectiles.
         * @memberof spectate
         * @interface IProjectiles
         * @property {Array.<spectate.IProjectile>|null} [spawns] Projectiles spawns
         * @property {Array.<number>|null} [destroys] Projectiles destroys
         */

        /**
         * Constructs a new Projectiles.
         * @memberof spectate
         * @classdesc Represents a Projectiles.
         * @implements IProjectiles
         * @constructor
         * @param {spectate.IProjectiles=} [properties] Properties to set
         */
        function Projectiles(properties) {
            this.spawns = [];
            this.destroys = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Projectiles spawns.
         * @member {Array.<spectate.IProjectile>} spawns
         * @memberof spectate.Projectiles
         * @instance
         */
        Projectiles.prototype.spawns = $util.emptyArray;

        /**
         * Projectiles destroys.
         * @member {Array.<number>} destroys
         * @memberof spectate.Projectiles
         * @instance
         */
        Projectiles.prototype.destroys = $util.emptyArray;

        /**
         * Creates a new Projectiles instance using the specified properties.
         * @function create
         * @memberof spectate.Projectiles
         * @static
         * @param {spectate.IProjectiles=} [properties] Properties to set
         * @returns {spectate.Projectiles} Projectiles instance
         */
        Projectiles.create = function create(properties) {
            return new Projectiles(properties);
        };

        /**
         * Encodes the specified Projectiles message. Does not implicitly {@link spectate.Projectiles.verify|verify} messages.
         * @function encode
         * @memberof spectate.Projectiles
         * @static
         * @param {spectate.IProjectiles} message Projectiles message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Projectiles.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.spawns != null && message.spawns.length)
                for (let i = 0; i < message.spawns.length; ++i)
                    $root.spectate.Projectile.encode(message.spawns[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            if (message.destroys != null && message.destroys.length) {
                writer.uint32(/* id 2, wireType 2 =*/18).fork();
                for (let i = 0; i < message.destroys.length; ++i)
                    writer.uint32(message.destroys[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified Projectiles message, length delimited. Does not implicitly {@link spectate.Projectiles.verify|verify} messages.
         * @function encodeDelimited
         * @memberof spectate.Projectiles
         * @static
         * @param {spectate.IProjectiles} message Projectiles message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Projectiles.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a Projectiles message from the specified reader or buffer.
         * @function decode
         * @memberof spectate.Projectiles
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {spectate.Projectiles} Projectiles
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Projectiles.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.spectate.Projectiles();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.spawns && message.spawns.length))
                            message.spawns = [];
                        message.spawns.push($root.spectate.Projectile.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 2: {
                        if (!(message.destroys && message.destroys.length))
                            message.destroys = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.destroys.push(reader.uint32());
                        } else
                            message.destroys.push(reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Projectiles message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof spectate.Projectiles
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {spectate.Projectiles} Projectiles
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Projectiles.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Projectiles message.
         * @function verify
         * @memberof spectate.Projectiles
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Projectiles.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.spawns != null && Object.hasOwnProperty.call(message, "spawns")) {
                if (!Array.isArray(message.spawns))
                    return "spawns: array expected";
                for (let i = 0; i < message.spawns.length; ++i) {
                    let error = $root.spectate.Projectile.verify(message.spawns[i], long + 1);
                    if (error)
                        return "spawns." + error;
                }
            }
            if (message.destroys != null && Object.hasOwnProperty.call(message, "destroys")) {
                if (!Array.isArray(message.destroys))
                    return "destroys: array expected";
                for (let i = 0; i < message.destroys.length; ++i)
                    if (!$util.isInteger(message.destroys[i]))
                        return "destroys: integer[] expected";
            }
            return null;
        };

        /**
         * Creates a Projectiles message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof spectate.Projectiles
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {spectate.Projectiles} Projectiles
         */
        Projectiles.fromObject = function fromObject(object, long) {
            if (object instanceof $root.spectate.Projectiles)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".spectate.Projectiles: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.spectate.Projectiles();
            if (object.spawns) {
                if (!Array.isArray(object.spawns))
                    throw TypeError(".spectate.Projectiles.spawns: array expected");
                message.spawns = [];
                for (let i = 0; i < object.spawns.length; ++i) {
                    if (!$util.isObject(object.spawns[i]))
                        throw TypeError(".spectate.Projectiles.spawns: object expected");
                    message.spawns[i] = $root.spectate.Projectile.fromObject(object.spawns[i], long + 1);
                }
            }
            if (object.destroys) {
                if (!Array.isArray(object.destroys))
                    throw TypeError(".spectate.Projectiles.destroys: array expected");
                message.destroys = [];
                for (let i = 0; i < object.destroys.length; ++i)
                    message.destroys[i] = object.destroys[i] >>> 0;
            }
            return message;
        };

        /**
         * Creates a plain object from a Projectiles message. Also converts values to other types if specified.
         * @function toObject
         * @memberof spectate.Projectiles
         * @static
         * @param {spectate.Projectiles} message Projectiles
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Projectiles.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults) {
                object.spawns = [];
                object.destroys = [];
            }
            if (message.spawns && message.spawns.length) {
                object.spawns = [];
                for (let j = 0; j < message.spawns.length; ++j)
                    object.spawns[j] = $root.spectate.Projectile.toObject(message.spawns[j], options, q + 1);
            }
            if (message.destroys && message.destroys.length) {
                object.destroys = [];
                for (let j = 0; j < message.destroys.length; ++j)
                    object.destroys[j] = message.destroys[j];
            }
            return object;
        };

        /**
         * Converts this Projectiles to JSON.
         * @function toJSON
         * @memberof spectate.Projectiles
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Projectiles.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Projectiles
         * @function getTypeUrl
         * @memberof spectate.Projectiles
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Projectiles.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/spectate.Projectiles";
        };

        return Projectiles;
    })();

    spectate.Hello = (function() {

        /**
         * Properties of a Hello.
         * @memberof spectate
         * @interface IHello
         * @property {number|null} [version] Hello version
         * @property {number|null} [tickRate] Hello tickRate
         */

        /**
         * Constructs a new Hello.
         * @memberof spectate
         * @classdesc Represents a Hello.
         * @implements IHello
         * @constructor
         * @param {spectate.IHello=} [properties] Properties to set
         */
        function Hello(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Hello version.
         * @member {number} version
         * @memberof spectate.Hello
         * @instance
         */
        Hello.prototype.version = 0;

        /**
         * Hello tickRate.
         * @member {number} tickRate
         * @memberof spectate.Hello
         * @instance
         */
        Hello.prototype.tickRate = 0;

        /**
         * Creates a new Hello instance using the specified properties.
         * @function create
         * @memberof spectate.Hello
         * @static
         * @param {spectate.IHello=} [properties] Properties to set
         * @returns {spectate.Hello} Hello instance
         */
        Hello.create = function create(properties) {
            return new Hello(properties);
        };

        /**
         * Encodes the specified Hello message. Does not implicitly {@link spectate.Hello.verify|verify} messages.
         * @function encode
         * @memberof spectate.Hello
         * @static
         * @param {spectate.IHello} message Hello message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Hello.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.version);
            if (message.tickRate != null && Object.hasOwnProperty.call(message, "tickRate"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.tickRate);
            return writer;
        };

        /**
         * Encodes the specified Hello message, length delimited. Does not implicitly {@link spectate.Hello.verify|verify} messages.
         * @function encodeDelimited
         * @memberof spectate.Hello
         * @static
         * @param {spectate.IHello} message Hello message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Hello.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a Hello message from the specified reader or buffer.
         * @function decode
         * @memberof spectate.Hello
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {spectate.Hello} Hello
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Hello.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.spectate.Hello();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.version = reader.uint32();
                        break;
                    }
                case 2: {
                        message.tickRate = reader.uint32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Hello message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof spectate.Hello
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {spectate.Hello} Hello
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Hello.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Hello message.
         * @function verify
         * @memberof spectate.Hello
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Hello.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                if (!$util.isInteger(message.version))
                    return "version: integer expected";
            if (message.tickRate != null && Object.hasOwnProperty.call(message, "tickRate"))
                if (!$util.isInteger(message.tickRate))
                    return "tickRate: integer expected";
            return null;
        };

        /**
         * Creates a Hello message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof spectate.Hello
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {spectate.Hello} Hello
         */
        Hello.fromObject = function fromObject(object, long) {
            if (object instanceof $root.spectate.Hello)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".spectate.Hello: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.spectate.Hello();
            if (object.version != null)
                message.version = object.version >>> 0;
            if (object.tickRate != null)
                message.tickRate = object.tickRate >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a Hello message. Also converts values to other types if specified.
         * @function toObject
         * @memberof spectate.Hello
         * @static
         * @param {spectate.Hello} message Hello
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Hello.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.version = 0;
                object.tickRate = 0;
            }
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                object.version = message.version;
            if (message.tickRate != null && Object.hasOwnProperty.call(message, "tickRate"))
                object.tickRate = message.tickRate;
            return object;
        };

        /**
         * Converts this Hello to JSON.
         * @function toJSON
         * @memberof spectate.Hello
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Hello.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Hello
         * @function getTypeUrl
         * @memberof spectate.Hello
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Hello.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/spectate.Hello";
        };

        return Hello;
    })();

    spectate.Catalog = (function() {

        /**
         * Properties of a Catalog.
         * @memberof spectate
         * @interface ICatalog
         * @property {number|null} [base] Catalog base
         * @property {Array.<string>|null} [names] Catalog names
         */

        /**
         * Constructs a new Catalog.
         * @memberof spectate
         * @classdesc Represents a Catalog.
         * @implements ICatalog
         * @constructor
         * @param {spectate.ICatalog=} [properties] Properties to set
         */
        function Catalog(properties) {
            this.names = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Catalog base.
         * @member {number} base
         * @memberof spectate.Catalog
         * @instance
         */
        Catalog.prototype.base = 0;

        /**
         * Catalog names.
         * @member {Array.<string>} names
         * @memberof spectate.Catalog
         * @instance
         */
        Catalog.prototype.names = $util.emptyArray;

        /**
         * Creates a new Catalog instance using the specified properties.
         * @function create
         * @memberof spectate.Catalog
         * @static
         * @param {spectate.ICatalog=} [properties] Properties to set
         * @returns {spectate.Catalog} Catalog instance
         */
        Catalog.create = function create(properties) {
            return new Catalog(properties);
        };

        /**
         * Encodes the specified Catalog message. Does not implicitly {@link spectate.Catalog.verify|verify} messages.
         * @function encode
         * @memberof spectate.Catalog
         * @static
         * @param {spectate.ICatalog} message Catalog message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Catalog.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.base != null && Object.hasOwnProperty.call(message, "base"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.base);
            if (message.names != null && message.names.length)
                for (let i = 0; i < message.names.length; ++i)
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.names[i]);
            return writer;
        };

        /**
         * Encodes the specified Catalog message, length delimited. Does not implicitly {@link spectate.Catalog.verify|verify} messages.
         * @function encodeDelimited
         * @memberof spectate.Catalog
         * @static
         * @param {spectate.ICatalog} message Catalog message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Catalog.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a Catalog message from the specified reader or buffer.
         * @function decode
         * @memberof spectate.Catalog
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {spectate.Catalog} Catalog
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Catalog.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.spectate.Catalog();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.base = reader.uint32();
                        break;
                    }
                case 2: {
                        if (!(message.names && message.names.length))
                            message.names = [];
                        message.names.push(reader.string());
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Catalog message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof spectate.Catalog
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {spectate.Catalog} Catalog
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Catalog.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Catalog message.
         * @function verify
         * @memberof spectate.Catalog
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Catalog.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.base != null && Object.hasOwnProperty.call(message, "base"))
                if (!$util.isInteger(message.base))
                    return "base: integer expected";
            if (message.names != null && Object.hasOwnProperty.call(message, "names")) {
                if (!Array.isArray(message.names))
                    return "names: array expected";
                for (let i = 0; i < message.names.length; ++i)
                    if (!$util.isString(message.names[i]))
                        return "names: string[] expected";
            }
            return null;
        };

        /**
         * Creates a Catalog message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof spectate.Catalog
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {spectate.Catalog} Catalog
         */
        Catalog.fromObject = function fromObject(object, long) {
            if (object instanceof $root.spectate.Catalog)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".spectate.Catalog: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.spectate.Catalog();
            if (object.base != null)
                message.base = object.base >>> 0;
            if (object.names) {
                if (!Array.isArray(object.names))
                    throw TypeError(".spectate.Catalog.names: array expected");
                message.names = [];
                for (let i = 0; i < object.names.length; ++i)
                    message.names[i] = String(object.names[i]);
            }
            return message;
        };

        /**
         * Creates a plain object from a Catalog message. Also converts values to other types if specified.
         * @function toObject
         * @memberof spectate.Catalog
         * @static
         * @param {spectate.Catalog} message Catalog
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Catalog.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.names = [];
            if (options.defaults)
                object.base = 0;
            if (message.base != null && Object.hasOwnProperty.call(message, "base"))
                object.base = message.base;
            if (message.names && message.names.length) {
                object.names = [];
                for (let j = 0; j < message.names.length; ++j)
                    object.names[j] = message.names[j];
            }
            return object;
        };

        /**
         * Converts this Catalog to JSON.
         * @function toJSON
         * @memberof spectate.Catalog
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Catalog.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Catalog
         * @function getTypeUrl
         * @memberof spectate.Catalog
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Catalog.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/spectate.Catalog";
        };

        return Catalog;
    })();

    spectate.UnitIdent = (function() {

        /**
         * Properties of an UnitIdent.
         * @memberof spectate
         * @interface IUnitIdent
         * @property {number|null} [handle] UnitIdent handle
         * @property {spectate.UnitType|null} [type] UnitIdent type
         * @property {number|null} [team] UnitIdent team
         * @property {number|null} [nameId] UnitIdent nameId
         * @property {number|null} [heroId] UnitIdent heroId
         * @property {number|null} [playerSlot] UnitIdent playerSlot
         * @property {number|null} [modelScale] UnitIdent modelScale
         */

        /**
         * Constructs a new UnitIdent.
         * @memberof spectate
         * @classdesc Represents an UnitIdent.
         * @implements IUnitIdent
         * @constructor
         * @param {spectate.IUnitIdent=} [properties] Properties to set
         */
        function UnitIdent(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UnitIdent handle.
         * @member {number} handle
         * @memberof spectate.UnitIdent
         * @instance
         */
        UnitIdent.prototype.handle = 0;

        /**
         * UnitIdent type.
         * @member {spectate.UnitType} type
         * @memberof spectate.UnitIdent
         * @instance
         */
        UnitIdent.prototype.type = 0;

        /**
         * UnitIdent team.
         * @member {number} team
         * @memberof spectate.UnitIdent
         * @instance
         */
        UnitIdent.prototype.team = 0;

        /**
         * UnitIdent nameId.
         * @member {number} nameId
         * @memberof spectate.UnitIdent
         * @instance
         */
        UnitIdent.prototype.nameId = 0;

        /**
         * UnitIdent heroId.
         * @member {number} heroId
         * @memberof spectate.UnitIdent
         * @instance
         */
        UnitIdent.prototype.heroId = 0;

        /**
         * UnitIdent playerSlot.
         * @member {number} playerSlot
         * @memberof spectate.UnitIdent
         * @instance
         */
        UnitIdent.prototype.playerSlot = 0;

        /**
         * UnitIdent modelScale.
         * @member {number} modelScale
         * @memberof spectate.UnitIdent
         * @instance
         */
        UnitIdent.prototype.modelScale = 0;

        /**
         * Creates a new UnitIdent instance using the specified properties.
         * @function create
         * @memberof spectate.UnitIdent
         * @static
         * @param {spectate.IUnitIdent=} [properties] Properties to set
         * @returns {spectate.UnitIdent} UnitIdent instance
         */
        UnitIdent.create = function create(properties) {
            return new UnitIdent(properties);
        };

        /**
         * Encodes the specified UnitIdent message. Does not implicitly {@link spectate.UnitIdent.verify|verify} messages.
         * @function encode
         * @memberof spectate.UnitIdent
         * @static
         * @param {spectate.IUnitIdent} message UnitIdent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UnitIdent.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.handle != null && Object.hasOwnProperty.call(message, "handle"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.handle);
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
            if (message.team != null && Object.hasOwnProperty.call(message, "team"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.team);
            if (message.nameId != null && Object.hasOwnProperty.call(message, "nameId"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.nameId);
            if (message.heroId != null && Object.hasOwnProperty.call(message, "heroId"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.heroId);
            if (message.playerSlot != null && Object.hasOwnProperty.call(message, "playerSlot"))
                writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.playerSlot);
            if (message.modelScale != null && Object.hasOwnProperty.call(message, "modelScale"))
                writer.uint32(/* id 7, wireType 5 =*/61).float(message.modelScale);
            return writer;
        };

        /**
         * Encodes the specified UnitIdent message, length delimited. Does not implicitly {@link spectate.UnitIdent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof spectate.UnitIdent
         * @static
         * @param {spectate.IUnitIdent} message UnitIdent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UnitIdent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an UnitIdent message from the specified reader or buffer.
         * @function decode
         * @memberof spectate.UnitIdent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {spectate.UnitIdent} UnitIdent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UnitIdent.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.spectate.UnitIdent();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.handle = reader.uint32();
                        break;
                    }
                case 2: {
                        message.type = reader.int32();
                        break;
                    }
                case 3: {
                        message.team = reader.uint32();
                        break;
                    }
                case 4: {
                        message.nameId = reader.uint32();
                        break;
                    }
                case 5: {
                        message.heroId = reader.uint32();
                        break;
                    }
                case 6: {
                        message.playerSlot = reader.uint32();
                        break;
                    }
                case 7: {
                        message.modelScale = reader.float();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an UnitIdent message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof spectate.UnitIdent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {spectate.UnitIdent} UnitIdent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UnitIdent.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an UnitIdent message.
         * @function verify
         * @memberof spectate.UnitIdent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UnitIdent.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.handle != null && Object.hasOwnProperty.call(message, "handle"))
                if (!$util.isInteger(message.handle))
                    return "handle: integer expected";
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                    break;
                }
            if (message.team != null && Object.hasOwnProperty.call(message, "team"))
                if (!$util.isInteger(message.team))
                    return "team: integer expected";
            if (message.nameId != null && Object.hasOwnProperty.call(message, "nameId"))
                if (!$util.isInteger(message.nameId))
                    return "nameId: integer expected";
            if (message.heroId != null && Object.hasOwnProperty.call(message, "heroId"))
                if (!$util.isInteger(message.heroId))
                    return "heroId: integer expected";
            if (message.playerSlot != null && Object.hasOwnProperty.call(message, "playerSlot"))
                if (!$util.isInteger(message.playerSlot))
                    return "playerSlot: integer expected";
            if (message.modelScale != null && Object.hasOwnProperty.call(message, "modelScale"))
                if (typeof message.modelScale !== "number")
                    return "modelScale: number expected";
            return null;
        };

        /**
         * Creates an UnitIdent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof spectate.UnitIdent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {spectate.UnitIdent} UnitIdent
         */
        UnitIdent.fromObject = function fromObject(object, long) {
            if (object instanceof $root.spectate.UnitIdent)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".spectate.UnitIdent: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.spectate.UnitIdent();
            if (object.handle != null)
                message.handle = object.handle >>> 0;
            switch (object.type) {
            default:
                if (typeof object.type === "number") {
                    message.type = object.type;
                    break;
                }
                break;
            case "UNIT_UNKNOWN":
            case 0:
                message.type = 0;
                break;
            case "HERO":
            case 1:
                message.type = 1;
                break;
            case "ILLUSION":
            case 2:
                message.type = 2;
                break;
            case "CREEP":
            case 3:
                message.type = 3;
                break;
            case "NEUTRAL":
            case 4:
                message.type = 4;
                break;
            case "WARD_OBS":
            case 5:
                message.type = 5;
                break;
            case "WARD_SEN":
            case 6:
                message.type = 6;
                break;
            case "BUILDING":
            case 7:
                message.type = 7;
                break;
            case "COURIER":
            case 8:
                message.type = 8;
                break;
            case "ROSHAN":
            case 9:
                message.type = 9;
                break;
            }
            if (object.team != null)
                message.team = object.team >>> 0;
            if (object.nameId != null)
                message.nameId = object.nameId >>> 0;
            if (object.heroId != null)
                message.heroId = object.heroId >>> 0;
            if (object.playerSlot != null)
                message.playerSlot = object.playerSlot >>> 0;
            if (object.modelScale != null)
                message.modelScale = Number(object.modelScale);
            return message;
        };

        /**
         * Creates a plain object from an UnitIdent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof spectate.UnitIdent
         * @static
         * @param {spectate.UnitIdent} message UnitIdent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UnitIdent.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.handle = 0;
                object.type = options.enums === String ? "UNIT_UNKNOWN" : 0;
                object.team = 0;
                object.nameId = 0;
                object.heroId = 0;
                object.playerSlot = 0;
                object.modelScale = 0;
            }
            if (message.handle != null && Object.hasOwnProperty.call(message, "handle"))
                object.handle = message.handle;
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                object.type = options.enums === String ? $root.spectate.UnitType[message.type] === undefined ? message.type : $root.spectate.UnitType[message.type] : message.type;
            if (message.team != null && Object.hasOwnProperty.call(message, "team"))
                object.team = message.team;
            if (message.nameId != null && Object.hasOwnProperty.call(message, "nameId"))
                object.nameId = message.nameId;
            if (message.heroId != null && Object.hasOwnProperty.call(message, "heroId"))
                object.heroId = message.heroId;
            if (message.playerSlot != null && Object.hasOwnProperty.call(message, "playerSlot"))
                object.playerSlot = message.playerSlot;
            if (message.modelScale != null && Object.hasOwnProperty.call(message, "modelScale"))
                object.modelScale = options.json && !isFinite(message.modelScale) ? String(message.modelScale) : message.modelScale;
            return object;
        };

        /**
         * Converts this UnitIdent to JSON.
         * @function toJSON
         * @memberof spectate.UnitIdent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UnitIdent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for UnitIdent
         * @function getTypeUrl
         * @memberof spectate.UnitIdent
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        UnitIdent.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/spectate.UnitIdent";
        };

        return UnitIdent;
    })();

    spectate.Transforms = (function() {

        /**
         * Properties of a Transforms.
         * @memberof spectate
         * @interface ITransforms
         * @property {Array.<number>|null} [handles] Transforms handles
         * @property {Array.<number>|null} [xs] Transforms xs
         * @property {Array.<number>|null} [ys] Transforms ys
         * @property {Array.<number>|null} [yaws] Transforms yaws
         * @property {Array.<number>|null} [hps] Transforms hps
         * @property {Array.<number>|null} [maxHps] Transforms maxHps
         * @property {Array.<number>|null} [mps] Transforms mps
         * @property {Array.<number>|null} [flags] Transforms flags
         * @property {Array.<number>|null} [activities] Transforms activities
         */

        /**
         * Constructs a new Transforms.
         * @memberof spectate
         * @classdesc Represents a Transforms.
         * @implements ITransforms
         * @constructor
         * @param {spectate.ITransforms=} [properties] Properties to set
         */
        function Transforms(properties) {
            this.handles = [];
            this.xs = [];
            this.ys = [];
            this.yaws = [];
            this.hps = [];
            this.maxHps = [];
            this.mps = [];
            this.flags = [];
            this.activities = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Transforms handles.
         * @member {Array.<number>} handles
         * @memberof spectate.Transforms
         * @instance
         */
        Transforms.prototype.handles = $util.emptyArray;

        /**
         * Transforms xs.
         * @member {Array.<number>} xs
         * @memberof spectate.Transforms
         * @instance
         */
        Transforms.prototype.xs = $util.emptyArray;

        /**
         * Transforms ys.
         * @member {Array.<number>} ys
         * @memberof spectate.Transforms
         * @instance
         */
        Transforms.prototype.ys = $util.emptyArray;

        /**
         * Transforms yaws.
         * @member {Array.<number>} yaws
         * @memberof spectate.Transforms
         * @instance
         */
        Transforms.prototype.yaws = $util.emptyArray;

        /**
         * Transforms hps.
         * @member {Array.<number>} hps
         * @memberof spectate.Transforms
         * @instance
         */
        Transforms.prototype.hps = $util.emptyArray;

        /**
         * Transforms maxHps.
         * @member {Array.<number>} maxHps
         * @memberof spectate.Transforms
         * @instance
         */
        Transforms.prototype.maxHps = $util.emptyArray;

        /**
         * Transforms mps.
         * @member {Array.<number>} mps
         * @memberof spectate.Transforms
         * @instance
         */
        Transforms.prototype.mps = $util.emptyArray;

        /**
         * Transforms flags.
         * @member {Array.<number>} flags
         * @memberof spectate.Transforms
         * @instance
         */
        Transforms.prototype.flags = $util.emptyArray;

        /**
         * Transforms activities.
         * @member {Array.<number>} activities
         * @memberof spectate.Transforms
         * @instance
         */
        Transforms.prototype.activities = $util.emptyArray;

        /**
         * Creates a new Transforms instance using the specified properties.
         * @function create
         * @memberof spectate.Transforms
         * @static
         * @param {spectate.ITransforms=} [properties] Properties to set
         * @returns {spectate.Transforms} Transforms instance
         */
        Transforms.create = function create(properties) {
            return new Transforms(properties);
        };

        /**
         * Encodes the specified Transforms message. Does not implicitly {@link spectate.Transforms.verify|verify} messages.
         * @function encode
         * @memberof spectate.Transforms
         * @static
         * @param {spectate.ITransforms} message Transforms message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Transforms.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.handles != null && message.handles.length) {
                writer.uint32(/* id 1, wireType 2 =*/10).fork();
                for (let i = 0; i < message.handles.length; ++i)
                    writer.uint32(message.handles[i]);
                writer.ldelim();
            }
            if (message.xs != null && message.xs.length) {
                writer.uint32(/* id 2, wireType 2 =*/18).fork();
                for (let i = 0; i < message.xs.length; ++i)
                    writer.sint32(message.xs[i]);
                writer.ldelim();
            }
            if (message.ys != null && message.ys.length) {
                writer.uint32(/* id 3, wireType 2 =*/26).fork();
                for (let i = 0; i < message.ys.length; ++i)
                    writer.sint32(message.ys[i]);
                writer.ldelim();
            }
            if (message.yaws != null && message.yaws.length) {
                writer.uint32(/* id 4, wireType 2 =*/34).fork();
                for (let i = 0; i < message.yaws.length; ++i)
                    writer.uint32(message.yaws[i]);
                writer.ldelim();
            }
            if (message.hps != null && message.hps.length) {
                writer.uint32(/* id 5, wireType 2 =*/42).fork();
                for (let i = 0; i < message.hps.length; ++i)
                    writer.sint32(message.hps[i]);
                writer.ldelim();
            }
            if (message.maxHps != null && message.maxHps.length) {
                writer.uint32(/* id 6, wireType 2 =*/50).fork();
                for (let i = 0; i < message.maxHps.length; ++i)
                    writer.sint32(message.maxHps[i]);
                writer.ldelim();
            }
            if (message.mps != null && message.mps.length) {
                writer.uint32(/* id 7, wireType 2 =*/58).fork();
                for (let i = 0; i < message.mps.length; ++i)
                    writer.sint32(message.mps[i]);
                writer.ldelim();
            }
            if (message.flags != null && message.flags.length) {
                writer.uint32(/* id 8, wireType 2 =*/66).fork();
                for (let i = 0; i < message.flags.length; ++i)
                    writer.uint32(message.flags[i]);
                writer.ldelim();
            }
            if (message.activities != null && message.activities.length) {
                writer.uint32(/* id 9, wireType 2 =*/74).fork();
                for (let i = 0; i < message.activities.length; ++i)
                    writer.uint32(message.activities[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified Transforms message, length delimited. Does not implicitly {@link spectate.Transforms.verify|verify} messages.
         * @function encodeDelimited
         * @memberof spectate.Transforms
         * @static
         * @param {spectate.ITransforms} message Transforms message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Transforms.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a Transforms message from the specified reader or buffer.
         * @function decode
         * @memberof spectate.Transforms
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {spectate.Transforms} Transforms
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Transforms.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.spectate.Transforms();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.handles && message.handles.length))
                            message.handles = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.handles.push(reader.uint32());
                        } else
                            message.handles.push(reader.uint32());
                        break;
                    }
                case 2: {
                        if (!(message.xs && message.xs.length))
                            message.xs = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.xs.push(reader.sint32());
                        } else
                            message.xs.push(reader.sint32());
                        break;
                    }
                case 3: {
                        if (!(message.ys && message.ys.length))
                            message.ys = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.ys.push(reader.sint32());
                        } else
                            message.ys.push(reader.sint32());
                        break;
                    }
                case 4: {
                        if (!(message.yaws && message.yaws.length))
                            message.yaws = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.yaws.push(reader.uint32());
                        } else
                            message.yaws.push(reader.uint32());
                        break;
                    }
                case 5: {
                        if (!(message.hps && message.hps.length))
                            message.hps = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.hps.push(reader.sint32());
                        } else
                            message.hps.push(reader.sint32());
                        break;
                    }
                case 6: {
                        if (!(message.maxHps && message.maxHps.length))
                            message.maxHps = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.maxHps.push(reader.sint32());
                        } else
                            message.maxHps.push(reader.sint32());
                        break;
                    }
                case 7: {
                        if (!(message.mps && message.mps.length))
                            message.mps = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.mps.push(reader.sint32());
                        } else
                            message.mps.push(reader.sint32());
                        break;
                    }
                case 8: {
                        if (!(message.flags && message.flags.length))
                            message.flags = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.flags.push(reader.uint32());
                        } else
                            message.flags.push(reader.uint32());
                        break;
                    }
                case 9: {
                        if (!(message.activities && message.activities.length))
                            message.activities = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.activities.push(reader.uint32());
                        } else
                            message.activities.push(reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Transforms message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof spectate.Transforms
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {spectate.Transforms} Transforms
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Transforms.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Transforms message.
         * @function verify
         * @memberof spectate.Transforms
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Transforms.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.handles != null && Object.hasOwnProperty.call(message, "handles")) {
                if (!Array.isArray(message.handles))
                    return "handles: array expected";
                for (let i = 0; i < message.handles.length; ++i)
                    if (!$util.isInteger(message.handles[i]))
                        return "handles: integer[] expected";
            }
            if (message.xs != null && Object.hasOwnProperty.call(message, "xs")) {
                if (!Array.isArray(message.xs))
                    return "xs: array expected";
                for (let i = 0; i < message.xs.length; ++i)
                    if (!$util.isInteger(message.xs[i]))
                        return "xs: integer[] expected";
            }
            if (message.ys != null && Object.hasOwnProperty.call(message, "ys")) {
                if (!Array.isArray(message.ys))
                    return "ys: array expected";
                for (let i = 0; i < message.ys.length; ++i)
                    if (!$util.isInteger(message.ys[i]))
                        return "ys: integer[] expected";
            }
            if (message.yaws != null && Object.hasOwnProperty.call(message, "yaws")) {
                if (!Array.isArray(message.yaws))
                    return "yaws: array expected";
                for (let i = 0; i < message.yaws.length; ++i)
                    if (!$util.isInteger(message.yaws[i]))
                        return "yaws: integer[] expected";
            }
            if (message.hps != null && Object.hasOwnProperty.call(message, "hps")) {
                if (!Array.isArray(message.hps))
                    return "hps: array expected";
                for (let i = 0; i < message.hps.length; ++i)
                    if (!$util.isInteger(message.hps[i]))
                        return "hps: integer[] expected";
            }
            if (message.maxHps != null && Object.hasOwnProperty.call(message, "maxHps")) {
                if (!Array.isArray(message.maxHps))
                    return "maxHps: array expected";
                for (let i = 0; i < message.maxHps.length; ++i)
                    if (!$util.isInteger(message.maxHps[i]))
                        return "maxHps: integer[] expected";
            }
            if (message.mps != null && Object.hasOwnProperty.call(message, "mps")) {
                if (!Array.isArray(message.mps))
                    return "mps: array expected";
                for (let i = 0; i < message.mps.length; ++i)
                    if (!$util.isInteger(message.mps[i]))
                        return "mps: integer[] expected";
            }
            if (message.flags != null && Object.hasOwnProperty.call(message, "flags")) {
                if (!Array.isArray(message.flags))
                    return "flags: array expected";
                for (let i = 0; i < message.flags.length; ++i)
                    if (!$util.isInteger(message.flags[i]))
                        return "flags: integer[] expected";
            }
            if (message.activities != null && Object.hasOwnProperty.call(message, "activities")) {
                if (!Array.isArray(message.activities))
                    return "activities: array expected";
                for (let i = 0; i < message.activities.length; ++i)
                    if (!$util.isInteger(message.activities[i]))
                        return "activities: integer[] expected";
            }
            return null;
        };

        /**
         * Creates a Transforms message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof spectate.Transforms
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {spectate.Transforms} Transforms
         */
        Transforms.fromObject = function fromObject(object, long) {
            if (object instanceof $root.spectate.Transforms)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".spectate.Transforms: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.spectate.Transforms();
            if (object.handles) {
                if (!Array.isArray(object.handles))
                    throw TypeError(".spectate.Transforms.handles: array expected");
                message.handles = [];
                for (let i = 0; i < object.handles.length; ++i)
                    message.handles[i] = object.handles[i] >>> 0;
            }
            if (object.xs) {
                if (!Array.isArray(object.xs))
                    throw TypeError(".spectate.Transforms.xs: array expected");
                message.xs = [];
                for (let i = 0; i < object.xs.length; ++i)
                    message.xs[i] = object.xs[i] | 0;
            }
            if (object.ys) {
                if (!Array.isArray(object.ys))
                    throw TypeError(".spectate.Transforms.ys: array expected");
                message.ys = [];
                for (let i = 0; i < object.ys.length; ++i)
                    message.ys[i] = object.ys[i] | 0;
            }
            if (object.yaws) {
                if (!Array.isArray(object.yaws))
                    throw TypeError(".spectate.Transforms.yaws: array expected");
                message.yaws = [];
                for (let i = 0; i < object.yaws.length; ++i)
                    message.yaws[i] = object.yaws[i] >>> 0;
            }
            if (object.hps) {
                if (!Array.isArray(object.hps))
                    throw TypeError(".spectate.Transforms.hps: array expected");
                message.hps = [];
                for (let i = 0; i < object.hps.length; ++i)
                    message.hps[i] = object.hps[i] | 0;
            }
            if (object.maxHps) {
                if (!Array.isArray(object.maxHps))
                    throw TypeError(".spectate.Transforms.maxHps: array expected");
                message.maxHps = [];
                for (let i = 0; i < object.maxHps.length; ++i)
                    message.maxHps[i] = object.maxHps[i] | 0;
            }
            if (object.mps) {
                if (!Array.isArray(object.mps))
                    throw TypeError(".spectate.Transforms.mps: array expected");
                message.mps = [];
                for (let i = 0; i < object.mps.length; ++i)
                    message.mps[i] = object.mps[i] | 0;
            }
            if (object.flags) {
                if (!Array.isArray(object.flags))
                    throw TypeError(".spectate.Transforms.flags: array expected");
                message.flags = [];
                for (let i = 0; i < object.flags.length; ++i)
                    message.flags[i] = object.flags[i] >>> 0;
            }
            if (object.activities) {
                if (!Array.isArray(object.activities))
                    throw TypeError(".spectate.Transforms.activities: array expected");
                message.activities = [];
                for (let i = 0; i < object.activities.length; ++i)
                    message.activities[i] = object.activities[i] >>> 0;
            }
            return message;
        };

        /**
         * Creates a plain object from a Transforms message. Also converts values to other types if specified.
         * @function toObject
         * @memberof spectate.Transforms
         * @static
         * @param {spectate.Transforms} message Transforms
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Transforms.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults) {
                object.handles = [];
                object.xs = [];
                object.ys = [];
                object.yaws = [];
                object.hps = [];
                object.maxHps = [];
                object.mps = [];
                object.flags = [];
                object.activities = [];
            }
            if (message.handles && message.handles.length) {
                object.handles = [];
                for (let j = 0; j < message.handles.length; ++j)
                    object.handles[j] = message.handles[j];
            }
            if (message.xs && message.xs.length) {
                object.xs = [];
                for (let j = 0; j < message.xs.length; ++j)
                    object.xs[j] = message.xs[j];
            }
            if (message.ys && message.ys.length) {
                object.ys = [];
                for (let j = 0; j < message.ys.length; ++j)
                    object.ys[j] = message.ys[j];
            }
            if (message.yaws && message.yaws.length) {
                object.yaws = [];
                for (let j = 0; j < message.yaws.length; ++j)
                    object.yaws[j] = message.yaws[j];
            }
            if (message.hps && message.hps.length) {
                object.hps = [];
                for (let j = 0; j < message.hps.length; ++j)
                    object.hps[j] = message.hps[j];
            }
            if (message.maxHps && message.maxHps.length) {
                object.maxHps = [];
                for (let j = 0; j < message.maxHps.length; ++j)
                    object.maxHps[j] = message.maxHps[j];
            }
            if (message.mps && message.mps.length) {
                object.mps = [];
                for (let j = 0; j < message.mps.length; ++j)
                    object.mps[j] = message.mps[j];
            }
            if (message.flags && message.flags.length) {
                object.flags = [];
                for (let j = 0; j < message.flags.length; ++j)
                    object.flags[j] = message.flags[j];
            }
            if (message.activities && message.activities.length) {
                object.activities = [];
                for (let j = 0; j < message.activities.length; ++j)
                    object.activities[j] = message.activities[j];
            }
            return object;
        };

        /**
         * Converts this Transforms to JSON.
         * @function toJSON
         * @memberof spectate.Transforms
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Transforms.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Transforms
         * @function getTypeUrl
         * @memberof spectate.Transforms
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Transforms.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/spectate.Transforms";
        };

        return Transforms;
    })();

    spectate.UnitSlow = (function() {

        /**
         * Properties of an UnitSlow.
         * @memberof spectate
         * @interface IUnitSlow
         * @property {number|null} [handle] UnitSlow handle
         * @property {number|null} [level] UnitSlow level
         * @property {number|null} [maxMp] UnitSlow maxMp
         * @property {number|null} [respawnTime] UnitSlow respawnTime
         * @property {Array.<number>|null} [itemIds] UnitSlow itemIds
         * @property {Array.<spectate.IUnitAbility>|null} [abilities] UnitSlow abilities
         * @property {number|null} [strength] UnitSlow strength
         * @property {number|null} [agility] UnitSlow agility
         * @property {number|null} [intellect] UnitSlow intellect
         * @property {number|null} [moveSpeed] UnitSlow moveSpeed
         */

        /**
         * Constructs a new UnitSlow.
         * @memberof spectate
         * @classdesc Represents an UnitSlow.
         * @implements IUnitSlow
         * @constructor
         * @param {spectate.IUnitSlow=} [properties] Properties to set
         */
        function UnitSlow(properties) {
            this.itemIds = [];
            this.abilities = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UnitSlow handle.
         * @member {number} handle
         * @memberof spectate.UnitSlow
         * @instance
         */
        UnitSlow.prototype.handle = 0;

        /**
         * UnitSlow level.
         * @member {number} level
         * @memberof spectate.UnitSlow
         * @instance
         */
        UnitSlow.prototype.level = 0;

        /**
         * UnitSlow maxMp.
         * @member {number} maxMp
         * @memberof spectate.UnitSlow
         * @instance
         */
        UnitSlow.prototype.maxMp = 0;

        /**
         * UnitSlow respawnTime.
         * @member {number} respawnTime
         * @memberof spectate.UnitSlow
         * @instance
         */
        UnitSlow.prototype.respawnTime = 0;

        /**
         * UnitSlow itemIds.
         * @member {Array.<number>} itemIds
         * @memberof spectate.UnitSlow
         * @instance
         */
        UnitSlow.prototype.itemIds = $util.emptyArray;

        /**
         * UnitSlow abilities.
         * @member {Array.<spectate.IUnitAbility>} abilities
         * @memberof spectate.UnitSlow
         * @instance
         */
        UnitSlow.prototype.abilities = $util.emptyArray;

        /**
         * UnitSlow strength.
         * @member {number} strength
         * @memberof spectate.UnitSlow
         * @instance
         */
        UnitSlow.prototype.strength = 0;

        /**
         * UnitSlow agility.
         * @member {number} agility
         * @memberof spectate.UnitSlow
         * @instance
         */
        UnitSlow.prototype.agility = 0;

        /**
         * UnitSlow intellect.
         * @member {number} intellect
         * @memberof spectate.UnitSlow
         * @instance
         */
        UnitSlow.prototype.intellect = 0;

        /**
         * UnitSlow moveSpeed.
         * @member {number} moveSpeed
         * @memberof spectate.UnitSlow
         * @instance
         */
        UnitSlow.prototype.moveSpeed = 0;

        /**
         * Creates a new UnitSlow instance using the specified properties.
         * @function create
         * @memberof spectate.UnitSlow
         * @static
         * @param {spectate.IUnitSlow=} [properties] Properties to set
         * @returns {spectate.UnitSlow} UnitSlow instance
         */
        UnitSlow.create = function create(properties) {
            return new UnitSlow(properties);
        };

        /**
         * Encodes the specified UnitSlow message. Does not implicitly {@link spectate.UnitSlow.verify|verify} messages.
         * @function encode
         * @memberof spectate.UnitSlow
         * @static
         * @param {spectate.IUnitSlow} message UnitSlow message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UnitSlow.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.handle != null && Object.hasOwnProperty.call(message, "handle"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.handle);
            if (message.level != null && Object.hasOwnProperty.call(message, "level"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.level);
            if (message.maxMp != null && Object.hasOwnProperty.call(message, "maxMp"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.maxMp);
            if (message.respawnTime != null && Object.hasOwnProperty.call(message, "respawnTime"))
                writer.uint32(/* id 4, wireType 5 =*/37).float(message.respawnTime);
            if (message.itemIds != null && message.itemIds.length) {
                writer.uint32(/* id 5, wireType 2 =*/42).fork();
                for (let i = 0; i < message.itemIds.length; ++i)
                    writer.uint32(message.itemIds[i]);
                writer.ldelim();
            }
            if (message.abilities != null && message.abilities.length)
                for (let i = 0; i < message.abilities.length; ++i)
                    $root.spectate.UnitAbility.encode(message.abilities[i], writer.uint32(/* id 6, wireType 2 =*/50).fork(), q + 1).ldelim();
            if (message.strength != null && Object.hasOwnProperty.call(message, "strength"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.strength);
            if (message.agility != null && Object.hasOwnProperty.call(message, "agility"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.agility);
            if (message.intellect != null && Object.hasOwnProperty.call(message, "intellect"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.intellect);
            if (message.moveSpeed != null && Object.hasOwnProperty.call(message, "moveSpeed"))
                writer.uint32(/* id 10, wireType 0 =*/80).int32(message.moveSpeed);
            return writer;
        };

        /**
         * Encodes the specified UnitSlow message, length delimited. Does not implicitly {@link spectate.UnitSlow.verify|verify} messages.
         * @function encodeDelimited
         * @memberof spectate.UnitSlow
         * @static
         * @param {spectate.IUnitSlow} message UnitSlow message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UnitSlow.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an UnitSlow message from the specified reader or buffer.
         * @function decode
         * @memberof spectate.UnitSlow
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {spectate.UnitSlow} UnitSlow
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UnitSlow.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.spectate.UnitSlow();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.handle = reader.uint32();
                        break;
                    }
                case 2: {
                        message.level = reader.uint32();
                        break;
                    }
                case 3: {
                        message.maxMp = reader.int32();
                        break;
                    }
                case 4: {
                        message.respawnTime = reader.float();
                        break;
                    }
                case 5: {
                        if (!(message.itemIds && message.itemIds.length))
                            message.itemIds = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.itemIds.push(reader.uint32());
                        } else
                            message.itemIds.push(reader.uint32());
                        break;
                    }
                case 6: {
                        if (!(message.abilities && message.abilities.length))
                            message.abilities = [];
                        message.abilities.push($root.spectate.UnitAbility.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 7: {
                        message.strength = reader.int32();
                        break;
                    }
                case 8: {
                        message.agility = reader.int32();
                        break;
                    }
                case 9: {
                        message.intellect = reader.int32();
                        break;
                    }
                case 10: {
                        message.moveSpeed = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an UnitSlow message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof spectate.UnitSlow
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {spectate.UnitSlow} UnitSlow
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UnitSlow.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an UnitSlow message.
         * @function verify
         * @memberof spectate.UnitSlow
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UnitSlow.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.handle != null && Object.hasOwnProperty.call(message, "handle"))
                if (!$util.isInteger(message.handle))
                    return "handle: integer expected";
            if (message.level != null && Object.hasOwnProperty.call(message, "level"))
                if (!$util.isInteger(message.level))
                    return "level: integer expected";
            if (message.maxMp != null && Object.hasOwnProperty.call(message, "maxMp"))
                if (!$util.isInteger(message.maxMp))
                    return "maxMp: integer expected";
            if (message.respawnTime != null && Object.hasOwnProperty.call(message, "respawnTime"))
                if (typeof message.respawnTime !== "number")
                    return "respawnTime: number expected";
            if (message.itemIds != null && Object.hasOwnProperty.call(message, "itemIds")) {
                if (!Array.isArray(message.itemIds))
                    return "itemIds: array expected";
                for (let i = 0; i < message.itemIds.length; ++i)
                    if (!$util.isInteger(message.itemIds[i]))
                        return "itemIds: integer[] expected";
            }
            if (message.abilities != null && Object.hasOwnProperty.call(message, "abilities")) {
                if (!Array.isArray(message.abilities))
                    return "abilities: array expected";
                for (let i = 0; i < message.abilities.length; ++i) {
                    let error = $root.spectate.UnitAbility.verify(message.abilities[i], long + 1);
                    if (error)
                        return "abilities." + error;
                }
            }
            if (message.strength != null && Object.hasOwnProperty.call(message, "strength"))
                if (!$util.isInteger(message.strength))
                    return "strength: integer expected";
            if (message.agility != null && Object.hasOwnProperty.call(message, "agility"))
                if (!$util.isInteger(message.agility))
                    return "agility: integer expected";
            if (message.intellect != null && Object.hasOwnProperty.call(message, "intellect"))
                if (!$util.isInteger(message.intellect))
                    return "intellect: integer expected";
            if (message.moveSpeed != null && Object.hasOwnProperty.call(message, "moveSpeed"))
                if (!$util.isInteger(message.moveSpeed))
                    return "moveSpeed: integer expected";
            return null;
        };

        /**
         * Creates an UnitSlow message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof spectate.UnitSlow
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {spectate.UnitSlow} UnitSlow
         */
        UnitSlow.fromObject = function fromObject(object, long) {
            if (object instanceof $root.spectate.UnitSlow)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".spectate.UnitSlow: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.spectate.UnitSlow();
            if (object.handle != null)
                message.handle = object.handle >>> 0;
            if (object.level != null)
                message.level = object.level >>> 0;
            if (object.maxMp != null)
                message.maxMp = object.maxMp | 0;
            if (object.respawnTime != null)
                message.respawnTime = Number(object.respawnTime);
            if (object.itemIds) {
                if (!Array.isArray(object.itemIds))
                    throw TypeError(".spectate.UnitSlow.itemIds: array expected");
                message.itemIds = [];
                for (let i = 0; i < object.itemIds.length; ++i)
                    message.itemIds[i] = object.itemIds[i] >>> 0;
            }
            if (object.abilities) {
                if (!Array.isArray(object.abilities))
                    throw TypeError(".spectate.UnitSlow.abilities: array expected");
                message.abilities = [];
                for (let i = 0; i < object.abilities.length; ++i) {
                    if (!$util.isObject(object.abilities[i]))
                        throw TypeError(".spectate.UnitSlow.abilities: object expected");
                    message.abilities[i] = $root.spectate.UnitAbility.fromObject(object.abilities[i], long + 1);
                }
            }
            if (object.strength != null)
                message.strength = object.strength | 0;
            if (object.agility != null)
                message.agility = object.agility | 0;
            if (object.intellect != null)
                message.intellect = object.intellect | 0;
            if (object.moveSpeed != null)
                message.moveSpeed = object.moveSpeed | 0;
            return message;
        };

        /**
         * Creates a plain object from an UnitSlow message. Also converts values to other types if specified.
         * @function toObject
         * @memberof spectate.UnitSlow
         * @static
         * @param {spectate.UnitSlow} message UnitSlow
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UnitSlow.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults) {
                object.itemIds = [];
                object.abilities = [];
            }
            if (options.defaults) {
                object.handle = 0;
                object.level = 0;
                object.maxMp = 0;
                object.respawnTime = 0;
                object.strength = 0;
                object.agility = 0;
                object.intellect = 0;
                object.moveSpeed = 0;
            }
            if (message.handle != null && Object.hasOwnProperty.call(message, "handle"))
                object.handle = message.handle;
            if (message.level != null && Object.hasOwnProperty.call(message, "level"))
                object.level = message.level;
            if (message.maxMp != null && Object.hasOwnProperty.call(message, "maxMp"))
                object.maxMp = message.maxMp;
            if (message.respawnTime != null && Object.hasOwnProperty.call(message, "respawnTime"))
                object.respawnTime = options.json && !isFinite(message.respawnTime) ? String(message.respawnTime) : message.respawnTime;
            if (message.itemIds && message.itemIds.length) {
                object.itemIds = [];
                for (let j = 0; j < message.itemIds.length; ++j)
                    object.itemIds[j] = message.itemIds[j];
            }
            if (message.abilities && message.abilities.length) {
                object.abilities = [];
                for (let j = 0; j < message.abilities.length; ++j)
                    object.abilities[j] = $root.spectate.UnitAbility.toObject(message.abilities[j], options, q + 1);
            }
            if (message.strength != null && Object.hasOwnProperty.call(message, "strength"))
                object.strength = message.strength;
            if (message.agility != null && Object.hasOwnProperty.call(message, "agility"))
                object.agility = message.agility;
            if (message.intellect != null && Object.hasOwnProperty.call(message, "intellect"))
                object.intellect = message.intellect;
            if (message.moveSpeed != null && Object.hasOwnProperty.call(message, "moveSpeed"))
                object.moveSpeed = message.moveSpeed;
            return object;
        };

        /**
         * Converts this UnitSlow to JSON.
         * @function toJSON
         * @memberof spectate.UnitSlow
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UnitSlow.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for UnitSlow
         * @function getTypeUrl
         * @memberof spectate.UnitSlow
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        UnitSlow.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/spectate.UnitSlow";
        };

        return UnitSlow;
    })();

    spectate.UnitAbility = (function() {

        /**
         * Properties of an UnitAbility.
         * @memberof spectate
         * @interface IUnitAbility
         * @property {number|null} [nameId] UnitAbility nameId
         * @property {number|null} [level] UnitAbility level
         * @property {number|null} [cooldownEnd] UnitAbility cooldownEnd
         * @property {number|null} [cooldownLength] UnitAbility cooldownLength
         */

        /**
         * Constructs a new UnitAbility.
         * @memberof spectate
         * @classdesc Represents an UnitAbility.
         * @implements IUnitAbility
         * @constructor
         * @param {spectate.IUnitAbility=} [properties] Properties to set
         */
        function UnitAbility(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UnitAbility nameId.
         * @member {number} nameId
         * @memberof spectate.UnitAbility
         * @instance
         */
        UnitAbility.prototype.nameId = 0;

        /**
         * UnitAbility level.
         * @member {number} level
         * @memberof spectate.UnitAbility
         * @instance
         */
        UnitAbility.prototype.level = 0;

        /**
         * UnitAbility cooldownEnd.
         * @member {number} cooldownEnd
         * @memberof spectate.UnitAbility
         * @instance
         */
        UnitAbility.prototype.cooldownEnd = 0;

        /**
         * UnitAbility cooldownLength.
         * @member {number} cooldownLength
         * @memberof spectate.UnitAbility
         * @instance
         */
        UnitAbility.prototype.cooldownLength = 0;

        /**
         * Creates a new UnitAbility instance using the specified properties.
         * @function create
         * @memberof spectate.UnitAbility
         * @static
         * @param {spectate.IUnitAbility=} [properties] Properties to set
         * @returns {spectate.UnitAbility} UnitAbility instance
         */
        UnitAbility.create = function create(properties) {
            return new UnitAbility(properties);
        };

        /**
         * Encodes the specified UnitAbility message. Does not implicitly {@link spectate.UnitAbility.verify|verify} messages.
         * @function encode
         * @memberof spectate.UnitAbility
         * @static
         * @param {spectate.IUnitAbility} message UnitAbility message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UnitAbility.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.nameId != null && Object.hasOwnProperty.call(message, "nameId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.nameId);
            if (message.level != null && Object.hasOwnProperty.call(message, "level"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.level);
            if (message.cooldownEnd != null && Object.hasOwnProperty.call(message, "cooldownEnd"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.cooldownEnd);
            if (message.cooldownLength != null && Object.hasOwnProperty.call(message, "cooldownLength"))
                writer.uint32(/* id 4, wireType 5 =*/37).float(message.cooldownLength);
            return writer;
        };

        /**
         * Encodes the specified UnitAbility message, length delimited. Does not implicitly {@link spectate.UnitAbility.verify|verify} messages.
         * @function encodeDelimited
         * @memberof spectate.UnitAbility
         * @static
         * @param {spectate.IUnitAbility} message UnitAbility message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UnitAbility.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an UnitAbility message from the specified reader or buffer.
         * @function decode
         * @memberof spectate.UnitAbility
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {spectate.UnitAbility} UnitAbility
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UnitAbility.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.spectate.UnitAbility();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.nameId = reader.uint32();
                        break;
                    }
                case 2: {
                        message.level = reader.int32();
                        break;
                    }
                case 3: {
                        message.cooldownEnd = reader.float();
                        break;
                    }
                case 4: {
                        message.cooldownLength = reader.float();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an UnitAbility message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof spectate.UnitAbility
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {spectate.UnitAbility} UnitAbility
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UnitAbility.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an UnitAbility message.
         * @function verify
         * @memberof spectate.UnitAbility
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UnitAbility.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.nameId != null && Object.hasOwnProperty.call(message, "nameId"))
                if (!$util.isInteger(message.nameId))
                    return "nameId: integer expected";
            if (message.level != null && Object.hasOwnProperty.call(message, "level"))
                if (!$util.isInteger(message.level))
                    return "level: integer expected";
            if (message.cooldownEnd != null && Object.hasOwnProperty.call(message, "cooldownEnd"))
                if (typeof message.cooldownEnd !== "number")
                    return "cooldownEnd: number expected";
            if (message.cooldownLength != null && Object.hasOwnProperty.call(message, "cooldownLength"))
                if (typeof message.cooldownLength !== "number")
                    return "cooldownLength: number expected";
            return null;
        };

        /**
         * Creates an UnitAbility message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof spectate.UnitAbility
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {spectate.UnitAbility} UnitAbility
         */
        UnitAbility.fromObject = function fromObject(object, long) {
            if (object instanceof $root.spectate.UnitAbility)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".spectate.UnitAbility: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.spectate.UnitAbility();
            if (object.nameId != null)
                message.nameId = object.nameId >>> 0;
            if (object.level != null)
                message.level = object.level | 0;
            if (object.cooldownEnd != null)
                message.cooldownEnd = Number(object.cooldownEnd);
            if (object.cooldownLength != null)
                message.cooldownLength = Number(object.cooldownLength);
            return message;
        };

        /**
         * Creates a plain object from an UnitAbility message. Also converts values to other types if specified.
         * @function toObject
         * @memberof spectate.UnitAbility
         * @static
         * @param {spectate.UnitAbility} message UnitAbility
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UnitAbility.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.nameId = 0;
                object.level = 0;
                object.cooldownEnd = 0;
                object.cooldownLength = 0;
            }
            if (message.nameId != null && Object.hasOwnProperty.call(message, "nameId"))
                object.nameId = message.nameId;
            if (message.level != null && Object.hasOwnProperty.call(message, "level"))
                object.level = message.level;
            if (message.cooldownEnd != null && Object.hasOwnProperty.call(message, "cooldownEnd"))
                object.cooldownEnd = options.json && !isFinite(message.cooldownEnd) ? String(message.cooldownEnd) : message.cooldownEnd;
            if (message.cooldownLength != null && Object.hasOwnProperty.call(message, "cooldownLength"))
                object.cooldownLength = options.json && !isFinite(message.cooldownLength) ? String(message.cooldownLength) : message.cooldownLength;
            return object;
        };

        /**
         * Converts this UnitAbility to JSON.
         * @function toJSON
         * @memberof spectate.UnitAbility
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UnitAbility.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for UnitAbility
         * @function getTypeUrl
         * @memberof spectate.UnitAbility
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        UnitAbility.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/spectate.UnitAbility";
        };

        return UnitAbility;
    })();

    spectate.Keyframe = (function() {

        /**
         * Properties of a Keyframe.
         * @memberof spectate
         * @interface IKeyframe
         * @property {number|null} [serverTick] Keyframe serverTick
         * @property {number|null} [gameTime] Keyframe gameTime
         * @property {boolean|null} [gameLive] Keyframe gameLive
         * @property {Array.<spectate.IUnitIdent>|null} [idents] Keyframe idents
         * @property {spectate.ITransforms|null} [transforms] Keyframe transforms
         * @property {Array.<spectate.IUnitSlow>|null} [slow] Keyframe slow
         * @property {spectate.IMatchLite|null} [match] Keyframe match
         */

        /**
         * Constructs a new Keyframe.
         * @memberof spectate
         * @classdesc Represents a Keyframe.
         * @implements IKeyframe
         * @constructor
         * @param {spectate.IKeyframe=} [properties] Properties to set
         */
        function Keyframe(properties) {
            this.idents = [];
            this.slow = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Keyframe serverTick.
         * @member {number} serverTick
         * @memberof spectate.Keyframe
         * @instance
         */
        Keyframe.prototype.serverTick = 0;

        /**
         * Keyframe gameTime.
         * @member {number} gameTime
         * @memberof spectate.Keyframe
         * @instance
         */
        Keyframe.prototype.gameTime = 0;

        /**
         * Keyframe gameLive.
         * @member {boolean} gameLive
         * @memberof spectate.Keyframe
         * @instance
         */
        Keyframe.prototype.gameLive = false;

        /**
         * Keyframe idents.
         * @member {Array.<spectate.IUnitIdent>} idents
         * @memberof spectate.Keyframe
         * @instance
         */
        Keyframe.prototype.idents = $util.emptyArray;

        /**
         * Keyframe transforms.
         * @member {spectate.ITransforms|null|undefined} transforms
         * @memberof spectate.Keyframe
         * @instance
         */
        Keyframe.prototype.transforms = null;

        /**
         * Keyframe slow.
         * @member {Array.<spectate.IUnitSlow>} slow
         * @memberof spectate.Keyframe
         * @instance
         */
        Keyframe.prototype.slow = $util.emptyArray;

        /**
         * Keyframe match.
         * @member {spectate.IMatchLite|null|undefined} match
         * @memberof spectate.Keyframe
         * @instance
         */
        Keyframe.prototype.match = null;

        /**
         * Creates a new Keyframe instance using the specified properties.
         * @function create
         * @memberof spectate.Keyframe
         * @static
         * @param {spectate.IKeyframe=} [properties] Properties to set
         * @returns {spectate.Keyframe} Keyframe instance
         */
        Keyframe.create = function create(properties) {
            return new Keyframe(properties);
        };

        /**
         * Encodes the specified Keyframe message. Does not implicitly {@link spectate.Keyframe.verify|verify} messages.
         * @function encode
         * @memberof spectate.Keyframe
         * @static
         * @param {spectate.IKeyframe} message Keyframe message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Keyframe.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.serverTick != null && Object.hasOwnProperty.call(message, "serverTick"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.serverTick);
            if (message.gameTime != null && Object.hasOwnProperty.call(message, "gameTime"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.gameTime);
            if (message.gameLive != null && Object.hasOwnProperty.call(message, "gameLive"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.gameLive);
            if (message.idents != null && message.idents.length)
                for (let i = 0; i < message.idents.length; ++i)
                    $root.spectate.UnitIdent.encode(message.idents[i], writer.uint32(/* id 4, wireType 2 =*/34).fork(), q + 1).ldelim();
            if (message.transforms != null && Object.hasOwnProperty.call(message, "transforms"))
                $root.spectate.Transforms.encode(message.transforms, writer.uint32(/* id 5, wireType 2 =*/42).fork(), q + 1).ldelim();
            if (message.slow != null && message.slow.length)
                for (let i = 0; i < message.slow.length; ++i)
                    $root.spectate.UnitSlow.encode(message.slow[i], writer.uint32(/* id 6, wireType 2 =*/50).fork(), q + 1).ldelim();
            if (message.match != null && Object.hasOwnProperty.call(message, "match"))
                $root.spectate.MatchLite.encode(message.match, writer.uint32(/* id 7, wireType 2 =*/58).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Keyframe message, length delimited. Does not implicitly {@link spectate.Keyframe.verify|verify} messages.
         * @function encodeDelimited
         * @memberof spectate.Keyframe
         * @static
         * @param {spectate.IKeyframe} message Keyframe message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Keyframe.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a Keyframe message from the specified reader or buffer.
         * @function decode
         * @memberof spectate.Keyframe
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {spectate.Keyframe} Keyframe
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Keyframe.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.spectate.Keyframe();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.serverTick = reader.uint32();
                        break;
                    }
                case 2: {
                        message.gameTime = reader.int32();
                        break;
                    }
                case 3: {
                        message.gameLive = reader.bool();
                        break;
                    }
                case 4: {
                        if (!(message.idents && message.idents.length))
                            message.idents = [];
                        message.idents.push($root.spectate.UnitIdent.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 5: {
                        message.transforms = $root.spectate.Transforms.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 6: {
                        if (!(message.slow && message.slow.length))
                            message.slow = [];
                        message.slow.push($root.spectate.UnitSlow.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 7: {
                        message.match = $root.spectate.MatchLite.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Keyframe message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof spectate.Keyframe
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {spectate.Keyframe} Keyframe
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Keyframe.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Keyframe message.
         * @function verify
         * @memberof spectate.Keyframe
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Keyframe.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.serverTick != null && Object.hasOwnProperty.call(message, "serverTick"))
                if (!$util.isInteger(message.serverTick))
                    return "serverTick: integer expected";
            if (message.gameTime != null && Object.hasOwnProperty.call(message, "gameTime"))
                if (!$util.isInteger(message.gameTime))
                    return "gameTime: integer expected";
            if (message.gameLive != null && Object.hasOwnProperty.call(message, "gameLive"))
                if (typeof message.gameLive !== "boolean")
                    return "gameLive: boolean expected";
            if (message.idents != null && Object.hasOwnProperty.call(message, "idents")) {
                if (!Array.isArray(message.idents))
                    return "idents: array expected";
                for (let i = 0; i < message.idents.length; ++i) {
                    let error = $root.spectate.UnitIdent.verify(message.idents[i], long + 1);
                    if (error)
                        return "idents." + error;
                }
            }
            if (message.transforms != null && Object.hasOwnProperty.call(message, "transforms")) {
                let error = $root.spectate.Transforms.verify(message.transforms, long + 1);
                if (error)
                    return "transforms." + error;
            }
            if (message.slow != null && Object.hasOwnProperty.call(message, "slow")) {
                if (!Array.isArray(message.slow))
                    return "slow: array expected";
                for (let i = 0; i < message.slow.length; ++i) {
                    let error = $root.spectate.UnitSlow.verify(message.slow[i], long + 1);
                    if (error)
                        return "slow." + error;
                }
            }
            if (message.match != null && Object.hasOwnProperty.call(message, "match")) {
                let error = $root.spectate.MatchLite.verify(message.match, long + 1);
                if (error)
                    return "match." + error;
            }
            return null;
        };

        /**
         * Creates a Keyframe message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof spectate.Keyframe
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {spectate.Keyframe} Keyframe
         */
        Keyframe.fromObject = function fromObject(object, long) {
            if (object instanceof $root.spectate.Keyframe)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".spectate.Keyframe: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.spectate.Keyframe();
            if (object.serverTick != null)
                message.serverTick = object.serverTick >>> 0;
            if (object.gameTime != null)
                message.gameTime = object.gameTime | 0;
            if (object.gameLive != null)
                message.gameLive = Boolean(object.gameLive);
            if (object.idents) {
                if (!Array.isArray(object.idents))
                    throw TypeError(".spectate.Keyframe.idents: array expected");
                message.idents = [];
                for (let i = 0; i < object.idents.length; ++i) {
                    if (!$util.isObject(object.idents[i]))
                        throw TypeError(".spectate.Keyframe.idents: object expected");
                    message.idents[i] = $root.spectate.UnitIdent.fromObject(object.idents[i], long + 1);
                }
            }
            if (object.transforms != null) {
                if (!$util.isObject(object.transforms))
                    throw TypeError(".spectate.Keyframe.transforms: object expected");
                message.transforms = $root.spectate.Transforms.fromObject(object.transforms, long + 1);
            }
            if (object.slow) {
                if (!Array.isArray(object.slow))
                    throw TypeError(".spectate.Keyframe.slow: array expected");
                message.slow = [];
                for (let i = 0; i < object.slow.length; ++i) {
                    if (!$util.isObject(object.slow[i]))
                        throw TypeError(".spectate.Keyframe.slow: object expected");
                    message.slow[i] = $root.spectate.UnitSlow.fromObject(object.slow[i], long + 1);
                }
            }
            if (object.match != null) {
                if (!$util.isObject(object.match))
                    throw TypeError(".spectate.Keyframe.match: object expected");
                message.match = $root.spectate.MatchLite.fromObject(object.match, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a Keyframe message. Also converts values to other types if specified.
         * @function toObject
         * @memberof spectate.Keyframe
         * @static
         * @param {spectate.Keyframe} message Keyframe
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Keyframe.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults) {
                object.idents = [];
                object.slow = [];
            }
            if (options.defaults) {
                object.serverTick = 0;
                object.gameTime = 0;
                object.gameLive = false;
                object.transforms = null;
                object.match = null;
            }
            if (message.serverTick != null && Object.hasOwnProperty.call(message, "serverTick"))
                object.serverTick = message.serverTick;
            if (message.gameTime != null && Object.hasOwnProperty.call(message, "gameTime"))
                object.gameTime = message.gameTime;
            if (message.gameLive != null && Object.hasOwnProperty.call(message, "gameLive"))
                object.gameLive = message.gameLive;
            if (message.idents && message.idents.length) {
                object.idents = [];
                for (let j = 0; j < message.idents.length; ++j)
                    object.idents[j] = $root.spectate.UnitIdent.toObject(message.idents[j], options, q + 1);
            }
            if (message.transforms != null && Object.hasOwnProperty.call(message, "transforms"))
                object.transforms = $root.spectate.Transforms.toObject(message.transforms, options, q + 1);
            if (message.slow && message.slow.length) {
                object.slow = [];
                for (let j = 0; j < message.slow.length; ++j)
                    object.slow[j] = $root.spectate.UnitSlow.toObject(message.slow[j], options, q + 1);
            }
            if (message.match != null && Object.hasOwnProperty.call(message, "match"))
                object.match = $root.spectate.MatchLite.toObject(message.match, options, q + 1);
            return object;
        };

        /**
         * Converts this Keyframe to JSON.
         * @function toJSON
         * @memberof spectate.Keyframe
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Keyframe.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Keyframe
         * @function getTypeUrl
         * @memberof spectate.Keyframe
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Keyframe.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/spectate.Keyframe";
        };

        return Keyframe;
    })();

    spectate.Delta = (function() {

        /**
         * Properties of a Delta.
         * @memberof spectate
         * @interface IDelta
         * @property {number|null} [serverTick] Delta serverTick
         * @property {number|null} [gameTime] Delta gameTime
         * @property {boolean|null} [gameLive] Delta gameLive
         * @property {Array.<spectate.IUnitIdent>|null} [spawns] Delta spawns
         * @property {spectate.ITransforms|null} [transforms] Delta transforms
         * @property {Array.<spectate.IUnitSlow>|null} [slow] Delta slow
         * @property {Array.<number>|null} [despawns] Delta despawns
         * @property {spectate.IMatchLite|null} [match] Delta match
         */

        /**
         * Constructs a new Delta.
         * @memberof spectate
         * @classdesc Represents a Delta.
         * @implements IDelta
         * @constructor
         * @param {spectate.IDelta=} [properties] Properties to set
         */
        function Delta(properties) {
            this.spawns = [];
            this.slow = [];
            this.despawns = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Delta serverTick.
         * @member {number} serverTick
         * @memberof spectate.Delta
         * @instance
         */
        Delta.prototype.serverTick = 0;

        /**
         * Delta gameTime.
         * @member {number} gameTime
         * @memberof spectate.Delta
         * @instance
         */
        Delta.prototype.gameTime = 0;

        /**
         * Delta gameLive.
         * @member {boolean} gameLive
         * @memberof spectate.Delta
         * @instance
         */
        Delta.prototype.gameLive = false;

        /**
         * Delta spawns.
         * @member {Array.<spectate.IUnitIdent>} spawns
         * @memberof spectate.Delta
         * @instance
         */
        Delta.prototype.spawns = $util.emptyArray;

        /**
         * Delta transforms.
         * @member {spectate.ITransforms|null|undefined} transforms
         * @memberof spectate.Delta
         * @instance
         */
        Delta.prototype.transforms = null;

        /**
         * Delta slow.
         * @member {Array.<spectate.IUnitSlow>} slow
         * @memberof spectate.Delta
         * @instance
         */
        Delta.prototype.slow = $util.emptyArray;

        /**
         * Delta despawns.
         * @member {Array.<number>} despawns
         * @memberof spectate.Delta
         * @instance
         */
        Delta.prototype.despawns = $util.emptyArray;

        /**
         * Delta match.
         * @member {spectate.IMatchLite|null|undefined} match
         * @memberof spectate.Delta
         * @instance
         */
        Delta.prototype.match = null;

        /**
         * Creates a new Delta instance using the specified properties.
         * @function create
         * @memberof spectate.Delta
         * @static
         * @param {spectate.IDelta=} [properties] Properties to set
         * @returns {spectate.Delta} Delta instance
         */
        Delta.create = function create(properties) {
            return new Delta(properties);
        };

        /**
         * Encodes the specified Delta message. Does not implicitly {@link spectate.Delta.verify|verify} messages.
         * @function encode
         * @memberof spectate.Delta
         * @static
         * @param {spectate.IDelta} message Delta message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Delta.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.serverTick != null && Object.hasOwnProperty.call(message, "serverTick"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.serverTick);
            if (message.gameTime != null && Object.hasOwnProperty.call(message, "gameTime"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.gameTime);
            if (message.gameLive != null && Object.hasOwnProperty.call(message, "gameLive"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.gameLive);
            if (message.spawns != null && message.spawns.length)
                for (let i = 0; i < message.spawns.length; ++i)
                    $root.spectate.UnitIdent.encode(message.spawns[i], writer.uint32(/* id 4, wireType 2 =*/34).fork(), q + 1).ldelim();
            if (message.transforms != null && Object.hasOwnProperty.call(message, "transforms"))
                $root.spectate.Transforms.encode(message.transforms, writer.uint32(/* id 5, wireType 2 =*/42).fork(), q + 1).ldelim();
            if (message.slow != null && message.slow.length)
                for (let i = 0; i < message.slow.length; ++i)
                    $root.spectate.UnitSlow.encode(message.slow[i], writer.uint32(/* id 6, wireType 2 =*/50).fork(), q + 1).ldelim();
            if (message.despawns != null && message.despawns.length) {
                writer.uint32(/* id 7, wireType 2 =*/58).fork();
                for (let i = 0; i < message.despawns.length; ++i)
                    writer.uint32(message.despawns[i]);
                writer.ldelim();
            }
            if (message.match != null && Object.hasOwnProperty.call(message, "match"))
                $root.spectate.MatchLite.encode(message.match, writer.uint32(/* id 8, wireType 2 =*/66).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Delta message, length delimited. Does not implicitly {@link spectate.Delta.verify|verify} messages.
         * @function encodeDelimited
         * @memberof spectate.Delta
         * @static
         * @param {spectate.IDelta} message Delta message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Delta.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a Delta message from the specified reader or buffer.
         * @function decode
         * @memberof spectate.Delta
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {spectate.Delta} Delta
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Delta.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.spectate.Delta();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.serverTick = reader.uint32();
                        break;
                    }
                case 2: {
                        message.gameTime = reader.int32();
                        break;
                    }
                case 3: {
                        message.gameLive = reader.bool();
                        break;
                    }
                case 4: {
                        if (!(message.spawns && message.spawns.length))
                            message.spawns = [];
                        message.spawns.push($root.spectate.UnitIdent.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 5: {
                        message.transforms = $root.spectate.Transforms.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 6: {
                        if (!(message.slow && message.slow.length))
                            message.slow = [];
                        message.slow.push($root.spectate.UnitSlow.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 7: {
                        if (!(message.despawns && message.despawns.length))
                            message.despawns = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.despawns.push(reader.uint32());
                        } else
                            message.despawns.push(reader.uint32());
                        break;
                    }
                case 8: {
                        message.match = $root.spectate.MatchLite.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Delta message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof spectate.Delta
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {spectate.Delta} Delta
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Delta.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Delta message.
         * @function verify
         * @memberof spectate.Delta
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Delta.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.serverTick != null && Object.hasOwnProperty.call(message, "serverTick"))
                if (!$util.isInteger(message.serverTick))
                    return "serverTick: integer expected";
            if (message.gameTime != null && Object.hasOwnProperty.call(message, "gameTime"))
                if (!$util.isInteger(message.gameTime))
                    return "gameTime: integer expected";
            if (message.gameLive != null && Object.hasOwnProperty.call(message, "gameLive"))
                if (typeof message.gameLive !== "boolean")
                    return "gameLive: boolean expected";
            if (message.spawns != null && Object.hasOwnProperty.call(message, "spawns")) {
                if (!Array.isArray(message.spawns))
                    return "spawns: array expected";
                for (let i = 0; i < message.spawns.length; ++i) {
                    let error = $root.spectate.UnitIdent.verify(message.spawns[i], long + 1);
                    if (error)
                        return "spawns." + error;
                }
            }
            if (message.transforms != null && Object.hasOwnProperty.call(message, "transforms")) {
                let error = $root.spectate.Transforms.verify(message.transforms, long + 1);
                if (error)
                    return "transforms." + error;
            }
            if (message.slow != null && Object.hasOwnProperty.call(message, "slow")) {
                if (!Array.isArray(message.slow))
                    return "slow: array expected";
                for (let i = 0; i < message.slow.length; ++i) {
                    let error = $root.spectate.UnitSlow.verify(message.slow[i], long + 1);
                    if (error)
                        return "slow." + error;
                }
            }
            if (message.despawns != null && Object.hasOwnProperty.call(message, "despawns")) {
                if (!Array.isArray(message.despawns))
                    return "despawns: array expected";
                for (let i = 0; i < message.despawns.length; ++i)
                    if (!$util.isInteger(message.despawns[i]))
                        return "despawns: integer[] expected";
            }
            if (message.match != null && Object.hasOwnProperty.call(message, "match")) {
                let error = $root.spectate.MatchLite.verify(message.match, long + 1);
                if (error)
                    return "match." + error;
            }
            return null;
        };

        /**
         * Creates a Delta message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof spectate.Delta
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {spectate.Delta} Delta
         */
        Delta.fromObject = function fromObject(object, long) {
            if (object instanceof $root.spectate.Delta)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".spectate.Delta: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.spectate.Delta();
            if (object.serverTick != null)
                message.serverTick = object.serverTick >>> 0;
            if (object.gameTime != null)
                message.gameTime = object.gameTime | 0;
            if (object.gameLive != null)
                message.gameLive = Boolean(object.gameLive);
            if (object.spawns) {
                if (!Array.isArray(object.spawns))
                    throw TypeError(".spectate.Delta.spawns: array expected");
                message.spawns = [];
                for (let i = 0; i < object.spawns.length; ++i) {
                    if (!$util.isObject(object.spawns[i]))
                        throw TypeError(".spectate.Delta.spawns: object expected");
                    message.spawns[i] = $root.spectate.UnitIdent.fromObject(object.spawns[i], long + 1);
                }
            }
            if (object.transforms != null) {
                if (!$util.isObject(object.transforms))
                    throw TypeError(".spectate.Delta.transforms: object expected");
                message.transforms = $root.spectate.Transforms.fromObject(object.transforms, long + 1);
            }
            if (object.slow) {
                if (!Array.isArray(object.slow))
                    throw TypeError(".spectate.Delta.slow: array expected");
                message.slow = [];
                for (let i = 0; i < object.slow.length; ++i) {
                    if (!$util.isObject(object.slow[i]))
                        throw TypeError(".spectate.Delta.slow: object expected");
                    message.slow[i] = $root.spectate.UnitSlow.fromObject(object.slow[i], long + 1);
                }
            }
            if (object.despawns) {
                if (!Array.isArray(object.despawns))
                    throw TypeError(".spectate.Delta.despawns: array expected");
                message.despawns = [];
                for (let i = 0; i < object.despawns.length; ++i)
                    message.despawns[i] = object.despawns[i] >>> 0;
            }
            if (object.match != null) {
                if (!$util.isObject(object.match))
                    throw TypeError(".spectate.Delta.match: object expected");
                message.match = $root.spectate.MatchLite.fromObject(object.match, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a Delta message. Also converts values to other types if specified.
         * @function toObject
         * @memberof spectate.Delta
         * @static
         * @param {spectate.Delta} message Delta
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Delta.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults) {
                object.spawns = [];
                object.slow = [];
                object.despawns = [];
            }
            if (options.defaults) {
                object.serverTick = 0;
                object.gameTime = 0;
                object.gameLive = false;
                object.transforms = null;
                object.match = null;
            }
            if (message.serverTick != null && Object.hasOwnProperty.call(message, "serverTick"))
                object.serverTick = message.serverTick;
            if (message.gameTime != null && Object.hasOwnProperty.call(message, "gameTime"))
                object.gameTime = message.gameTime;
            if (message.gameLive != null && Object.hasOwnProperty.call(message, "gameLive"))
                object.gameLive = message.gameLive;
            if (message.spawns && message.spawns.length) {
                object.spawns = [];
                for (let j = 0; j < message.spawns.length; ++j)
                    object.spawns[j] = $root.spectate.UnitIdent.toObject(message.spawns[j], options, q + 1);
            }
            if (message.transforms != null && Object.hasOwnProperty.call(message, "transforms"))
                object.transforms = $root.spectate.Transforms.toObject(message.transforms, options, q + 1);
            if (message.slow && message.slow.length) {
                object.slow = [];
                for (let j = 0; j < message.slow.length; ++j)
                    object.slow[j] = $root.spectate.UnitSlow.toObject(message.slow[j], options, q + 1);
            }
            if (message.despawns && message.despawns.length) {
                object.despawns = [];
                for (let j = 0; j < message.despawns.length; ++j)
                    object.despawns[j] = message.despawns[j];
            }
            if (message.match != null && Object.hasOwnProperty.call(message, "match"))
                object.match = $root.spectate.MatchLite.toObject(message.match, options, q + 1);
            return object;
        };

        /**
         * Converts this Delta to JSON.
         * @function toJSON
         * @memberof spectate.Delta
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Delta.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Delta
         * @function getTypeUrl
         * @memberof spectate.Delta
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Delta.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/spectate.Delta";
        };

        return Delta;
    })();

    spectate.Stats = (function() {

        /**
         * Properties of a Stats.
         * @memberof spectate
         * @interface IStats
         * @property {Array.<spectate.IPlayerStat>|null} [players] Stats players
         */

        /**
         * Constructs a new Stats.
         * @memberof spectate
         * @classdesc Represents a Stats.
         * @implements IStats
         * @constructor
         * @param {spectate.IStats=} [properties] Properties to set
         */
        function Stats(properties) {
            this.players = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Stats players.
         * @member {Array.<spectate.IPlayerStat>} players
         * @memberof spectate.Stats
         * @instance
         */
        Stats.prototype.players = $util.emptyArray;

        /**
         * Creates a new Stats instance using the specified properties.
         * @function create
         * @memberof spectate.Stats
         * @static
         * @param {spectate.IStats=} [properties] Properties to set
         * @returns {spectate.Stats} Stats instance
         */
        Stats.create = function create(properties) {
            return new Stats(properties);
        };

        /**
         * Encodes the specified Stats message. Does not implicitly {@link spectate.Stats.verify|verify} messages.
         * @function encode
         * @memberof spectate.Stats
         * @static
         * @param {spectate.IStats} message Stats message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Stats.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.players != null && message.players.length)
                for (let i = 0; i < message.players.length; ++i)
                    $root.spectate.PlayerStat.encode(message.players[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Stats message, length delimited. Does not implicitly {@link spectate.Stats.verify|verify} messages.
         * @function encodeDelimited
         * @memberof spectate.Stats
         * @static
         * @param {spectate.IStats} message Stats message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Stats.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a Stats message from the specified reader or buffer.
         * @function decode
         * @memberof spectate.Stats
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {spectate.Stats} Stats
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Stats.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.spectate.Stats();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.players && message.players.length))
                            message.players = [];
                        message.players.push($root.spectate.PlayerStat.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Stats message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof spectate.Stats
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {spectate.Stats} Stats
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Stats.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Stats message.
         * @function verify
         * @memberof spectate.Stats
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Stats.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.players != null && Object.hasOwnProperty.call(message, "players")) {
                if (!Array.isArray(message.players))
                    return "players: array expected";
                for (let i = 0; i < message.players.length; ++i) {
                    let error = $root.spectate.PlayerStat.verify(message.players[i], long + 1);
                    if (error)
                        return "players." + error;
                }
            }
            return null;
        };

        /**
         * Creates a Stats message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof spectate.Stats
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {spectate.Stats} Stats
         */
        Stats.fromObject = function fromObject(object, long) {
            if (object instanceof $root.spectate.Stats)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".spectate.Stats: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.spectate.Stats();
            if (object.players) {
                if (!Array.isArray(object.players))
                    throw TypeError(".spectate.Stats.players: array expected");
                message.players = [];
                for (let i = 0; i < object.players.length; ++i) {
                    if (!$util.isObject(object.players[i]))
                        throw TypeError(".spectate.Stats.players: object expected");
                    message.players[i] = $root.spectate.PlayerStat.fromObject(object.players[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a Stats message. Also converts values to other types if specified.
         * @function toObject
         * @memberof spectate.Stats
         * @static
         * @param {spectate.Stats} message Stats
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Stats.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.players = [];
            if (message.players && message.players.length) {
                object.players = [];
                for (let j = 0; j < message.players.length; ++j)
                    object.players[j] = $root.spectate.PlayerStat.toObject(message.players[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this Stats to JSON.
         * @function toJSON
         * @memberof spectate.Stats
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Stats.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Stats
         * @function getTypeUrl
         * @memberof spectate.Stats
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Stats.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/spectate.Stats";
        };

        return Stats;
    })();

    spectate.Events = (function() {

        /**
         * Properties of an Events.
         * @memberof spectate
         * @interface IEvents
         * @property {Array.<spectate.IGameEvent>|null} [events] Events events
         */

        /**
         * Constructs a new Events.
         * @memberof spectate
         * @classdesc Represents an Events.
         * @implements IEvents
         * @constructor
         * @param {spectate.IEvents=} [properties] Properties to set
         */
        function Events(properties) {
            this.events = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Events events.
         * @member {Array.<spectate.IGameEvent>} events
         * @memberof spectate.Events
         * @instance
         */
        Events.prototype.events = $util.emptyArray;

        /**
         * Creates a new Events instance using the specified properties.
         * @function create
         * @memberof spectate.Events
         * @static
         * @param {spectate.IEvents=} [properties] Properties to set
         * @returns {spectate.Events} Events instance
         */
        Events.create = function create(properties) {
            return new Events(properties);
        };

        /**
         * Encodes the specified Events message. Does not implicitly {@link spectate.Events.verify|verify} messages.
         * @function encode
         * @memberof spectate.Events
         * @static
         * @param {spectate.IEvents} message Events message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Events.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.events != null && message.events.length)
                for (let i = 0; i < message.events.length; ++i)
                    $root.spectate.GameEvent.encode(message.events[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Events message, length delimited. Does not implicitly {@link spectate.Events.verify|verify} messages.
         * @function encodeDelimited
         * @memberof spectate.Events
         * @static
         * @param {spectate.IEvents} message Events message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Events.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an Events message from the specified reader or buffer.
         * @function decode
         * @memberof spectate.Events
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {spectate.Events} Events
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Events.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.spectate.Events();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.events && message.events.length))
                            message.events = [];
                        message.events.push($root.spectate.GameEvent.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Events message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof spectate.Events
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {spectate.Events} Events
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Events.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Events message.
         * @function verify
         * @memberof spectate.Events
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Events.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.events != null && Object.hasOwnProperty.call(message, "events")) {
                if (!Array.isArray(message.events))
                    return "events: array expected";
                for (let i = 0; i < message.events.length; ++i) {
                    let error = $root.spectate.GameEvent.verify(message.events[i], long + 1);
                    if (error)
                        return "events." + error;
                }
            }
            return null;
        };

        /**
         * Creates an Events message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof spectate.Events
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {spectate.Events} Events
         */
        Events.fromObject = function fromObject(object, long) {
            if (object instanceof $root.spectate.Events)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".spectate.Events: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.spectate.Events();
            if (object.events) {
                if (!Array.isArray(object.events))
                    throw TypeError(".spectate.Events.events: array expected");
                message.events = [];
                for (let i = 0; i < object.events.length; ++i) {
                    if (!$util.isObject(object.events[i]))
                        throw TypeError(".spectate.Events.events: object expected");
                    message.events[i] = $root.spectate.GameEvent.fromObject(object.events[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an Events message. Also converts values to other types if specified.
         * @function toObject
         * @memberof spectate.Events
         * @static
         * @param {spectate.Events} message Events
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Events.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.events = [];
            if (message.events && message.events.length) {
                object.events = [];
                for (let j = 0; j < message.events.length; ++j)
                    object.events[j] = $root.spectate.GameEvent.toObject(message.events[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this Events to JSON.
         * @function toJSON
         * @memberof spectate.Events
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Events.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Events
         * @function getTypeUrl
         * @memberof spectate.Events
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Events.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/spectate.Events";
        };

        return Events;
    })();

    return spectate;
})();

export { $root as default };
