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

export type EmailWebEventCreatedType = {
  eventModel?: ResponseDataType["event"];
};

const EmailWebEventCreatedComponent = ({
  eventModel,
}: EmailWebEventCreatedType) => {
  return (
    <Html>
      <Head>
        <title>Event Created</title>
      </Head>
      <Preview>Event Created: {String(eventModel?.name)}</Preview>
      <Tailwind>
        <Body>
          <Container className="flex flex-col gap-4">
            <Heading className="text-2xl font-bold">EventVerse</Heading>
            <Text>
              Your Event &apos;{eventModel?.name}&apos; has been Created
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const EmailWebEventCreatedComponentFN = async <
  T extends AwsSESSendEmailPropsType,
>(
  options: AwsSESSendEmailType<T>,
) => {
  await AwsSESSendEmail({
    ...options,
    subject: "Event Created",
    Component: EmailWebEventCreatedComponent,
  });
};
