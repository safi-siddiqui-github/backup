/*
Keys AWS S3

eventverseapp/user/userId/general/profile/avatar ...files

eventverseapp/user/userId/host/event/eventId/banners/ ...files (step 2 - create event)

eventverseapp/user/userId/host/event/eventId/specialGuests/specialGuestsId/ ...files (step 4 - create event)

eventverseapp/user/userId/host/event/eventId/modules/schedule/conference/tracks/trackId/ ...files

eventverseapp/user/userId/host/event/eventId/modules/budget/services/serviceId/documents ...files

eventverseapp/user/userId/host/event/eventId/modules/announcement/announcementId/attachements ...files

eventverseapp/user/userId/host/event/eventId/modules/media/albums/ ...files

eventverseapp/user/userId/guest/event/eventId/modules/media/albums/ ...files

eventverseapp/user/userId/vendor/profile/avatar ...files
eventverseapp/user/userId/vendor/profile/portfolio ...files

eventverseapp/user/userId/vendor/event/eventId/modules/budget/services/serviceId/documents ...files

eventverseapp/user/userId/organization/orgId/profile/avatar ...files
eventverseapp/user/userId/organization/orgId/profile/banners ...files

eventverseapp/user/userId/organization/orgId/host/event/eventId/+++ / ...files (step 2 - create event)
eventverseapp/user/userId/organization/orgId/guest/event/eventId/+++ / ...files (step 2 - create event)


------------------------------------------

eventverseapp/userId/host/

eventverseapp/user/hosting/eventId
eventverseapp/user/hosting/eventId/orgId
eventverseapp/user/attending

User  -> Attending -> Event -> Assets
User -> Hosting -> Event -> Assets

eventverseapp/user/attendee
eventverseapp/user/host
eventverseapp/user/vendor

eventverseapp/user/profile

eventverseapp/user/event/


eventverseapp/event/
Event = eventId

eventverseapp/user/host/event/banner
eventverseapp/user/host/event/assets
eventverseapp/user/host/event/moduleName

eventverseapp/user/host/event/mediaModule/
eventverseapp/user/host/eventId/mediaModule/…files
eventverseapp/user/attendee/eventId/mediaModule/…files
eventverseapp/user/attendee/eventId/mediaModule/albums/ …files
*/

import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import mimeType from "mime-types";
import { envLib } from "./lib-env";

const AWS_BUCKET_NAME = envLib.AWS_BUCKET_NAME;
const AWS_REGION = envLib.AWS_REGION;
const AwsS3Client = new S3Client({
  // region: envLib.AWS_REGION,
  region: AWS_REGION,
  credentials: {
    accessKeyId: envLib.AAWS_ACCESS_KEY,
    secretAccessKey: envLib.AWS_SECRET_ACCESS_KEY,
  },

  // bucketEndpoint: true,
  // endpoint: 's3://eventverse-app/'
  // endpoint: 'https://eventverse-appp.s3.us-east-2.amazonaws.com/'
});

type AWSS3FolderFNType = {
  folderType?: "banner"| "guest";
  userType?: "host" | "guest";
  userId?: string | number;
  eventId?: string | number;
};

const AWSS3FolderFN = ({
  folderType,
  userId,
  eventId,
  userType,
}: AWSS3FolderFNType): string | undefined => {
  if (!folderType || !userId || !eventId || !userType) {
    return undefined;
  }

  const userPart = `users/${userId}/${userType}`;
  const eventPart = `events/${eventId}`;

  switch (folderType) {
    case "banner":
      return `${userPart}/${eventPart}/banners`;
      break;
    case "guest":
      return `${userPart}/${eventPart}/guests`;
      break;
  }
};

type LibAWSS3UploadFilesFType = {
  // fileBuffer: Buffer;
  // folder?: string; // "users/avatars"
  file?: File;
  fileName?: string;
  // contentType?: string;
} & AWSS3FolderFNType;

export const LibAWSS3UploadFilesFN = async (
  creds?: LibAWSS3UploadFilesFType,
): Promise<string | undefined> => {
  const {
    // fileBuffer,
    // contentType = "application/octet-stream",
    file,
    fileName,
    eventId,
    folderType,
    userId,
    userType,
  } = creds ?? {};

  if (
    !creds ||
    !file ||
    !fileName ||
    // !folder ||
    !eventId ||
    !folderType ||
    !userId ||
    !userType
  ) {
    return undefined;
  }

  const folderKey = AWSS3FolderFN(creds);
  if (!folderKey) {
    return undefined;
  }

  const fileNameModify = `${fileName}-${Date.now()}`;
  const key = `${folderKey}/${fileNameModify}`;
  const buffer = Buffer.from(await file?.arrayBuffer());
  const contentType =
    mimeType?.lookup(file?.name) ?? "application/octet-stream";

  const obj = await PutObjectCommandFN({
    Key: key,
    // Body: fileBuffer,
    Body: buffer,
    ContentType: String(contentType),
  });

  if (!obj) {
    return undefined;
  }

  return key;

  // return {
  //   key,
  //   // url: `https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${key}`,
  //   // url: `https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${encodeURIComponent(key)}`,
  //   // obj,
  // };
};

async function PutObjectCommandFN(config?: Partial<PutObjectCommandInput>) {
  if (!config) return;
  const { Key, Body, ...configData } = config;
  if (!Key || !Body) return undefined;

  return await AwsS3Client.send(
    new PutObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key,
      Body,
      ...configData,
      // ContentType: ,
    }),
  );

  // await AwsS3Client.send(
  //   new PutObjectCommand({
  //     Bucket: bucketName,
  //     Key: key,
  //     Body: fileBuffer,
  //     ContentType: contentType,
  //   }),
  // );
}

export const getS3SignedUrl = async (key: string, expiresIn = 3600) => {
  const command = new GetObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: key,
  });

  return getSignedUrl(AwsS3Client, command, { expiresIn });
};

export const deleteFromS3 = async (key: string) => {
  await AwsS3Client.send(
    new DeleteObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: key,
    }),
  );
};
