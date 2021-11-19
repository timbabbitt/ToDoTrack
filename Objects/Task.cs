using System;
using System.Collections.Generic;

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
        public User AssignedTo { get; set; }
        public DateTime AssignedOn { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime CompletedDated { get; set; }
        public List<SubTask> SubTasks { get; set; }
    }
}