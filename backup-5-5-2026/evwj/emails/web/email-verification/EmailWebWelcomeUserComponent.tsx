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

export type EmailWebWelcomeUserComponentType = {
  user?: ResponseDataType["user"];
};

const EmailWebWelcomeUserComponent = ({
  user,
}: EmailWebWelcomeUserComponentType) => {
  return (
    <Html>
      <Head>
        <title>Welcome {user?.firstname}</title>
      </Head>
      <Preview>Welcome {String(user?.firstname)}</Preview>
      <Tailwind>
        <Body>
          <Container className="flex flex-col gap-4">
            <Heading className="text-2xl font-bold">EventVerse</Heading>
            <Text>Welcome {user?.firstname}, to our app</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const EmailWebWelcomeUserComponentFN = async <
  T extends AwsSESSendEmailPropsType,
>(
  options: AwsSESSendEmailType<T>,
) => {
  await AwsSESSendEmail({
    ...options,
    subject: "Email Verification",
    Component: EmailWebWelcomeUserComponent,
  });
};
