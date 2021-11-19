using System;
using System.Collections.Generic;

namespace DevBoard.Objects
{
    public class User
    {
        public Guid UserId { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
    }
}