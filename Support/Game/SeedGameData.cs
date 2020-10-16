using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Domain;
using Persistance;

namespace Support.Game
{
    public class SeedGameData
    {
        private static HttpClient _client = new HttpClient();
        
        /// <summary>
        /// Get the games from the rawg api
        /// </summary>
        public static async Task<List<Domain.Game>> ApiRawgGamesRequest(DataContext context)
        {
            var gamesList = new List<Domain.Game>();
            for (int i = 1; i < 250; i++)
            {
                using (var msg = new HttpRequestMessage(HttpMethod.Get, new Uri($"https://api.rawg.io/api/games?page_size=40&page={i}")))
                using (var response = await _client.SendAsync(msg))
                {
                    response.EnsureSuccessStatusCode();
                    var gamesResponse = await response.Content.ReadAsAsync<GameResponse>();
                    gamesList.AddRange(gamesResponse.Results);
                }
            }

            return gamesList;
        }
        
        /// <summary>
        /// Add the games data to the database
        /// </summary>
        public static async Task SeedGamesData(DataContext context)
        {
            if (!context.Games.Any())
            {
                try
                {
                    var gamesList = await ApiRawgGamesRequest(context);
                    await context.Games.AddRangeAsync(gamesList);
                    await context.SaveChangesAsync();
                    Console.WriteLine("Games have been saved");
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.StackTrace);
                }
            }
        }
    }
}