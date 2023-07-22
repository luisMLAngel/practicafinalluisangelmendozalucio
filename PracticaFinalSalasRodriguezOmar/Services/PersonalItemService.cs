using Microsoft.Extensions.Options;
using MongoDB.Driver;
using PracticaFinalLuisAngelMendozaLucio.Databases;
using PracticaFinalLuisAngelMendozaLucio.Models;

namespace PracticaFinalLuisAngelMendozaLucio.Services
{
	public class PersonalItemService
	{
        private readonly IMongoCollection<PersonaItemModel> _personalItemCollection;


        public PersonalItemService(IOptions<MongoConnection> mongoConnection)
        {
            var mongoClient = new MongoClient(mongoConnection.Value.Connection);
            var mongoDatabase = mongoClient.GetDatabase(mongoConnection.Value.DatabaseName);
            this._personalItemCollection = mongoDatabase.GetCollection<PersonaItemModel>(mongoConnection.Value.CollectionName);
        }

        public async Task<List<PersonaItemModel>> Get()
        {
            return await this._personalItemCollection.Find(_ => true).ToListAsync();
        }

        public async Task<PersonaItemModel?> GetById(string id)
        {
            return await this._personalItemCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
        }

        public async Task Create(PersonaItemModel foodModel)
        {
            await this._personalItemCollection.InsertOneAsync(foodModel);
        }

        public async Task Patch(string id, PersonaItemModel updateFoodModel)
        {
            await this._personalItemCollection.ReplaceOneAsync(x => x.Id == id, updateFoodModel);
        }

        public async Task DeleteById(string id)
        {
            await this._personalItemCollection.DeleteOneAsync(x => x.Id == id);
        }
    }
}

