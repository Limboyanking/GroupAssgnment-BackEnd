
// get from system ENV
module.exports = {
    // "LOCALDB": "mongodb://localhost:27017/dbapp",
    "ATLASDB": process.env.ATLASDB,
    "ATLASDB_USERNAME": process.env.ATLASDB_USERNAME,
    "ATLASDB_PASSWORD": process.env.ATLASDB_PASSWORD,
    "LOCALDB": "mongodb://localhost:27017/dbapp",
    "SECRETKEY": "y$B&E)H+MbQeThWmZq4t7w!z%C*F-JaNcRfUjXn2r5u8x/A?D(G+KbPeSgVkYp3s",
}
