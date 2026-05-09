import GithubSvg from '@/components/icons/github';
import GoogleSvg from '@/components/icons/google';
import SecondaryLink from '@/components/link/secondary-link';

export default function SocialLogin() {
    return (
        <div className="flex flex-wrap items-center gap-2">
            <SecondaryLink href={route('google.login')} addClasses="flex-1 flex items-center justify-center gap-2">
                <GoogleSvg />
                Google
            </SecondaryLink>
            <SecondaryLink href={route('github.login')} addClasses="flex-1 flex items-center justify-center gap-2">
                <GithubSvg />
                Github
            </SecondaryLink>
        </div>
    );
}
