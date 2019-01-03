let yaml, tab = "   ", tab1 = "  ";
const generate = {
    'security-group': (obj) => {
        var ports = [];
        ports = obj.properties.Port.split(",");
        console.log(ports);
        yaml += `${obj.properties.GroupName}:\n${tab}${tab}Type: AWS::EC2::SecurityGroup\n${tab}${tab}Properties:\n${tab}${tab}${tab}GroupName: ${obj.properties.GroupName}\n${tab}${tab}${tab}GroupDescription: ${obj.properties.GroupDescription}\n${tab}${tab}${tab}VpcId: !Ref VPC\n${tab}${tab}${tab}SecurityGroupIngress:\n`
        for(var i in ports){
            yaml+=`${tab}${tab}${tab}${tab}-\n${tab}${tab}${tab}${tab}${tab}CidrIp: 0.0.0.0/0\n${tab}${tab}${tab}${tab}${tab}FromPort: ${ports[i]}\n${tab}${tab}${tab}${tab}${tab}IpProtocol: tcp\n${tab}${tab}${tab}${tab}${tab}ToPort: ${ports[i]}\n`
        }
        // console.log(obj);
    },
    'database-server': (obj) => {
        yaml += `${obj.properties.DBName}:\n${tab}${tab}Type: AWS::RDS::DBInstance\n${tab}${tab}Properties:\n${tab}${tab}${tab}DBName: ${obj.properties.DBName}\n${tab}${tab}${tab}VPCSecurityGroups: !Ref ${obj.properties.VPCSecurityGroups}\n${tab}${tab}${tab}AllocatedStorage: ${obj.properties.AllocatedStorage}\n${tab}${tab}${tab}DBInstanceClass: ${obj.properties.DBInstanceClass}\n${tab}${tab}${tab}Engine: ${obj.properties.Engine}\n${tab}${tab}${tab}MasterUsername: ${obj.properties.MasterUsername}\n${tab}${tab}${tab}MasterUserPassword: ${obj.properties.MasterUserPassword}\n${tab}`
        // console.log(obj);
    },
    'load-balancer': (obj) => {
        yaml += `${obj.properties.LoadBalancerName}:\n${tab}${tab}Type: AWS::ElasticLoadBalancing::LoadBalancer\n${tab}${tab}Properties:\n${tab}${tab}${tab}LoadBalancerName: ${obj.properties.LoadBalancerName}\n${tab}${tab}${tab}Subnets: !Ref ${obj.properties.Subnet}\n${tab}${tab}${tab}SecurityGroup: !Ref ${obj.properties.SecurityGroup}\n${tab}${tab}${tab}Listeners:\n${tab}${tab}${tab}-${tab1}LoadBalancerPort: ${obj.properties.LoadBalancerPort}\n${tab}${tab}${tab}${tab}InstancePort: ${obj.properties.InstancePort}\n${tab}${tab}${tab}${tab}Protocol: ${obj.properties.Protocol}\n${tab}`
        // console.log(obj);
    },
    'subnet': (obj) => {
        yaml += `${obj.properties.name}:\n${tab}${tab}Type: AWS::EC2::Subnet\n${tab}${tab}Properties:\n${tab}${tab}${tab}CidrBlock: ${obj.properties.CidrBlock}\n${tab}${tab}${tab}VpcId: !Ref VPC\n${tab}`
        // console.log(obj);
    },
    'instance': (obj) => {
        yaml += `${obj.properties.name}:\n${tab}${tab}Type: AWS::EC2::Instance\n${tab}${tab}Properties:\n${tab}${tab}${tab}ImageId: ${obj.properties.ImageID}\n${tab}${tab}${tab}AvailabilityZone: ${obj.properties.AvailabilityZone}\n${tab}${tab}${tab}KeyName: ${obj.properties.KeyName}\n${tab}${tab}${tab}InstanceType: ${obj.properties.InstanceType}\n${tab}${tab}${tab}SubnetId: !Ref ${obj.properties.SubnetName}\n${tab}${tab}${tab}SecurityGroups: !Ref ${obj.properties.SecurityGroup}\n`
        // console.log(obj);
        if (obj.properties.ImageID === "ami-e24b7d9d") {
            yaml += `${tab}${tab}${tab}UserData:\n${tab}${tab}${tab}${tab}Fn::Base64: !Sub |\n${tab}${tab}${tab}${tab}${tab}sudo su\n${tab}${tab}${tab}${tab}${tab}yum install httpd -y\n${tab}${tab}${tab}${tab}${tab}systemctl enable httpd\n${tab}${tab}${tab}${tab}${tab}systemctl start httpd\n${tab}`
        }
        else {
            yaml += `\n${tab}`;
        }
        if (obj.properties.Backup === true) {
            yaml += `LambdaFunctionForStop${obj.properties.name}:\n${tab}${tab}Type: AWS::Lambda::Function\n${tab}${tab}Properties:\n${tab}${tab}${tab}Code:\n${tab}${tab}${tab}${tab}ZipFile: !Sub |\n${tab}${tab}${tab}${tab}${tab}import boto3\n${tab}${tab}${tab}${tab}${tab}def lambda_handler(event,context):\n${tab}${tab}${tab}${tab}${tab}ec2 = boto3.client('ec2', region_name=Region)\n${tab}${tab}${tab}${tab}${tab}ec2.stop_instances(InstanceIds=INSTANCEID)\n${tab}${tab}${tab}Description: Lambda function.\n${tab}${tab}${tab}FunctionName: lambda_function\n${tab}${tab}${tab}Handler: index.lambda_handler\n${tab}${tab}${tab}Role : !GetAtt LambdaExecutionRole.Arn\n${tab}${tab}${tab}Runtime: python2.7\n${tab}${tab}${tab}Timeout: 10\n${tab}${tab}${tab}Environment:\n${tab}${tab}${tab}${tab}Variables:\n${tab}${tab}${tab}${tab}${tab}INSTANCEID: !Ref ${obj.properties.name}\n${tab}${tab}${tab}${tab}${tab}Region:\n${tab}${tab}${tab}${tab}${tab}${tab}Fn::GetAtt:\n${tab}${tab}${tab}${tab}${tab}${tab}${tab}- ${obj.properties.name}\n${tab}${tab}${tab}${tab}${tab}${tab}${tab}- AvailabilityZone\n${tab}`;
            yaml += `LambdaFunctionForStart${obj.properties.name}:\n${tab}${tab}Type: AWS::Lambda::Function\n${tab}${tab}Properties:\n${tab}${tab}${tab}Code:\n${tab}${tab}${tab}${tab}ZipFile: !Sub |\n${tab}${tab}${tab}${tab}${tab}import boto3\n${tab}${tab}${tab}${tab}${tab}def lambda_handler(event,context):\n${tab}${tab}${tab}${tab}${tab}ec2 = boto3.client('ec2', region_name=Region)\n${tab}${tab}${tab}${tab}${tab}ec2.start_instances(InstanceIds=INSTANCEID)\n${tab}${tab}${tab}Description: Lambda function.\n${tab}${tab}${tab}FunctionName: lambda_function\n${tab}${tab}${tab}Handler: index.lambda_handler\n${tab}${tab}${tab}Role : !GetAtt LambdaExecutionRole.Arn\n${tab}${tab}${tab}Runtime: python2.7\n${tab}${tab}${tab}Timeout: 10\n${tab}${tab}${tab}Environment:\n${tab}${tab}${tab}${tab}Variables:\n${tab}${tab}${tab}${tab}${tab}INSTANCEID: !Ref ${obj.properties.name}\n${tab}${tab}${tab}${tab}${tab}Region:\n${tab}${tab}${tab}${tab}${tab}${tab}Fn::GetAtt:\n${tab}${tab}${tab}${tab}${tab}${tab}${tab}- ${obj.properties.name}\n${tab}${tab}${tab}${tab}${tab}${tab}${tab}- AvailabilityZone\n${tab}`;
            yaml += `ScheduledRuleForStart${obj.properties.name}:\n${tab}${tab}Type: AWS::Events::Rule\n${tab}${tab}Properties:\n${tab}${tab}${tab}Description: "ScheduledRule"\n${tab}${tab}${tab}ScheduleExpression: cron(0 6 * * ? *)\n${tab}${tab}${tab}State: "ENABLED"\n${tab}${tab}${tab}Targets: \n${tab}${tab}${tab}-\n${tab}${tab}${tab}${tab}Arn:\n${tab}${tab}${tab}${tab}${tab}Fn::GetAtt:\n${tab}${tab}${tab}${tab}${tab}${tab}- LambdaFunctionForStart${obj.properties.name}\n${tab}${tab}${tab}${tab}${tab}${tab}- Arn${obj.properties.name}\n${tab}${tab}${tab}${tab}Id: TargetFunctionV2${obj.properties.name}\n${tab}`;
            yaml += `ScheduledRuleForStop${obj.properties.name}:\n${tab}${tab}Type: AWS::Events::Rule\n${tab}${tab}Properties:\n${tab}${tab}${tab}Description: "ScheduledRule"\n${tab}${tab}${tab}ScheduleExpression: cron(0 18 * * ? *)\n${tab}${tab}${tab}State: "ENABLED"\n${tab}${tab}${tab}Targets: \n${tab}${tab}${tab}-\n${tab}${tab}${tab}${tab}Arn:\n${tab}${tab}${tab}${tab}${tab}Fn::GetAtt:\n${tab}${tab}${tab}${tab}${tab}${tab}- LambdaFunctionForStop${obj.properties.name}\n${tab}${tab}${tab}${tab}${tab}${tab}- Arn${obj.properties.name}\n${tab}${tab}${tab}${tab}Id: TargetFunctionV1${obj.properties.name}\n${tab}`;
            yaml += `PermissionForEventsToInvokeLambdaStart${obj.properties.name}:\n${tab}${tab}Type: AWS::Lambda::Permission\n${tab}${tab}Properties:\n${tab}${tab}${tab}FunctionName:\n${tab}${tab}${tab}${tab}Ref: "LambdaFunction"\n${tab}${tab}${tab}${tab}Action: "lambda:InvokeFunction"\n${tab}${tab}${tab}${tab}Principal: "events.amazonaws.com"\n${tab}${tab}${tab}${tab}SourceArn:\n${tab}${tab}${tab}${tab}${tab}Fn::GetAtt:\n${tab}${tab}${tab}${tab}${tab}${tab}- ScheduledRuleForStart${obj.properties.name}\n${tab}${tab}${tab}${tab}${tab}${tab}- Arn\n${tab}`;
            yaml += `PermissionForEventsToInvokeLambdaStop${obj.properties.name}:\n${tab}${tab}Type: AWS::Lambda::Permission\n${tab}${tab}Properties:\n${tab}${tab}${tab}FunctionName:\n${tab}${tab}${tab}${tab}Ref: "LambdaFunction"\n${tab}${tab}${tab}${tab}Action: "lambda:InvokeFunction"\n${tab}${tab}${tab}${tab}Principal: "events.amazonaws.com"\n${tab}${tab}${tab}${tab}SourceArn:\n${tab}${tab}${tab}${tab}${tab}Fn::GetAtt:\n${tab}${tab}${tab}${tab}${tab}${tab}- ScheduledRuleForStop${obj.properties.name}\n${tab}${tab}${tab}${tab}${tab}${tab}- Arn\n${tab}`;
        }
    },
    'cloud-watch': (obj) => {
        yaml += `SNSTopic:\n${tab}${tab}Type: AWS::SNS::Topic\n${tab}${tab}Properties:\n${tab}${tab}${tab}DisplayName: SampleSNS\n${tab}${tab}${tab}TopicName: SampleSNS\n${tab}${tab}${tab}Subscription:\n${tab}${tab}${tab}${tab}- Endpoint: ${obj.properties.Email}\n${tab}${tab}${tab}${tab}  Protocol: email\n${tab}`
        yaml += `${obj.properties.name}:\n${tab}${tab}Type: AWS::CloudWatch::Alarm\n${tab}${tab}Properties:\n${tab}${tab}${tab}AlarmDescription: CPU alarm for my instance\n${tab}${tab}${tab}AlarmActions:\n${tab}${tab}${tab}${tab}- Ref: SNSTopic\n${tab}${tab}${tab}MetricName: CPUUtilization\n${tab}${tab}${tab}Namespace: AWS/EC2\n${tab}${tab}${tab}Statistic: Average\n${tab}${tab}${tab}Period: ${obj.properties.Period}\n${tab}${tab}${tab}DatapointsToAlarm: 2\n${tab}${tab}${tab}EvaluationPeriods: ${obj.properties.EvaluationPeriods}\n${tab}${tab}${tab}Threshold: ${obj.properties.Threshold}\n${tab}${tab}${tab}ComparisonOperator: GreaterThanThreshold\n${tab}${tab}${tab}Dimensions:\n${tab}${tab}${tab}${tab}- Name: !Ref ${obj.properties.InstanceName}\n${tab}${tab}${tab}${tab}  Value:\n${tab}${tab}${tab}${tab}  ${tab}Ref: ${obj.properties.InstanceName}\n${tab}`;
    }
}

const vpc = `VPC:\n${tab}${tab}Type: AWS::EC2::VPC\n${tab}${tab}Properties:\n${tab}${tab}${tab}CidrBlock: 172.31.0.0/16\n${tab}${tab}${tab}EnableDnsSupport: true\n${tab}${tab}${tab}EnableDnsHostnames: true\n${tab}${tab}${tab}InstanceTenancy: default\n${tab}InternetGateway:\n${tab}${tab}Type: AWS::EC2::InternetGateway\n${tab}VPCGatewayAttachment:\n${tab}${tab}Type: AWS::EC2::VPCGatewayAttachment\n${tab}${tab}Properties:\n${tab}${tab}${tab}VpcId: !Ref VPC\n${tab}${tab}${tab}InternetGatewayId: !Ref InternetGateway\n${tab}`;
let temp = false;
export default function deploy(sample) {
    yaml = `AWSTemplateFormatVersion: 2010-09-09\nDescription: Ec2 block device mapping\nResources:\n${tab}LambdaExecutionRole:\n${tab}${tab}Type: AWS::IAM::Role\n${tab}${tab}Properties:\n${tab}${tab}${tab}AssumeRolePolicyDocument:\n${tab}${tab}${tab}${tab}Version: '2012-10-17'\n${tab}${tab}${tab}${tab}Statement:\n${tab}${tab}${tab}${tab}- Effect: Allow\n${tab}${tab}${tab}${tab}  Principal:\n${tab}${tab}${tab}${tab}${tab}  Service:\n${tab}${tab}${tab}${tab}${tab}  - lambda.amazonaws.com\n${tab}${tab}${tab}${tab}  Action:\n${tab}${tab}${tab}${tab}  - sts:AssumeRole\n${tab}${tab}${tab}Path: "/"\n${tab}${tab}${tab}Policies:\n${tab}${tab}${tab}- PolicyName: root\n${tab}${tab}${tab}  PolicyDocument:\n${tab}${tab}${tab}${tab}  Version: '2012-10-17'\n${tab}${tab}${tab}${tab}  Statement:\n${tab}${tab}${tab}${tab}  - Effect: Allow\n${tab}${tab}${tab}${tab}    Action:\n${tab}${tab}${tab}${tab}    - "logs:*"\n${tab}${tab}${tab}${tab}    Resource: arn:aws:logs:::*\n${tab}`;
    for (let i in sample) {
        if (((sample[i].serviceName === "subnet") || (sample[i].serviceName === "security-group")) && (temp === false)) {
            yaml += vpc;
            temp = true;
        }
        generate[sample[i].serviceName](sample[i]);
    }
    // console.log(yaml);
    return yaml;
}
