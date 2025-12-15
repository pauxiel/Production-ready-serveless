import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'
import { makeIdempotent, IdempotencyConfig } from '@aws-lambda-powertools/idempotency'
import { DynamoDBPersistenceLayer } from '@aws-lambda-powertools/idempotency/dynamodb'

const dynamodbClient = new DynamoDB()
const dynamodb = DynamoDBDocumentClient.from(dynamodbClient)

const persistenceStore = new DynamoDBPersistenceLayer({
  tableName: process.env.idempotency_table
})

const _handler = async (event) => {
  const order = event.detail

  console.log('Saving order id:', order.orderId)

  await dynamodb.send(new PutCommand({
    TableName: process.env.orders_table,
    Item: {
      id: order.orderId,
      restaurantName: order.restaurantName,
    }
  }))
}

export const handler = makeIdempotent(_handler, { 
  persistenceStore,
  config: new IdempotencyConfig({
    eventKeyJmesPath: 'detail.orderId'
  })
})
