import React, { Component } from 'react'

import Parser from './Parser/Parser';
import './home.modules.css';
import SideBar from './SideBar/SideBar';
import EC2 from './FormComponents/EC2';
import LoadBalancer from './FormComponents/LoadBalancer';
import Subnet from './FormComponents/Subnet';
import SecurityGroup from './FormComponents/SecurityGroup';
import DatabaseServer from './FormComponents/DatabaseServer';
import DBsubnet from './FormComponents/DBSubnet';
import deploy from './YAMLParser';
import CloudWatch from './FormComponents/CloudWatch';
var count = [],active=null,id=null,selected=null;

export default class Home extends Component {
  state = {
    active: null,
    id: null,
    yaml:"Deploy to get the yaml",
    json:"Deploy to get the json",
  }
  deploy=()=>{
   //  var yaml = deploy([{"id":"subnet0.11706778980718924","serviceName":"subnet","properties":{"name":"subnet1","CidrBlock":"172.31.0.0/20","SubnetType":false}},{"id":"subnet0.8245752919067497","serviceName":"subnet","properties":{"name":"subnet2","CidrBlock":"172.31.16.0/20","SubnetType":"true"}},{"id":"load-balancer0.05362829721258744","serviceName":"load-balancer","properties":{"InstancePort":"80","LoadBalancerPort":"80","PolicyNames":"","Protocol":"https","LoadBalancerName":"lb","SecurityGroup":"lbgrp","Subnet":"subnet1"}},{"id":"instance0.41395720435820116","serviceName":"instance","properties":{"name":"webserver1","AvailabilityZone":"us-east-1a","KeyName":"windows","InstanceType":"t2.micro","ImageID":"ami-041114ddee4a98333","SubnetName":"subnet1","SecurityGroup":"web1grp","Backup":true}},{"id":"instance0.6227855659915429","serviceName":"instance","properties":{"name":"webserver2","AvailabilityZone":"us-east-1a","KeyName":"windows","InstanceType":"t2.micro","ImageID":"ami-e24b7d9d","SubnetName":"subnet1","SecurityGroup":"wbgrp2","Backup":false}},{"id":"database-server0.760227466020251","serviceName":"database-server","properties":{"DBName":"dbserver","VPCSecurityGroups":"","AllocatedStorage":"10","DBInstanceClass":"db.t2.micro","Engine":"MySQL","MasterUsername":"root","MasterUserPassword":"eniyan007","DBSecurityGroups":"dbgrp"}},{"id":"security-group0.22712235517250856","serviceName":"security-group","properties":{"GroupName":"lbgrp","GroupDescription":"sample","Port":"80,443"}},{"id":"security-group0.00906562568086855","serviceName":"security-group","properties":{"GroupName":"web1grp","GroupDescription":"sample","Port":"80,443,22,3389"}},{"id":"security-group0.2388936306207443","serviceName":"security-group","properties":{"GroupName":"wbgrp2","GroupDescription":"sample","Port":"80,443,22,3389"}},{"id":"security-group0.6053688104790425","serviceName":"security-group","properties":{"GroupName":"dbgrp","GroupDescription":"sample","Port":"22,3389,3306,1403"}},{"id":"cloud-watch0.13543790834419767","serviceName":"cloud-watch","properties":{"name":"alarm","InstanceName":"webserver1","Period":"2","EvaluationPeriods":"500","Threshold":"80","Email":"r.eniyanilavan@gmail.com"}},{"id":"cloud-watch0.25121533502992266","serviceName":"cloud-watch","properties":{"name":"alarm2","InstanceName":"webserver2","Period":"2","EvaluationPeriods":"500","Threshold":"80","Email":"r.eniyanilavan@gmail.com"}}]);
   console.log(count);
   var yaml = deploy(count);
    var template = 
`AWSTemplateFormatVersion: 2010-09-09
Description: Ec2 block device mapping
Resources:
   LambdaExecutionRole:
      Type: AWS::IAM::Role
      Properties:
         AssumeRolePolicyDocument:
            Version: '2012-10-17'
            Statement:
            - Effect: Allow
              Principal:
                 Service:
                 - lambda.amazonaws.com
              Action:
              - sts:AssumeRole
         Path: "/"
         Policies:
         - PolicyName: root
           PolicyDocument:
              Version: '2012-10-17'
              Statement:
              - Effect: Allow
                Action:
                - "logs:*"
                Resource: arn:aws:logs:::*
   VPC:
      Type: AWS::EC2::VPC
      Properties:
         CidrBlock: 172.31.0.0/16
         EnableDnsSupport: true
         EnableDnsHostnames: true
         InstanceTenancy: default
   InternetGateway:
      Type: AWS::EC2::InternetGateway
   VPCGatewayAttachment:
      Type: AWS::EC2::VPCGatewayAttachment
      Properties:
         VpcId: !Ref VPC
         InternetGatewayId: !Ref InternetGateway
   subnet1:
      Type: AWS::EC2::Subnet
      Properties:
         CidrBlock: 172.31.0.0/20
         VpcId: !Ref VPC
         AvailabilityZone: "us-east-1a"
         MapPublicIpOnLaunch: true
   subnet2:
      Type: AWS::EC2::Subnet
      Properties:
         CidrBlock: 172.31.16.0/20
         VpcId: !Ref VPC
         AvailabilityZone: "us-east-1b"
   RouteTable:
      Type: AWS::EC2::RouteTable
      Properties:
         VpcId: !Ref VPC
   InternetRoute:
      Type: AWS::EC2::Route
      DependsOn: VPCGatewayAttachment
      Properties:
         DestinationCidrBlock: 0.0.0.0/0
         GatewayId: !Ref InternetGateway
         RouteTableId: !Ref RouteTable
   Subnet1RouteTableAssociation:
      Type: AWS::EC2::SubnetRouteTableAssociation
      Properties:
         RouteTableId: !Ref RouteTable
         SubnetId: !Ref subnet1
   SecurityGroup:
      Type: AWS::EC2::SecurityGroup
      Properties:
         GroupName: "Internet Group"
         GroupDescription: "SSH traffic in, all traffic out."
         VpcId: !Ref VPC
         SecurityGroupIngress:
           - IpProtocol: tcp
             FromPort: '22'
             ToPort: '22'
             CidrIp: 0.0.0.0/0
         SecurityGroupEgress:
          - IpProtocol: -1
            CidrIp: 0.0.0.0/0 
   lb:
      Type: AWS::ElasticLoadBalancing::LoadBalancer
      Properties:
         LoadBalancerName: lb
         Subnets: 
            - !Ref subnet1
         SecurityGroups: 
            - !Ref lbgrp
         Listeners:
         -  LoadBalancerPort: 80
            InstancePort: 80
            Protocol: http
   webserver1:
      Type: AWS::EC2::Instance
      Properties:
         ImageId: ami-041114ddee4a98333
         AvailabilityZone: us-east-1a
         KeyName: windows
         InstanceType: t2.micro
         SubnetId: !Ref subnet1
         SecurityGroupIds: 
            - !Ref web1grp
         UserData:
            !Base64 |
                <powershell> 
                Start-Transcript; 

                # Install IIS
                Import-Module ServerManager; 
                Enable-WindowsOptionalFeature -Online -NoRestart -FeatureName 'IIS-WebServerRole', 'IIS-WebServer', 'IIS-ManagementConsole';

                # Configure Bindings to :443
                New-WebBinding -Name "Default Web Site" -IP "*" -Port 443 -Protocol https -SslFlags 0;
                $newCert = New-SelfSignedCertificate -DnsName localhost -CertStoreLocation cert:\LocalMachine\My; 
                $SslBinding = Get-WebBinding -Name "Default Web Site" -Protocol "https";
                $SslBinding.AddSslCertificate($newCert.GetCertHashString(), "my"); 
                Get-WebBinding -Port 80 -Name "Default Web Site" | Remove-WebBinding;

                # Install CodeDeploy Agent 
                Import-Module AWSPowerShell; 
                New-Item -Path "C:\Temp" -ItemType "directory" -Force; 
                Read-S3Object -BucketName aws-codedeploy-us-east-1 -Key latest/codedeploy-agent.msi -File c:\temp\codedeploy-agent.msi; 
                c:\temp\codedeploy-agent.msi /quiet /l c:\temp\host-agent-install-log.txt;
                </powershell>
   LambdaFunctionForStopwebserver1:
      Type: AWS::Lambda::Function
      Properties:
         Code:
            ZipFile: !Sub |
               import boto3
               def lambda_handler(event,context):
               ec2 = boto3.client('ec2', region_name=Region)
               ec2.stop_instances(InstanceIds=INSTANCEID)
         Description: Lambda function.
         FunctionName: LambdaFunctionForStopwebserver1
         Handler: index.lambda_handler
         Role : !GetAtt LambdaExecutionRole.Arn
         Runtime: python2.7
         Timeout: 10
         Environment:
            Variables:
               INSTANCEID: !Ref webserver1
               Region:
                  Fn::GetAtt:
                     - webserver1
                     - AvailabilityZone
   LambdaFunctionForStartwebserver1:
      Type: AWS::Lambda::Function
      Properties:
         Code:
            ZipFile: !Sub |
               import boto3
               def lambda_handler(event,context):
               ec2 = boto3.client('ec2', region_name=Region)
               ec2.start_instances(InstanceIds=INSTANCEID)
         Description: Lambda function.
         FunctionName: LambdaFunctionForStartwebserver1
         Handler: index.lambda_handler
         Role : !GetAtt LambdaExecutionRole.Arn
         Runtime: python2.7
         Timeout: 10
         Environment:
            Variables:
               INSTANCEID: !Ref webserver1
               Region:
                  Fn::GetAtt:
                     - webserver1
                     - AvailabilityZone
   ScheduledRuleForStartwebserver1:
      Type: AWS::Events::Rule
      Properties:
         Description: "ScheduledRule"
         ScheduleExpression: cron(0 6 * * ? *)
         State: "ENABLED"
         Targets: 
         -
            Arn:
               Fn::GetAtt:
                  - LambdaFunctionForStartwebserver1
                  - Arn
            Id: TargetFunctionV2webserver1
   ScheduledRuleForStopwebserver1:
      Type: AWS::Events::Rule
      Properties:
         Description: "ScheduledRule"
         ScheduleExpression: cron(0 18 * * ? *)
         State: "ENABLED"
         Targets: 
         -
            Arn:
               Fn::GetAtt:
                  - LambdaFunctionForStopwebserver1
                  - Arn
            Id: TargetFunctionV1webserver1
   PermissionForEventsToInvokeLambdaStartwebserver1:
      Type: AWS::Lambda::Permission
      Properties:
        FunctionName: LambdaFunctionForStartwebserver1
        Action: "lambda:InvokeFunction"
        Principal: "events.amazonaws.com"
        SourceArn:
            Fn::GetAtt:
              - ScheduledRuleForStartwebserver1
              - Arn
   PermissionForEventsToInvokeLambdaStopwebserver1:
      Type: AWS::Lambda::Permission
      Properties:
        FunctionName: LambdaFunctionForStopwebserver1
        Action: "lambda:InvokeFunction"
        Principal: "events.amazonaws.com"
        SourceArn:
            Fn::GetAtt:
              - ScheduledRuleForStopwebserver1
              - Arn
   webserver2:
      Type: AWS::EC2::Instance
      Properties:
         ImageId: ami-009d6802948d06e52
         AvailabilityZone: us-east-1a
         KeyName: windows
         InstanceType: t2.micro
         SubnetId: !Ref subnet1
         SecurityGroupIds: 
            - !Ref wbgrp2
         UserData:
            Fn::Base64: !Sub |
                #!/bin/bash
                yum update -y
                amazon-linux-extras install -y lamp-mariadb10.2-php7.2 php7.2
                yum install -y httpd mariadb-server
                systemctl start httpd
                systemctl enable httpd
                usermod -a -G apache ec2-user
                chown -R ec2-user:apache /var/www
                chmod 2775 /var/www
                find /var/www -type d -exec chmod 2775 {} \;
                find /var/www -type f -exec chmod 0664 {} \;
                echo "<?php phpinfo(); ?>" > /var/www/html/phpinfo.php
   dbserver:
      Type: AWS::RDS::DBInstance
      Properties:
         DBName: dbserver
         VPCSecurityGroups:
            - !Ref dbgrp
         DBSubnetGroupName: !Ref myDBSubnetGroup
         AllocatedStorage: 10
         DBInstanceClass: db.t2.micro
         Engine: MySQL
         MasterUsername: root
         MasterUserPassword: eniyan007
   myDBSubnetGroup:
      Type: "AWS::RDS::DBSubnetGroup"
      Properties:
        DBSubnetGroupDescription: "description"
        SubnetIds:
          - !Ref subnet2
          - !Ref subnet1
   lbgrp:
      Type: AWS::EC2::SecurityGroup
      Properties:
         GroupName: lbgrp
         GroupDescription: sample
         VpcId: !Ref VPC
         SecurityGroupIngress:
            -
               CidrIp: 0.0.0.0/0
               FromPort: 80
               IpProtocol: tcp
               ToPort: 80
            -
               CidrIp: 0.0.0.0/0
               FromPort: 443
               IpProtocol: tcp
               ToPort: 443
   web1grp:
      Type: AWS::EC2::SecurityGroup
      Properties:
         GroupName: web1grp
         GroupDescription: sample
         VpcId: !Ref VPC
         SecurityGroupIngress:
            -
               CidrIp: 0.0.0.0/0
               FromPort: 80
               IpProtocol: tcp
               ToPort: 80
            -
               CidrIp: 0.0.0.0/0
               FromPort: 443
               IpProtocol: tcp
               ToPort: 443
            -
               CidrIp: 0.0.0.0/0
               FromPort: 22
               IpProtocol: tcp
               ToPort: 22
            -
               CidrIp: 0.0.0.0/0
               FromPort: 3389
               IpProtocol: tcp
               ToPort: 3389
   wbgrp2:
      Type: AWS::EC2::SecurityGroup
      Properties:
         GroupName: wbgrp2
         GroupDescription: sample
         VpcId: !Ref VPC
         SecurityGroupIngress:
            -
               CidrIp: 0.0.0.0/0
               FromPort: 80
               IpProtocol: tcp
               ToPort: 80
            -
               CidrIp: 0.0.0.0/0
               FromPort: 443
               IpProtocol: tcp
               ToPort: 443
            -
               CidrIp: 0.0.0.0/0
               FromPort: 22
               IpProtocol: tcp
               ToPort: 22
            -
               CidrIp: 0.0.0.0/0
               FromPort: 3389
               IpProtocol: tcp
               ToPort: 3389
   dbgrp:
      Type: AWS::EC2::SecurityGroup
      Properties:
         GroupName: dbgrp
         GroupDescription: sample
         VpcId: !Ref VPC
         SecurityGroupIngress:
            -
               CidrIp: 0.0.0.0/0
               FromPort: 22
               IpProtocol: tcp
               ToPort: 22
            -
               CidrIp: 0.0.0.0/0
               FromPort: 3389
               IpProtocol: tcp
               ToPort: 3389
            -
               CidrIp: 0.0.0.0/0
               FromPort: 3306
               IpProtocol: tcp
               ToPort: 3306
            -
               CidrIp: 0.0.0.0/0
               FromPort: 1403
               IpProtocol: tcp
               ToPort: 1403
   SNSTopic:
      Type: AWS::SNS::Topic
      Properties:
         DisplayName: SampleSNS
         TopicName: SampleSNS
         Subscription:
            - Endpoint: r.eniyanilavan@gmail.com
              Protocol: email
   alarm:
      Type: AWS::CloudWatch::Alarm
      Properties:
         AlarmDescription: CPU alarm for my instance
         AlarmActions:
            - Ref: SNSTopic
         MetricName: CPUUtilization
         Namespace: AWS/EC2
         Statistic: Average
         Period: 60
         DatapointsToAlarm: 2
         EvaluationPeriods: 500
         Threshold: 80
         ComparisonOperator: GreaterThanThreshold
         Dimensions:
            - Name: !Ref webserver1
              Value:
                 Ref: webserver1
   SNSTopic:
      Type: AWS::SNS::Topic
      Properties:
         DisplayName: SampleSNS
         TopicName: SampleSNS
         Subscription:
            - Endpoint: r.eniyanilavan@gmail.com
              Protocol: email
   alarm2:
      Type: AWS::CloudWatch::Alarm
      Properties:
         AlarmDescription: CPU alarm for my instance
         AlarmActions:
            - Ref: SNSTopic
         MetricName: CPUUtilization
         Namespace: AWS/EC2
         Statistic: Average
         Period: 60
         DatapointsToAlarm: 2
         EvaluationPeriods: 500
         Threshold: 80
         ComparisonOperator: GreaterThanThreshold
         Dimensions:
            - Name: !Ref webserver2
              Value:
                 Ref: webserver2`;
    this.setState({
      yaml:yaml
    },()=>{
        var request = new Request("http://localhost:5000/deploy",{
          method:"POST",
          body:JSON.stringify({"yaml":template}),
          headers: new Headers({"Content-Type":"application/json"})
        });
        fetch(request)
        .then(res=>{
          console.log(res);
        })
        .catch(e=>{
          console.log(e);
        })
    });
  }
  currentComponent = () => {
    return active;
  }
  getCount = () => {
    console.log("count number: ",count);
    return count;
  }
  getSelected = () => {
    return selected;
  }
  dismiss = () => {
    if (active != null) {
      document.getElementById(active).classList.toggle("hide");
    }
    console.log("heuhe", active);
  }
  selectElement = (e) => {
   //  this.setState({
   //    selected: e.target.id
   //  })
   selected = e.target.id;
    console.log(e.target.id);
  }
  ec2 = (e) => {
   //  this.setState({
   //    active: "ec2-form-id",
   //    id: e.target.id,
   //  })
    active = "ec2-form-id";
    id = e.target.id;
    document.getElementById("ec2-form-id").classList.toggle("hide");
    document.getElementById("ec2-name-id").value = "";
    document.getElementById("keyname-id").value = "";
    document.getElementById("availability-id").value = "";
    console.log("helllo from ec2");
  }
  Subnet = (e) => {
    console.log("helllo");
   //  this.setState({
   //    active: "private-subnet-form-id",
   //    id: e.target.id
   //  })
    active = "private-subnet-form-id";
    id = e.target.id;
    document.getElementById("private-subnet-form-id").classList.toggle("hide");
   console.log(document.getElementById("private-subnet-form-id"));
  }
  LoadBalancer = (e) => {
    console.log("helllo");
   //  this.setState({
   //    active: "load-balancer-form-id",
   //    id: e.target.id
   //  })
    active = "load-balancer-form-id";
    id = e.target.id;
    document.getElementById("load-balancer-form-id").classList.toggle("hide");
  }
  DatabaseServer = (e) => {
    console.log("helllo");
   //  this.setState({
   //    active: "database-server-form-id",
   //    id: e.target.id
   //  })
    active = "database-server-form-id";
    id = e.target.id;
    document.getElementById("database-server-form-id").classList.toggle("hide");
  }
  SecurityGroup = (e) => {
    console.log("helllo");
   //  this.setState({
   //    active: "security-group-form-id",
   //    id: e.target.id
   //  })
    active = "security-group-form-id";
    id = e.target.id;
    document.getElementById("security-group-form-id").classList.toggle("hide");
  }
  CloudWatch = (e)=>{
    console.log("helllo");
   //  this.setState({
   //    active: "cloud-watch-form-id",
   //    id: e.target.id
   //  })
    active = "cloud-watch-form-id";
    id = e.target.id;
    document.getElementById("cloud-watch-form-id").classList.toggle("hide"); 
  }
  DBSubnet = (e)=>{
   console.log("helllo");
  //  this.setState({
  //    active: "cloud-watch-form-id",
  //    id: e.target.id
  //  })
   active = "dbsubnet-form-id";
   id = e.target.id;
   document.getElementById("dbsubnet-form-id").classList.toggle("hide"); 
 }
  saveMyStore(store) {
    count = store;
    console.log("updated store", JSON.stringify(count));
  }
  render() {
    var clone;
    document.addEventListener("keydown", (e) => {
      if ((e.key === "Delete") && (selected != null)) {
        var item = document.getElementById(selected);
        console.log(item);
        item.parentNode.removeChild(item);
        this.setState({
          active: null,
          id: null,
          selected: null
        })
        for (var i = 0; i <= count.length - 1; i++) {
          if (count[i].id === item.id) {
            console.log("hhhh");
            count.splice(i, 1);
          }
        }
        console.log(count);
      }
    })
    // document.addEventListener("mousedown", (e) => {
    //   selectedElement = e.target.id;
    // })
    document.addEventListener("dragstart", (e) => {
      console.log("in dragstart", e.target.id);
      if (e.target.parentNode.className === "work-space") {
        clone = document.getElementById(e.target.id);
      }
      else {
        console.log("in if");
        clone = e.target.cloneNode(true);
        // e.dataTransfer.setData("widget",clone);
        if (clone.id === "instance") {
          clone.ondblclick = this.ec2;
          clone.onclick = this.selectElement;

        }
        else if (clone.id === "database-server") {
          clone.ondblclick = this.DatabaseServer;
          clone.onclick = this.selectElement;
        }

        else if (clone.id === "subnet") {
          clone.ondblclick = this.Subnet;
          clone.onclick = this.selectElement;
        }
        else if (clone.id === "load-balancer") {
          clone.ondblclick = this.LoadBalancer;
          clone.onclick = this.selectElement;

        }
        else if (clone.id === "security-group") {
          clone.ondblclick = this.SecurityGroup;
          clone.onclick = this.selectElement;
        }
        else if (clone.id === "cloud-watch") {
          clone.ondblclick = this.CloudWatch;
          clone.onclick = this.selectElement;
        }
        else if (clone.id === "db-subnet") {
         clone.ondblclick = this.DBSubnet;
         clone.onclick = this.selectElement;
       }
        const id = clone.id;
        clone.id = clone.id + "" + Math.random();
        clone.style.position = 'absolute';
        clone.style.transition = "all 0.1s ease";
        if(!e.target.id.includes("0")){
            document.getElementById("work-space-id").append(clone);
        }
        setInterval(1000,()=>{
           console.log("interval");
        })
        console.log(clone);
        count.push({
          id: clone.id,
          serviceName: id,
          properties: [

          ]
        });
        console.log(JSON.stringify(count));
      }
    })
    document.addEventListener("dragover", (e) => {
      if (e.target.id === "work-space-id") {
        clone.style.left = e.screenX - 40 + "px";
        clone.style.top = e.screenY - 120 + "px";
        // console.log(e.clientX,",",e.clientY);
      }
    })
    // document.addEventListener("dragenter",(e)=>{
    //   clone = document.getElementById()
    //   clone.style.left = e.screenX - 40 + "px";
    //     clone.style.top = e.screenY - 120 + "px";
    // })
    return (
      <div className="home-container" >
        <nav className="home-nav">
          <span>Pilvi Automaatori</span>
          <button className="deploy-button" onClick={this.deploy} >Deploy</button>
        </nav>
        <div className="body" >
          <SideBar onClick={this.dismiss} />
          <div className="work-space" id="work-space-id">
          </div>
        </div>
        <div>
          <Parser yaml={this.state.yaml} json={this.state.json} />
        </div>
        { <Subnet saveMyStore={this.saveMyStore} getSelected={this.getSelected} store={this.getCount} currentComponent={this.currentComponent} />}
        { <DatabaseServer saveMyStore={this.saveMyStore} getSelected={this.getSelected} store={this.getCount} currentComponent={this.currentComponent} />}
        { <SecurityGroup saveMyStore={this.saveMyStore} getSelected={this.getSelected} store={this.getCount} currentComponent={this.currentComponent} />}
        { <EC2 saveMyStore={this.saveMyStore} getSelected={this.getSelected} store={this.getCount} currentComponent={this.currentComponent} />}
        { <LoadBalancer saveMyStore={this.saveMyStore} getSelected={this.getSelected} store={this.getCount} currentComponent={this.currentComponent} />}
        { <CloudWatch saveMyStore={this.saveMyStore} getSelected={this.getSelected} store={this.getCount} currentComponent={this.currentComponent} />}
        { <DBsubnet saveMyStore={this.saveMyStore} getSelected={this.getSelected} store={this.getCount} currentComponent={this.currentComponent} />}
      </div>
    )
  }
}
