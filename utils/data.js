// List of columns in each database table
module.exports = {
    merchant_columns: ['id',
        'name',
        'society_name',
        'email',
        'phone',
        'confirmation_url',
        'annulation_url',
        'currency',
        'status',
        'creation_date'
    ],
    transaction_columns: ['id',
        'merchant_account_id',
        'client_name',
        'client_email',
        'client_billing_address',
        'client_shipping_address',
        'user_cart',
        'amount',
        'currency',
        'statut',
        'creation_date',
    ],
    operation_columns: ['id',
        'transaction_id',
        'title',
        'processing_url',
        'creation_date'
    ]
};
