provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "ec2_instance" {
  ami           = "ami-0d7a109bf30624c99" # you may need to update this
  instance_type = "t2.micro"
  iam_instance_profile = aws_iam_instance_profile.ec2_profile.name
  key_name = "example" # update this
  user_data = <<-EOF
  #!/bin/bash
  sudo yum update -y
  sudo yum install docker -y
  sudo systemctl start docker
  EOF

  vpc_security_group_ids = [aws_security_group.http_backend_security.id, aws_security_group.ssh_backend_security.id]


  tags = {
      Name = "backend iam server"
  }
}

resource "aws_iam_role" "ec2_ecr_role" {

    assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
      Service = "ec2.amazonaws.com"
      }
      Sid = ""
      },
    ]
  })
}

# create instance profile, as a container for the iam role
resource "aws_iam_instance_profile" "ec2_profile" {
 role = aws_iam_role.ec2_ecr_role.name
}

# attach role to policy
resource "aws_iam_role_policy_attachment" "ecr_read_only" {
 role = aws_iam_role.ec2_ecr_role.name
 policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}