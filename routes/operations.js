// Imports
const joi = require('joi');
const pg = require('../utils/database');
const operation_columns = require('../utils/data').operation_columns;

// Operations route
module.exports = {
    'getOperations': async function (req, res) {

        const schema = joi.object({
            columns: joi.array().items(
                joi.string().valid("all", ...operation_columns).required()
            ).required(),
            transaction_id: joi.string().token(),
        });

       try {
            const value = await schema.validateAsync(req.body, {
                abortEarly: false
            })
        } catch (err) {
            console.log('Error ::', err.details);

            err.details.forEach((v, k) => {
                delete v.type;
                delete v.context;
            })

            return res.status(400).json({
                statusCode: 400,
                error: {
                    message: 'BAD DATA',
                    details: err.details,
                },
            });
        }

        const columns = req.body.columns;
        const transaction_id = req.body.transaction_id;
        let operations = [];
        console.log(transaction_id)

        try {
            if (transaction_id !== undefined) {
                if (columns.includes("all")) {
                    console.log("All data")
                    operations = await pg.select(...operation_columns)
                        .from('operation')
                        .where({
                            transaction_id: transaction_id
                        })
                } else {
                    console.log("Some data")
                    operations = await pg.select(...columns)
                        .from('operation')
                        .where({
                            transaction_id: transaction_id
                        })
                }
            } else {
                if (columns.includes("all")) {
                    console.log("All data")
                    operations = await pg.select(...operation_columns)
                        .from('operation')
                } else {
                    console.log("Some data")
                    operations = await pg.select(...columns)
                        .from('operation')
                }
            }
        } catch (err) {
            console.log('Error: ', err)
            return res.status(500).json({
                statusCode: 500,
                error: {
                    message: 'Internal Server Error',
                },
                data: null
            });
        }

        console.log('operations: ', operations)

        return res.status(200).json({
            statusCode: 200,
            error: null,
            data: operations
        });
    },
}