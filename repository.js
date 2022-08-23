// Importing node.js file system, crypto module 
const fs = require('fs')
const crypto = require('crypto')

class Repository {

    constructor(filename) {

        // The filename where datas are 
        // going to store
        if (!filename) {
            throw new Error('Filename is required to create a datastore!')
        }

        this.filename = filename

        try {
            fs.accessSync(this.filename)
        } catch (err) {

            // If file not exist it is created
            // with empty array
            fs.writeFileSync(this.filename, '[]')
        }
    }

    // The findById method used in the example
    async findById(id) {

        // Read all filecontents of the datastore
        const jsonRecords = await
            fs.promises.readFile(this.filename, {
                encoding: 'utf8'
            })

        // Parsing JSON records in javascript
        // object type records
        const objRecord = JSON.parse(jsonRecords)

        // Search for required record
        const requiredRecord = objRecord
            .find(record => record.id === id)
        return requiredRecord
    }

    // Update Method
    async update(id, attrs) {

        // Read all file contents of the datastore
        const jsonRecords = await
            fs.promises.readFile(this.filename, {
                encoding: 'utf8'
            })

        // Parsing json records in javascript
        // object type records
        const records = JSON.parse(jsonRecords)

        // Find target record to update with id
        const record = records.find(
            eachRecord => eachRecord.id === id)

        // If given id not belongs to any
        // record in database
        if (!record) {
            throw new Error(`Id '${id}' not found`)
        }

        // Update record
        Object.assign(record, attrs)

        // Write all records back to the
        // custom database
        await fs.promises.writeFile(
            this.filename,
            JSON.stringify(records, null, 2)
        )
        return record
    }
    // Logic to add data or record
    async createNewRecord(attributes) {

        // Assign unique Id to each record
        attributes.id = this.generateUniqueID()

        // Read filecontents of the datastore
        const jsonRecords = await
            fs.promises.readFile(this.filename, {
                encoding: 'utf8'
            })

        // Parsing JSON records in JavaScript
        // object type records
        const objRecord = JSON.parse(jsonRecords)

        // Adding new record
        objRecord.push(attributes)

        // Writing all records back to the file
        await fs.promises.writeFile(
            this.filename,
            JSON.stringify(objRecord, null, 2)
        )

        return attributes;
    }

    // Method to generate unique ID 
    generateUniqueID() {
        return crypto.randomBytes(8).toString('hex')
    }

    // Delete Method
    async delete(id) {

        // Read all file contents of 
        // the datastore
        const jsonRecords = await
            fs.promises.readFile(this.filename, {
                encoding: 'utf8'
            })

        // Parsing json records in javascript
        // object type records
        const records = JSON.parse(jsonRecords)

        // Filter Records
        const filteredRecords = records.filter(
            record => record.id !== id)

        // Write all records back to the 
        // custom database
        await fs.promises.writeFile(
            this.filename,
            JSON.stringify(filteredRecords, null, 2)
        )
    }
}

// The 'datastore.json' file created at
// runtime if it not exist,  here we try
// to update information of database 
// that means database(datastore.json)
// already exist and there are also
// records in it.
module.exports = new Repository('datastore.json')