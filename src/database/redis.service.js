import { client } from "./redis.js";

export const set = async ({ key, value, ex } = {}) => {
    if (typeof value == "object") {
        value = JSON.stringify(value);
    }
    return await client.set(key, value, { EX: ex });
}

export const get = async (key) => {
    const value = await client.get(key);
    try {
        return JSON.parse(value);
    } catch (error) {
        return value;
    }
}

export const del = async (key) => {
    return await client.del(key);
}

export const update = async ({ key, value, ex } = {}) => {
    if (typeof value === "object") {
        value = JSON.stringify(value);
    }
    return await client.set(key, value, { EX: ex });
}

export const ttl = async (key) => {
    return await client.ttl(key);
}

export const exists = async (key) => {
    return await client.exists(key);
}

export const expire = async (key, ex) => {
    return await client.expire(key, ex);
}

export const mget = async (keys) => {
    return await client.mget(keys);
}

export const keys = async (pattern) => {
    return await client.keys(`${pattern}*`);
}
