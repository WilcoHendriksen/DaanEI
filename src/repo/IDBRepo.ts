import { IDBPDatabase, openDB } from "idb"

const databaseName = "DaanEI_db"
const databaseVersion = 1

/**
 * Creates a object store
 * @param db The IndexedDB
 * @param store The name of the store to create
 * @param key The key to identify values
 */
async function createStore(
  db: IDBPDatabase,
  store: string,
  key: string | string[]
) {
  const objectStore = db.createObjectStore(store, {
    keyPath: key
  })
  objectStore.createIndex("key", key, { unique: true })
}

/**
 * creates or opens an indexedDB database
 * @returns an open indexedDB database
 */
async function createOrOpenDatabase() {
  return await openDB(databaseName, databaseVersion, {
    upgrade: (db) => {
      createStore(db, "customer", "name")
    }
  })
}

/**
 * Gets all items from the given store
 * @param store Name of the store
 * @returns list of the given StoreType
 */
async function readCustomers(): Promise<Customer[]> {
  const db = await createOrOpenDatabase()
  let items = await db.getAll("customer")
  let retVal: Customer[] = []
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
async function createCustomer(customer: Customer): Promise<void> {
  const db = await createOrOpenDatabase()
  await db.put("customer", customer)
  db.close()
}

/**
 * Delete an item from the given store with the given key
 * @param store Name of the store
 * @param key Key value
 */
async function deleteCustomer(name: string): Promise<void> {
  const db = await createOrOpenDatabase()
  await db.delete("customer", name)
  db.close()
}

export { readCustomers, createCustomer, deleteCustomer }
