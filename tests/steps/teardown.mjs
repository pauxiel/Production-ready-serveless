import { 
  CognitoIdentityProviderClient,
  AdminDeleteUserCommand
} from '@aws-sdk/client-cognito-identity-provider'

export const an_authenticated_user = async (user) => {
  if (!user || !user.username) {
    console.log('[teardown] - no user to delete')
    return
  }

  const cognito = new CognitoIdentityProviderClient()
  
  let req = new AdminDeleteUserCommand({
    UserPoolId: process.env.cognito_user_pool_id,
    Username: user.username
  })
  await cognito.send(req)
  
  console.log(`[${user.username}] - user deleted`)
}