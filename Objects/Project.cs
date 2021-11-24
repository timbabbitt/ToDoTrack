using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace DevBoard.Objects
{
    public class Project
    {
        public Project()
        {
            TeamMembers = new List<User>();
            Tasks = new List<Task>();
        }

        public Project(Guid guid)
        {
            TeamMembers = new List<User>();
            Tasks = new List<Task>();
            GetProject(guid);
        }

        public Guid ProjectId { get; set; }
        public string Name { get; set; }
        public DateTime Added { get; set; }
        public User AddedBy { get; set; }
        public List<User> TeamMembers { get; set; }
        public string Description { get; set; }
        public string Notes { get; set; }
        public int Status { get; set; }
        public List<Task> Tasks { get; set; }
        public string Group { get; set; }
        public List<string> Tags { get; set; }

        private string AddedByBadge;

        public void AddTask(Task task)
        {
            Tasks.Add(task);
        }

        public void GetProject(Guid Id)
        {
            string projectQuery = @"SELECT * FROM [EngDispatch].[dbo].[DevBoard_Projects] WHERE ProjectId = @projectIdParam";
            string taskQuery = @"SELECT * FROM [EngDispatch].[dbo].[DevBoard_Tasks] WHERE ProjectId = @projectIdParam";

            using (SqlConnection sqlConnection = new SqlConnection("data source=rsql02;initial catalog=EngDispatch;integrated security=SSPI"))
            {
                sqlConnection.Open();

                using (SqlCommand sqlCommand = new SqlCommand(projectQuery, sqlConnection))
                {
                    sqlCommand.Parameters.AddWithValue("@projectIdParam", Id);

                    using (SqlDataReader data = sqlCommand.ExecuteReader())
                    {
                        if (data.HasRows)
                        {
                            while (data.Read())
                            {
                                ProjectId = data.GetGuid(0);
                                Name = data.GetString(1);
                                Added = data.GetDateTime(2);
                                AddedByBadge = data.GetString(3);
                                Description = data.GetString(4);
                                Notes = data.GetString(5);
                                Status = data.GetInt32(6);
                                Group = data.GetString(7);
                            }
                        }
                    }
                }

                using (SqlCommand sqlCommand = new SqlCommand(taskQuery, sqlConnection))
                {
                    sqlCommand.Parameters.AddWithValue("@projectIdParam", Id);

                    using (SqlDataReader data = sqlCommand.ExecuteReader())
                    {
                        if (data.HasRows)
                        {
                            while (data.Read())
                            {
                                Task currentTask = new Task
                                {
                                    TaskId = data.GetGuid(0),
                                    ProjectId = data.GetGuid(1),
                                    Title = data.GetString(2),
                                    Description = data.GetString(3),
                                    Notes = data.GetString(4),
                                    Added = data.GetDateTime(5),
                                    AssignedTo = data.GetString(6),
                                    AssignedOn = data.GetValue(7) == DBNull.Value ? (DateTime?)null : data.GetDateTime(7),
                                    Status = data.GetInt32(8),
                                    CompletedOn = data.GetValue(9) == DBNull.Value ? (DateTime?)null : data.GetDateTime(9),
                                    //CompletedBy = data.GetString(10)
                                };

                                Tasks.Add(currentTask);
                            }
                        }
                    }
                }

            }
        }
    }
}

