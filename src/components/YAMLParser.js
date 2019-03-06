let yaml, tab = "  ", tab1 = " ";
const subnet = {
    Public: true,
    Private: false
}
var lambda = false;
const generate = {
    'sg': (obj,email) => {
        if (!obj.properties.GroupName) {
            alert("No name for security group configure the security group(s) to continue");
            throw "hi";
        }
        var ports = [];
        ports = obj.properties.Port.split(",");
        console.log(ports);
        var port = `${tab}${tab}${tab}SecurityGroupIngress:\n`;
        for (var i in ports) {
            port += `${tab}${tab}${tab}${tab}-\n${tab}${tab}${tab}${tab}${tab}CidrIp: 0.0.0.0/0\n${tab}${tab}${tab}${tab}${tab}FromPort: ${ports[i]}\n${tab}${tab}${tab}${tab}${tab}IpProtocol: tcp\n${tab}${tab}${tab}${tab}${tab}ToPort: ${ports[i]}\n`
        }
        port = port ? port : '';
        var vpc = obj.properties.VpcId?`${tab}${tab}${tab}VpcId: !Ref ${obj.properties.VpcId}\n`:``;
        yaml += `${obj.id}:\n${tab}${tab}Type: AWS::EC2::SecurityGroup\n${tab}${tab}Properties:\n${tab}${tab}${tab}GroupName: ${obj.properties.GroupName}\n${tab}${tab}${tab}GroupDescription: ${obj.properties.GroupDescription}\n${vpc}${port}${tab}`
    },
    'dbinstance': (obj,email) => {
        if (!obj.properties.DBName) {
            alert("No name for DB instance configure the DB instance(s) to continue");
            throw "hi";
        }
        var masterusername = obj.properties.MasterUsername ? `MasterUsername: ${obj.properties.MasterUsername}\n${tab}${tab}${tab}` : '';
        var MasterUserPassword = obj.properties.MasterUserPassword ? `${tab}${tab}${tab}${masterusername}MasterUserPassword: ${obj.properties.MasterUserPassword}\n` : '';
        var vpcsecuritygroup = obj.properties.DBSecurityGroups ? `VPCSecurityGroups: \n${tab}${tab}${tab}${tab}- !Ref ${obj.properties.DBSecurityGroups}\n${tab}${tab}${tab}` : '';
        var allocatedstorage = obj.properties.AllocatedStorage ? `AllocatedStorage: ${obj.properties.AllocatedStorage}\n${tab}${tab}${tab}` : '';
        yaml += `${obj.properties.DBName}:\n${tab}${tab}Type: AWS::RDS::DBInstance\n${tab}${tab}Properties:\n${tab}${tab}${tab}DBName: ${obj.properties.DBName}\n${tab}${tab}${tab}${vpcsecuritygroup}${allocatedstorage}DBInstanceClass: ${obj.properties.DBInstanceClass}\n${tab}${tab}${tab}Engine: ${obj.properties.Engine}\n${MasterUserPassword}${tab}`
        // console.log(obj);
    },
    'lbalancer': (obj,email) => {
        if (!obj.properties.LoadBalancerName) {
            alert("No name for Load balencer configure the Load balencer(s) to continue");
            throw "hi";
        }
        var subnet = obj.properties.Subnet ? `Subnets:\n ${tab}${tab}${tab}${tab}- !Ref ${obj.properties.Subnet}\n${tab}${tab}${tab}`:'';
        var securitygroup = obj.properties.SecurityGroup ? `SecurityGroups:\n ${tab}${tab}${tab}${tab}- !Ref ${obj.properties.SecurityGroup}\n${tab}${tab}${tab}`:'';
        yaml += `${obj.properties.LoadBalancerName}:\n${tab}${tab}Type: AWS::ElasticLoadBalancing::LoadBalancer\n${tab}${tab}Properties:\n${tab}${tab}${tab}LoadBalancerName: ${obj.properties.LoadBalancerName}\n${tab}${tab}${tab}${subnet}${securitygroup}Listeners:\n${tab}${tab}${tab}-${tab1}LoadBalancerPort: ${obj.properties.LoadBalancerPort}\n${tab}${tab}${tab}${tab}InstancePort: ${obj.properties.InstancePort}\n${tab}${tab}${tab}${tab}Protocol: ${obj.properties.Protocol}\n${tab}`
        // console.log(obj);
    },
    'subnet': (obj,email) => {
        if (!obj.properties.name) {
            alert("No name for Subnet configure the Subnet(s) to continue");
            throw "hi";
        }
        yaml += `${obj.id}:\n${tab}${tab}Type: AWS::EC2::Subnet\n${tab}${tab}Properties:\n${tab}${tab}${tab}CidrBlock: ${obj.properties.CidrBlock}\n${tab}${tab}${tab}VpcId: !Ref ${obj.properties.VpcId}\n${tab}${tab}${tab}AvailabilityZone: "us-east-1a"\n${tab}${tab}${tab}MapPublicIpOnLaunch: ${subnet[obj.properties.SubnetType]}\n${tab}`
        if (subnet[obj.properties.SubnetType]) {
            yaml += `${obj.id}RouteTableAssociation:\n${tab}${tab}Type: AWS::EC2::SubnetRouteTableAssociation\n${tab}${tab}Properties:\n${tab}${tab}${tab}RouteTableId: !Ref ${obj.properties.VpcId}RouteTable\n${tab}${tab}${tab}SubnetId: !Ref ${obj.id}\n${tab}`
        }
        console.log(obj);
    },
    'dbsubnet': (obj,email) => {
        if (!obj.properties.name) {
            alert("No name for DB Subnet configure the DB Subnet(s) to continue");
            throw "hi";
        }
        yaml += `${obj.properties.name}:\n${tab}${tab}Type: AWS::EC2::DBSubnetGroup\n${tab}${tab}Properties:\n${tab}${tab}${tab}DBSubnetGroupDescription:${obj.properties.description}\n${tab}${tab}${tab}SubnetIds:\n${tab}${tab}${tab}${tab1}` //to be completed;
        console.log(obj);
    },
    'instance': (obj,email) => {
        if (!obj.properties.name) {
            alert("No name for instance configure the instance(s) to continue");
            throw "hi";
        }
        var subnet = obj.properties.SubnetName ? `${tab}${tab}${tab}SubnetId: !Ref ${obj.properties.SubnetName}\n` : ``;
        console.log('keyname', obj.properties.keyname);
        var keyname = obj.properties.KeyName ? `KeyName: ${obj.properties.KeyName}\n${tab}${tab}${tab}` : '';
        var imageid = obj.properties.ImageID ? `ImageId: ${obj.properties.ImageID}\n${tab}${tab}${tab}` : '';
        var securitygroup = obj.properties.SecurityGroup ? `${subnet}${tab}${tab}${tab}SecurityGroupIds:\n${tab}${tab}${tab}${tab}- !Ref ${obj.properties.SecurityGroup}\n` : '';
        yaml += `${obj.id}:\n${tab}${tab}Type: AWS::EC2::Instance\n${tab}${tab}Properties:\n${tab}${tab}${tab}${imageid}AvailabilityZone: ${obj.properties.AvailabilityZone}\n${tab}${tab}${tab}${keyname}InstanceType: ${obj.properties.InstanceType}\n${securitygroup}${tab}`
        // console.log(obj);
        // if (obj.properties.ImageID === "ami-e24b7d9d") {
        //     yaml += `${tab}${tab}${tab}UserData:\n${tab}${tab}${tab}${tab}Fn::Base64: !Sub |\n${tab}${tab}${tab}${tab}${tab}sudo su\n${tab}${tab}${tab}${tab}${tab}yum install httpd -y\n${tab}${tab}${tab}${tab}${tab}systemctl enable httpd\n${tab}${tab}${tab}${tab}${tab}systemctl start httpd\n${tab}`
        // }
        // else {
        //     // yaml += `\n${tab}`;
        //     yaml += `${tab}${tab}${tab}UserData:\n${tab}${tab}${tab}${tab}!Base64 |\n${tab}${tab}${tab}${tab}${tab}<powershell>\n${tab}${tab}${tab}${tab}${tab}Start-Transcript;\n${tab}${tab}${tab}${tab}${tab}Import-Module ServerManager;\n${tab}${tab}${tab}${tab}${tab}Enable-WindowsOptionalFeature -Online -NoRestart -FeatureName 'IIS-WebServerRole', 'IIS-WebServer', 'IIS-ManagementConsole';\n${tab}${tab}${tab}${tab}${tab}</powershell>\n${tab}`;
        // }
        if(obj.properties.EventLog){
            var db = email.replace(/[\.@\^]/g,"_");
            var table = obj.properties.name;
            table = table.replace(/[\-\.@\^]/g,"_");
            var sleep = `Start-Sleep -s 150`;
            var db_env = `$Env:SU_PILVI_EMAIL="${db}"`;
            var table_env = `$Env:SU_PILVI_INSTANCE="${table}"`;
            var install = `Start-Process '\\jre_1.8.0.exe' '/s INSTALL_SILENT=1 STATIC=0 AUTO_UPDATE=0 WEB_JAVA=1 WEB_JAVA_SECURITY_LEVEL=H WEB_ANALYTICS=0 EULA=0 REBOOT=0 NOSTARTMENU=0 SPONSORS=0 /L C:\\jre-8u45-windows-x64.log'`;
            var log_url = `(New-Object System.Net.WebClient).DownloadFile("https://s3.amazonaws.com/com.eventloger.donwload/logfetcher.dll","\\logfetcher.dll")`
            var exe_url = `(New-Object System.Net.WebClient).DownloadFile("https://s3.amazonaws.com/com.eventloger.donwload/su_pilvi.exe","\\su_pilvi.exe")`
            var jar_url = `(New-Object System.Net.WebClient).DownloadFile("https://s3.amazonaws.com/com.eventloger.donwload/postgresql-42.2.5.jar", "\\postgresql-42.2.5.jar")`
            var jre_url = `(New-Object System.Net.WebClient).DownloadFile("https://s3.amazonaws.com/com.eventloger.donwload/jre-8u201-windows-x64.exe", "\\jre_1.8.0.exe")`
            yaml += `${tab}${tab}UserData:\n${tab}${tab}${tab}${tab}!Base64 |\n${tab}${tab}${tab}${tab}${tab}<powershell>\n${tab}${tab}${tab}${tab}${tab}[System.Environment]::SetEnvironmentVariable("SU_PILVI_EMAIL","${db}",[System.EnvironmentVariableTarget]::User)\n${tab}${tab}${tab}${tab}${tab}[System.Environment]::SetEnvironmentVariable("SU_PILVI_INSTANCE","${table}",[System.EnvironmentVariableTarget]::User)\n${tab}${tab}${tab}${tab}${tab}${db_env}\n${tab}${tab}${tab}${tab}${tab}${table_env}\n${tab}${tab}${tab}${tab}${tab}${log_url}\n${tab}${tab}${tab}${tab}${tab}${exe_url}\n${tab}${tab}${tab}${tab}${tab}${jar_url}\n${tab}${tab}${tab}${tab}${tab}${jre_url}\n${tab}${tab}${tab}${tab}${tab}${sleep}\n${tab}${tab}${tab}${tab}${tab}${install}\n${tab}${tab}${tab}${tab}${tab}Start-Sleep -s 200\n${tab}${tab}${tab}${tab}${tab}& "C:\\su_pilvi.exe"\n${tab}${tab}${tab}${tab}${tab}</powershell>\n${tab}${tab}${tab}${tab}${tab}<persist>true</persist>\n${tab}`;
        }
        if (obj.properties.Backup === true) {
            lambda = true;
            yaml += `LambdaFunctionForStop${obj.id}:\n${tab}${tab}Type: AWS::Lambda::Function\n${tab}${tab}Properties:\n${tab}${tab}${tab}Code:\n${tab}${tab}${tab}${tab}ZipFile: !Sub |\n${tab}${tab}${tab}${tab}${tab}import boto3\n${tab}${tab}${tab}${tab}${tab}def lambda_handler(event,context):\n${tab}${tab}${tab}${tab}${tab}ec2 = boto3.client('ec2', region_name=Region)\n${tab}${tab}${tab}${tab}${tab}ec2.stop_instances(InstanceIds=INSTANCEID)\n${tab}${tab}${tab}Description: Lambda function.\n${tab}${tab}${tab}FunctionName: LambdaFunctionStop${obj.properties.name}\n${tab}${tab}${tab}Handler: index.lambda_handler\n${tab}${tab}${tab}Role : !GetAtt LambdaExecutionRole.Arn\n${tab}${tab}${tab}Runtime: python2.7\n${tab}${tab}${tab}Timeout: 10\n${tab}${tab}${tab}Environment:\n${tab}${tab}${tab}${tab}Variables:\n${tab}${tab}${tab}${tab}${tab}INSTANCEID: !Ref ${obj.id}\n${tab}${tab}${tab}${tab}${tab}Region:\n${tab}${tab}${tab}${tab}${tab}${tab}Fn::GetAtt:\n${tab}${tab}${tab}${tab}${tab}${tab}${tab}- ${obj.id}\n${tab}${tab}${tab}${tab}${tab}${tab}${tab}- AvailabilityZone\n${tab}`;
            yaml += `LambdaFunctionForStart${obj.id}:\n${tab}${tab}Type: AWS::Lambda::Function\n${tab}${tab}Properties:\n${tab}${tab}${tab}Code:\n${tab}${tab}${tab}${tab}ZipFile: !Sub |\n${tab}${tab}${tab}${tab}${tab}import boto3\n${tab}${tab}${tab}${tab}${tab}def lambda_handler(event,context):\n${tab}${tab}${tab}${tab}${tab}ec2 = boto3.client('ec2', region_name=Region)\n${tab}${tab}${tab}${tab}${tab}ec2.start_instances(InstanceIds=INSTANCEID)\n${tab}${tab}${tab}Description: Lambda function.\n${tab}${tab}${tab}FunctionName: LambdaFunctionStart${obj.properties.name}\n${tab}${tab}${tab}Handler: index.lambda_handler\n${tab}${tab}${tab}Role : !GetAtt LambdaExecutionRole.Arn\n${tab}${tab}${tab}Runtime: python2.7\n${tab}${tab}${tab}Timeout: 10\n${tab}${tab}${tab}Environment:\n${tab}${tab}${tab}${tab}Variables:\n${tab}${tab}${tab}${tab}${tab}INSTANCEID: !Ref ${obj.id}\n${tab}${tab}${tab}${tab}${tab}Region:\n${tab}${tab}${tab}${tab}${tab}${tab}Fn::GetAtt:\n${tab}${tab}${tab}${tab}${tab}${tab}${tab}- ${obj.id}\n${tab}${tab}${tab}${tab}${tab}${tab}${tab}- AvailabilityZone\n${tab}`;
            yaml += `ScheduledRuleForStart${obj.id}:\n${tab}${tab}Type: AWS::Events::Rule\n${tab}${tab}Properties:\n${tab}${tab}${tab}Description: "ScheduledRule"\n${tab}${tab}${tab}ScheduleExpression: cron(0 6 * * ? *)\n${tab}${tab}${tab}State: "ENABLED"\n${tab}${tab}${tab}Targets: \n${tab}${tab}${tab}-\n${tab}${tab}${tab}${tab}Arn:\n${tab}${tab}${tab}${tab}${tab}Fn::GetAtt:\n${tab}${tab}${tab}${tab}${tab}${tab}- LambdaFunctionForStart${obj.id}\n${tab}${tab}${tab}${tab}${tab}${tab}- Arn\n${tab}${tab}${tab}${tab}Id: TargetFunctionV2${obj.properties.name}\n${tab}`;
            yaml += `ScheduledRuleForStop${obj.id}:\n${tab}${tab}Type: AWS::Events::Rule\n${tab}${tab}Properties:\n${tab}${tab}${tab}Description: "ScheduledRule"\n${tab}${tab}${tab}ScheduleExpression: cron(0 18 * * ? *)\n${tab}${tab}${tab}State: "ENABLED"\n${tab}${tab}${tab}Targets: \n${tab}${tab}${tab}-\n${tab}${tab}${tab}${tab}Arn:\n${tab}${tab}${tab}${tab}${tab}Fn::GetAtt:\n${tab}${tab}${tab}${tab}${tab}${tab}- LambdaFunctionForStop${obj.id}\n${tab}${tab}${tab}${tab}${tab}${tab}- Arn\n${tab}${tab}${tab}${tab}Id: TargetFunctionV1${obj.id}\n${tab}`;
            yaml += `PermissionForEventsToInvokeLambdaStart${obj.id}:\n${tab}${tab}Type: AWS::Lambda::Permission\n${tab}${tab}Properties:\n${tab}${tab}${tab}FunctionName: LambdaFunctionStart${obj.id}\n${tab}${tab}${tab}Action: "lambda:InvokeFunction"\n${tab}${tab}${tab}Principal: "events.amazonaws.com"\n${tab}${tab}${tab}SourceArn:\n${tab}${tab}${tab}${tab}Fn::GetAtt:\n${tab}${tab}${tab}${tab}${tab}- ScheduledRuleForStart${obj.id}\n${tab}${tab}${tab}${tab}${tab}- Arn\n${tab}`;
            yaml += `PermissionForEventsToInvokeLambdaStop${obj.id}:\n${tab}${tab}Type: AWS::Lambda::Permission\n${tab}${tab}Properties:\n${tab}${tab}${tab}FunctionName: LambdaFunctionStop${obj.id}\n${tab}${tab}${tab}Action: "lambda:InvokeFunction"\n${tab}${tab}${tab}Principal: "events.amazonaws.com"\n${tab}${tab}${tab}SourceArn:\n${tab}${tab}${tab}${tab}Fn::GetAtt:\n${tab}${tab}${tab}${tab}${tab}- ScheduledRuleForStop${obj.id}\n${tab}${tab}${tab}${tab}${tab}- Arn\n${tab}`;
        }
    },
    'cwatch': (obj,email) => {
        if (!obj.properties.name) {
            alert("No name for cloud watch configure the cloud watch(s) to continue");
            throw "hi";
        }
        var dimensions = obj.properties.InstanceName ? `${tab}${tab}${tab}Dimensions:\n${tab}${tab}${tab}${tab}- Name: !Ref ${obj.properties.InstanceName}\n${tab}${tab}${tab}${tab}  Value:\n${tab}${tab}${tab}${tab}  ${tab}Ref: ${obj.properties.InstanceName}\n`:'';
        yaml += `SNSTopic:\n${tab}${tab}Type: AWS::SNS::Topic\n${tab}${tab}Properties:\n${tab}${tab}${tab}DisplayName: SampleSNS\n${tab}${tab}${tab}TopicName: SampleSNS\n${tab}${tab}${tab}Subscription:\n${tab}${tab}${tab}${tab}- Endpoint: ${obj.properties.Email}\n${tab}${tab}${tab}${tab}  Protocol: email\n${tab}`
        yaml += `${obj.id}:\n${tab}${tab}Type: AWS::CloudWatch::Alarm\n${tab}${tab}Properties:\n${tab}${tab}${tab}AlarmDescription: CPU alarm for my instance\n${tab}${tab}${tab}AlarmActions:\n${tab}${tab}${tab}${tab}- Ref: SNSTopic\n${tab}${tab}${tab}MetricName: CPUUtilization\n${tab}${tab}${tab}Namespace: AWS/EC2\n${tab}${tab}${tab}Statistic: Average\n${tab}${tab}${tab}Period: ${obj.properties.Period}\n${tab}${tab}${tab}DatapointsToAlarm: 2\n${tab}${tab}${tab}EvaluationPeriods: ${obj.properties.EvaluationPeriods}\n${tab}${tab}${tab}Threshold: ${obj.properties.Threshold}\n${tab}${tab}${tab}ComparisonOperator: GreaterThanThreshold\n${dimensions}${tab}`;
    },
    'vpc': (obj,email) => {
        if (!obj.properties.name) {
            alert("No name for VPC configure the VPC(s) to continue");
            throw "hi";
        }
        yaml += `${obj.id}:\n${tab}${tab}Type: AWS::EC2::VPC\n${tab}${tab}Properties:\n${tab}${tab}${tab}CidrBlock: ${obj.properties.CidrBlock}\n${tab}${tab}${tab}EnableDnsSupport: ${obj.properties.DNS}\n${tab}${tab}${tab}EnableDnsHostnames: ${obj.properties.getDNShost}\n${tab}${tab}${tab}InstanceTenancy: ${obj.properties.InstanceTenancy}\n${tab}`;
    }
}

let temp = false, routeTableTemp = false;
export default function deploy(sample,email) {
    yaml = `AWSTemplateFormatVersion: 2010-09-09\nDescription: Ec2 block device mapping\nResources:\n${tab}`;
    for (let i in sample) {
        if (((sample[i].serviceName === "subnet") || (sample[i].serviceName === "sg")) && (temp === false)) {
            // yaml += vpc;
            temp = true;
        }
        if ((sample[i].serviceName === "subnet") && (routeTableTemp !== true)) {
            if (subnet[sample[i].properties.SubnetType]){
                var obj = sample[i];
                console.log(obj)
                yaml += `${obj.properties.VpcId}RouteTable:\n${tab}${tab}Type: AWS::EC2::RouteTable\n${tab}${tab}Properties:\n${tab}${tab}${tab}VpcId: !Ref ${obj.properties.VpcId}\n${tab}${obj.properties.VpcId}InternetRoute:\n${tab}${tab}Type: AWS::EC2::Route\n${tab}${tab}DependsOn: ${obj.id}VPCGatewayAttachment\n${tab}${tab}Properties:\n${tab}${tab}${tab}DestinationCidrBlock: 0.0.0.0/0\n${tab}${tab}${tab}GatewayId: !Ref ${obj.id}InternetGateway\n${tab}${tab}${tab}RouteTableId: !Ref ${obj.properties.VpcId}RouteTable\n${tab}`;
                yaml += `${obj.id}InternetGateway:\n${tab}${tab}Type: AWS::EC2::InternetGateway\n${tab}${obj.id}VPCGatewayAttachment:\n${tab}${tab}Type: AWS::EC2::VPCGatewayAttachment\n${tab}${tab}Properties:\n${tab}${tab}${tab}VpcId: !Ref ${obj.properties.VpcId}\n${tab}${tab}${tab}InternetGatewayId: !Ref ${obj.id}InternetGateway\n${tab}`
                routeTableTemp = true;
            }
        }
        console.log(sample[i])
        try {
            generate[sample[i].serviceName](sample[i],email);
        }
        catch (e) {
            console.log(e,"vauva");
            if (e === "hi") {
                return "";
            }
            alert("Check your design");
        }
    }
    // console.log(yaml);
    if (lambda) {
        yaml += `LambdaExecutionRole:\n${tab}${tab}Type: AWS::IAM::Role\n${tab}${tab}Properties:\n${tab}${tab}${tab}AssumeRolePolicyDocument:\n${tab}${tab}${tab}${tab}Version: '2012-10-17'\n${tab}${tab}${tab}${tab}Statement:\n${tab}${tab}${tab}${tab}- Effect: Allow\n${tab}${tab}${tab}${tab}  Principal:\n${tab}${tab}${tab}${tab}${tab}  Service:\n${tab}${tab}${tab}${tab}${tab}  - lambda.amazonaws.com\n${tab}${tab}${tab}${tab}  Action:\n${tab}${tab}${tab}${tab}  - sts:AssumeRole\n${tab}${tab}${tab}Path: "/"\n${tab}${tab}${tab}Policies:\n${tab}${tab}${tab}- PolicyName: root\n${tab}${tab}${tab}  PolicyDocument:\n${tab}${tab}${tab}${tab}  Version: '2012-10-17'\n${tab}${tab}${tab}${tab}  Statement:\n${tab}${tab}${tab}${tab}  - Effect: Allow\n${tab}${tab}${tab}${tab}    Action:\n${tab}${tab}${tab}${tab}    - "logs:*"\n${tab}${tab}${tab}${tab}    Resource: arn:aws:logs:::*\n${tab}`
    }
    temp = false;
    routeTableTemp = false;
    console.log(yaml);
    return yaml;
}
