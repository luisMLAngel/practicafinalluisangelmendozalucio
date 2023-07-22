using System;
using Microsoft.AspNetCore.Mvc;
using PracticaFinalLuisAngelMendozaLucio.Services;
using PracticaFinalLuisAngelMendozaLucio.Models;

namespace PracticaFinalLuisAngelMendozaLucio.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PersonalItemController : ControllerBase
	{
        private readonly PersonalItemService _personalItemService;

        public PersonalItemController(PersonalItemService service)
        {
            this._personalItemService = service;
        }

        [HttpGet]
        public async Task<List<PersonaItemModel>> Get()
        {
            return await this._personalItemService.Get();
        }

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<PersonaItemModel>> GetById(string id)
        {
            var item = await this._personalItemService.GetById(id);
            if (item is null) return NotFound();

            return item;
        }

        [HttpPost]
        public async Task<IActionResult> Post(PersonaItemModel item)
        {
            await _personalItemService.Create(item);
            return CreatedAtAction(nameof(Get), new { id = item.Id }, item);
        }

        [HttpPatch("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, PersonaItemModel itemModel)
        {
            var item = await this._personalItemService.GetById(id);
            if (item is null) return NotFound();

            itemModel.Id = item.Id;

            await this._personalItemService.Patch(id, itemModel);
            return NoContent();
        }

        // DELETE
        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var item = await this._personalItemService.GetById(id);
            if (item is null) return NotFound();

            await this._personalItemService.DeleteById(id);

            return NoContent();
        }
    }
}

