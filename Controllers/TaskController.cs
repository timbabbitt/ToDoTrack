using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using DevBoard.Objects;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DevBoard.Controllers
{
    [Route("api/[controller]/[action]")]
    public class TaskController : Controller
    {
        [HttpPost]
        [ActionName("Add")]
        public Task AddProject([FromBody] Task task)
        {
            task.TaskId = Guid.NewGuid();
            task.Added = DateTime.Now;
            task.AssignedTo = "69876";
            task.Status = 0;
            task.Add();

            return task;
        }
    }
}

