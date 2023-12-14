import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "src/users/entities/user.entity";

const fs = require('fs');
const path = require('path');

const getAllModelFiles = (folderPath, files = []): any[] => {
    const entries = fs.readdirSync(folderPath);
  
    entries.forEach(entry => {
      const entryPath = path.join(folderPath, entry);
      const stats = fs.statSync(entryPath);
  
      if (stats.isDirectory()) {
        getAllModelFiles(entryPath, files); // Recursively explore subdirectories
      } else if (stats.isFile() && entry.endsWith('.entity.ts')) {
        files.push(entryPath); // Add the file path to the list
      }
    });

    return files;
}

const dbModels = getAllModelFiles(path.join(__dirname, '../'));
@Module({
    imports: [
        SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                host: configService.get('database.host'),
                port: configService.get('database.port'),
                username: configService.get('database.username'),
                password: configService.get('database.password'),
                database: configService.get('database.database'),
                dialect: 'mysql',
                models: [ User ]
            }),
            inject: [ConfigService]
        }),
    ],
    exports: [SequelizeModule]
})
export class DatabaseModule {}