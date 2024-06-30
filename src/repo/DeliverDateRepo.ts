import { createOrOpenDatabase } from "./IDBRepo"

/**
 * Gets all items from the given store
 * @param store Name of the store
 * @returns list of the given StoreType
 */
async function readDeliverDates(): Promise<string[]> {
  const db = await createOrOpenDatabase()
  let items = await db.getAll("deliverDate")
  let retVal: string[] = []
  items.forEach((item) => {
    retVal.push(item)
  })
  db.close()
  return retVal
}

/**
 * Create all items and saves all items to the store
 * @param store Name of the store
 * @param customer list of the given StoreType
 */
async function createDeliverDate(deliverDate: string): Promise<void> {
  const db = await createOrOpenDatabase()
  await db.put("deliverDate", deliverDate)
  db.close()
}

/**
 * Delete an item from the given store with the given key
 * @param store Name of the store
 * @param key Key value
 */
async function deleteDeliverDate(deliverDate: string): Promise<void> {
  const db = await createOrOpenDatabase()
  await db.delete("deliverDate", deliverDate)
  db.close()
}

export { readDeliverDates, createDeliverDate, deleteDeliverDate }
