using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistance.Migrations
{
    public partial class addedViewTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "views",
                table: "Clips");

            migrationBuilder.CreateTable(
                name: "Views",
                columns: table => new
                {
                    ApplicationUserId = table.Column<string>(nullable: false),
                    ClipId = table.Column<string>(nullable: false),
                    WatchedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Views", x => new { x.ApplicationUserId, x.ClipId });
                    table.ForeignKey(
                        name: "FK_Views_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Views_Clips_ClipId",
                        column: x => x.ClipId,
                        principalTable: "Clips",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Views_ClipId",
                table: "Views",
                column: "ClipId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Views");

            migrationBuilder.AddColumn<int>(
                name: "views",
                table: "Clips",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
