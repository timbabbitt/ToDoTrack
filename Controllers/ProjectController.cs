using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using DevBoard.Objects;
using Microsoft.AspNetCore.Mvc;

namespace DevBoard.Controllers
{
    [Route("api/[controller]/[action]")]
    public class ProjectController : Controller
    {
        [HttpGet("{id}")]
        [ActionName("Get")]
        public List<Project> GetProjects(Guid id)
        {
            List<Project> projects = new List<Project>();

            string projectQuery = @"SELECT ProjectId FROM [EngDispatch].[dbo].[DevBoard_Projects]";

            using (SqlConnection sqlConnection = new SqlConnection("data source=rsql02;initial catalog=EngDispatch;integrated security=SSPI"))
            {
                sqlConnection.Open();

                using (SqlCommand sqlCommand = new SqlCommand(projectQuery, sqlConnection))
                {
                    using (SqlDataReader data = sqlCommand.ExecuteReader())
                    {
                        if (data.HasRows)
                        {
                            while (data.Read())
                            {
                                Project currentProject = new Project(data.GetGuid(0));

                                projects.Add(currentProject);
                            }
                        }
                    }
                }
            }

            return projects;
        }

        [HttpPost]
        [ActionName("Add")]
        public void AddProject([FromBody] Project project)
        {
            string projectQuery = @"INSERT INTO [EngDispatch].[dbo].[DevBoard_Projects]
                (ProjectId, Name, Added, AddedBy, Description, Notes, Status, ProjectGroup)
                VALUES (@ProjectId, @Name, @Added, @AddedBy, @Description, @Notes, @Status, @ProjectGroup)";

            using (SqlConnection sqlConnection = new SqlConnection("data source=rsql02;initial catalog=EngDispatch;integrated security=SSPI"))
            {
                sqlConnection.Open();

                using (SqlCommand sqlCommand = new SqlCommand(projectQuery, sqlConnection))
                {
                    sqlCommand.Parameters.AddWithValue("@ProjectId", Guid.NewGuid());
                    sqlCommand.Parameters.AddWithValue("@Name", project.Name);
                    sqlCommand.Parameters.AddWithValue("@Added", DateTime.Now);
                    sqlCommand.Parameters.AddWithValue("@AddedBy", "69876");
                    sqlCommand.Parameters.AddWithValue("@Description", project.Description);
                    sqlCommand.Parameters.AddWithValue("@Notes", project.Notes);
                    sqlCommand.Parameters.AddWithValue("@Status", 1);
                    sqlCommand.Parameters.AddWithValue("@ProjectGroup", project.Group);

                    sqlCommand.ExecuteNonQuery();
                }
            }
        }
    }
}

