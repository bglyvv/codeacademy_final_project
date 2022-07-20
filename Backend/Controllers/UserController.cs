using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using StepProject.DAL;
using StepProject.DAL.Entities;
using StepProject.DTOs;
using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace StepProject.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _ctx;
        private readonly IConfiguration _config;

        public UserController(AppDbContext ctx, IConfiguration config)
        {
            _ctx = ctx;
            _config = config;
        }

        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> Get()
        {
            try
            {
                return Ok(await _ctx.Users.ToListAsync());
            }
            catch (Exception)
            {
                return Ok(new StatusDTO
                {
                    status = "Connection to the server cannot be established"
                });
            }

        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetSpecific(int id)
        {
            try
            {
                User user = await _ctx.Users.FirstAsync(u => u.Id == id);
                if (user == null)
                {
                    return Ok(new UserOperationDTO
                    {
                        user_id = id,
                        operation_status = "fail",
                        operation_type = "get"
                    });
                }
                return Ok(user);
            }
            catch (System.Exception)
            {

                return Ok(new UserOperationDTO
                {
                    user_id = id,
                    operation_status = "fail",
                    operation_type = "get"
                });
            }

        }

        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> Add(User user)
        {
            try
            {
                if (user.Name == null || user.Phone == null)
                {
                    return Ok(new UserOperationDTO
                    {
                        user_id = user.Id,
                        operation_status = "fail",
                        operation_type = "add"
                    });
                }
                await _ctx.Users.AddAsync(user);
                await _ctx.SaveChangesAsync();
                //return ValidationProblem(ModelState);

                return Ok(new UserOperationDTO
                {
                    user_id = user.Id,
                    operation_status = "success",
                    operation_type = "add"
                });


            }
            catch (System.Exception)
            {

                return Ok(new UserOperationDTO
                {
                    user_id = user.Id,
                    operation_status = "fail",
                    operation_type = "add"
                });
            }
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                User user = await _ctx.Users.FirstAsync(u => u.Id == id);
                if (user == null)
                {
                    return Ok(new UserOperationDTO
                    {
                        user_id = id,
                        operation_status = "fail",
                        operation_type = "delete"
                    });
                }
                _ctx.Users.Remove(user);
                await _ctx.SaveChangesAsync();
                return Ok(new UserOperationDTO
                {
                    user_id = id,
                    operation_status = "success",
                    operation_type = "delete"
                });
            }
            catch (System.Exception)
            {

                return Ok(new UserOperationDTO
                {
                    user_id = id,
                    operation_status = "fail",
                    operation_type = "delete"
                });
            }
        }

        [HttpPatch]
        [Route("edit/{id}")]
        public async Task<IActionResult> Edit(int id, User newUser)
        {
            try
            {
                User user = await _ctx.Users.FirstAsync(u => u.Id == id);
                if (user == null)
                {
                    return Ok(new UserOperationDTO
                    {
                        user_id = id,
                        operation_status = "fail",
                        operation_type = "edit"
                    });
                }
                if (newUser == null)
                {
                    return Ok(new UserOperationDTO
                    {
                        user_id = id,
                        operation_status = "fail",
                        operation_type = "edit"
                    });
                }
                if (newUser.Name != null)
                {
                    user.Name = newUser.Name;
                }
                if (newUser.Phone != null)
                {
                    user.Phone = newUser.Phone;
                }
                await _ctx.SaveChangesAsync();
                return Ok(new UserOperationDTO
                {
                    user_id = id,
                    operation_status = "success",
                    operation_type = "edit"
                });
            }
            catch (System.Exception)
            {

                return Ok(new UserOperationDTO
                {
                    user_id = id,
                    operation_status = "fail",
                    operation_type = "edit"
                });
            }
            //return Ok(await _ctx.Users.ToListAsync());
        }

        [HttpGet]
        [Route("connection")]
        public IActionResult GetConnection(int id)
        {
            return Ok(_config.GetConnectionString("Default"));


        }


    }
}
