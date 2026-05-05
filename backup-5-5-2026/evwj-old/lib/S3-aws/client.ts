// import { S3Client } from "@aws-sdk/client-s3";

// const createS3Client = (): S3Client => {

//  @aws-sdk/client-s3 "@aws-sdk/s3-request-presigner

// 	if (!env.s3AccessKeyId || !env.s3SecretAccessKey || !env.s3BucketRegion) {
// 		throw new Error(
// 			"Missing required S3 environment variables: S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_BUCKETREGION",
// 		);
// 	}

// 	return new S3Client({
// 		region: env.s3BucketRegion,
// 		credentials: {
// 			accessKeyId: env.s3AccessKeyId,
// 			secretAccessKey: env.s3SecretAccessKey,
// 		},
// 	});
// };

// Export singleton S3 client instance
// export const s3Client = createS3Client();

// // Export bucket name for use in operations
// export const getBucketName = (): string => {
// 	if (!env.s3BucketName) {
// 		throw new Error("Missing required S3 environment variable: S3_BUCKETNAME");
// 	}
// 	return env.s3BucketName;
// };
