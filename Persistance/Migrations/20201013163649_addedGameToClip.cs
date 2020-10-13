using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistance.Migrations
{
    public partial class addedGameToClip : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "GameId",
                table: "Clips",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Clips_GameId",
                table: "Clips",
                column: "GameId");

            migrationBuilder.AddForeignKey(
                name: "FK_Clips_Games_GameId",
                table: "Clips",
                column: "GameId",
                principalTable: "Games",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Clips_Games_GameId",
                table: "Clips");

            migrationBuilder.DropIndex(
                name: "IX_Clips_GameId",
                table: "Clips");

            migrationBuilder.DropColumn(
                name: "GameId",
                table: "Clips");
        }
    }
}
