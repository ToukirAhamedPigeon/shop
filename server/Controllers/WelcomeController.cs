using Microsoft.AspNetCore.Mvc;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WelcomeController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetWelcome()
        {
            return Ok("Smarter shopping with real-time intelligence!");
        }
    }
}
