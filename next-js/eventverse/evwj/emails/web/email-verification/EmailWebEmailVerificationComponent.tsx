import {
  AwsSESSendEmail,
  AwsSESSendEmailPropsType,
  AwsSESSendEmailType,
} from "@/lib/lib-aws-ses";
import { ResponseDataType } from "@/lib/lib-responses";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";

export type EmailWebEmailVerificationType = {
  otp?: ResponseDataType["otp"];
};

const EmailWebEmailVerificationComponent = ({
  otp,
}: EmailWebEmailVerificationType) => {
  return (
    <Html>
      <Head>
        <title>Email Verification</title>
      </Head>
      <Preview>Email Verification Code: {String(otp?.code)}</Preview>
      <Tailwind>
        <Body>
          <Container className="flex flex-col gap-4">
            <Heading className="text-2xl font-bold">EventVerse</Heading>
            <Text>Your Email Verification OTP code is {otp?.code}</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const EmailWebEmailVerificationComponentFN = async <
  T extends AwsSESSendEmailPropsType,
>(
  options: AwsSESSendEmailType<T>,
) => {
  await AwsSESSendEmail({
    ...options,
    subject: "Email Verification",
    Component: EmailWebEmailVerificationComponent,
  });
};
