using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Domain;
using Newtonsoft.Json;
using Persistance;

namespace Support.Games
{
    public class SeedGames
    {
        private static HttpClient _client = new HttpClient();
        /// <summary>
        /// Get the games from the rawg api and parse them into the game domain entity
        /// </summary>
        public static async Task<List<Game>> ApiRawgGamesRequest()
        {
            var gamesList = new List<Game>();
            for (int i = 1; i < 250; i++)
            {
                using (var msg = new HttpRequestMessage(HttpMethod.Get, new Uri($"https://api.rawg.io/api/games?page_size=40&page=1")))
                using (var response = await _client.SendAsync(msg))
                {
                    response.EnsureSuccessStatusCode();
                    var gamesResponse = await response.Content.ReadAsAsync<GameResponse>();
                    gamesList.AddRange(gamesResponse.Results);
                }
            }

            for (int i = 0; i < 10; i++)
            {
                Console.WriteLine(gamesList[i].Name);
            }

            return gamesList;
        }

        /// <summary>
        /// Add the games gotten from the api into the games table in the db
        /// </summary>
        public static async Task SeedGamesData(DataContext context)
        {
            if (!context.Games.Any())
            {
                var responseFromRawg = await ApiRawgGamesRequest();
                await context.Games.AddRangeAsync(responseFromRawg);
                await context.SaveChangesAsync();
            }
        }
        
    }
}