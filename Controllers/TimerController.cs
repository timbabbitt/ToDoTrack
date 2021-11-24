using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DevBoard.Objects;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DevBoard.Controllers
{
    [Route("api/[controller]/[action]")]
    public class TimerController : Controller
    {
        [HttpGet("{id}")]
        [ActionName("Active")]
        public Activity GetActive(string id)
        {
            Activity activity = new Activity();
            activity.GetActive(id);

            return activity;
        }


        [HttpPost]
        [ActionName("Start")]
        public Activity StartActivity([FromBody] Objects.Task task)
        {
            User user = new User();
            user.BadgeNumber = "69876";

            Activity activity = new Activity(task, user);
            activity.Start();

            return activity;
        }

        [HttpPost]
        [ActionName("Stop")]
        public void StopActivity([FromBody] Activity activity)
        {
            activity.Stop();
        }
    }
}

