resource "aws_security_group" "rds" {
  name   = "rds-security-group"
  vpc_id = aws_vpc.production-vpc.id

  ingress {
    protocol    = "tcp"
    from_port   = "3306"
    to_port     = "3306"
    cidr_blocks = ["10.0.0.0/16"]
    # security_groups = [aws_security_group.internal_sg.id] 
  }

  egress {
    protocol    = "tcp"
    from_port   = "3306"
    to_port     = "3306"
    cidr_blocks = ["10.0.0.0/16"]
    # security_groups = [aws_security_group.internal_sg.id] 
  }

  egress {
    protocol    = "-1"
    from_port   = "0"
    to_port     = "0"
    cidr_blocks = ["0.0.0.0/0"] # in the next apply change to different security group
  }
}


resource "aws_db_subnet_group" "production" {
  name       = "main-mysql-server"
  subnet_ids = [aws_subnet.private-subnet-3.id, aws_subnet.private-subnet-4.id]
}

resource "aws_db_instance" "production" {
  identifier             = "mysqldb"
  allocated_storage      = 20
  engine                 = "mysql"
  engine_version         = "5.7"
  instance_class         = "db.t2.micro"
  name                   = "phonebook"
  username               = "admin"
  password               = "kb6853917"
  parameter_group_name   = "default.mysql5.7"
  skip_final_snapshot    = true
  vpc_security_group_ids = [aws_security_group.rds.id]
  db_subnet_group_name   = aws_db_subnet_group.production.name
  publicly_accessible    = false
}

output "db_endpoint" {
  # value = "Host="+aws_db_instance.production.endpoint+";Port=3306;Username="+aws_db_instance.production.username+";Password="+aws_db_instance.production.password+";Database="+aws_db_instance.production.name
  value       = aws_db_instance.production.endpoint
#   value       = "Host=${aws_db_instance.production.endpoint};Port=3306;Username=${aws_db_instance.production.username};Password=${aws_db_instance.production.password};Database=${aws_db_instance.production.name}"
  description = "The endpoint for logging in to the database."
#   sensitive   = true
}

locals {
  
  var = {
    db_endpoint = aws_db_instance.production.endpoint
  }
}
