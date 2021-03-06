resource "aws_lb" "backend_alb" {
  name               = "alb-for-backend"
  internal           = false
  load_balancer_type = "application"

  security_groups = [
    aws_security_group.internet_interfacing_sg.id
  ]

  subnets = [
    aws_subnet.public-subnet-1.id,
    aws_subnet.public-subnet-2.id
  ]

  enable_deletion_protection = false

  tags = {
    Name = "alb-app-backend"
    # Environment = "production"
  }
}



resource "aws_lb_listener" "http_backend" {
  load_balancer_arn = aws_lb.backend_alb.arn
  port              = 80
  protocol          = "HTTP"
  depends_on        = [aws_lb_target_group.app_target_group_backend]

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.app_target_group_backend.arn
  }
}

resource "aws_lb_listener_rule" "my_app_listener_rule_backend" {
  listener_arn = aws_lb_listener.http_backend.arn

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.app_target_group_backend.arn
  }

  condition {
    host_header {
      values = ["myapp.example.com"]
    }
  }
}

resource "aws_lb_target_group" "app_target_group_backend" {
  vpc_id   = aws_vpc.production-vpc.id
  name     = "tg-app-backend"
  port     = 80
  protocol = "HTTP"
}

output "backend_url" {
  value       = aws_lb.backend_alb.dns_name
  description = "Backend URL"
}

output "frontend_url" {
  value       = aws_lb.pubic_alb.dns_name
  description = "Frontend URL"
}

output "db_endpoint" {
  value       = aws_db_instance.production.endpoint
  description = "Database endpoint."
}

locals {

  vars = {
    backend_url = aws_lb.backend_alb.dns_name
    db_endpoint = aws_db_instance.production.endpoint
    db_password = aws_db_instance.production.password
    db_username = aws_db_instance.production.username
    db_name     = aws_db_instance.production.name
  }
}
