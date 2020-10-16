using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistance.Migrations
{
    public partial class AddedUserToClip : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "Clips",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Clips_ApplicationUserId",
                table: "Clips",
                column: "ApplicationUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Clips_AspNetUsers_ApplicationUserId",
                table: "Clips",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Clips_AspNetUsers_ApplicationUserId",
                table: "Clips");

            migrationBuilder.DropIndex(
                name: "IX_Clips_ApplicationUserId",
                table: "Clips");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Clips");
        }
    }
}
