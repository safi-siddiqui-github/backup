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

export type EmailForgotPasswordCheckEmailComponentType = {
  otp?: ResponseDataType["otp"];
};

const EmailForgotPasswordCheckEmailComponent = ({
  otp,
}: EmailForgotPasswordCheckEmailComponentType) => {
  return (
    <Html>
      <Head>
        <title>Forgot Password</title>
      </Head>
      <Preview>Forgot Password Code: {String(otp?.code)}</Preview>
      <Tailwind>
        <Body>
          <Container className="flex flex-col gap-4">
            <Heading className="text-2xl font-bold">EventVerse</Heading>
            <Text>Your Forgot Password OTP code is {otp?.code}</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const EmailForgotPasswordCheckEmailComponentFN = async <
  T extends AwsSESSendEmailPropsType,
>(
  options: AwsSESSendEmailType<T>,
) => {
  await AwsSESSendEmail({
    ...options,
    subject: "Forgot Password",
    Component: EmailForgotPasswordCheckEmailComponent,
  });
};
