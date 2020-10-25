using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistance.Migrations
{
    public partial class addedMainDislikeTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Dislikes",
                table: "Clips");

            migrationBuilder.CreateTable(
                name: "DislikeUserClips",
                columns: table => new
                {
                    ApplicationUserId = table.Column<string>(nullable: false),
                    ClipId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DislikeUserClips", x => new { x.ClipId, x.ApplicationUserId });
                    table.ForeignKey(
                        name: "FK_DislikeUserClips_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DislikeUserClips_Clips_ClipId",
                        column: x => x.ClipId,
                        principalTable: "Clips",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DislikeUserClips_ApplicationUserId",
                table: "DislikeUserClips",
                column: "ApplicationUserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DislikeUserClips");

            migrationBuilder.AddColumn<int>(
                name: "Dislikes",
                table: "Clips",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
