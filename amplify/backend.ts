import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { Stack } from "aws-cdk-lib/core"
import { EmailIdentity } from "aws-cdk-lib/aws-ses"


const backend = defineBackend({
  auth,
})

const { cfnUserPool } = backend.auth.resources.cfnResources
const authStack = Stack.of(cfnUserPool)

const email = EmailIdentity.fromEmailIdentityName(
  authStack,
  "EmailIdentity",
  // your email configured for use in SES
  process.env.EMAIL
)


cfnUserPool.emailConfiguration = {
  emailSendingAccount: "DEVELOPER",
  sourceArn: email.emailIdentityArn,
}


