"use strict";

require("dotenv").config();
const Redis = require("ioredis");
const redis = new Redis({
  port: process.env.PORT,
  host: process.env.HOST_URL,
  db: 0,
});

/**
 *
 * @param {*} key   this is used to get data from redis
 * @param {*} name  this is a value which we want to save
 * @returns
 */
const saveData = async (key, name) => {
  console.log(key, name);
  return redis.set(key, JSON.stringify({ name }));
};

/**
 *
 * @param {*} key this si used to fetch data from redis
 * @returns
 */
const getData = async (key) => {
  const response = await redis.get(key);
  return JSON.parse(response);
};

/**
 *  Handler function to get response
 * @param {*} event
 * @returns
 */
const saveAndFetch = async (event) => {
  try {
    await saveData("name", "gsk");
    const result = await getData("name");

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: "Go Serverless v3.0! Your function executed successfully!",
          result,
        },
        null,
        2
      ),
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  handler: saveAndFetch,
};
