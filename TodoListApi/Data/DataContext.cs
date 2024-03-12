using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;


namespace TodoApi.Models;

public class DataContext : IdentityDbContext {
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
        
    }

    public DbSet<TodoItem> TodoItems { get; set; }
}