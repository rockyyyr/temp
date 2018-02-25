const knex = require('./knex')
const log  = require('../util/logger')
const response = require('../util/response')

function insert(table, object){
  log.info(`INSERT INTO ${table} VALUES ${print(object)}`)
  return new Promise(resolve => {
    knex(table)
      .insert(object)
      .then(resolve())
      .catch(err => handleError(err, resolve))
  })
}

function selectById(table, key, value, columns) {
  log.info(`SELECT ${columns ? columns.toString() : '*'} FROM ${table} WHERE ${key}=${value}`)
  return new Promise(resolve => {
    knex
      .select(...columns || '*')
      .from(table)
      .where(key, value)
      .first()
      .then(result => resolve(result))
      .catch(err => handleError(err, resolve))
  })
}

function updateById(table, key, value, update){
  log.info(`UPDATE ${table} SET ${print(update)} WHERE ${key}=${value}`)
  return new Promise(resolve => {
    knex(table)
      .where(key, value)
      .update(update)
      .then(resolve())
      .catch(err => handleError(err, resolve))
  })
}

function increment(table, key, value, column){
  log.info(`UPDATE ${table} SET ${column}=${column} + 1 WHERE ${key}=${value} (INCREMENT)`)
  return new Promise(resolve => {
    knex(table)
      .where(key, value)
      .increment(column, 1)
      .then(resolve())
      .catch(err => handleError(err, resolve))
  })
}

function handleError(err, resolve){
  log.error(err.message)
  resolve(response.error(err.message))
}

function print(json, format){
  return format ? JSON.stringify(json, null, 2) : JSON.stringify(json)
}

module.exports = {
  insert,
  selectById,
  updateById,
  increment
}
