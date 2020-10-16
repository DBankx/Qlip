using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistance.Migrations
{
    public partial class addedViews : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Thumbnail",
                table: "Clips");

            migrationBuilder.AddColumn<int>(
                name: "views",
                table: "Clips",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "views",
                table: "Clips");

            migrationBuilder.AddColumn<string>(
                name: "Thumbnail",
                table: "Clips",
                type: "longtext CHARACTER SET utf8mb4",
                nullable: true);
        }
    }
}
