const repo = require('../repository')
const { exec } = require("child_process");

exports.updatePharmacie = async (req, res) => {

    const id = req.params.id
    const record = await repo.update(id, req.body)
    if (record) {
        // const result = await execa('git', ['add .']) && execa('git', ['commit -m "update data"']) && execa('git', ['push']);
        // if (result.failed) {
        //     return Promise.reject(new Error('Failed to stage directory'));
        // }
        // return;

        // exec("git add .", (error, stdout, stderr) => {
        //     if (error) {
        //         console.log(`error: ${error.message}`);
        //         return;
        //     }
        //     if (stderr) {
        //         console.log(`stderr: ${stderr}`);
        //         return;
        //     }
        //     console.log(`stdout: ${stdout}`);
        // });
        // exec('git commit -m "data updated"', (error, stdout, stderr) => {
        //     if (error) {
        //         console.log(`error: ${error.message}`);
        //         return;
        //     }
        //     if (stderr) {
        //         console.log(`stderr: ${stderr}`);
        //         return;
        //     }
        //     console.log(`stdout: ${stdout}`);
        // });
        // exec("git push origin master", (error, stdout, stderr) => {
        //     if (error) {
        //         console.log(`error: ${error.message}`);
        //         return;
        //     }
        //     if (stderr) {
        //         console.log(`stderr: ${stderr}`);
        //         return;
        //     }
        //     console.log(`stdout: ${stdout}`);
        // });
    }
    console.log(`Record Updated : 
    \n${JSON.stringify(record, null, 2)}`)
    res.send('Record Updated')
}

exports.addPharmacie = async (req, res) => {
    const {
        name,
        address,
        start,
        end,
        phone,
        lat,
        long } = req.body

    const addedRecord = await
        repo.createNewRecord({ name, address, start, end, phone, lat, long })

    console.log(`Added Record : 
    ${JSON.stringify(addedRecord, null, 4)}`)

    res.send("Information added to the "
        + "database successfully.")
}

exports.deletePharmacie = async (req, res) => {
    const id = req.params.id
    const temp = await repo.delete(id)
    res.send('data deleted')
}