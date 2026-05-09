import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

type Props = {
  email: string;
  code: string;
};

export default function VerifyEmail(props: Props) {
  return (
    <Html
      lang='en'
      dir='ltr'
    >
      <Head>
        <title>Verify Email</title>
      </Head>

      <Preview>Verify Email, {props.email}</Preview>

      <Tailwind>
        <Body className='font-sans'>
          <Container>
            <Section className='bg-black p-4 text-center'>
              <Heading
                as='h1'
                className='text-white'
              >
                Verify Email
              </Heading>
            </Section>

            <Section className='p-4'>
              <Text>Verify you email to explore our app.</Text>
            </Section>

            <Section className='p-4'>
              <Heading
                as='h3'
                className=''
              >
                Verification Code:
              </Heading>
              <Text>{props.code}</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
