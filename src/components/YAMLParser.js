let yaml, tab = "   ", tab1 = "  ";
const generate = {
    'security-group': (obj) => {
        yaml += `${obj.properties.GroupName}:\n${tab}${tab}Type: AWS::EC2::SecurityGroup\n${tab}${tab}Properties:\n${tab}${tab}${tab}GroupName: ${obj.properties.GroupName}\n${tab}${tab}${tab}GroupDescription: ${obj.properties.GroupDescription}\n${tab}${tab}${tab}VpcId: ${obj.properties.VpcId}\n${tab}`
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
        yaml += `${obj.properties.name}:\n${tab}${tab}Type: AWS::EC2::Subnet\n${tab}${tab}Properties:\n${tab}${tab}${tab}CidrBlock: ${obj.properties.CidrBlock}\n${tab}${tab}${tab}VpcId: ${obj.properties.VpcId}\n${tab}`
        // console.log(obj);
    },
    'instance': (obj) => {
        yaml += `${obj.properties.name}:\n${tab}${tab}Type: AWS::EC2::Instance\n${tab}${tab}Properties:\n${tab}${tab}${tab}ImageId: ${obj.properties.ImageID}\n${tab}${tab}${tab}AvailabilityZone: ${obj.properties.AvailabilityZone}\n${tab}${tab}${tab}KeyName: ${obj.properties.KeyName}\n${tab}${tab}${tab}InstanceType: ${obj.properties.InstanceType}\n${tab}${tab}${tab}SubnetId: !Ref ${obj.properties.SubnetName}\n${tab}${tab}${tab}SecurityGroups: !Ref ${obj.properties.SecurityGroup}\n`
        // console.log(obj);
        if(obj.properties.ImageID=="ami-e24b7d9d"){
            yaml+=`${tab}${tab}${tab}UserData:\n${tab}${tab}${tab}${tab}Fn::Base64: !Sub |\n${tab}${tab}${tab}${tab}${tab}sudo su\n${tab}${tab}${tab}${tab}${tab}yum install httpd -y\n${tab}${tab}${tab}${tab}${tab}systemctl enable httpd\n${tab}${tab}${tab}${tab}${tab}systemctl start httpd\n${tab}`
        }
    },
}

yaml = `AWSTemplateFormatVersion: 2010-09-09\nDescription: Ec2 block device mapping\nResources:\n${tab}`;

export default function deploy(sample) {
    for (let i in sample) {
        generate[sample[i].serviceName](sample[i]);
    }
    // console.log(yaml);
    return yaml;
}
