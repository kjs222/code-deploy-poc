import { Stack, StackProps, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class LambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new lambda.Function(this, 'code-deploy-poc', {
      functionName: `code-deploy-poc`,
      runtime: lambda.Runtime.NODEJS_14_X,
      code: new lambda.InlineCode(`
        exports.handler = async (event) => {
          const response = {
              statusCode: 200,
              body: JSON.stringify('Hello from Lambda!'),
          };
          return response;
        };
      `),
      handler: 'index.handler',
      timeout: Duration.minutes(5),
      memorySize: 1024
    })
  }
}
