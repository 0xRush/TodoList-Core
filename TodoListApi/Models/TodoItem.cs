namespace TodoApi.Models;
using Microsoft.AspNetCore.Identity;

public class TodoItem {
    public int Id { get; set; }
        public string? Name { get; set; }
        public bool IsCompleted { get; set; }

        public string? UserId { get; set; }
        public IdentityUser? User { get; set; }
}