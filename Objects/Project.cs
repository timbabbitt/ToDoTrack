using System;
using System.Collections.Generic;

namespace DevBoard.Objects
{
    public class Project
    {
        public Project()
        {
        }

        public Guid ProjectId { get; set; }
        public string Name { get; set; }
        public DateTime Added { get; set; }
        public User AddedBy { get; set; }
        public List<User> TeamMembers { get; set; }
        public string Description { get; set; }
        public string Notes { get; set; }
        public string Status { get; set; }
        public List<Task> Tasks { get; set; }
    }
}

