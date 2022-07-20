resource "aws_launch_template" "asp_backend" {
  name                                 = "backend-service"
  instance_type                        = "t2.micro"
  depends_on                           = [aws_db_instance.production]
  image_id                             = "ami-0cff7528ff583bf9a"
  instance_initiated_shutdown_behavior = "terminate"

  update_default_version = true


  network_interfaces {
    associate_public_ip_address = true
    subnet_id                   = aws_subnet.private-subnet-1.id
    security_groups = [
      # aws_security_group.internal_sg.id,
      aws_security_group.internet_interfacing_sg.id,
    ]
  }

  placement {
    availability_zone = "us-east-1a"
  }

  tag_specifications {
    resource_type = "instance"

    tags = {
      Name = "backend-app"
    }
  }


  user_data = base64encode(templatefile("files/user_data.sh", local.var))
  # user_data = filebase64("files/user_data.sh")
}

