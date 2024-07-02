import { createOrOpenDatabase } from "./IDBRepo"

/**
 * Gets all items from the given store
 * @param store Name of the store
 * @returns list of the given StoreType
 */
async function readOrders(date: string): Promise<Order[]> {
  const db = await createOrOpenDatabase()
  const orders = (await db.getAllFromIndex("order", "date", date)) as Order[]
  db.close()
  return orders
}

/**
 * Create all items and saves all items to the store
 * @param store Name of the store
 * @param customer list of the given StoreType
 */
async function createOrder(order: Order): Promise<void> {
  const db = await createOrOpenDatabase()
  await db.put("order", order)
  db.close()
}

/**
 * Delete an item from the given store with the given key
 * @param store Name of the store
 * @param key Key value
 */
async function deleteOrder(order: Order): Promise<void> {
  const db = await createOrOpenDatabase()
  await db.delete("order", [order.date, order.name])
  db.close()
}

/**
 * Delete an item from the given store with the given key
 * @param store Name of the store
 * @param key Key value
 */
async function deleteOrders(deliverDate: string): Promise<void> {
  const db = await createOrOpenDatabase()
  const orders = (await db.getAllFromIndex(
    "order",
    "date",
    deliverDate
  )) as Order[]
  await orders.forEach(async (order) => {
    await db.delete("order", [order.date, order.name])
  })
  db.close()
}

export { createOrder, deleteOrder, readOrders, deleteOrders }
