// Imports
const joi = require('joi');
const pg = require('../utils/database');
const transaction_columns = require('../utils/data').transaction_columns;

// Transactions route
module.exports = {
    'getTransactions': async function (req, res) {

        const schema = joi.object({
            columns: joi.array().items(
                joi.string().valid("all", ...transaction_columns).required()
            ).required(),
            id: joi.string().token(),
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
        const id = req.body.id;
        let transactions = [];
        console.log(id)

        try {
            if (id !== undefined) {
                if (columns.includes("all")) {
                    console.log("All data")
                    transactions = await pg.select(...transaction_columns)
                        .from('transaction')
                        .where({
                            id: id
                        })
                } else {
                    console.log("Some data")
                    transactions = await pg.select(...columns)
                        .from('transaction')
                        .where({
                            id: id
                        })
                }
            } else {
                if (columns.includes("all")) {
                    console.log("All data")
                    transactions = await pg.select(...transaction_columns)
                        .from('transaction')
                } else {
                    console.log("Some data")
                    transactions = await pg.select(...columns)
                        .from('transaction')
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

        console.log('Transactions: ', transactions)

        return res.status(200).json({
            statusCode: 200,
            error: null,
            data: transactions
        });
    },
    'postTransactions': async function (req, res) {

        const schema = joi.object({
            transactions: joi.array().items(
                joi.object({
                    id: joi.string().token().required(),
                    merchant_account_id: joi.string().token().required(),
                    client_name: joi.string().required(),
                    client_email: joi.string().required(),
                    client_billing_address: joi.string().required(), 
                    client_shipping_address: joi.string().required(),
                    user_cart: joi.string().required(),
                    amount: joi.number().required(),
                    currency: joi.string().required(),
                    statut: joi.string().required(),
                })
            )
        })

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

        let transactions = [];

        try {
            transactions = await pg('transactions')
                .insert(req.body.transactions)
                .returning([
                    'id', 'merchant_account_id', 'client_name', 
                    'client_email', 'client_billing_address', 
                    ' client_shipping_address', 'user_cart', 
                    'amount:', 'currency', 'statut', 'created_at'
                ])
            } catch (err) {
            console.log('Error: ', err)
            return res.status(500).json({
                statusCode: 500,
                error: {
                    message: 'Internal Server Error'
                },
            });
        }

        console.log('REQ.BODY :: ', req.body)

        return res.status(201).json({
            data: transactions
        })

    },
}