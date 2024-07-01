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
export async function createOrOpenDatabase() {
  return await openDB(databaseName, databaseVersion, {
    upgrade: (db) => {
      createStore(db, "customer", "name")
      createStore(db, "deliverDate", "date")
      createStore(db, "order", ["date", "name"])
    }
  })
}

// async function readDeliverDates(): Promise<string[]> {
//   const db = await createOrOpenDatabase()
//   let items = await db.getAll("deliverDate")
//   let retVal: string[] = []
//   items.forEach((item) => {
//     retVal.push(item)
//   })
//   db.close()
//   return retVal
// }
