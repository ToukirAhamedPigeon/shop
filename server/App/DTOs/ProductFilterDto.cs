namespace server.App.DTOs
{
    public class ProductFilterDto
    {
        public string? Name { get; set; } // partial match
        public decimal? MinPrice { get; set; }
        public decimal? MaxPrice { get; set; }
    }
}
