import { config } from 'dotenv'

export default function setup() {
  config() // load the .env file
  config({ path: '.env.cfnoutputs' })

  process.env.AWS_REGION = 'us-east-1'
}