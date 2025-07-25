using System.ComponentModel.DataAnnotations;

namespace server.App.Models
{
    public class Product
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Range(0, double.MaxValue)]
        public decimal Price { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
