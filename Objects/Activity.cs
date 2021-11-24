using System;
using System.Data.SqlClient;

namespace DevBoard.Objects
{
    public class Activity
    {
        public Activity() { }

        public Activity(Task task, User user)
        {
            ActivityId = Guid.NewGuid();
            StartedBy = user.BadgeNumber;
            ProjectId = task.ProjectId;
            TaskId = task.TaskId;
            Task = task;
            StartTime = DateTime.Now;
            EndTime = null;
        }

        public Guid ActivityId { get; set; }
        public String StartedBy { get; set; }
        public Guid ProjectId { get; set; }
        public Guid TaskId { get; set; }
        public Task Task { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime? EndTime { get; set; }

        public void GetActive(string userId)
        {
            string startTimerQuery = @"SELECT *
                                        FROM [EngDispatch].[dbo].[DevBoard_Activity]
                                        WHERE StartedBy = @userIdParam AND EndTime is null";

            string getTaskQuery = @"SELECT * FROM [EngDispatch].[dbo].[DevBoard_Tasks] WHERE TaskId = @taskIdParam";

            using (SqlConnection sqlConnection = new SqlConnection("data source=rsql02;initial catalog=EngDispatch;integrated security=SSPI"))
            {
                sqlConnection.Open();

                using (SqlCommand sqlCommand = new SqlCommand(startTimerQuery, sqlConnection))
                {
                    sqlCommand.Parameters.AddWithValue("@userIdParam", userId);

                    using (SqlDataReader sqlReader = sqlCommand.ExecuteReader())
                    {
                        if (sqlReader.HasRows)
                        {
                            while (sqlReader.Read())
                            {
                                ActivityId = sqlReader.GetGuid(0);
                                StartedBy = sqlReader.GetString(1);
                                ProjectId = sqlReader.GetGuid(2);
                                TaskId = sqlReader.GetGuid(3);
                                StartTime = sqlReader.GetDateTime(4);
                                EndTime = null;
                            }
                        }
                    }
                }

                using (SqlCommand sqlCommand = new SqlCommand(getTaskQuery, sqlConnection))
                {
                    sqlCommand.Parameters.AddWithValue("@taskIdParam", TaskId);

                    using (SqlDataReader sqlReader = sqlCommand.ExecuteReader())
                    {
                        if (sqlReader.HasRows)
                        {
                            while (sqlReader.Read())
                            {
                                Task task = new Task();
                                task.TaskId = sqlReader.GetGuid(0);
                                task.ProjectId = sqlReader.GetGuid(1);
                                task.Title = sqlReader.GetString(2);
                                task.Description = sqlReader.GetString(3);
                                task.Notes = sqlReader.GetString(4);
                                task.Added = sqlReader.GetDateTime(5);
                                task.AssignedTo = sqlReader.GetString(6);
                                task.AssignedOn = sqlReader.GetValue(7) == DBNull.Value ? (DateTime?)null : sqlReader.GetDateTime(7);
                                task.Status = sqlReader.GetInt32(8);
                                //task.CompletedOn = sqlReader.GetDateTime(9);
                                //task.CompletedBy = sqlReader.GetString(10);

                                Task = task;
                            }
                        }
                    }
                }
            }
        }

        public void Start()
        {
            string startTimerQuery = @"INSERT INTO [EngDispatch].[dbo].[DevBoard_Activity]
                                        VALUES (@activityIdParam, @startedByParam, @projectIdParam, @taskIdParam, @startTimeParam, @endTimeParam)";

            using (SqlConnection sqlConnection = new SqlConnection("data source=rsql02;initial catalog=EngDispatch;integrated security=SSPI"))
            {
                sqlConnection.Open();

                using (SqlCommand sqlCommand = new SqlCommand(startTimerQuery, sqlConnection))
                {
                    sqlCommand.Parameters.AddWithValue("@activityIdParam", ActivityId);
                    sqlCommand.Parameters.AddWithValue("@startedByParam", StartedBy);
                    sqlCommand.Parameters.AddWithValue("@projectIdParam", ProjectId);
                    sqlCommand.Parameters.AddWithValue("@taskIdParam", TaskId);
                    sqlCommand.Parameters.AddWithValue("@startTimeParam", StartTime);
                    sqlCommand.Parameters.AddWithValue("@endTimeParam", DBNull.Value);

                    sqlCommand.ExecuteNonQuery();
                }
            }
        }

        public void Stop()
        {
            string startTimerQuery = @"UPDATE [EngDispatch].[dbo].[DevBoard_Activity] SET EndTime = @endTimeParam WHERE ActivityId = @activityIdparam";

            using (SqlConnection sqlConnection = new SqlConnection("data source=rsql02;initial catalog=EngDispatch;integrated security=SSPI"))
            {
                sqlConnection.Open();

                using (SqlCommand sqlCommand = new SqlCommand(startTimerQuery, sqlConnection))
                {
                    sqlCommand.Parameters.AddWithValue("@activityIdParam", ActivityId);
                    sqlCommand.Parameters.AddWithValue("@endTimeParam", DateTime.Now);

                    sqlCommand.ExecuteNonQuery();
                }
            }
        }
    }
}

