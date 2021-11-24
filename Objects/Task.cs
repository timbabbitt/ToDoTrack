using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace DevBoard.Objects
{
    public class Task
    {
        public Guid TaskId { get; set; }
        public Guid ProjectId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Notes { get; set; }
        public DateTime Added { get; set; }
        public string AssignedTo { get; set; }
        public DateTime? AssignedOn { get; set; }
        public Int32 Status { get; set; }
        public DateTime? CompletedOn { get; set; }
        public string CompletedBy { get; set; }
        public List<SubTask> SubTasks { get; set; }

        public void Add()
        {
            string projectQuery = @"INSERT INTO [EngDispatch].[dbo].[DevBoard_Tasks]
                ([TaskId], [ProjectId], [Title], [Description], [Notes], [Added], [AssignedTo], [AssignedOn], [Status], [CompletedOn], [CompletedBy])
                VALUES (@TaskId, @ProjectId, @Title, @Description, @Notes, @Added, @AssignedTo, @AssignedOn, @Status, @CompletedOn, @CompletedBy)";

            using (SqlConnection sqlConnection = new SqlConnection("data source=rsql02;initial catalog=EngDispatch;integrated security=SSPI"))
            {
                sqlConnection.Open();

                using (SqlCommand sqlCommand = new SqlCommand(projectQuery, sqlConnection))
                {
                    sqlCommand.Parameters.AddWithValue("@TaskId", Guid.NewGuid());
                    sqlCommand.Parameters.AddWithValue("@ProjectId", ProjectId);
                    sqlCommand.Parameters.AddWithValue("@Title", Title);
                    sqlCommand.Parameters.AddWithValue("@Description", Description);
                    sqlCommand.Parameters.AddWithValue("@Notes", Notes);
                    sqlCommand.Parameters.AddWithValue("@Added", DateTime.Now);
                    sqlCommand.Parameters.AddWithValue("@AssignedTo", "69876");
                    sqlCommand.Parameters.AddWithValue("@AssignedOn", DBNull.Value);
                    sqlCommand.Parameters.AddWithValue("@Status", 0);
                    sqlCommand.Parameters.AddWithValue("@CompletedOn", DBNull.Value);
                    sqlCommand.Parameters.AddWithValue("@CompletedBy", DBNull.Value);

                    sqlCommand.ExecuteNonQuery();
                }
            }
        }
    }
}