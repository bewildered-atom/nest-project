import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { v4 as uuidv4 } from 'uuid';
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
require('aws-sdk/lib/maintenance_mode_message').suppress = true;


@Injectable()
export class S3Service {
    private bucketName = '';
    private readonly s3Client = new S3Client({
        region: 'ap-south-1',
        credentials: {
            accessKeyId: this.configService.get('awsConfig.accessKeyId'),
            secretAccessKey: this.configService.get('awsConfig.secretAccessKey'),
        }
    })
    constructor(private configService: ConfigService) {
        this.bucketName = this.configService.get('awsConfig.bucket');
    }

    async uploadToS3(file: Express.Multer.File) {
        const uniqueFileName = this.getUniqFileName(file.originalname);
        const dirName = 'public_assets/profile_imgs'
        await this.s3Client.send(
            new PutObjectCommand({
                Bucket: this.bucketName,
                Key: `${dirName}/${uniqueFileName}`,
                Body: file.buffer
            })
        );
        return `${dirName}/${uniqueFileName}`;
    }
    
    async getSignedUrl(fileName: string | undefined, objectExpireTime = 60 * 1) {
        if (!fileName) {
            return '';
        }

        const command = new GetObjectCommand({
            Bucket: this.bucketName,
            Key: fileName
        });

        return getSignedUrl(this.s3Client, command, { expiresIn: objectExpireTime });
    }

    private getUniqFileName (originalname: string) {
        const name = uuidv4();
        const ext = originalname.split('.').pop();
        return `${name}.${ext}`;
    }
}
