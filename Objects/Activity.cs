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

