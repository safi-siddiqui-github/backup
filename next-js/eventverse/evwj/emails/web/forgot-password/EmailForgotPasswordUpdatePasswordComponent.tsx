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

export type EmailForgotPasswordUpdatePasswordComponentType = {
  user?: ResponseDataType["user"];
};

const EmailForgotPasswordUpdatePasswordComponent = ({
  user,
}: EmailForgotPasswordUpdatePasswordComponentType) => {
  return (
    <Html>
      <Head>
        <title>Password Updated</title>
      </Head>
      <Preview>Password Updated: {String(user?.firstname)}</Preview>
      <Tailwind>
        <Body>
          <Container className="flex flex-col gap-4">
            <Heading className="text-2xl font-bold">EventVerse</Heading>
            <Text>Your Password Updated for {user?.email}</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const EmailForgotPasswordUpdatePasswordComponentFN = async <
  T extends AwsSESSendEmailPropsType,
>(
  options: AwsSESSendEmailType<T>,
) => {
  await AwsSESSendEmail({
    ...options,
    subject: "Forgot Password",
    Component: EmailForgotPasswordUpdatePasswordComponent,
  });
};
